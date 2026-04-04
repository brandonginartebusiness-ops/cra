import { NextResponse } from 'next/server';

interface InstagramPost {
  id: string;
  imageUrl: string | null;
  caption: string;
  permalink: string;
  timestamp: string;
}

let cachedData: InstagramPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || accessToken === 'PLACEHOLDER_WILL_ADD_AFTER_META_SETUP') {
      return NextResponse.json({
        posts: getPlaceholderPosts(),
        isPlaceholder: true,
      });
    }

    if (cachedData && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json({ posts: cachedData, isPlaceholder: false });
    }

    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${accessToken}`
    );

    if (!response.ok) {
      console.error('Instagram API error:', response.status, await response.text());
      return NextResponse.json({
        posts: getPlaceholderPosts(),
        isPlaceholder: true,
      });
    }

    const data = await response.json();

    const posts: InstagramPost[] = data.data
      .filter((post: Record<string, string>) => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM')
      .slice(0, 9)
      .map((post: Record<string, string>) => ({
        id: post.id,
        imageUrl: post.media_url,
        caption: post.caption || '',
        permalink: post.permalink,
        timestamp: post.timestamp,
      }));

    cachedData = posts;
    cacheTimestamp = Date.now();

    return NextResponse.json({ posts, isPlaceholder: false });
  } catch (error) {
    console.error('Instagram fetch error:', error);
    return NextResponse.json({
      posts: getPlaceholderPosts(),
      isPlaceholder: true,
    });
  }
}

function getPlaceholderPosts(): InstagramPost[] {
  return Array.from({ length: 9 }, (_, i) => ({
    id: `placeholder-${i}`,
    imageUrl: null,
    caption: 'Follow @claimremedyadjusters for claim updates and results',
    permalink: 'https://instagram.com/claimremedyadjusters',
    timestamp: new Date().toISOString(),
  }));
}
