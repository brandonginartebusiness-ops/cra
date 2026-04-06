import type { Metadata } from "next";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export const metadata: Metadata = {
  title: "Hurricane Damage Claim Help Florida — Storm & Hurricane Claims",
  description:
    "Licensed Florida public adjusters specializing in hurricane and storm damage claims. We deploy within 24 hours, document every loss, and fight for the full recovery your policy supports.",
  openGraph: {
    title: "Hurricane Damage Claim Help Florida — Claim Remedy Adjusters",
    description:
      "Underpaid or denied hurricane claim? Our licensed Florida public adjusters fight for the recovery you deserve.",
    url: "https://claimremedyadjusters.com/services/storm-hurricane",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/services/storm-hurricane" },
};

export default function StormHurricanePage() {
  return (
    <ServicePageLayout
      title="Storm & Hurricane Claims"
      subtitle="Florida's storm season doesn't wait — neither should your claim."
      heroImage="/images/service-storm-hurricane.png"
      serviceSlug="storm-hurricane"
      description={[
        "Hurricane-force winds, tropical storms, and severe weather events cause some of the most extensive property damage Florida homeowners face. From torn-off roofing and broken windows to structural compromise and interior water intrusion, storm damage is rarely as simple as what's visible from the outside.",
        "Insurance companies routinely undervalue storm claims by attributing damage to pre-existing wear, cosmetic-only impact, or maintenance issues. They send their own adjusters who are trained to minimize — not to document the full scope of what happened to your property.",
        "At Claim Remedy, we deploy within 24 hours of your call. Our team performs a comprehensive inspection — roof to foundation — using moisture detection equipment, drone imaging, and engineering-grade assessments. We document every point of damage before repairs begin, building a claim file your insurer cannot easily dismiss.",
      ]}
      handles={[
        "Wind damage to roofing, siding, soffits, and fascia",
        "Structural compromise from hurricane-force winds",
        "Interior water intrusion caused by roof or window breaches",
        "Fallen trees and debris impact damage",
        "Fence, screen enclosure, and outdoor structure damage",
        "Secondary damage: mold growth from undetected moisture",
      ]}
      caseResult={{
        type: "Hurricane Claim",
        initial: 18400,
        recovered: 147000,
        review: {
          text: "Our Home Insurance company really gave us hell on our claim from the Hurricane damage…Thank God Eddy was there who fought for us and did everything he can to get what we deserved.",
          author: "Judy Vasquez",
          timeAgo: "6 months ago",
          googleReviewUrl:
            "https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI",
        },
      }}
    />
  );
}
