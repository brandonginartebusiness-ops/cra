# CLAUDE.md — CRA site frontend workflow

Stack and file layout are defined in **CONTEXT.md** and `.cursorrules`. This file adds process: local serving, screenshots, references, and craft guardrails **without** changing the vanilla HTML/CSS/JS stack.

## Always do first

- Read **CONTEXT.md** before changing UI or copy.
- Check **brand_assets/** for logos, guides, or reference images before using placeholders.

## Reference images

- If a reference is provided: match layout, spacing, typography, and color. Use placeholder copy only where needed; do not add sections or “improve” the design beyond the reference.
- If no reference: follow CONTEXT.md and the guardrails below.
- Compare visually: run the local server, capture screenshots, fix mismatches; repeat until aligned or the user stops you.

## Local server (required for review)

- **Always use `http://localhost`** — do not rely on `file:///` for screenshots or layout checks.
- From the repo root: `node serve.mjs` (or `npm run serve`). Serves the project root; **main site:** `http://localhost:3000/cra/`
- If a server is already running on port 3000, do not start a second instance.

## Screenshot workflow

- With the server running: `node screenshot.mjs <url> [label]`
- Examples:
  - `node screenshot.mjs http://localhost:3000/cra/`
  - `node screenshot.mjs http://localhost:3000/cra/pages/about.html about`
- Output: `./temporary screenshots/screenshot-N.png` (incrementing `N`; optional `-label` before `.png`).
- Puppeteer downloads Chromium via the `puppeteer` package; cache location follows your OS (e.g. under your user profile on Windows).

## Output conventions (this repo)

- Primary site lives under **`cra/`** — not a single root `index.html`.
- Styles: **`cra/css/style.css`** only. Scripts: **`cra/js/main.js`** only.
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

- Do not add sections, features, or content not requested or not in a supplied reference.
- Do not “improve” a reference layout — match it.
- Do not use **`transition-all`**.
- Do not replace CONTEXT/`:root` brand colors with arbitrary palette defaults.
