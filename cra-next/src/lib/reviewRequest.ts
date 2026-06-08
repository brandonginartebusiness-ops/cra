import { createHmac, timingSafeEqual } from "crypto";
import { googleReviewsUrl } from "@/data/reviews";

/**
 * Review-request engine.
 *
 * When a claim closes, Brandon clicks a signed link in the lead-notification
 * email. That hits /api/review-request, which texts + emails THAT client a
 * clean, compliant Google-review ask. This is the cheapest engine for the
 * steady native-Google-review velocity that drives local-pack ranking.
 *
 * Compliance: this targets an EXISTING, already-served client (post-service
 * follow-up), not a solicitation for new business — and offers no incentive,
 * so it stays clear of Fla. Stat. 626.854 solicitation rules and FTC/Google
 * review-gating policy. Keep it that way: no rewards, no "5-star only" gating.
 */

const BASE_URL = "https://claimremedyadjusters.com";

/** HMAC-SHA256 token binding a lead id to the secret. Null if secret unset. */
export function signLeadId(leadId: number | string): string | null {
  const secret = process.env.REVIEW_REQUEST_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update(`review:${leadId}`).digest("hex");
}

/** Constant-time token check. Returns false on any malformed input. */
export function verifyLeadToken(leadId: number | string, token: string): boolean {
  if (!token || typeof token !== "string") return false;
  const expected = signLeadId(leadId);
  if (!expected || token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

/**
 * Build the signed, clickable review-request URL for the lead email.
 * Returns null when REVIEW_REQUEST_SECRET is unset, so the email simply omits
 * the button instead of breaking — safe to deploy before the secret is added.
 */
export function buildReviewRequestUrl(leadId: number | string): string | null {
  const token = signLeadId(leadId);
  if (!token) return null;
  return `${BASE_URL}/api/review-request?lead=${encodeURIComponent(String(leadId))}&t=${token}`;
}

function normalizePhoneE164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

function firstName(full: string): string {
  const trimmed = (full ?? "").trim();
  if (!trimmed || trimmed.toLowerCase() === "pending") return "there";
  const idx = trimmed.indexOf(" ");
  return idx === -1 ? trimmed : trimmed.slice(0, idx);
}

async function sendReviewSms(phone: string, name: string): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  if (!accountSid || !authToken || !fromNumber) {
    console.warn("[review-request] twilio not configured — sms skipped");
    return false;
  }
  const to = normalizePhoneE164(phone);
  if (!to) return false;

  const body =
    `Hi ${firstName(name)}, this is Claim Remedy Adjusters — thank you for trusting us with your claim. ` +
    `If we did right by you, a quick Google review would mean the world to our team: ${googleReviewsUrl} ` +
    `Reply STOP to opt out.`;

  const params = new URLSearchParams();
  params.append("To", to);
  params.append("From", fromNumber);
  params.append("Body", body);

  const basic = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );
  if (!res.ok) {
    console.error("[review-request] sms failed", res.status);
    return false;
  }
  return true;
}

async function sendReviewEmail(email: string, name: string): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey || resendApiKey === "re_PLACEHOLDER_GET_FROM_RESEND") {
    console.warn("[review-request] resend not configured — email skipped");
    return false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 24px;">
      <h2 style="color:#1a1a2e; margin-top:0;">Thank you, ${firstName(name)} 🙏</h2>
      <p style="color:#33334a; font-size:15px; line-height:1.6;">
        It was our privilege to help with your insurance claim. If you were happy with how
        Claim Remedy Adjusters handled it, would you take 30 seconds to share your experience
        on Google? Honest reviews from neighbors are what help other Florida families find us
        when their insurer won't pay.
      </p>
      <p style="text-align:center; margin:28px 0;">
        <a href="${googleReviewsUrl}"
           style="display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none;
                  font-weight:bold; font-size:15px; padding:14px 28px; border-radius:8px;">
          Leave a Google Review
        </a>
      </p>
      <p style="color:#8888a0; font-size:13px; line-height:1.6;">
        Thank you again for your trust.<br>
        — Eddy D. Gomez, Licensed FL Public Adjuster #W549958<br>
        Claim Remedy Adjusters · (305) 733-1670
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: "Claim Remedy Adjusters <office@claimremedyadjusters.com>",
      to: [email],
      subject: "A quick favor — how did we do?",
      html,
    }),
  });
  if (!res.ok) {
    console.error("[review-request] email failed", res.status, await res.text());
    return false;
  }
  return true;
}

export interface ReviewClient {
  full_name: string;
  phone: string;
  email: string;
}

/** Fire SMS + email in parallel; returns which channels succeeded. */
export async function sendReviewRequest(
  client: ReviewClient
): Promise<{ sms: boolean; email: boolean }> {
  const [sms, email] = await Promise.all([
    sendReviewSms(client.phone, client.full_name).catch((e) => {
      console.error("[review-request] sms error", e);
      return false;
    }),
    sendReviewEmail(client.email, client.full_name).catch((e) => {
      console.error("[review-request] email error", e);
      return false;
    }),
  ]);
  return { sms, email };
}
