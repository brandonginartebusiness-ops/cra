import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

// Only active when ANALYZE=true (e.g. `ANALYZE=true npm run build`). It's a
// no-op wrapper otherwise, so production builds are unaffected.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Don't advertise the framework via the X-Powered-By response header.
  poweredByHeader: false,
  experimental: {
    // Inline the global Tailwind stylesheet into the initial HTML response
    // instead of a render-blocking <link>. The atomic CSS is small (~14KB)
    // and this site lives or dies on first-time mobile visitors, so the
    // first-load win matters more than repeat-visit stylesheet caching.
    inlineCss: true,
  },
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // Serve AVIF (smaller) with automatic WebP/original fallback for browsers
    // that don't support it. Applies to all optimized images, remote included.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/results",
        destination: "/reviews#case-results",
        permanent: true,
      },
    ];
  },
  // Baseline security headers — conservative, non-breaking defaults on every
  // route. (CSP and HSTS preload/includeSubDomains are intentionally omitted;
  // they need manual review/testing before going live.)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
