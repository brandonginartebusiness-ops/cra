import crypto from "node:crypto";
import {
  applyRateLimitHeaders,
  rateLimit,
} from "./_lib/rate-limit.js";
import {
  rejectIfBodyTooLarge,
  requireJsonRequest,
  sanitizePlainText,
} from "./_lib/request-safety.js";

const WEBHOOK_LIMIT_CONFIG = {
  key: "booking-webhook",
  limit: 20,
  windowMs: 5 * 60 * 1000,
};

function getHeader(req, name) {
  const value = req.headers[name];
  return Array.isArray(value) ? value[0] : value;
}

function safeJsonStringify(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

function verifyWebhookToken(req) {
  const expected = process.env.CALENDLY_WEBHOOK_TOKEN;
  if (!expected) {
    return true;
  }

  const url = new URL(req.url, "https://cra-opal.vercel.app");
  return url.searchParams.get("token") === expected;
}

function verifyCalendlySignature(req) {
  const signingKey = process.env.CALENDLY_SIGNING_KEY;
  if (!signingKey) {
    return true;
  }

  const signatureHeader = getHeader(req, "calendly-webhook-signature");
  if (!signatureHeader) {
    return false;
  }

  const timestampMatch = signatureHeader.match(/t=(\d+)/);
  const signatureMatch = signatureHeader.match(/v1=([a-f0-9]+)/i);
  if (!timestampMatch || !signatureMatch) {
    return false;
  }

  const rawBody = safeJsonStringify(req.body);
  const signedPayload = `${timestampMatch[1]}.${rawBody}`;
  const expectedSignature = crypto
    .createHmac("sha256", signingKey)
    .update(signedPayload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signatureMatch[1])
  );
}

function normalizePhone(value) {
  if (typeof value !== "string") {
    return "";
  }

  const digits = value.replace(/[^\d+]/g, "");
  if (!digits) {
    return "";
  }

  if (digits.startsWith("+")) {
    return digits;
  }

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  return "";
}

function getInviteeDetails(body) {
  const payload = body?.payload || {};
  const questions = Array.isArray(payload.questions_and_answers)
    ? payload.questions_and_answers
    : [];

  const phoneAnswer = questions.find((item) => /phone/i.test(item.question || ""));

  return {
    eventType: sanitizePlainText(body?.event, 80),
    inviteeName: sanitizePlainText(payload.name, 120) || "New booking",
    inviteeEmail: sanitizePlainText(payload.email, 160),
    inviteePhone: normalizePhone(
      sanitizePlainText(phoneAnswer?.answer || payload?.text_reminder_number || "", 40)
    ),
    eventTime: sanitizePlainText(payload.scheduled_event?.start_time || payload?.start_time || "", 80),
  };
}

async function sendTwilioWhatsApp({ to, body }) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;

  if (!accountSid || !authToken || !from) {
    throw new Error("Twilio WhatsApp environment variables are not configured.");
  }

  const params = new URLSearchParams();
  params.set("To", to);
  params.set("From", from);
  params.set("Body", body);

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twilio request failed: ${response.status} ${errorText}`);
  }
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const limitResult = rateLimit(req, WEBHOOK_LIMIT_CONFIG);
  applyRateLimitHeaders(res, limitResult);
  if (!limitResult.ok) {
    return res.status(429).json({ error: "Too many webhook requests." });
  }

  const bodyTooLargeResponse = rejectIfBodyTooLarge(req, res, 32 * 1024);
  if (bodyTooLargeResponse) {
    return bodyTooLargeResponse;
  }

  const invalidContentTypeResponse = requireJsonRequest(req, res);
  if (invalidContentTypeResponse) {
    return invalidContentTypeResponse;
  }

  if (!verifyWebhookToken(req)) {
    return res.status(401).json({ error: "Invalid webhook token." });
  }

  if (!verifyCalendlySignature(req)) {
    return res.status(401).json({ error: "Invalid Calendly signature." });
  }

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ error: "Malformed webhook payload." });
  }

  const details = getInviteeDetails(req.body);
  if (!details.eventType) {
    return res.status(400).json({ error: "Missing event type." });
  }

  if (details.eventType !== "invitee.created") {
    return res.status(200).json({ ok: true, ignored: true });
  }

  const internalTo = normalizePhone(process.env.INTERNAL_ALERT_WHATSAPP_TO || "");
  if (!internalTo) {
    return res.status(500).json({ error: "Internal alert WhatsApp number is not configured." });
  }

  const teamMessage =
    `New Calendly booking for Claim Remedy.\n` +
    `Name: ${details.inviteeName}\n` +
    `Email: ${details.inviteeEmail || "Not provided"}\n` +
    `Phone: ${details.inviteePhone || "Not provided"}\n` +
    `Time: ${details.eventTime || "Not provided"}`;

  try {
    await sendTwilioWhatsApp({
      to: internalTo,
      body: teamMessage,
    });

    if (details.inviteePhone) {
      await sendTwilioWhatsApp({
        to: details.inviteePhone,
        body:
          `Hi ${details.inviteeName}, your Claim Remedy consultation is booked.` +
          (details.eventTime ? ` Appointment time: ${details.eventTime}.` : "") +
          ` Reply here if you need anything before the call.`,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Booking webhook error:", error);
    return res.status(500).json({ error: "Failed to send WhatsApp notifications." });
  }
}
