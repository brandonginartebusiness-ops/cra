import { NextResponse } from "next/server";

interface InstagramPost {
  id: string;
  imageUrl: string | null;
  caption: string;
  permalink: string;
  timestamp: string;
}

interface MediaItem {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

let cachedData: InstagramPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

let cachedIgBusinessId: string | null = null;

const PLACEHOLDER_TOKEN = "PLACEHOLDER_WILL_ADD_AFTER_META_SETUP";
const GRAPH_API_VERSION = "v22.0";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const debugKey = url.searchParams.get("debug");
  const refreshKey = process.env.INSTAGRAM_REFRESH_KEY;
  const debugMode = Boolean(debugKey && refreshKey && debugKey === refreshKey);

  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const configuredId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || accessToken === PLACEHOLDER_TOKEN || !configuredId) {
      if (debugMode) {
        return NextResponse.json({
          branch: "env-check-failed",
          hasAccessToken: Boolean(accessToken),
          accessTokenLength: accessToken?.length ?? 0,
          accessTokenIsPlaceholder: accessToken === PLACEHOLDER_TOKEN,
          hasUserId: Boolean(configuredId),
          userIdLength: configuredId?.length ?? 0,
          hasRefreshKey: Boolean(refreshKey),
        });
      }
      return NextResponse.json({
        posts: getPlaceholderPosts(),
        isPlaceholder: true,
      });
    }

    if (
      cachedData &&
      Date.now() - cacheTimestamp < CACHE_DURATION &&
      !debugMode
    ) {
      return NextResponse.json({ posts: cachedData, isPlaceholder: false });
    }

    let igBusinessId: string | null = null;
    let resolvedFrom: "configured-id-is-ig-business-account" | "page-link" | null =
      null;
    const probeTrace: Array<{
      step: string;
      status: number;
      bodySnippet: string;
    }> = [];

    // Probe 1: is configuredId an IG Business Account? (has `username` field)
    const probe1Url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${configuredId}?fields=username&access_token=${accessToken}`;
    const probe1 = await fetch(probe1Url, { next: { revalidate: 86400 } });
    if (probe1.ok) {
      const data: { username?: string } = await probe1.json();
      if (data.username) {
        igBusinessId = configuredId;
        resolvedFrom = "configured-id-is-ig-business-account";
        probeTrace.push({
          step: `probe1: ${configuredId} has username "${data.username}" → IGBA`,
          status: 200,
          bodySnippet: JSON.stringify(data),
        });
      }
    } else {
      const body = await probe1.text();
      probeTrace.push({
        step: `probe1: ${configuredId}?fields=username failed`,
        status: probe1.status,
        bodySnippet: body.slice(0, 300),
      });
    }

    // Probe 2: if not an IGBA, is it a Page with a linked IG account?
    if (!igBusinessId) {
      const probe2Url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${configuredId}?fields=instagram_business_account&access_token=${accessToken}`;
      const probe2 = await fetch(probe2Url, { next: { revalidate: 86400 } });
      if (probe2.ok) {
        const data: { instagram_business_account?: { id: string } } =
          await probe2.json();
        if (data.instagram_business_account?.id) {
          igBusinessId = data.instagram_business_account.id;
          resolvedFrom = "page-link";
          probeTrace.push({
            step: `probe2: page links to IGBA ${data.instagram_business_account.id}`,
            status: 200,
            bodySnippet: JSON.stringify(data),
          });
        } else {
          probeTrace.push({
            step: "probe2: page has no instagram_business_account linked",
            status: 200,
            bodySnippet: JSON.stringify(data),
          });
        }
      } else {
        const body = await probe2.text();
        probeTrace.push({
          step: `probe2: ${configuredId}?fields=instagram_business_account failed`,
          status: probe2.status,
          bodySnippet: body.slice(0, 300),
        });
      }
    }

    if (!igBusinessId) {
      if (debugMode) {
        return NextResponse.json({
          branch: "id-resolution-failed",
          step: "configured ID is neither an IG Business Account nor a Page with one linked",
          accessTokenFirst6: accessToken.slice(0, 6),
          configuredIdLength: configuredId.length,
          probeTrace,
        });
      }
      return NextResponse.json({
        posts: cachedData ?? getPlaceholderPosts(),
        isPlaceholder: !cachedData,
      });
    }

    cachedIgBusinessId = igBusinessId;

    const fields =
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const mediaUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${igBusinessId}/media?fields=${fields}&limit=12&access_token=${accessToken}`;

    const response = await fetch(mediaUrl, { next: { revalidate: 3600 } });

    if (!response.ok) {
      const body = await response.text();
      console.error(
        "Instagram Graph API error:",
        response.status,
        response.statusText,
        body.slice(0, 500)
      );
      if (debugMode) {
        return NextResponse.json({
          branch: "media-fetch-error",
          igBusinessId,
          resolvedFrom,
          probeTrace,
          status: response.status,
          statusText: response.statusText,
          bodySnippet: body.slice(0, 500),
        });
      }
      return NextResponse.json({
        posts: cachedData ?? getPlaceholderPosts(),
        isPlaceholder: !cachedData,
      });
    }

    const data: { data: MediaItem[] } = await response.json();

    const posts: InstagramPost[] = data.data
      .filter(
        (post) =>
          post.media_type === "IMAGE" ||
          post.media_type === "CAROUSEL_ALBUM" ||
          post.media_type === "VIDEO"
      )
      .slice(0, 9)
      .map((post) => ({
        id: post.id,
        imageUrl:
          post.media_type === "VIDEO"
            ? post.thumbnail_url ?? null
            : post.media_url,
        caption: post.caption ?? "",
        permalink: post.permalink,
        timestamp: post.timestamp,
      }))
      .filter((post) => post.imageUrl !== null);

    cachedData = posts;
    cacheTimestamp = Date.now();

    if (debugMode) {
      return NextResponse.json({
        branch: "success",
        igBusinessId,
        resolvedFrom,
        probeTrace,
        rawCount: data.data.length,
        keptCount: posts.length,
        firstMediaTypes: data.data.slice(0, 3).map((p) => p.media_type),
      });
    }

    return NextResponse.json({ posts, isPlaceholder: false });
  } catch (error) {
    console.error("Instagram fetch error:", error);
    if (debugMode) {
      return NextResponse.json({
        branch: "exception",
        cachedIgBusinessId,
        message: error instanceof Error ? error.message : String(error),
      });
    }
    return NextResponse.json({
      posts: cachedData ?? getPlaceholderPosts(),
      isPlaceholder: !cachedData,
    });
  }
}

function getPlaceholderPosts(): InstagramPost[] {
  return Array.from({ length: 9 }, (_, i) => ({
    id: `placeholder-${i}`,
    imageUrl: null,
    caption: "Follow @claimremedyadjusters for claim updates and results",
    permalink: "https://instagram.com/claimremedyadjusters",
    timestamp: new Date().toISOString(),
  }));
}
