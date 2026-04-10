---
title: "Core Web Vitals"
type: concept
tags: [website, performance, seo, core-web-vitals, speed]
created: 2026-04-06
updated: 2026-04-06
sources: [CRA Market Intelligence Report]
---

# Core Web Vitals

Sources: [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) · [CoreWebVitals.io](https://www.corewebvitals.io/core-web-vitals)

## Current thresholds (Google, 2026)

| Metric | Good | Needs Improvement | Poor |
|--------|------|------------------|------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5–4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | ≤ 200ms | 200–500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1–0.25 | > 0.25 |

> INP replaced FID (First Input Delay) in March 2024.

Google's March 2026 core update strengthened Core Web Vitals' role in rankings.

Only **48% of mobile pages** pass all three metrics — achieving this is a competitive SEO advantage.

## Optimization checklist

### Images
- [ ] Convert all images to **WebP** or **AVIF** format
- [ ] Set explicit `width` and `height` on `<img>` tags (prevents CLS)
- [ ] Lazy load all below-fold images
- [ ] Preload LCP image

### Hosting & delivery
- [ ] Implement **Cloudflare CDN** (free tier available)
- [ ] Enable **Gzip or Brotli** compression
- [ ] Target **TTFB under 200ms** — use quality managed hosting
- [ ] Recommended hosts: WP Engine, Kinsta, or SiteGround (if migrating from Next.js)

### Fonts
- [ ] Self-host fonts (don't load from Google Fonts CDN)
- [ ] Use `font-display: swap`

### JavaScript
- [ ] Minimize third-party scripts (each adds INP risk)
- [ ] Defer non-critical JavaScript
- [ ] Audit analytics, chat widgets, and ad scripts

## CRA-specific note

CRA's site is built on **Next.js** — which has good built-in performance defaults (Image component, automatic code splitting). The main risks are:
- Heavy images not using `next/image`
- Too many third-party scripts (analytics, chat, maps)
- No CDN configured

## Related notes

- [[08-Website-Tech/tech-stack|Tech Stack]]
- [[04-SEO-Strategy/schema-markup|Schema Markup — technical SEO layer]]
- [[00-Index/MOC|← Back to MOC]]
