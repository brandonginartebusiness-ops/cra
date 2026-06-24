# Website Improvement Log

Autonomous growth/engineering cycles for claimremedyadjusters.com. Each entry: focus area researched, findings, what shipped (if anything), and ideas queued for next time.

---

## 2026-06-24 06:07 UTC — Cycle 1

**Focus area:** #1 Conversion-rate optimization (CTA wording/placement, form friction, urgency/trust signals, above-the-fold clarity)

**Context:** This is the first logged cycle. Prior commit history (`a58e687`…`b85bd5d`) shows real work already shipped on mobile performance (LCP/CLS, critical CSS, deferred Framer Motion), mobile bounce (sticky CTA bar), SEO (schema, meta titles), and Spanish localization — none of it logged here since this file didn't exist yet. Treating that history as already covered for the CWV/mobile/SEO/i18n focus areas.

**Key findings:**
- The lead form (`LeadCaptureForm.tsx`) already follows current best practice: two-step progressive profiling, only phone required on step 1, honeypot fields, inline trust line, and a specific (not generic "Submit") CTA label — no changes needed here.
- Hero copy (`Hero.tsx`) already uses a specific, proof-driven hook ("You were offered $18K. We got our last client $147K.") plus a licensing badge and "we represent policyholders, never insurers" trust line — strong, no changes needed.
- Research (Heyflow, Leadfeeder, ConvertCart, Unbounce 2026 guides) confirms: specific CTA copy beats vague CTAs, sticky/scroll CTAs outperform above-the-fold-only on long pages, and trust signals (reviews, proof, transparent process) should appear close to repeated CTA placements rather than only at the top and bottom of a page.
- Mapped every homepage section for existing CTAs: `Process.tsx` and `FAQ.tsx` already have a "Get Your Free Claim Review" button + secondary link. `Proof.tsx` (unused on homepage) also has one.
- Gap found: `Services` → `RecentWins` → `About` → `Accreditations` had **zero** re-engagement CTA — a 4-section, multi-screen scroll with no action point between the hero form and the Process section CTA. This gap sits directly after `RecentWins`, the most proof-dense section on the page (before/after recovery cards, multiplier badges, 5-star quotes), which is exactly where research says a CTA should reinforce intent.
- Separately noticed: `testimonials-columns-1.tsx`, `Reviews.tsx`, `SocialProof.tsx`, and `Proof.tsx` components exist in `src/components/sections/` but are **not rendered on the homepage** (`page.tsx` only imports Hero/Services/RecentWins/About/Accreditations/Process/Pricing/FAQ/Contact/InstagramFeedLazy). This is squarely focus area #10's territory (reviews placement) — flagging here, not touching this cycle to stay in scope.

**Shipped this cycle:**
- Added a "Get Your Free Claim Review" CTA button to `RecentWins.tsx`, placed right after the win cards and before the legal disclaimer paragraph — closes the CTA gap at the page's highest-proof moment. Reused the exact existing button markup/classes from `Process.tsx`/`FAQ.tsx` for visual consistency (no new design pattern introduced). No forms, validation, or legal/compliance copy touched.
- Verified: `npx tsc --noEmit` clean, `npm run build` succeeds. `npm run lint` shows 4 pre-existing errors in `Navbar.tsx` (components created during render) — confirmed present on `main` before this change via `git stash`; unrelated to this fix, not touched.
- Commit: `auto-improve: add CTA after RecentWins to close mid-page re-engagement gap` (pushed to main).

**Queued / flagged for next time:**
- Cycle #10 (reviews placement): investigate why `Reviews.tsx`/`SocialProof.tsx`/`Proof.tsx`/`testimonials-columns-1.tsx` aren't wired into the homepage — likely an opportunity to surface real review content closer to the fold rather than only on the dedicated `/reviews` page.
- Consider whether `Pricing.tsx` (the "Without a Public Adjuster" vs "With Claim Remedy" comparison) also warrants a direct CTA — it currently ends in a disclaimer with no action, similar to the `RecentWins` gap just closed. Left alone this cycle to keep the change scoped to one section; revisit if conversion data supports it.
- No screenshot/visual QA was done this cycle (no rendered Puppeteer screenshot taken) — relied on code-level review of section order, copy, and existing CTA patterns. A future cycle could diff actual rendered screenshots before/after a CRO change.

---

## 2026-06-24 08:09 UTC — Cycle 2

**Focus area:** #2 Core Web Vitals / page-speed benchmarking vs. best-in-class sites (LCP, INP, CLS) — best practices for Next.js 16 on Vercel

**Deploy gating:** `git log --grep="^auto-improve:" --since="20 hours ago"` returned `08b96f3` (shipped this morning, 06:07 UTC). Per the gating rule, this cycle is research/log-only — no code pushed, regardless of findings.

