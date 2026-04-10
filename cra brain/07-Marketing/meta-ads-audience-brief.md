# Meta Ads Audience Strategy Brief — Claim Remedy Adjusters

_Generated 2026-04-08 from the `cra brain` Obsidian vault and `cra-next/.mulch/expertise/` notes. Every claim below cites its source file._

---

## TL;DR — one-paragraph answers to the consultant's 6 questions

1. **Service area:** Tri-county South Florida (Miami-Dade, Broward, Palm Beach) as the paid-media core; statewide licensed (FL W549958) with 34 city landing pages already built under `/areas/[slug]` for organic coverage. Source: `cra-next/.mulch/expertise/seo.jsonl`, `cra brain/04-SEO-Strategy/site-architecture.md`.
2. **Ideal client:** Florida homeowners with a denied, underpaid, or unfiled property-damage claim — wind/hail (42.5% of FL claims) and water damage (27.6%) are the primary lanes, with fire the highest-payout lane. Property values roughly $200K–$1M+. Source: `cra brain/05-Claims-Data/common-claims-florida.md`, `cra-next/src/data/cities.ts`.
3. **Languages:** English + Spanish both in-scope for audience targeting (Miami-Dade is 70%+ Hispanic), but Spanish creative/landing pages are not yet built — treat Spanish as Phase 2 until `/es/` pages ship. Source: `cra brain/08-Website-Tech/bilingual-site.md`.
4. **Age range:** Recommend 40–70 as the core, with a 60+ sub-segment for Palm Beach / Boynton Beach retirees. No explicit demographic file exists — this is inferred from review authors and city notes. Source: `cra-next/src/data/cities.ts` (Boynton Beach retiree note), `cra/data/reviews.json`.
5. **Past customers / lead list:** A Supabase `leads` table is live (`full_name`, `phone`, `email`, `claim_number`, `help_type`, `service_page`, `status`) — there is **no exported list yet**, but a CSV export from Supabase can seed a Meta Custom Audience + 1% Lookalike immediately. Source: `cra-next/.mulch/expertise/leads.jsonl`.
6. **Website analytics / Meta Pixel:** **Meta Pixel is not installed anywhere in the codebase** (blocker for retargeting and conversion optimization). GA4 is recommended in the strategy docs but not confirmed wired; Instagram Graph API token is also missing. Source: `cra-next/.mulch/expertise/website.jsonl`, `cra brain/07-Marketing/crm-recommendations.md`.

---

## Q1 — Service Area

**Primary paid-media geo:** Miami-Dade, Broward, Palm Beach counties. HQ is 7900 Oak Ln Suite 400, Miami Lakes, FL 33016. Source: `cra brain/01-CRA-Profile/digital-footprint.md`.

**Statewide capability:** Licensed all-Florida (W549958), so statewide targeting is legal — but budget should concentrate on the tri-county core until volume warrants expansion. Source: `cra brain/01-CRA-Profile/digital-footprint.md`.

**City pages already built (34):** Under `/areas/[slug]`. Priority cities: Miami Lakes, Miami, Hialeah, Doral, Pembroke Pines, Hollywood, Fort Lauderdale, Coral Springs, West Palm Beach, Boca Raton, Boynton Beach, Delray Beach. Secondary: Tampa, Clearwater, Sarasota, Naples, Key West, Davie, Kendall. Source: `cra-next/.mulch/expertise/seo.jsonl`, `cra brain/04-SEO-Strategy/site-architecture.md`, `cra-next/src/data/cities.ts`.

**Recommendation:** Tri-county radius as the core ad set; add Tampa/Orlando only when storm events create an intent spike.

---

## Q2 — Ideal Client Profile

**Claim type mix** (from `cra brain/05-Claims-Data/common-claims-florida.md`):
- Wind & hail — 42.5% of FL claims, ~$14,747 avg payout
- Water damage — 27.6% of FL claims, ~$13,954 avg payout
- Fire & lightning — highest avg payout (~$88,170)
- Roof, mold, pipe-burst/slab-leak, flood, sinkhole round out the service menu

**Claim status targeting:** Denied, underpaid, and supplemental claims are the high-intent lanes. The intake dropdown in `cra-next/.mulch/expertise/leads.jsonl` lists: `denied, underpaid, new_claim, protect, appraisal, other`.

**Property value range:** Not explicitly documented. Inferred $200K–$1M+ based on case study settlements ($38.5K–$147K) and city notes referencing "wealthy communities" (Naples), "oceanfront condominiums," and "gated communities." Source: `cra/data/reviews.json`, `cra-next/src/data/cities.ts`.

