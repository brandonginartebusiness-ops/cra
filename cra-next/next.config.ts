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
    // With two root layouts (the English `(site)` and Spanish `(es)` groups)
    // there is no single layout to compose a global 404 from, so render it via
    // app/global-not-found.tsx, which owns its own <html>/<body>.
    globalNotFound: true,
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
      // Canonical host: send www.* to the bare apex so the site is only served
      // from one origin (avoids duplicate-host indexing; www currently serves a
      // 200). Host-conditioned so it only fires for the www hostname.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.claimremedyadjusters.com" }],
        destination: "https://claimremedyadjusters.com/:path*",
        permanent: true,
      },
    ];
  },
  // Baseline security headers — conservative, non-breaking defaults on every
  // route. CSP is now ENFORCING (below). It was shipped Report-Only first and
  // tuned against live-site violation reports (a Playwright sweep of /, /contact,
  // /es, /services/storm-hurricane, /areas/miami on 2026-07-03 surfaced only the
  // GA4 www.google.com/g/collect beacon, since whitelisted). report-uri/report-to
  // are kept so violations keep being reported after enforcement.
  // HSTS preload/includeSubDomains stay omitted pending review.
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
          // Routes violation reports to the Reporting API endpoint below.
          { key: "Reporting-Endpoints", value: 'csp-endpoint="/api/csp-report"' },
          {
            key: "Content-Security-Policy",
            value: CSP,
          },
        ],
      },
    ];
  },
};

// Enforcing Content Security Policy. Encodes the third-party origins the site
// actually uses (analytics, ads, pixels, Instagram media, Vercel telemetry).
// This is now served as an enforcing `Content-Security-Policy` (was Report-Only);
// resources outside these directives are BLOCKED. Add an origin here before it
// can be used on the site, and watch /api/csp-report for any new violations.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  // 'unsafe-inline' covers the inline analytics/pixel bootstraps and Next's
  // inline runtime; 'unsafe-eval' covers libraries that compile at runtime.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://analytics.tiktok.com https://www.clarity.ms https://cdn.callrail.com https://va.vercel-scripts.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.facebook.com https://*.cdninstagram.com https://*.fbcdn.net https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://analytics.tiktok.com https://googleads.g.doubleclick.net https://www.google.com",
  "font-src 'self' data:",
  // The fh-*.ecs.us-west-2.on.aws origin is the Meta Conversions API Gateway
  // endpoint from pixel 939105465792094's config — fbevents.js dual-sends events
  // there. The hash-named host is deployment-specific, so if Meta redeploys the
  // gateway the host changes and will reappear as a connect-src violation in
  // /api/csp-report logs. Exact host only — *.on.aws would be far too broad.
  // https://www.google.com is GA4's regional collect endpoint (/g/collect) that
  // fbevents/gtag beacons user_engagement events to — confirmed as the only
  // connect-src violation in the 2026-07-03 live Playwright sweep. Not covered by
  // *.google-analytics.com, so it's listed explicitly.
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.google.com https://connect.facebook.net https://www.facebook.com https://analytics.tiktok.com https://*.clarity.ms https://api.callrail.com https://cdn.callrail.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://fh-118116076e9a4c2a96a99fbb70bea2a0.ecs.us-west-2.on.aws",
  "frame-src 'self' https://www.facebook.com https://td.doubleclick.net",
  "worker-src 'self' blob:",
  "report-uri /api/csp-report",
  "report-to csp-endpoint",
].join("; ");

export default withBundleAnalyzer(nextConfig);