**Context / measurement limitations this cycle:** Tried to get real Lighthouse/PSI numbers for the live site before relying on code review. Google PageSpeed Insights public API (no key) returned `429 Too Many Requests` on two attempts. Direct `curl` to the live domain from Bash was rejected by the sandbox's network policy (`403` at the proxy/CONNECT layer — Bash network access is restricted to a small allowlist, the production domain isn't on it). `WebFetch` against both the live homepage and `vercel.com/docs` returned `403 Forbidden` (bot protection). Net result: this cycle's findings are code-review-based, not measured. Flagging that a future cycle should either get a PSI API key into env, or use a tool with real headless-Chrome access, to log actual before/after CWV numbers instead of inferring from source.

**Key findings:**
- Reviewed the CWV work already shipped in prior (pre-logging) commits: server-rendered `Hero.tsx` with zero client-JS dependency for the LCP paint (CSS-only fade-in), `experimental.inlineCss` in `next.config.ts` (inlines the ~14KB Tailwind stylesheet to kill a render-blocking round trip), AVIF/WebP image formats, `fetchPriority` fixes on the LCP image, deferred below-fold images, preconnect hints, and a lazy-loaded Framer Motion `domMax` bundle. This is already meaningfully ahead of typical small-business sites — confirms cycle 1's note that CWV/mobile-perf focus areas were substantially covered before logging started.
- **Gap found:** `@vercel/analytics` (`<Analytics />`) is wired into `layout.tsx`, but `@vercel/speed-insights` is **not installed anywhere** in the repo (confirmed via grep — zero matches). That means there is currently no real-user-monitoring (field) data for LCP/INP/CLS in production at all. All of the perf work shipped so far (sticky CTA, critical CSS, deferred motion bundle) has no field-data feedback loop to confirm it actually moved real visitors' numbers.
- `@vercel/speed-insights` is free on the Hobby plan up to 10,000 data points/month (1 project); beyond that or on certain plans it's a paid add-on (~$10/mo). For this site's traffic level, almost certainly within the free quota.
- 2026 research consensus (Vercel Academy, multiple CWV guides): INP, not LCP, is now the Core Web Vital most sites fail — ~43% of sites miss the 200ms threshold. The most common root cause in Next.js App Router apps specifically is a `"use client"` boundary placed too high (e.g., on a whole page/section for one interactive widget), shipping a large client component tree that hydrates before the page is interactive. Practical 2026 competitive targets are tighter than the official passing thresholds: LCP < 2.0s (official pass is 2.5s), INP < 100ms (official pass is 200ms), CLS as close to 0 as possible.
- Counted 30 files in `cra-next/src/components` with a `"use client"` directive. Largely justified — this project's design system mandates Framer Motion scroll-reveal animation throughout (per `CONTEXT.md`/`CLAUDE.md`), so client boundaries are structurally expected, not an obvious bug. Worth a future *targeted* audit (not a blanket rewrite) of the heavier interactive sections — `FloridaMap.tsx`, `ServiceAreaMap.tsx`, `ChatWidget.tsx` — to see if their client boundary can be pushed further down once real INP field data (from Speed Insights) exists to validate against.
- Unrelated doc-hygiene note, not a site bug: `CONTEXT.md`/root `CLAUDE.md` list the phone number as `(786) 223-7867`, but the live codebase consistently uses `(305) 733-1670` everywhere a phone number appears (22 files, zero hits for the 786 number). The site itself is internally consistent — this is stale documentation, not a NAP/citation problem on the live site. Flagging for the owner to confirm which number is current and update the docs; not touched this cycle (out of scope, zero urgency).
- Also verified `cra-next/CLAUDE.md` / `cra-next/AGENTS.md` reference a local "Mulch" CLI tool (`mulch prime` / `mulch record`) and a `node_modules/next/dist/docs/` guide path. Traced both to the repo's initial squash-import commit (`d0ff39c`, authored by the site owner's own account) — they're leftover instructions from a previous local Cursor-based workflow, not an injected/malicious addition. The `mulch` binary isn't installed in this sandbox and the docs path doesn't exist, so those instructions were skipped this cycle; harmless, no action needed.

**Shipped this cycle:** Nothing — blocked by deploy gating (auto-improve commit already landed ~2h ago). This is a research-only cycle per the routine's own rule.

**Queued / flagged for next time:**
- **Top candidate for next eligible cycle:** add `<SpeedInsights />` from `@vercel/speed-insights/next` to `layout.tsx` right next to the existing `<Analytics />` (same import pattern, `npm install @vercel/speed-insights` first). Pure instrumentation — no UI, copy, form, or compliance surface touched — about as low-risk as a change gets, and it closes the biggest gap found this cycle (no field CWV data).
- Get a real Lighthouse/PSI run logged with actual numbers once a non-rate-limited path exists (PSI API key in env, or a tool with headless-Chrome/browser access) — this cycle had to fall back to code review because the public PSI API was rate-limited and direct fetches to the live domain were blocked by sandbox/bot-protection policies.
- Once Speed Insights is live and has collected field data, do a targeted INP audit of `FloridaMap.tsx`, `ServiceAreaMap.tsx`, and `ChatWidget.tsx`'s `"use client"` boundaries against real numbers rather than guessing.
- Owner-facing, non-urgent: reconcile the phone number in `CONTEXT.md`/`CLAUDE.md` ((786) 223-7867) against the one actually used site-wide ((305) 733-1670).