**Customer archetype (from case studies in `cra/data/reviews.json`):**
- Maria L. — insurer offered $28K, CRA recovered $140K
- Danielle M. — 3 months solo vs. 2 weeks with CRA
- Roberto & Ana F., James T., Carlos & Yolanda R. — couples and individual homeowners across Hialeah, Pembroke Pines, Coral Springs, Davie, Kendall

**Psychographic drivers:** frustrated by lowball offers, overwhelmed by insurer paperwork, motivated by the "no recovery, no fee" risk reversal.

---

## Q3 — Languages

**Target both English and Spanish** — but stagger them.

- English creative + landing pages: ready today.
- Spanish: Miami-Dade is 70%+ Hispanic per `cra brain/08-Website-Tech/bilingual-site.md`. A `/es/` subdirectory is planned with priority translations for homepage, services, hurricane damage, water damage, and contact — **not yet built**. Running Spanish ads to English landing pages will tank conversion rate and raise CPL.

**Recommendation:** Launch English ads immediately; gate Spanish ad spend on `/es/` pages shipping. When Spanish launches, the audience is arguably larger than the English audience in Miami-Dade.

---

## Q4 — Age Range

**No explicit demographic file exists in the vault.** The following is an inference from available evidence, not a documented target:

- **Core: 40–65** — homeowners with established equity, likely to have filed a claim and been underpaid.
- **Secondary: 65+** — Boynton Beach city notes in `cra-next/src/data/cities.ts` explicitly flag retirees on fixed incomes as "particularly vulnerable to insurer pressure tactics" — a high-empathy segment for Palm Beach County ad sets.
- **Exclude:** under 30 (low homeownership rate in South FL rental markets).

**Recommendation:** Start 40–70 broad, then split-test a 60+ ad set for Palm Beach with retiree-focused creative.

---

## Q5 — Past Customers / Lead List

**Infrastructure exists, data export does not.**

From `cra-next/.mulch/expertise/leads.jsonl`:
- Supabase table `leads`
- Columns: `full_name`, `phone`, `email`, `claim_number`, `help_type`, `message`, `service_page`, `created_at`, `status`
- Submissions flow through `/api/leads` and notify `brandonginartebusiness@gmail.com` + `office@cradjusters.com` via Resend

**What's missing:** no historical CSV export is stored in the vault, and no CRM (ClaimWizard, Claim Titan, AdjustCRM, Brelly — all recommended in `cra brain/07-Marketing/crm-recommendations.md`) is yet connected.

**Recommendation for the consultant:**
1. Export the full `leads` table from Supabase to CSV (phone + email columns).
2. Also export any past clients from Google Drive / email / QuickBooks if they predate the Supabase form.
3. Upload to Meta as a Custom Audience, then build a **1% Lookalike** restricted to Florida. This is the single highest-leverage action available given the vault contents.

---

## Q6 — Website Analytics, Meta Pixel, GA4

**Meta Pixel: not installed.** No pixel snippet, no `fbq()` calls, and no reference in `cra-next/.mulch/expertise/website.jsonl`. This is a hard blocker for retargeting and for optimizing toward a conversion event — it must be installed before any ad spend meaningfully scales.

**GA4:** Recommended via GTM in `cra brain/07-Marketing/crm-recommendations.md`; not confirmed live in the expertise notes.

**Instagram:** Placeholder cards only — "Instagram placeholder cards until Meta Graph API is connected — code is ready, just needs token." Source: `cra-next/.mulch/expertise/website.jsonl`.

**Call tracking / heatmaps:** CallRail or CallTrackingMetrics + Microsoft Clarity recommended but not yet wired. Source: `cra brain/07-Marketing/crm-recommendations.md`.

**Recommendation:** Before the first dollar of Meta spend — install the Meta Pixel on the root `/index.html` and the Next.js app under `cra-next/`, fire a standard `Lead` event on successful `/api/leads` submission, and verify in Meta Events Manager.

---

## Gaps & Blockers (honest checklist before spending)

1. **Meta Pixel install** — blocker for retargeting, lookalikes-from-pixel, and conversion optimization.
2. **Supabase lead export** — needed to seed the first Custom Audience + Lookalike.
3. **Spanish landing pages (`/es/`)** — required before Spanish ad spend.
4. **Review volume** — CRA has ~6 Google reviews; competitors have 40–200+ per `cra brain/01-CRA-Profile/digital-footprint.md`. Low social proof hurts landing-page conversion.
5. **Video testimonials** — not yet produced; would be the single highest-ROI creative asset given the case studies available.

