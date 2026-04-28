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

const PLACEHOLDER_TOKEN = "PLACEHOLDER_WILL_ADD_AFTER_META_SETUP";

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || accessToken === PLACEHOLDER_TOKEN || !userId) {
      return NextResponse.json({
        posts: getPlaceholderPosts(),
        isPlaceholder: true,
      });
    }

    if (cachedData && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json({ posts: cachedData, isPlaceholder: false });
    }

    const fields =
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=12&access_token=${accessToken}`;

    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      const body = await response.text();
      console.error(
        "Instagram Graph API error:",
        response.status,
        response.statusText,
        body.slice(0, 500)
      );
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

    return NextResponse.json({ posts, isPlaceholder: false });
  } catch (error) {
    console.error("Instagram fetch error:", error);
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
