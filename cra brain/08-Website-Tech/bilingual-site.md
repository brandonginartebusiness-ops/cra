---
title: "Bilingual Site — Spanish"
type: concept
tags: [website, spanish, bilingual, miami, seo, localization]
created: 2026-04-06
updated: 2026-04-06
sources: [CRA Market Intelligence Report]
---

# Bilingual Site — Spanish Language Strategy

## Why this matters

Miami-Dade County is **70%+ Hispanic**. A full Spanish-language website:
- Doubles SEO opportunity (Spanish-language search is a separate index)
- Serves the majority of the local population in their preferred language
- Is a genuine differentiator — only Platinum Public Adjusters offers trilingual service (EN/ES/Kreyòl)
- Builds trust with Spanish-speaking homeowners who may be wary of the claims process

## Implementation approach

### URL structure
Use subdirectory approach: `/es/` prefix
- Homepage: `/es/`
- Services: `/es/servicios/`
- Contact: `/es/contacto/`
- etc.

### Translation quality

**Use professional human translation only.** Do not use:
- Google Translate widgets
- Machine translation without human review
- Auto-translation plugins

Poor translation signals low credibility and can confuse readers on a high-stakes topic (insurance claims).

### Technical implementation

**hreflang tags** — required for proper Google language indexing:
```html
<link rel="alternate" hreflang="en" href="https://claimremedyadjusters.com/services/water-damage/" />
<link rel="alternate" hreflang="es" href="https://claimremedyadjusters.com/es/servicios/dano-por-agua/" />
```

### Recommended CMS approach

If CRA ever migrates to WordPress (see [[08-Website-Tech/tech-stack|Tech Stack]]):
- **WPML** or **TranslatePress** plugins handle multilingual content well
- For Next.js: use `next-i18next` or built-in i18n routing

## Priority pages for initial Spanish launch (Days 31-60)

1. `/es/` — Spanish homepage
2. `/es/servicios/` — Services overview
3. `/es/servicios/danos-por-huracan/`
4. `/es/servicios/danos-por-agua/`
5. `/es/contacto/`

## Related notes

- [[08-Website-Tech/tech-stack|Tech Stack — multilingual options]]
- [[04-SEO-Strategy/site-architecture|Site Architecture — /es/ mirror]]
- [[08-Website-Tech/ada-accessibility|ADA Accessibility — applies to Spanish pages]]
- [[00-Index/MOC|← Back to MOC]]