---

## Recommended Meta Audience Stack

**Geo:** Miami-Dade, Broward, Palm Beach (core). Add statewide only during named-storm events.

**Demographic:** Age 40–70, homeowners, household income $75K+ where available.

**Interest/behavior layers:**
- Home insurance, property damage, hurricane preparedness
- Home improvement, real estate, mortgage
- Life events: "recently moved" (excluded — renters bias)

**Custom audiences to build:**
- Supabase leads CSV → Custom Audience
- 1% Lookalike (Florida) off that seed
- Site visitors (pending pixel install) → 30/60/90 day windows
- Video viewers (pending first video asset) → 50% ThruPlay

**Seasonal burst strategy:** June–November hurricane season — 3–5x budget surge when a named storm enters the FL cone. Post-storm "claim denied?" creative should ship within 48 hours of landfall.

**Creative hooks lifted straight from the vault case studies:**
- "$28K offer → $140K settlement" (Maria L.)
- "3 months alone, 2 weeks with CRA" (Danielle M.)
- "Denied claim? You have one year in Florida. Don't wait." (references SB 2-A deadline in `cra brain/03-Florida-Law/`)
- "No recovery, no fee" — risk-reversal for cost-averse retirees

**Conversion objective:** Lead form submissions, optimized on the `Lead` pixel event once installed. Segment by `help_type` (denied vs. underpaid vs. new claim) for funnel-level reporting.

---

## Copy-paste reply to the Meta consultant

Below is a plain-prose block the user can paste directly into an email or chat reply. No headers, no bullet-only sections — it reads as a natural response.

---

Thanks for the thorough intake. Here's where we stand on all six.

On service area, our paid-media focus is the South Florida tri-county core: Miami-Dade, Broward, and Palm Beach. We're licensed statewide (FL W549958) and have 34 city-level landing pages live under /areas/, so organic coverage extends to Tampa, Orlando, Naples, Sarasota, Fort Myers, Clearwater, and Key West — but I'd like ad spend to concentrate on Miami-Dade, Broward, and Palm Beach first and only extend statewide during named-storm events.

On ideal client, we want Florida homeowners with a denied, underpaid, or unresolved property-damage claim. Our three highest-volume lanes are wind and hail (about 42% of Florida claims), water damage (about 28%), and roof damage, with fire as the highest average payout lane. Property values typically run in the $200K–$1M range, skewing higher in coastal and gated communities. The psychological hook is almost always the same — the insurer lowballed them and they feel stuck. Our strongest case studies show settlements like $28K to $140K and timelines like three months to two weeks, so those numbers should drive creative.

On languages, both English and Spanish — Miami-Dade is 70%+ Hispanic, so Spanish is arguably the larger audience here. The one caveat is that our Spanish landing pages aren't built yet, so I'd like to launch English immediately and layer Spanish ads in as soon as the /es/ pages ship. Running Spanish ads to an English page will waste budget.

On age range, we don't have hard demographic data from past campaigns, so I'd start 40–70 as the core with a 60+ retiree-focused split-test for Palm Beach and Boynton Beach specifically — that region has a large fixed-income retiree population who are especially vulnerable to insurer pressure, and the empathy angle lands hard with them.

On past customers and lead lists, we have a Supabase leads database capturing full name, phone, email, claim number, help type, and service page for every form submission, and I can export that to a CSV this week so you can upload it to Meta as a Custom Audience and build a 1% Florida Lookalike off it. I'll also dig through our older contacts from before the Supabase form went live so we can seed the audience with as much volume as possible.

On website traffic and the Meta Pixel — this is where we have the biggest gap. The pixel isn't installed yet on claimremedyadjusters.com. I'd like to get that done before we go live: install the base pixel site-wide and fire a Lead event on successful form submissions so you can optimize toward conversions instead of just clicks. Once the pixel is firing, we'll start accumulating a retargeting pool of site visitors, and within a few weeks we can layer on Website Custom Audiences and a pixel-based Lookalike on top of the CRM-based one.

Short version of the blockers I need to clear on my side before we launch: export the Supabase lead list, install the Meta Pixel with a Lead event, and decide whether we're waiting on Spanish landing pages or going English-only for the first flight. Let me know which of those you want me to prioritize and I'll move.

---

_End of brief._
