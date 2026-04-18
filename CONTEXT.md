# CONTEXT.md — Claim Remedy Adjusters Website

## Brand

- **Client:** Claim Remedy Adjusters — licensed Florida public adjuster firm
- **Location:** 7900 Oak Ln #400, Miami Lakes, FL 33016
- **Phone:** (786) 223-7867
- **Instagram:** @claimremedyadjusters
- **Live URL:** https://claimremedyadjusters.com
- **Audience:** Florida homeowners dealing with property damage claims (hurricane, water, fire, roof, mold, flood). Stressed, often confused by insurance, looking for someone trustworthy.
- **Tone:** Warm and approachable — "we're here to help." Confident but never aggressive. Think helpful neighbor who happens to be an expert.

## Stack (current — Next.js 16)

- **Framework:** Next.js 16, App Router, TypeScript
- **Styling:** Tailwind CSS v4 via `@import "tailwindcss"` in `globals.css`
- **Animations:** Framer Motion — animate `transform` and `opacity` only, never `transition-all`
- **Database:** Supabase (lead storage)
- **AI:** Anthropic API via `/api/chat` route (chat widget)
- **Hosting:** Vercel project `cra-opal`, root dir = `cra-next/`, auto-deploys from `main` branch
- **No GSAP, no vanilla JS, no jQuery, no CDN scripts**

## Design System (globals.css `@theme`)

| Token | Value | Usage |
|---|---|---|
| `--color-cra-bg` | `#0a0a0f` | Page background |
| `--color-cra-bg-secondary` | `#111118` | Section alternate bg |
| `--color-cra-card` | `#16161f` | Card background |
| `--color-cra-text` | `#f0f0f5` | Primary text |
| `--color-cra-muted` | `#9999aa` | Secondary text |
| `--color-cra-blue` | `#3b82f6` | CTAs, links, accents |
| `--color-cra-teal` | `#0d9488` | Secondary accent |
| `--color-cra-gold` | `#d4a853` | Review stars, highlights |
| `--font-bebas` | Bebas Neue | Display/headings |
| `--font-body` | DM Sans | Body text |
| `--font-serif` | DM Serif Display | Section labels |

Use Tailwind utilities like `text-cra-blue`, `bg-cra-card`. Never hardcode hex values.

## File Structure

```
F:\cra website\               ← Repo root
├── cra-next/                 ← ALL production code lives here
│   ├── src/app/              ← Next.js App Router pages
│   │   ├── page.tsx          ← Homepage
│   │   ├── globals.css       ← Design tokens + global styles
│   │   ├── layout.tsx        ← Root layout
│   │   └── api/              ← Serverless routes (chat, google-reviews)
│   ├── src/components/
│   │   ├── layout/           ← Header, Footer, etc.
│   │   ├── sections/         ← Page sections (Hero, Services, Testimonials…)
│   │   ├── seo/              ← SEO/meta components
│   │   ├── ui/               ← Primitive UI components
│   │   └── templates/        ← Page-level templates
│   └── public/               ← Static assets
│       ├── brand_assets/     ← Logos, brand images
│       └── images/
├── brand_assets/             ← Source brand assets (reference)
├── CLAUDE.md                 ← Workflow rules (source of truth)
├── CONTEXT.md                ← This file — brand + design system
├── AGENTS.md                 ← Which agents to use for which tasks
├── SKILLS.md                 ← Which skills to invoke for which tasks
└── screenshot.mjs            ← Screenshot helper (run from repo root)
```

**Do not edit files outside `cra-next/` for live site changes.**

## Components Built

- `Header` — sticky, mobile hamburger nav
- `Hero` — Framer Motion reveal, scroll hint
- `ServicesGrid` — service cards
- `TrustStats` — animated count-up stats bar
- `Testimonials` — carousel with Google Reviews API + JSON fallback
- `InstagramGrid` — 6-tile grid linking to @claimremedyadjusters
- `ContactForm` — lead capture → Supabase
- `ChatWidget` — AI chat via Anthropic API
- `Footer` — address, phone, social links
- `MobileCTA` — sticky bottom bar (Call Now / Free Review)

## Current Priorities

### Priority 1: Real Assets
- Swap placeholder hero image for real client photo
- Connect Google Reviews API or add real testimonial quotes
- Swap IG grid placeholders with real post images
- Add client logo to header (current: text only)

### Priority 2: Visual Polish
- Continue Awwwards-level elevation: bold type, layered depth, generous whitespace
- Expand editorial split layout pattern to more sections
- Fine-tune motion timing across sections

### Priority 3: SEO & Schema
- Tune meta / structured data
- Add branded OG image
- Strengthen location-targeted copy (Miami, Broward, Palm Beach keywords)

## Design Direction

Awwwards-inspired: bold typography, layered depth, generous whitespace, confident color use.
Translated into warmth for worried homeowners — not cold/corporate, not techy.
"This company is legit AND they actually care about me."
