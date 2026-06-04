interface Crumb {
  name: string;
  /** Absolute path, e.g. "/reviews" (domain is prepended automatically) */
  path: string;
}

const BASE = "https://claimremedyadjusters.com";

/**
 * Generic BreadcrumbList JSON-LD for top-level pages that aren't covered by the
 * service/city schema components. Pass the trail from Home → current page.
 */
export default function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE}${c.path === "/" ? "" : c.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
