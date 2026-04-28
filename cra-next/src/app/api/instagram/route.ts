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

    const probeUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${configuredId}?fields=username,instagram_business_account&access_token=${accessToken}`;
    const probeResp = await fetch(probeUrl, {
      next: { revalidate: 86400 },
    });

    if (!probeResp.ok) {
      const body = await probeResp.text();
      console.error(
        "FB Graph probe error:",
        probeResp.status,
        body.slice(0, 500)
      );
      if (debugMode) {
        return NextResponse.json({
          branch: "probe-failed",
          step: "probing configured INSTAGRAM_USER_ID against FB Graph",
          accessTokenFirst6: accessToken.slice(0, 6),
          accessTokenLength: accessToken.length,
          configuredIdLength: configuredId.length,
          status: probeResp.status,
          statusText: probeResp.statusText,
          bodySnippet: body.slice(0, 500),
        });
      }
      return NextResponse.json({
        posts: cachedData ?? getPlaceholderPosts(),
        isPlaceholder: !cachedData,
      });
    }

    const probeData: {
      username?: string;
      instagram_business_account?: { id: string };
      id?: string;
    } = await probeResp.json();

    let igBusinessId: string | null = null;
    let resolvedFrom: "configured-id-is-ig-business-account" | "page-link" | null =
      null;

    if (probeData.username) {
      igBusinessId = configuredId;
      resolvedFrom = "configured-id-is-ig-business-account";
    } else if (probeData.instagram_business_account?.id) {
      igBusinessId = probeData.instagram_business_account.id;
      resolvedFrom = "page-link";
    }

    if (!igBusinessId) {
      if (debugMode) {
        return NextResponse.json({
          branch: "no-ig-business-account",
          step: "configured ID is neither an IG Business Account nor a Page with one linked",
          probeData,
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
