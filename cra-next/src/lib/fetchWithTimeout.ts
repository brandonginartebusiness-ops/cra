/**
 * fetch() with a hard timeout via AbortController. Serverless functions are
 * billed/capped by wall-clock execution time, so an unbounded await on a slow
 * third-party API (Resend, Twilio, Meta) can eat the whole function duration.
 * Aborting surfaces as a normal rejected promise — existing callers' try/catch
 * already handle network failures the same way, so no call-site error
 * handling changes are needed.
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 10_000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}
