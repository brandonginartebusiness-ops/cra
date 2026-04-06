import type { Metadata } from "next";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export const metadata: Metadata = {
  title: "Water Damage Insurance Claim Florida — Public Adjuster Help",
  description:
    "Expert water damage claim representation for Florida homeowners. Burst pipes, hidden moisture, appliance failures — we document every loss and fight for your full recovery.",
  openGraph: {
    title: "Water Damage Insurance Claim Florida — Claim Remedy Adjusters",
    description:
      "Florida public adjuster for water damage claims. We use moisture mapping and thermal imaging to document the full loss.",
    url: "https://claimremedyadjusters.com/services/water-damage",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/services/water-damage" },
};

export default function WaterDamagePage() {
  return (
    <ServicePageLayout
      title="Water Damage Claims"
      subtitle="Hidden moisture causes more destruction than the initial leak."
      heroImage=""
      serviceSlug="water-damage"
      description={[
        "Water damage is one of the most common — and most underestimated — property insurance claims in Florida. A burst pipe, a slow leak behind a wall, or flooding from a failed appliance can saturate drywall, subfloor, and insulation in hours. By the time visible damage appears, the real destruction is already behind your walls.",
        "Insurers frequently dispute water damage claims by questioning the source, the timeline, or whether the damage was sudden versus gradual. These distinctions matter under Florida policy language, and without proper documentation, homeowners lose thousands in legitimate coverage.",
        "Claim Remedy brings in moisture mapping technology, thermal imaging, and certified water damage assessors to trace the source and document the full extent of damage — including what's hidden inside walls, ceilings, and under flooring. We build a claim file that answers every question your insurer will ask before they ask it.",
      ]}
      handles={[
        "Burst or leaking pipes and supply lines",
        "Appliance failures: water heaters, dishwashers, washing machines",
        "Toilet and bathroom overflow damage",
        "Hidden moisture behind walls and under flooring",
        "Ceiling leaks and attic condensation damage",
        "Category 2 and 3 water contamination cleanup",
      ]}
      caseResult={{
        type: "Water Claim",
        initial: 5200,
        recovered: 42800,
        review: {
          text: "I recently had the pleasure of working with Claim Remedy Adjuster after a water leak in my house. From the moment they arrived, their professionalism and expertise shone through.",
          author: "Alexis Torres",
          timeAgo: "5 months ago",
          googleReviewUrl:
            "https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI",
        },
      }}
    />
  );
}
