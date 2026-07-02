export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["InsuranceAgency", "LocalBusiness", "ProfessionalService"],
        "@id": "https://claimremedyadjusters.com/#business",
        name: "Claim Remedy Adjusters",
        url: "https://claimremedyadjusters.com",
        logo: "https://claimremedyadjusters.com/brand_assets/logo.png",
        image: "https://claimremedyadjusters.com/brand_assets/logo.png",
        description:
          "Licensed Florida Public Adjusters representing homeowners and commercial property owners. We fight for the settlement you deserve on hurricane, water, fire, roof, and mold damage claims. No recovery, no fee.",
        telephone: "+13057331670",
        email: "office@cradjusters.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "7900 Oak Ln Suite 400",
          addressLocality: "Miami Lakes",
          addressRegion: "FL",
          postalCode: "33016",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 25.9081,
          longitude: -80.3106,
        },
        areaServed: [
          { "@type": "State", name: "Florida" },
          { "@type": "City", name: "Miami" },
          { "@type": "City", name: "Miami Lakes" },
          { "@type": "City", name: "Hialeah" },
          { "@type": "City", name: "Doral" },
          { "@type": "City", name: "Fort Lauderdale" },
          { "@type": "City", name: "West Palm Beach" },
        ],
        hasMap: "https://maps.google.com/?cid=ChIJy6vXSOEIMK8RJvzhZzwTlxI",
        sameAs: [
          "https://www.facebook.com/claimremedyadjusters",
          "https://www.instagram.com/claimremedyadjusters",
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
        ],
        knowsAbout: [
          "Hurricane insurance claims",
          "Water damage claims",
          "Fire and smoke damage claims",
          "Roof damage insurance claims",
          "Property insurance appraisal",
          "Denied insurance claims",
          "Underpaid insurance claims",
          "Florida public adjusting",
        ],
        slogan: "Your Claim. Our Fight.",
        foundingLocation: {
          "@type": "Place",
          name: "Miami Lakes, Florida",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: 45,
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://claimremedyadjusters.com/#website",
        url: "https://claimremedyadjusters.com",
        name: "Claim Remedy Adjusters",
        publisher: { "@id": "https://claimremedyadjusters.com/#business" },
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
