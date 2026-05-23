import type { CityData } from "@/data/cities";

interface Props {
  city: CityData;
}

export default function CityServiceSchema({ city }: Props) {
  const url = `https://claimremedyadjusters.com/areas/${city.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        serviceType: "Public Adjusting",
        name: `Public Adjuster in ${city.city}, Florida`,
        description: `Licensed Florida public adjuster representing ${city.city} property owners on hurricane, water, fire, roof, and mold damage insurance claims. No recovery, no fee.`,
        provider: { "@id": "https://claimremedyadjusters.com/#business" },
        areaServed: {
          "@type": "City",
          name: city.city,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: city.county,
            containedInPlace: { "@type": "State", name: "Florida" },
          },
        },
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
        category: city.commonDamageTypes.map((d) => d.label),
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
            name: "Service Areas",
            item: "https://claimremedyadjusters.com/areas",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: city.city,
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
