---
title: "ADA Accessibility"
type: concept
tags: [website, accessibility, ada, wcag, legal-risk, florida]
created: 2026-04-06
updated: 2026-04-06
sources: [CRA Market Intelligence Report]
---

# ADA Accessibility — Serious Legal Risk in Florida

Sources: [EcomBack — FL ADA Surge](https://www.ecomback.com/blogs/inside-the-interview-ada-website-lawsuits-are-surging-in-florida) · [WCAG 2.1](https://www.w3.org/TR/WCAG21/) · [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)

## Florida ADA lawsuit exposure

| Metric | Value |
|--------|-------|
| ADA website lawsuits in FL (2025) | **950** — 24% of all national cases |
| FL lawsuits H1 2025 alone | **487** |
| Settlement range | **$5,000–$75,000** + remediation |
| Businesses targeted | **77% are small businesses** |

Florida is the #1 state for ADA website lawsuits.

## Standard required: WCAG 2.1 Level AA

### Checklist

- [ ] **Alt text** on all images (including decorative images use `alt=""`)
- [ ] **Color contrast**: minimum **4.5:1 ratio** for normal text, 3:1 for large text
- [ ] **Full keyboard navigation** — all interactive elements reachable by Tab key
- [ ] **Skip navigation link** — allows screen reader users to skip header
- [ ] **Captions** for all video content
- [ ] **200% zoom** support — content must not break at 200% zoom
- [ ] **Labeled form inputs** — all fields have associated `<label>` elements
- [ ] **ARIA attributes** — proper roles, states, and properties
- [ ] **Focus indicators** visible on all interactive elements
- [ ] **No seizure-inducing content** — no flashing > 3 times/second

## What NOT to do

**Do not use overlay widgets** (accessiBe, UserWay, etc.):
- The FTC **fined accessiBe $1 million in 2025** for misleading claims
- Overlays do not provide legal protection
- Courts have ruled overlays are insufficient for WCAG compliance

## What to do instead

1. **Code-level remediation** by a developer familiar with WCAG
2. **Professional accessibility audit** — not an automated scan
3. **Publish an accessibility statement** on the website

## CRA-specific note

CRA's Next.js site should be audited by a developer. Next.js doesn't automatically produce accessible HTML — semantic markup, ARIA attributes, and keyboard navigation must be coded explicitly.

## Related notes

- [[08-Website-Tech/tech-stack|Tech Stack]]
- [[08-Website-Tech/bilingual-site|Bilingual Site — accessibility applies to Spanish pages too]]
- [[00-Index/MOC|← Back to MOC]]
