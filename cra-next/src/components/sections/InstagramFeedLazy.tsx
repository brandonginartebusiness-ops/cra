"use client";

import dynamic from "next/dynamic";

// Client-only lazy boundary for the Instagram feed. It lives at the very bottom
// of the homepage, fetches from /api/instagram on mount, and has no SEO value —
// so we keep it out of the server payload (ssr: false) and out of the initial
// JS until the browser is idle. A min-height placeholder reserves space so
// deferring it introduces no layout shift (CLS stays ~0).
const InstagramFeed = dynamic(() => import("./InstagramFeed"), {
  ssr: false,
  loading: () => <div className="min-h-[600px]" aria-hidden="true" />,
});

export default function InstagramFeedLazy() {
  return <InstagramFeed />;
}
