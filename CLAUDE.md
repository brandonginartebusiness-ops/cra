# CLAUDE.md — CRA site workflow

## Always do first

- Read **CONTEXT.md** for brand, design system, and current site state.
- Check **brand_assets/** for logos and reference images before using placeholders.

## Production deployment

- **Live site:** https://claimremedyadjusters.com
- **Repo:** `brandonginartebusiness-ops/cra` (GitHub) — `main` branch → auto-deploys via Vercel project `cra-opal`
- **Vercel root directory:** `cra-next` — Vercel builds from `cra-next/`, NOT the repo root
- To deploy: `git push origin main` from repo root. That's it.

## Source of truth

- **All production code lives in `cra-next/`** — this is a Next.js 16 app (App Router, TypeScript, Tailwind)
- **Do not edit files at the repo root** for the live site — they are not deployed
- Key paths inside `cra-next/`:
  - `src/app/` — pages (App Router)
  - `src/components/` — layout/, sections/, seo/, ui/, templates/
  - `src/app/globals.css` — global styles and design tokens
  - `public/` — static assets (brand_assets/, images/)

## Local dev server

- `cd cra-next && npm run dev` → `http://localhost:3000`
- Do not use the root `serve.mjs` — that served the old static site

## Screenshot workflow

- With the dev server running: from repo root run `node screenshot.mjs <url> [label]`
- Examples:
  - `node screenshot.mjs http://localhost:3000/`
  - `node screenshot.mjs http://localhost:3000/services service-page`
- Output: `./temporary screenshots/screenshot-N.png`

## Stack

- **Next.js 16** (App Router) — pages in `src/app/`
- **TypeScript** throughout
- **Tailwind CSS v4** via `@import "tailwindcss"` in globals.css
- **Framer Motion** for animations
- **Supabase** for lead storage
- **Anthropic API** for the AI chat widget (`/api/chat`)
- No GSAP, no vanilla JS, no jQuery

## Design system (globals.css `@theme`)

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

Use Tailwind utilities like `text-cra-blue`, `bg-cra-card` etc. Do not hardcode hex values.

## Craft guardrails

- **Motion:** Animate `transform` and `opacity` only. Never use `transition-all`.
- **Focus states:** Every interactive element needs `focus-visible:` styles.
- **Images:** Use `next/image` with explicit `width`/`height`. Do not use raw `<img>` tags.
- **No hardcoded hex:** Use design token classes. Ad-hoc `text-[#3b82f6]` is acceptable for one-offs only.
- Do not add sections, features, or content not requested.
- Do not "improve" a reference layout — match it.

## Hard rules

- **Edit `cra-next/` only** — repo root files are not deployed.
- Do not use `transition-all`.
- Do not hardcode brand colors outside the design token system.
- Do not add new pages/routes without explicit instruction.
