import { NextResponse } from "next/server";

/**
 * Helper endpoint to refresh a long-lived Instagram access token.
 *
 * Instagram long-lived tokens last 60 days. Hitting this endpoint within that
 * window returns a new token that lasts another 60 days. Copy the returned
 * value into the INSTAGRAM_ACCESS_TOKEN env var in Vercel and redeploy.
 *
 * Usage: GET /api/instagram/refresh?key=<INSTAGRAM_REFRESH_KEY>
 *
 * Set INSTAGRAM_REFRESH_KEY in Vercel to any random string — required to call
 * this endpoint so it isn't a public token leak.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const providedKey = url.searchParams.get("key");
  const expectedKey = process.env.INSTAGRAM_REFRESH_KEY;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!expectedKey || !providedKey || providedKey !== expectedKey) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!accessToken || accessToken === "PLACEHOLDER_WILL_ADD_AFTER_META_SETUP") {
    return NextResponse.json(
      { error: "INSTAGRAM_ACCESS_TOKEN not configured" },
      { status: 500 }
    );
  }

  try {
    const refreshUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`;
    const response = await fetch(refreshUrl);

    if (!response.ok) {
      const body = await response.text();
      console.error("IG token refresh failed:", response.status, body);
      return NextResponse.json(
        { error: "refresh failed", status: response.status, body },
        { status: 502 }
      );
    }

    const data: { access_token: string; token_type: string; expires_in: number } =
      await response.json();

    const expiresInDays = Math.floor(data.expires_in / 86400);

    return NextResponse.json({
      success: true,
      newAccessToken: data.access_token,
      tokenType: data.token_type,
      expiresInDays,
      action:
        "Copy newAccessToken into the INSTAGRAM_ACCESS_TOKEN env var in Vercel and redeploy.",
    });
  } catch (error) {
    console.error("IG token refresh error:", error);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
