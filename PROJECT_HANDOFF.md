# PROJECT_HANDOFF.md — Claim Remedy Adjusters (CRA) site

Single-file context for **Claude Project** sessions (or any assistant). **Authoritative sources in-repo:** read **`CLAUDE.md`** first for workflow and production truth, then **`CONTEXT.md`** for brand, palette, and tone. If anything here conflicts with **`CLAUDE.md`**, trust **`CLAUDE.md`**.

---

## Claude’s job

You are the implementation partner for **Claim Remedy Adjusters**’ marketing site: **vanilla HTML / CSS / JavaScript** at the **repository root**, deployed to **Vercel** from **`main`**. You align with **`CONTEXT.md`** (brand, tone, palette) and **`CLAUDE.md`** (local review, deploy, homepage source of truth). You do **not** add frameworks (no React, no Tailwind) unless the user explicitly asks. You do **not** add sections or features not requested or not in a supplied reference. You do **not** use **`transition-all`**. You use **CSS custom properties** from **`:root`** on the live page—no generic template blues as primary brand colors.

---

## Deploy & repo

| Item | Value |
|------|--------|
| **Live site** | https://claimremedyadjusters.com |
| **GitHub** | `brandonginartebusiness-ops/cra` |
| **Production branch** | `main` |
| **Vercel project** | `cra-opal` (confirm in Vercel dashboard if renamed) |
| **Vercel Root Directory** | **`.`** (repo root) — **not** `cra/` |
| **Deploy** | Push to `main` (e.g. `git push origin main` from repo root). Vercel builds automatically. |

**Homepage source of truth:** **`index.html` at the repo root** (`/`). The **`cra/`** tree is **legacy / secondary**; `cra/index.html` redirects to `/`. For production edits, work at **repo root** unless the user explicitly targets `cra/`.

---

## Local workflow

- **Install (once):** `npm install` (runs `postinstall` → copies `api/` → `cra/api/` for environments that need it; see `scripts/copy-api-to-cra.mjs`).
- **Serve:** `npm run serve` or `node serve.mjs`  
  - Main site: **http://localhost:3000/**  
  - Local API parity: **GET** `/api/health`, **GET** `/api/google-reviews`, **POST** `/api/chat`
- **Screenshots (optional QA):** with the server running, `node screenshot.mjs http://localhost:3000/` (optional label). Output: `./temporary screenshots/`.
- Do **not** rely on `file:///` for layout review; use **localhost**.

---

## Environment variables (Vercel)

Set in **Vercel → Project → Settings → Environment Variables** (typically **Production**; add **Preview** if you test preview URLs). **Never commit values** to git.

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Server-side AI chat (`/api/chat`) |
| `ANTHROPIC_MODEL` | Optional. If unset, the app uses its **default** pinned model in `api/chat.js`. |
| `GOOGLE_PLACES_API_KEY` | Google Places API (New) for reviews |
| `GOOGLE_PLACE_ID` | Google **Place ID** for the business (e.g. `ChIJ...`). Name must be **exactly** `GOOGLE_PLACE_ID` (Linux/Vercel env names are case-sensitive). |
| `CALENDLY_WEBHOOK_TOKEN` | Verifies Calendly webhook requests (`/api/booking-webhook`) |
| `CALENDLY_SIGNING_KEY` | Calendly HMAC signing key for payload verification |
| `TWILIO_ACCOUNT_SID` | Twilio account for WhatsApp alerts from booking webhook |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_WHATSAPP_FROM` | Twilio WhatsApp sender (e.g. `whatsapp:+1...`) |
| `INTERNAL_ALERT_WHATSAPP_TO` | Internal recipient number for booking notifications |

**Note:** If Anthropic returns errors about **credit balance**, that is **billing** on the Anthropic account—not a code fix.

---

## Files to upload (minimum) for a Claude Project

Upload or sync these from the repo so sessions have full technical context:

1. **`CLAUDE.md`** — workflow, deploy, homepage truth, guardrails.  
2. **`CONTEXT.md`** — brand, palette, typography, tone (note: its older file-tree section describes `cra/` heavily; **`CLAUDE.md` overrides** for what is production).  
3. **`PROJECT_HANDOFF.md`** (this file) — condensed handoff.  
4. **Root `index.html`** — live homepage (large; link to GitHub raw if needed).  
5. **`vercel.json`** — headers, function config.  
6. **`package.json`** — scripts and dependencies.  
7. **`api/`** tree — `chat.js`, `google-reviews.js`, `health.js`, `booking-webhook.js`, `api/_lib/*`.  
8. **`.vercelignore`** — what is excluded from deployments.  
9. **`brand_assets/`** — logos and reference art when present.

---

## Behavior checklist (“act like this assistant”)

1. Read **`CONTEXT.md`** and **`CLAUDE.md`** before changing UI or copy.  
2. Treat **root `index.html`** as the production homepage; avoid editing **`cra/`** for the live site unless explicitly requested.  
3. Use **`var(--navy)`**, **`var(--gold)`**, **`var(--cream)`**, **`var(--blue)`**, etc.—no ad-hoc generic blues as the brand.  
4. Animate **`transform`** and **`opacity`** only; **never `transition-all`**.  
5. Interactive controls: **hover**, **focus-visible**, and **active** states.  
6. Respect **`prefers-reduced-motion`** where the page already does (e.g. `.reveal` / GSAP fallbacks).  
7. Do not add sections, features, or copy not requested and not in a reference.  
8. Do not “improve” a reference layout—**match** it.  
9. After changes, verify on **http://localhost:3000/** and the live URL when deployed.  
10. **Never** paste or commit API keys; keep secrets in Vercel only.

---

## One-liner (paste into a new chat)

**Repo:** `brandonginartebusiness-ops/cra`, branch **`main`**, Vercel root **`.`**, live **https://claimremedyadjusters.com**. Production homepage = **root `index.html`**. Follow **`CLAUDE.md`** and **`CONTEXT.md`**; use `:root` CSS variables, vanilla stack only, no `transition-all`.
