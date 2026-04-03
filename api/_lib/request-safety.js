const MAX_JSON_BODY_BYTES = 8 * 1024;
const MAX_CHAT_MESSAGE_LENGTH = 2000;
const MAX_SESSION_ID_LENGTH = 100;

function getHeaderValue(req, name) {
  const value = req.headers[name];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export function rejectIfBodyTooLarge(req, res, maxBytes = MAX_JSON_BODY_BYTES) {
  const contentLength = getHeaderValue(req, "content-length");
  if (!contentLength) {
    return null;
  }

  const parsed = Number.parseInt(contentLength, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return res.status(400).json({ error: "Malformed Content-Length header." });
  }

  if (parsed > maxBytes) {
    return res.status(413).json({ error: "Request payload is too large." });
  }

  return null;
}

export function requireJsonRequest(req, res) {
  const contentType = getHeaderValue(req, "content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return res.status(415).json({ error: "Content-Type must be application/json." });
  }

  return null;
}

export function validateChatPayload(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, status: 400, error: "Malformed JSON payload." };
  }

  const keys = Object.keys(body);
  const allowedKeys = new Set(["message", "sessionId"]);
  if (keys.some((key) => !allowedKeys.has(key))) {
    return { ok: false, status: 400, error: "Unexpected fields in request payload." };
  }

  if (typeof body.message !== "string") {
    return { ok: false, status: 400, error: "Message is required." };
  }

  const message = body.message.trim().replace(/\s+/g, " ");
  if (!message) {
    return { ok: false, status: 400, error: "Message is required." };
  }

  if (message.length > MAX_CHAT_MESSAGE_LENGTH) {
    return {
      ok: false,
      status: 413,
      error: `Message exceeds the ${MAX_CHAT_MESSAGE_LENGTH} character limit.`,
    };
  }

  let sessionId = "default-session";
  if (body.sessionId !== undefined) {
    if (typeof body.sessionId !== "string") {
      return { ok: false, status: 400, error: "Session ID must be a string." };
    }

    const trimmedSessionId = body.sessionId.trim();
    if (!trimmedSessionId) {
      return { ok: false, status: 400, error: "Session ID cannot be empty." };
    }

    if (trimmedSessionId.length > MAX_SESSION_ID_LENGTH) {
      return {
        ok: false,
        status: 413,
        error: `Session ID exceeds the ${MAX_SESSION_ID_LENGTH} character limit.`,
      };
    }

    if (!/^[A-Za-z0-9_-]+$/.test(trimmedSessionId)) {
      return { ok: false, status: 400, error: "Session ID format is invalid." };
    }

    sessionId = trimmedSessionId;
  }

  return {
    ok: true,
    value: {
      message,
      sessionId,
    },
  };
}

export function sanitizePlainText(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  const normalized = value.replace(/\u0000/g, "").trim();
  if (!normalized) {
    return "";
  }

  return normalized.slice(0, maxLength);
}

export function sanitizeHttpUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    return "";
  }

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "";
    }
    return parsed.toString();
  } catch {
    return "";
  }
}
