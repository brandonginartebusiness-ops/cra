---
title: "Recommended Site Architecture"
type: concept
tags: [seo, site-structure, pages, information-architecture]
created: 2026-04-06
updated: 2026-04-06
sources: [CRA Market Intelligence Report]
---

# Recommended Site Architecture

## Full URL structure

```
Homepage (/)
├── /services/
│   ├── /services/hurricane-wind-damage/
│   ├── /services/water-damage/
│   ├── /services/fire-smoke-damage/
│   ├── /services/roof-damage/
│   ├── /services/mold-damage/
│   ├── /services/pipe-burst-plumbing/
│   ├── /services/flood-damage/
│   ├── /services/denied-insurance-claims/
│   ├── /services/underpaid-insurance-claims/
│   ├── /services/commercial-property-claims/
│   └── /services/condo-hoa-claims/
├── /service-areas/
│   ├── /service-areas/miami-lakes/
│   ├── /service-areas/miami/
│   ├── /service-areas/hialeah/
│   ├── /service-areas/doral/
│   ├── /service-areas/pembroke-pines/
│   ├── /service-areas/hollywood/
│   ├── /service-areas/fort-lauderdale/
│   ├── /service-areas/coral-springs/
│   ├── /service-areas/west-palm-beach/
│   ├── /service-areas/boca-raton/
│   ├── /service-areas/miami-dade-county/
│   ├── /service-areas/broward-county/
│   └── /service-areas/palm-beach-county/
├── /blog/
├── /about/
├── /results/
├── /reviews/
├── /faq/
├── /free-consultation/
├── /es/ (Spanish mirror)
└── /contact/
```

## Service page content requirements

Each service page: **1,500–2,500 words** containing:
- [ ] Damage-type specific content (not generic)
- [ ] Claims process for that specific damage type
- [ ] Common insurer tactics for that claim type
- [ ] Real case study with dollar amounts
- [ ] 4-6 FAQs with [[04-SEO-Strategy/schema-markup|FAQPage schema]]
- [ ] Strong CTA (consultation form above fold)
- [ ] Internal links to related service pages

## City page content requirements

Each city page must have **unique, locally relevant content** — not template swaps with the city name changed. Include:
- Local neighborhood context
- Storm history for that area
- Common claim types in that area
- Local references (roads, landmarks) for authenticity

## Pages to prioritize (Day 1-30)

1. /services/hurricane-wind-damage/ — highest search volume
2. /services/water-damage/ — highest claim frequency
3. /services/roof-damage/ — core FL claim type
4. /services/fire-smoke-damage/
5. /services/mold-damage/
6. /services/denied-insurance-claims/ — high intent, pain-point keyword
7. /services/underpaid-insurance-claims/ — high intent
8. /services/pipe-burst-plumbing/
9. /services/commercial-property-claims/

## Hub-and-spoke internal linking model

Service pages are **hubs** — they receive internal links from related blog **spokes**:
- `/blog/what-to-do-after-hurricane-damage/` → links to `/services/hurricane-wind-damage/`
- `/blog/water-damage-hidden-signs/` → links to `/services/water-damage/`

This builds topical authority for the service pages.

## Related notes

- [[04-SEO-Strategy/keyword-hierarchy|Keyword Hierarchy — what each page targets]]
- [[04-SEO-Strategy/schema-markup|Schema Markup — per page type]]
- [[07-Marketing/seo-content-strategy|SEO Content Strategy — hub-and-spoke]]
- [[09-Blog-Topics/blog-master-list|Blog Topics]]
- [[08-Website-Tech/bilingual-site|Bilingual Site — /es/ mirror]]
- [[00-Index/MOC|← Back to MOC]]
