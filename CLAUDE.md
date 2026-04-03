# CLAUDE.md — CRA site frontend workflow

Stack and file layout are defined in **CONTEXT.md** and `.cursorrules`. This file adds process: local serving, screenshots, references, and craft guardrails **without** changing the vanilla HTML/CSS/JS stack.

## Always do first

- Read **CONTEXT.md** before changing UI or copy.
- Check **brand_assets/** for logos, guides, or reference images before using placeholders.

## Reference images

- If a reference is provided: match layout, spacing, typography, and color. Use placeholder copy only where needed; do not add sections or “improve” the design beyond the reference.
- If no reference: follow CONTEXT.md and the guardrails below.
- Compare visually: run the local server, capture screenshots, fix mismatches; repeat until aligned or the user stops you.

## Production deployment

- **Live site:** https://claimremedyadjusters.com
- **Repo:** `brandonginartebusiness-ops/cra` (GitHub) — `main` branch → auto-deploys via Vercel project `cra-opal`
- **Vercel root directory:** `.` (repo root) — do NOT set to `cra/`
- To deploy: `git push origin main` from repo root. That's it.

## Source of truth for the homepage

- **Production homepage = `/index.html` at repo root.** Edit files at the repo root level.
- **`cra/` is legacy / secondary** — `cra/index.html` just redirects to `/`. Do NOT treat `cra/` as the primary design target unless explicitly told to.
- Root styles: **`/css/style.css`** (or wherever the root index links). Root scripts: **`/js/main.js`** (or equivalent). Check the root index.html `<link>` and `<script>` tags to confirm paths.

## Single-page site (non-negotiable)

- The live marketing experience is **one page**: **root `index.html` only** (plus **`404.html`** for errors if present).
- **Do not** introduce or restore a **multipage** pattern: no sibling top-level pages such as `services.html`, `contact.html`, `faq.html`, `process.html`, `results.html`, `reviews.html`, no shared `pages.css` / `pages.js` for a page family, and no “site nav” that jumps between separate HTML documents.
- **Do not** default to “add an inner page” for new content — put it **on `index.html`** (a section, modal, anchor, or expand-in-place) unless the user **explicitly** asks for a separate HTML file.
- If the user later requests a new standalone HTML file by name, treat that as an **exception**; still do not recreate the old multipage set unless they say so.

## Local server (required for review)

- **Always use `http://localhost`** — do not rely on `file:///` for screenshots or layout checks.
- From the repo root: `node serve.mjs` (or `npm run serve`). Serves the project root; **main site:** `http://localhost:3000/`
- If a server is already running on port 3000, do not start a second instance.

## Screenshot workflow

- With the server running: `node screenshot.mjs <url> [label]`
- Examples:
  - `node screenshot.mjs http://localhost:3000/`
  - `node screenshot.mjs http://localhost:3000/#section-id anchor` (optional label)
- Output: `./temporary screenshots/screenshot-N.png` (incrementing `N`; optional `-label` before `.png`).
- Puppeteer downloads Chromium via the `puppeteer` package; cache location follows your OS (e.g. under your user profile on Windows).

## Output conventions (this repo)

- **Do not edit `cra/` files for the live site.** Production is the repo root.
- Use **CSS custom properties** from `:root` — see CONTEXT.md (no ad-hoc hex for brand colors).

## Anti-generic guardrails (adapted to CRA)

- **Colors:** Use the CONTEXT palette (`var(--cream)`, `var(--navy)`, `var(--gold)`, etc.). Do not introduce generic “template” blues as primary brand colors.
- **Shadows:** Prefer layered, subtle shadows; avoid flat, default-looking single drops.
- **Typography:** Keep the existing pairing — serif headings (`var(--serif)`), sans body (`var(--sans)`). Tight tracking on large headings; comfortable line-height on body where appropriate.
- **Motion:** Prefer animating **`transform`** and **`opacity`** only. Avoid **`transition-all`**.
- **Interactive states:** Clickable controls need **hover**, **focus-visible**, and **active** states.
- **Spacing:** Use intentional, consistent spacing — follow existing section/card patterns.
- **Depth:** Preserve clear hierarchy (base content vs elevated cards vs overlays), consistent with the current design system.

## Hard rules

- **No multipage marketing setup** — see **Single-page site** above. Never recreate deleted sibling pages or a cross-page nav as the default architecture.
- Do not add sections, features, or content not requested or not in a supplied reference.
- Do not “improve” a reference layout — match it.
- Do not use **`transition-all`**.
- Do not replace CONTEXT/`:root` brand colors with arbitrary palette defaults.
