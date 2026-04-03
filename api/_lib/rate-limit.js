const store = new Map();

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return forwardedFor[0].split(",")[0].trim();
  }

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim()) {
    return realIp.trim();
  }

  return "unknown";
}

function pruneExpiredEntries(now) {
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function rateLimit(req, config) {
  const now = Date.now();
  pruneExpiredEntries(now);

  const ip = getClientIp(req);
  const key = `${config.key}:${ip}`;
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + config.windowMs;
    store.set(key, { count: 1, resetAt });

    return {
      ok: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetAt,
      retryAfterSeconds: 0,
      ip,
    };
  }

  if (existing.count >= config.limit) {
    return {
      ok: false,
      limit: config.limit,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      ip,
    };
  }

  existing.count += 1;

  return {
    ok: true,
    limit: config.limit,
    remaining: Math.max(0, config.limit - existing.count),
    resetAt: existing.resetAt,
    retryAfterSeconds: 0,
    ip,
  };
}

export function applyRateLimitHeaders(res, result) {
  res.setHeader("X-RateLimit-Limit", String(result.limit));
  res.setHeader("X-RateLimit-Remaining", String(result.remaining));
  res.setHeader("X-RateLimit-Reset", String(Math.ceil(result.resetAt / 1000)));

  if (!result.ok) {
    res.setHeader("Retry-After", String(result.retryAfterSeconds));
  }
}

export const limiterConfigs = {
  chat: {
    key: "chat",
    limit: 12,
    windowMs: 5 * 60 * 1000,
  },
  googleReviews: {
    key: "google-reviews",
    limit: 30,
    windowMs: 5 * 60 * 1000,
  },
  auth: {
    key: "auth",
    limit: 5,
    windowMs: 5 * 60 * 1000,
  },
};

// Future auth handlers should call:
// const result = rateLimit(req, limiterConfigs.auth);
// applyRateLimitHeaders(res, result);
