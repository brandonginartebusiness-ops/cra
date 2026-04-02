# CONTEXT.md — Claim Remedy Adjusters Website

## Brand

- **Client:** Claim Remedy Adjusters — licensed Florida public adjuster firm
- **Location:** 7900 Oak Ln #400, Miami Lakes, FL 33016
- **Phone:** (786) 223-7867
- **Instagram:** @claimremedyadjusters
- **Live URL:** https://claimremedyadjusters.com
- **Audience:** Florida homeowners dealing with property damage claims (hurricane, water, fire, roof, mold, flood). They're stressed, often confused by insurance, and looking for someone trustworthy.
- **Tone:** Warm and approachable — "we're here to help." Confident but never aggressive. Think helpful neighbor who happens to be an expert.

## Design System

### Palette
- Black: `#080810` (`--black`, body background)
- Navy: `#0A1628` (`--navy`, headings, footer, accents)
- Gold: `#C9922A` (`--gold`, CTAs, highlights)
- Electric blue: `#1E6FFF` (`--blue`, interactive accents, cursor hover)
- Cream: `#F2F0EC` (`--cream`, text on dark, light surfaces)
- Muted: `#8A8A9A` (`--mid`, secondary text)
- CSS variables defined in `:root` — always use `var(--navy)`, `var(--gold)`, `var(--cream)`, etc.

### Typography
- Headings: `Cormorant Garamond` (`var(--serif)`) — loaded via Google Fonts
- Display/marquee: `Bebas Neue` (`var(--bebas)`) — loaded via Google Fonts
- Body: `DM Sans` (`var(--sans)`) — weights 300/400/500
- Tone: high-end, authoritative, cinematic

### Design philosophy
- Dark base (`--black`) with cream text; sections use depth via layered z-index
- Film grain overlay (`.grain` div, `aria-hidden`) on every page at ~3% opacity
- Custom cursor (`#cur` + `#cur-r`) on desktop (`pointer: fine`), hidden on touch
- GSAP reveal defaults: `y:60, opacity:0, duration:1, ease:power3.out, start:'top 85%'`; stagger `0.1–0.15s`
- Parallax scrub on hero and CTA backgrounds; disabled ≤768px
- Animate `transform` and `opacity` only — never `transition-all`

### Components
- `.btn` — Gold background, white text, hover → navy + lift
- `.btn-navy` — Navy background, hover → gold
- `.card` — White bg, 8px radius, shadow, hover lifts + gold top border
- `.fade-up` — Scroll-triggered animation (opacity + translateY), activated by `.visible` class via IntersectionObserver in main.js

## File Structure

```
cra/
├── index.html              ← Homepage
├── css/
│   └── style.css           ← Single global stylesheet (950 lines)
├── js/
│   └── main.js             ← Global JS (nav toggle, fade-up, count-up, reviews API, Formspree AJAX)
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── results.html
│   ├── faq.html
│   └── contact.html
└── data/
    └── reviews.json        ← Fallback testimonials (used when Google API unavailable)
```

**Repo root (local workflow):** `serve.mjs` — static server, browse at `http://localhost:3000/cra/`; `screenshot.mjs` — Puppeteer captures to `temporary screenshots/`; `CLAUDE.md` — process and guardrails; `brand_assets/` — optional logos and reference art. Run `npm install` once, then `npm run serve`.

**Path notes:** Inner pages live in `/pages/`. From inner pages, reference assets as `../css/style.css`, `../js/main.js`. Nav links from inner pages use `../index.html` for Home.

## Tech Stack

