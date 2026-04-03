import Anthropic from "@anthropic-ai/sdk";
import {
  applyRateLimitHeaders,
  limiterConfigs,
  rateLimit,
} from "./_lib/rate-limit.js";
import {
  readJsonBody,
  rejectIfBodyTooLarge,
  requireJsonRequest,
  validateChatPayload,
} from "./_lib/request-safety.js";
import {
  buildClaudeFileAttachment,
  getMaxUploadBytes,
  parseMultipartChatRequest,
} from "./_lib/chat-upload.js";
import { systemPrompt } from "./_lib/system-prompt.js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const allowedOrigins = new Set([
    "https://claimremedyadjusters.com",
    "https://www.claimremedyadjusters.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ]);

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  // Multipart uploads send a boundary-specific Content-Type; browsers may request extra header names in preflight.
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
}

function getContentType(req) {
  const value = req.headers["content-type"];
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const contentType = getContentType(req).toLowerCase();
  const isJson = contentType.includes("application/json");
  const isMultipart =
    contentType.includes("multipart/form-data") ||
    (Boolean(contentType) && !isJson);

  const bodyTooLargeResponse = rejectIfBodyTooLarge(
    req,
    res,
    isMultipart ? getMaxUploadBytes() + 16 * 1024 : undefined
  );
  if (bodyTooLargeResponse) {
    return bodyTooLargeResponse;
  }

  if (!isMultipart) {
    const invalidContentTypeResponse = requireJsonRequest(req, res);
    if (invalidContentTypeResponse) {
      return invalidContentTypeResponse;
    }
  }

  const limitResult = rateLimit(req, limiterConfigs.chat);
  applyRateLimitHeaders(res, limitResult);

  if (!limitResult.ok) {
    return res.status(429).json({
      error:
        "Too many chat requests. Please wait a few minutes before trying again.",
    });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: "Anthropic API key not configured.",
    });
  }

  try {
    let message = "";
    let attachment = null;

    if (isMultipart) {
      const parsed = await parseMultipartChatRequest(req);
      const payload = validateChatPayload({ message: parsed.fields.message });
      if (!payload.ok) {
        return res.status(payload.status).json({ error: payload.error });
      }

      if (!parsed.file) {
        return res.status(400).json({ error: "Please choose a supported file to upload." });
      }

      attachment = await buildClaudeFileAttachment(parsed.file);
      message = payload.value.message;
    } else {
      const json = await readJsonBody(req);
      if (!json.ok) {
        return res.status(json.status).json({ error: json.error });
      }
      const payload = validateChatPayload(json.body);
      if (!payload.ok) {
        return res.status(payload.status).json({ error: payload.error });
      }

      message = payload.value.message;
    }

    const userContent = [{ type: "text", text: message }];

    if (attachment?.kind === "image") {
      userContent.push({
        type: "text",
        text: `The user attached an image named "${attachment.filename}". Analyze it in context with the user's message.`,
      });
      userContent.push(attachment.content);
    } else if (attachment?.kind === "text") {
      userContent.push({
        type: "text",
        text:
          `The user attached a file named "${attachment.filename}". Analyze it alongside the user's message.\n\n` +
          `Attached file contents:\n---\n${attachment.text}\n---`,
      });
    }

    // Default: Haiku snapshot id (aliases can 400 on some accounts); override via ANTHROPIC_MODEL.
    const model =
      (process.env.ANTHROPIC_MODEL || "").trim() ||
      "claude-haiku-4-5-20251001";

    // Stateless: no server-side conversation store or session cookie (privacy / no transcript DB).
    const response = await client.messages.create({
      model,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }],
    });

    const reply =
      response.content.find((block) => block.type === "text")?.text?.trim() ||
      "I was unable to generate a reply. Please try again.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    const httpStatus = error?.status ?? error?.statusCode;
    const msg =
      typeof error?.message === "string"
        ? error.message
        : typeof error?.error?.message === "string"
          ? error.error.message
          : "";

    // Anthropic SDK sets `status` on APIError (400, 401, 404, 429, …)
    if (typeof httpStatus === "number") {
      if (httpStatus === 401 || httpStatus === 403) {
        return res.status(502).json({
          error:
            "Assistant could not authenticate with Anthropic. Check ANTHROPIC_API_KEY in Vercel (Production) and redeploy.",
        });
      }
      if (httpStatus === 429) {
        return res.status(502).json({
          error:
            "The assistant is rate-limited right now. Please wait a minute and try again.",
        });
      }
      const lower = msg.toLowerCase();
      if (
        lower.includes("credit balance") ||
        lower.includes("purchase credits") ||
        lower.includes("plans & billing")
      ) {
        return res.status(502).json({
          error:
            "Our AI assistant is temporarily unavailable. Please call (786) 223-7867 or use the contact options on this site — we’re happy to help directly.",
        });
      }
      if (httpStatus >= 400 && httpStatus < 500) {
        return res.status(502).json({
          error:
            msg.slice(0, 500) ||
            `Assistant request was rejected (HTTP ${httpStatus}). Check ANTHROPIC_MODEL or API access in the Anthropic console.`,
        });
      }
      if (httpStatus >= 500) {
        return res.status(502).json({
          error:
            "The assistant service had a temporary error. Please try again in a moment.",
        });
      }
    }

    return res.status(500).json({
      error:
        "Something went wrong. Please try again or call us at (786) 223-7867.",
    });
  }
}
