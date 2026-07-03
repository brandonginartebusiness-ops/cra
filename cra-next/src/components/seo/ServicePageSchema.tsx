import { totalGoogleReviewCount } from "@/data/reviews";

interface Props {
  /** Service page title, e.g. "Water Damage Claims" */
  title: string;
  /** Matches /services/[slug] */
  slug: string;
  /** Short description (subtitle works well) */
  description: string;
}

/**
 * Per-service `Service` + `BreadcrumbList` JSON-LD for the /services/* detail
 * pages. Mirrors the pattern in CityServiceSchema.tsx and links the service to
 * the sitewide LocalBusiness node (#business).
 */
export default function ServicePageSchema({ title, slug, description }: Props) {
  const url = `https://claimremedyadjusters.com/services/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        serviceType: "Public Adjusting",
        name: `${title} — Florida Public Adjuster`,
        description,
        provider: { "@id": "https://claimremedyadjusters.com/#business" },
        areaServed: { "@type": "State", name: "Florida" },
        url,
        offers: {
          "@type": "Offer",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "0",
            priceCurrency: "USD",
            description: "No recovery, no fee — contingency basis",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: totalGoogleReviewCount,
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://claimremedyadjusters.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://claimremedyadjusters.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
