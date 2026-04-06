import type { Metadata } from "next";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export const metadata: Metadata = {
  title: "Fire & Smoke Damage Claim Florida — Public Adjuster Representation",
  description:
    "Licensed Florida public adjusters for fire and smoke damage claims. We document structural, content, and environmental damage to secure full replacement value — no recovery, no fee.",
  openGraph: {
    title: "Fire & Smoke Damage Claim Florida — Claim Remedy Adjusters",
    description:
      "Fire and smoke damage claim representation in Florida. We document every room, fight for replacement value.",
    url: "https://claimremedyadjusters.com/services/fire-smoke",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/services/fire-smoke" },
};

export default function FireSmokePage() {
  return (
    <ServicePageLayout
      title="Fire & Smoke Damage Claims"
      subtitle="The damage doesn't stop when the flames do."
      heroImage=""
      serviceSlug="fire-smoke"
      description={[
        "Fire and smoke damage extends far beyond the burn zone. Smoke particles penetrate HVAC systems, embed in soft furnishings, and corrode wiring and metal fixtures throughout the property. Soot damage alone can render rooms uninhabitable even when there's no visible structural fire damage.",
        "Insurance companies often try to limit fire claims to the immediate burn area, ignoring secondary smoke damage, content loss, and additional living expenses while the property is being restored. They'll depreciate your belongings and push for repairs instead of replacement — even when items are permanently damaged.",
        "Claim Remedy documents every aspect of fire and smoke damage: structural, mechanical, electrical, content, and environmental. We work with certified fire restoration specialists and industrial hygienists to build comprehensive damage reports that support full replacement value — not the depreciated guess your insurer wants to pay.",
      ]}
      handles={[
        "Structural fire damage to walls, roofing, and framing",
        "Smoke and soot damage throughout the property",
        "HVAC contamination and ductwork replacement",
        "Content loss: furniture, electronics, personal belongings",
        "Additional living expenses during restoration",
        "Electrical and plumbing system damage from heat",
      ]}
      caseResult={{
        type: "Commercial Loss",
        initial: 22100,
        recovered: 156800,
        review: {
          text: "They provided us with support from beginning to end, handling all the necessary procedures with the relevant authorities. We obtained a fair and accurate claim fully commensurate with our losses.",
          author: "Bettyna's Creative",
          timeAgo: "1 month ago",
          googleReviewUrl:
            "https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI",
        },
      }}
    />
  );
}