- Vanilla HTML / CSS / JS — no frameworks, no build tools
- **[GSAP](https://greensock.com/gsap/) 3.12.5** + **[ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)** (CDN on all pages, before `main.js`) — hero intro timeline, hero background parallax (~`yPercent: 10`, scrub; disabled ≤768px), stats count-up on scroll, `.grid-3` card stagger, section label/title reveals + animated underline (`cra/js/main.js`). Fade-up still uses `IntersectionObserver` for `.fade-up` elements.
- Hosted on Vercel (auto-deploys from GitHub on push)
- Forms via Formspree (ID needs to be set in contact.html)
- Testimonials: main.js tries `/api/google-reviews` first → falls back to `data/reviews.json` → falls back to static carousel slides in HTML

## Current State (What's Built)

### Homepage (index.html)
- ✅ Sticky header with mobile hamburger nav
- ✅ Hero: word-by-word GSAP reveal, subtitle/CTA/trust-pill sequence, scroll hint; `.hero__bg` + Ken Burns + navy overlay; ScrollTrigger parallax (subtle; off on small screens)
- ✅ Marquee strip (services keywords) between hero and stats
- ✅ SVG curved section dividers between major bands
- ✅ Trust stats bar (glass) overlapping hero area — ScrollTrigger count-up — values: $4M+, 500+, $0, 10+
- ✅ Service areas (county chips + map pin, navy band)
- ✅ Testimonials carousel (single slide, dots, crossfade, Google API + JSON + static)
- ✅ Instagram grid (6 placeholders linking to @claimremedyadjusters)
- ✅ Mobile sticky CTA bar (Call Now / Free Review) — hidden on contact page
- ✅ Footer (navy bg, address, phone)

### Inner Pages
- ✅ About — two-column layout + credentials card (navy bg)
- ✅ Services — intro + 6 service cards (hurricane, water, roof, fire, mold, flood) + CTA
- ✅ Results — 4 case study cards with amounts + CTA
- ✅ FAQ — 5 Q&As with FAQPage JSON-LD schema
- ✅ Contact — form with Formspree, personalized success message, floating labels

### CSS Features Already In Place
- Nav link underline animation (::after slide-in)
- Card hover: lift + shadow + gold top border transition
- Button hover: lift + box-shadow
- Section title gold underline (::after)
- Mobile responsive: nav collapse, stats 2x2, stacked cards
- Ken Burns hero background animation
- Sticky header, sticky mobile CTA bar
- **Elevation pass:** Shared `--shadow-elevated`, deeper trust-stats bar, header soft shadow, refined fade-up easing, chip + IG tile micro-interactions
- **Color blocking:** `.section-block-navy` (homepage service areas) alternates with cream / white sections
- **Editorial split:** `.editorial-split` two-column layout for service areas on wide viewports

## What Needs Work

### Priority 1: Visual Elevation (Awwwards-inspired)
Ongoing polish — core upgrades are in place; can still push further:
- Bolder typography — hero / page heroes tightened; continue tuning inner pages as needed
- Layered depth — trust bar + cards elevated; consider more overlaps / asymmetry on secondary pages
- Generous whitespace — section padding uses fluid clamp; adjust per page if needed
- Strong color blocking — navy band on home service areas; consider additional bands or accents elsewhere
- Subtle motion — chips, cards, IG grid, fade-up refined; optional scroll-linked or accent motion later
- Editorial layout — service areas split; extend pattern to other sections if desired

### Priority 2: Real Assets
- Swap Unsplash hero for real client photo
- Swap placeholder testimonials with real quotes (or connect Google Reviews API)
- Swap IG placeholder images with real posts
- Add client logo to header (replace text)
- Add real case study numbers to results page
- Add Florida license number to about page

### Priority 3: SEO & Schema
- ✅ Canonical URLs updated to claimremedyadjusters.com (custom domain live)
- Add unique meta descriptions to all inner pages
- Add branded OG image
- Location-target service page copy (Miami, Broward, Palm Beach keywords)

## Design Direction

Inspired by Awwwards references (bold typography, layered depth, generous whitespace, confident color usage). Translate that polish into a warm, approachable feel for worried homeowners — not cold/corporate, not techy. Think: "this company is legit AND they actually care about me."
