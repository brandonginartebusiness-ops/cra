---
title: "Schema Markup"
type: concept
tags: [seo, schema, structured-data, rich-results]
created: 2026-04-06
updated: 2026-04-06
sources: [CRA Market Intelligence Report]
---

# Schema Markup Implementation

Sources: [Schema.org/LocalBusiness](https://schema.org/LocalBusiness) · [Rankings.io Schema Guide](https://rankings.io/blog/schema-markup-for-local-seo/)

## Schema types to implement

### Homepage — LocalBusiness + ProfessionalService

Include:
- Complete NAP (name, address, phone)
- Geo coordinates
- Service areas (Miami-Dade, Broward, Palm Beach)
- `sameAs` links to all social profiles
- Business hours
- `priceRange`

### Service pages — Service schema

Each service page (hurricane, water damage, fire, roof, mold, etc.) should have Service schema with:
- `name`
- `description`
- `provider` (linked to LocalBusiness)
- `areaServed`

### FAQ pages — FAQPage schema

Eligible for **Google rich results** (FAQ accordion in search results). Apply to:
- FAQ page
- Any service page with Q&A section
- Any blog post with questions answered

High-value FAQ targets from [[04-SEO-Strategy/keyword-hierarchy|People Also Ask boxes]]:
- "How much does a public adjuster charge in Florida?"
- "Is it worth hiring a public adjuster?"
- "What is the difference between an adjuster and a public adjuster?"

### All pages — BreadcrumbList

Helps Google understand site structure and displays breadcrumbs in search results.

### Blog posts — Article/BlogPosting

Include:
- `author` (with person schema)
- `datePublished`
- `dateModified`
- `headline`
- `image`

### Reviews — AggregateRating

**Only for first-party reviews** (reviews hosted on your own site). Do NOT use for Google reviews — this can trigger a manual penalty.

## Implementation in Next.js

CRA's site is built on Next.js. Schema can be injected via:
- `<script type="application/ld+json">` in `<Head>` component
- A reusable `<SchemaOrg>` component per page type

## Related notes

- [[04-SEO-Strategy/keyword-hierarchy|Keyword Hierarchy — FAQPage targets]]
- [[08-Website-Tech/tech-stack|Tech Stack]]
- [[04-SEO-Strategy/site-architecture|Site Architecture]]
- [[00-Index/MOC|← Back to MOC]]
