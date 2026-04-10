---
title: "Recommended Tech Stack"
type: concept
tags: [website, tech-stack, wordpress, nextjs, hosting, analytics]
created: 2026-04-06
updated: 2026-04-06
sources: [CRA Market Intelligence Report]
---

# Recommended Tech Stack

> Note: CRA currently runs **Next.js**. The recommended stack below applies if/when migrating to WordPress. Next.js remains a good choice — these are alternatives if a non-developer needs to manage content.

## CMS

| Option | Notes |
|--------|-------|
| **WordPress (self-hosted)** | Powers 60% of CMS websites, best plugin ecosystem, easiest for non-developers |
| **Next.js (current)** | Excellent performance, developer-required for content updates |

## WordPress plugin stack (if applicable)

| Function | Tool |
|----------|------|
| Theme | Astra Pro or GeneratePress (lightweight, fast) |
| Page builder | Elementor Pro |
| SEO | **Rank Math Pro** |
| Forms | WPForms or Gravity Forms (multi-step capable) |
| Caching | WP Rocket |
| CDN | **Cloudflare** (free tier) |
| Security | Wordfence |
| Multilingual | WPML or TranslatePress |
| Reviews widget | WP Business Reviews |

## Analytics and tracking

| Tool | Purpose |
|------|---------|
| **GA4** via Google Tag Manager | Website analytics |
| **Google Search Console** | SEO keyword and click data |
| **CallRail** or CallTrackingMetrics | Call source attribution (which campaign drove the call) |
| **Microsoft Clarity** (free) | Heatmaps and session recordings — unlimited, free |

## Hosting

| Host | Notes |
|------|-------|
| WP Engine | Premium managed WordPress |
| Kinsta | Fast, developer-friendly |
| SiteGround | Good value, solid performance |
| Vercel (current) | Best for Next.js — keep if staying on Next.js |

## Related notes

- [[08-Website-Tech/core-web-vitals|Core Web Vitals — performance considerations]]
- [[08-Website-Tech/bilingual-site|Bilingual Site — multilingual plugins]]
- [[08-Website-Tech/ada-accessibility|ADA Accessibility — applies regardless of stack]]
- [[04-SEO-Strategy/schema-markup|Schema Markup — implementation in Next.js]]
- [[00-Index/MOC|← Back to MOC]]
