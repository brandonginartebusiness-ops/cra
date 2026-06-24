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
