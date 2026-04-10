# CRA Brain — Claude Reference

Condensed, citeable reference to the Obsidian vault at `F:\cra website\cra brain\`. First-pass lookup for CRA site copy, SEO, marketing, legal, and trust-signal work. For detail, open the source file cited beside each fact.

**Golden rule:** If you're about to state a fact about CRA, Florida law, or a competitor, check it against this file first. If it's not here, read the source folder before making it up.

---

## Company canonical facts

Source: `01-CRA-Profile/cra-overview.md`, `01-CRA-Profile/nap-inconsistencies.md`

- **Legal name:** Claim Remedy Adjusters LLC
- **FL License:** W549958 (3-20 Public Adjuster)
- **Address:** 7900 Oak Ln, Suite 400, Miami Lakes, FL 33016
- **Phone (canonical):** (786) 223-7867 — BBB lists (305) 733-1670, that's wrong
- **Email:** office@cradjusters.com
- **Website:** https://claimremedyadjusters.com
- **Google Place ID:** ChIJy6vXSOEIMK8RJvzhZzwTlxI
- **Tagline:** "Your Claim. Our Fight."
- **Business model:** No recovery, no fee
- **Flagship case:** $18K insurer offer → $147K recovered
- **BBB:** Listed, NOT accredited, A- rating, file opened 2025-06-05. Broken "website" link on BBB profile points to Facebook — fix day one.
- **Google reviews:** ~6, 5.0 stars (competitors: 40–200+)
- **Socials present:** Facebook (7 likes — weak), Instagram @claimremedyadjusters, Google Business Profile
- **Socials missing:** LinkedIn, YouTube, TikTok, Yelp, FAPIA/NAPIA directories, Nextdoor

**NAP must match everywhere.** Facebook currently says Hialeah — wrong. Always write: `Claim Remedy Adjusters / 7900 Oak Ln, Suite 400 / Miami Lakes, FL 33016 / (786) 223-7867`.

---

## Brand voice

Source: `01-CRA-Profile/cra-overview.md`, root `CONTEXT.md`

- Tagline-driven, combative-but-professional ("Your Claim. Our Fight.")
- First-person for CTAs ("Start my free claim review", not "Get a review")
- No fabricated urgency — use real SB 2-A deadlines only
- Serif headings (`var(--serif)`), sans body (`var(--sans)`) — see root `CLAUDE.md` CSS guardrails
- Color palette locked to `:root` vars: `--cream`, `--navy`, `--gold`. No generic template blues.

---

## Florida law — critical deadlines and rules

Source: `03-Florida-Law/sb-2a-2022.md`, `hb-837-2023.md`, `pa-licensing-requirements.md`, `referral-compensation-rules.md`

**SB 2-A (signed 2022-12-16):**
- New claims: **1 year** to file (was 2)
- Reopened claims: **1 year** (was 2)
- Supplemental claims: **18 months** (was 3 years)
- Insurer must acknowledge within **7 days** (was 14), inspect within **30 days** (was 45), pay/deny within **60 days** (was 90)
- Banned AOB (Assignment of Benefits) for residential/commercial policies as of 2023-01-01
- Eliminated one-way attorney fees

**HB 837 (signed 2023-03-24):**
- Negligence statute of limitations cut from 4 years to **2 years**
- Modified comparative negligence: plaintiff barred from recovery if ≥50% at fault

**PA fee caps (FL §626.854(11)):**
- Standard claims: **20%** max
- Declared emergency (first year post-declaration): **10%** max
- Insurer pays policy limits within 14 days: **1%** max
- Amounts paid before contract date: **0%**

**PA solicitation rules:**
- Contact only Mon–Sat, **8am–8pm**
- **48-hour waiting period** after disaster declaration before client contact
- 10-day cancellation window on contracts (30 days in declared emergencies)
- Written itemized estimate within 60 days of contract
- Violations: **$10K/instance**, **$20K during emergencies**

**Referral compensation — FL §626.854(12-13):**
- **HARD LINE: CRA cannot pay ANY non-PA for referrals.** Period.
- Prohibited: contractors, water mitigation, real estate agents, attorneys, roofers
- Allowed: PA-to-PA referral fees, organic relationships (no comp), attorney co-marketing (no fee sharing), community networking

**Licensing maintenance:** 24 hours CE every 2 years (4 hours Law & Ethics mandatory), $50K surety bond required.

---

## Competitor landscape (8 tracked)

Source: `02-Competitors/*.md`, `competitor-feature-matrix.md`

| Firm | Domain | Location | Edge |
|---|---|---|---|
| Aftermath Adjusters | aftermathadj.com | Broward | Cast iron pipe / pre-1974 homes niche |
| Continental Public Adjusters | continentalpublicadjusters.com | Coral Springs | 42 yrs, FAPIA+NAPIA, hurricane-specific pages |
| Florida Loss PA | floridaloss.com | Pembroke Pines | Client portal w/ weekly auto status updates |
| On Your Side PA | onyoursidepa.com | Maitland | Client portal (1 of 2 in market) |
| People's Choice PA | tpcpublicadjusters.com | Lake Worth | "Former insurance adjusters" origin; OPPAGA 574%/747% stats |
| Pinnacle Claim Services | pinnacleclaimservices.com | Pompano Beach | Most aggressive city-page SEO; 24/7 agents; sinkhole niche |
| Stellar Public Adjusting | stellaradjusting.com | Hollywood | FREE virtual inspections (only one); Condo + Business Interruption pages |
| Tutwiler & Associates | publicadjuster.com | — | Owns exact-match keyword domain; strongest content marketing |
| All Claims USA (referenced) | allclaimsusa.com | Boca Raton | A+ BBB, FAPIA, 4 locations, markets Xactimate |

**Gaps CRA can own** (from `competitor-feature-matrix.md`):
1. Interactive claim calculator (nobody has one)
2. Full EN/ES bilingual site (only Platinum PA is trilingual)
3. Video testimonials (~20% of competitors)
4. Client portal (only 2 firms)
5. Miami Lakes / NW Miami-Dade hyper-local content

---

## SEO strategy

Source: `04-SEO-Strategy/keyword-hierarchy.md`, `site-architecture.md`, `schema-markup.md`; `cra-next/.mulch/expertise/seo.jsonl`

**Keyword tiers:**
1. **Service head terms** — "public adjuster Miami", "public adjuster Florida", "public adjuster near me", "licensed public adjuster Miami-Dade"
2. **Damage type** — hurricane / water / roof / fire / mold / pipe burst + "damage claim help Florida"
3. **Pain points** — "underpaid insurance claim", "denied insurance claim help", "lowball offer", "supplemental claim Florida"
4. **Educational** — "how much does a public adjuster cost", "do I need a public adjuster", "public adjuster vs insurance adjuster"
5. **Hyper-local** — Miami Lakes, Hialeah, Doral, Broward County, Palm Beach County

**URL structure:**
- `/services/{damage-type}/` — 11 service pages planned (hurricane-wind, water, fire-smoke, roof, mold, pipe-burst, flood, denied, underpaid, commercial, condo-hoa)
- `/areas/{city-slug}/` — **34 city landing pages already built** (per `seo.jsonl`)
- `/es/` — Spanish mirror, **not yet built**
- Other: `/about`, `/results`, `/reviews`, `/faq`, `/contact`, `/free-consultation`, `/blog`

**Service page content spec:** 1,500–2,500 words, damage-specific, claims process, common insurer tactics, real case study with dollars, 4–6 FAQs with schema, CTA above fold, internal links to related service pages.

**City page spec:** Must be unique and locally relevant — NOT template swaps. Include neighborhood context, storm history, local landmarks.

**Schema to implement:**
- Homepage: `LocalBusiness` + `ProfessionalService`
- Service pages: `Service` schema
- FAQ pages: `FAQPage`
- Blog posts: `Article` / `BlogPosting`
- All pages: `BreadcrumbList`
- **Never** use `AggregateRating` for Google reviews — manual penalty risk. Only first-party reviews hosted on-site.

---

## Trust & authority — priority order

Source: `06-Trust-Authority/*.md`

**Tier 1 — do first:**
- Join **FAPIA** (https://www.fapia.net/) — 700+ members, every top competitor has it. Highest-leverage trust action.
- Display **FL License W549958** prominently in header and footer
- Google Reviews widget (aim 2–3 new reviews/week; competitors have 40–200+)
- "Licensed, Bonded & Insured" badge
- "No Recovery, No Fee" above fold adjacent to every CTA

**Tier 2 — within 90 days:**
- **BBB Accreditation** (fix broken Facebook link first; ~$75 application + $300–$1,200 annual dues)
- **NAPIA** (https://www.napia.com/)
- Dollar-amount-recovered counter ("$X Million+ Recovered")

**Tier 3 — 6–12 months:**
- CPPA / SPPA designations via NAPIA (5+ / 10+ years experience)
- Professional certs: Xactimate (market it explicitly — All Claims USA does), HAAG roof inspector, IICRC WRT/ASD/AMRT

**Google review link for outbound asks:**
`https://search.google.com/local/writereview?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI`

---

## Tech stack & performance

Source: `08-Website-Tech/tech-stack.md`, `core-web-vitals.md`, `conversion-optimization.md`, `bilingual-site.md`, `ada-accessibility.md`; `cra-next/.mulch/expertise/website.jsonl`, `leads.jsonl`

- **Framework:** Next.js on Vercel (project `cra-opal`, root dir `.`, branch `main`)
- **Production homepage:** root `/index.html` — `cra/` is legacy. See root `CLAUDE.md`.
- **Lead storage:** Supabase table `leads` — `full_name, phone, email, claim_number, help_type, message, service_page, created_at, status`. Dropdown values: `denied, underpaid, new_claim, protect, appraisal, other`.
- **Email:** Resend, notifies `brandonginartebusiness@gmail.com` + `office@cradjusters.com`
- **Instagram feed:** placeholder cards — Meta Graph API token not yet connected
- **Analytics:** GA4 + GTM recommended, not confirmed live. Microsoft Clarity (free) for heatmaps. CallRail / CallTrackingMetrics for call attribution.
- **Meta Pixel:** **NOT INSTALLED.** Blocker for retargeting and Lead event optimization.

**Core Web Vitals targets (2026):**
- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- Use `next/image`, WebP/AVIF, lazy-load below fold, self-host fonts with `font-display: swap`

**Conversion rules:**
- Multi-step forms can lift conversion up to 500% vs single-step
- First-person CTA copy lifts clicks up to 90%
- Sticky mobile footer with tap-to-call
- Exit-intent popup with downloadable ("Insurance Claim Checklist" PDF)

**Bilingual site:**
- Miami-Dade is **70%+ Hispanic** — Spanish is arguably the larger audience
- Use `/es/` subdirectory with `hreflang` alternates
- **Professional human translation only.** No Google Translate widgets, no auto-translation plugins.
- Priority Spanish pages: `/es/`, `/es/servicios/`, `/es/servicios/danos-por-huracan/`, `/es/servicios/danos-por-agua/`, `/es/contacto/`

**ADA / accessibility:**
- Florida is **#1 state** for ADA website lawsuits (950 in 2025, 24% of national total). Settlements $5K–$75K + remediation.
- Target **WCAG 2.1 Level AA**
- **Do NOT use overlay widgets** (accessiBe, UserWay) — FTC fined accessiBe $1M in 2025; courts have ruled overlays insufficient
- Fix at the code level: semantic HTML, alt text, 4.5:1 contrast, keyboard nav, visible focus indicators, labeled form inputs, ARIA where needed, 200% zoom support

---

## Claims data quick reference

Source: `05-Claims-Data/common-claims-florida.md`, `hurricane-stats.md`, `oppaga-study.md`

- **Wind & hail:** ~42.5% of FL claims, ~$14,747 avg payout
- **Water damage:** ~27.6% of FL claims, ~$13,954 avg payout
- **Fire & lightning:** highest avg payout (~$88,170)
- **Sinkhole:** ~6,500 FL claims/year (niche)
- **Recent hurricanes:** Ian 2022 (~300K+ claims), Helene 2024 (~135K+), Milton 2024 (~776K+)
- **OPPAGA study** (used by People's Choice): PA-represented claims recovered **574%–747% more** than non-represented — cite with context.

---

## Marketing rhythm

Source: `07-Marketing/social-media-formula.md`, `referral-program-rules.md`

**40/30/20/10 content mix:**
- 40% Educational (tips, policy explainers, homeowner rights)
- 30% Social proof (before/after, settlement amounts, reviews)
- 20% Community/brand (team, events, storm response)
- 10% Promotional (free consultation, deadline urgency)

**Posting cadence:** minimum 3x/week on Facebook + Instagram.

**Storm response protocol:** prep content pre-storm → safety check-in → "we're here to help" CTA → surge ad budget → document damage for future content.

**Referral marketing (repeat):** zero compensation to non-PAs, ever. Grow organic via FAPIA conferences, bar association events, Miami Lakes Chamber of Commerce.

---

## Hard do-not-do list

1. **Never** pay a non-PA for a referral (FL §626.854(12-13), $10K–$20K/instance)
2. **Never** market AOB — banned since 2023-01-01
3. **Never** solicit within 48 hours of a disaster declaration
4. **Never** contact clients outside Mon–Sat 8am–8pm
5. **Never** use ADA overlay widgets — fix accessibility at the code level
6. **Never** use `AggregateRating` schema for Google reviews (manual penalty risk)
7. **Never** fabricate urgency — the real SB 2-A 1-year window is already urgent enough
8. **Never** use Google Translate widgets for Spanish — human translation only
9. **Never** run Spanish ads to English landing pages (wait until `/es/` ships)
10. **Never** claim attorney fee guarantees — SB 2-A eliminated one-way attorney fees
11. **Never** treat `cra/` as the production site — root `/index.html` is live (see root `CLAUDE.md`)
12. **Never** introduce a multipage marketing setup — see root `CLAUDE.md` "Single-page site" rule

---

## Current known blockers (as of 2026-04-08)

1. **Meta Pixel not installed** — blocker for ad retargeting and conversion optimization
2. **No historical lead CSV exported** from Supabase — blocker for Custom Audiences and Lookalikes
3. **Not a FAPIA member** — biggest trust-signal gap
4. **BBB profile broken** — "website" link points to Facebook
5. **`/es/` pages not built** — blocks Spanish ad spend
6. **Only ~6 Google reviews** — competitors have 40–200+
7. **NAP inconsistent** across Facebook, BBB, website — needs unification pass

---

## Vault folder map (for deeper lookup)

```
cra brain/
├── 01-CRA-Profile/      company facts, digital footprint, NAP, gaps
├── 02-Competitors/       8 competitor dossiers + feature matrix
├── 03-Florida-Law/       SB 2-A, HB 837, licensing, referral rules
├── 04-SEO-Strategy/      keyword tiers, site architecture, schema
├── 05-Claims-Data/       claim stats, hurricane history, OPPAGA
├── 06-Trust-Authority/   FAPIA, NAPIA, BBB, certs, reviews, trust hierarchy
├── 07-Marketing/         social formula, CRM, Google Ads, email, meta-ads-audience-brief.md
└── 08-Website-Tech/      stack, CWV, conversion, bilingual, ADA
```

When a task needs depth this file doesn't cover, open the relevant folder and read the specific note before writing.
