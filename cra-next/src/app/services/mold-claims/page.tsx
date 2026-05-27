import type { Metadata } from "next";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export const metadata: Metadata = {
  title: "Mold Damage Insurance Claim Florida — Public Adjuster Help",
  description:
    "Florida mold claims are routinely denied as 'maintenance.' We tie the mold back to a covered water event and document the full remediation so your insurer pays what your policy owes.",
  openGraph: {
    title: "Mold Damage Insurance Claim Florida — Claim Remedy Adjusters",
    description:
      "Florida public adjuster for mold claims. We connect mold to the covered water loss that caused it and document the full remediation scope.",
    url: "https://claimremedyadjusters.com/services/mold-claims",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "https://claimremedyadjusters.com/services/mold-claims" },
};

export default function MoldClaimsPage() {
  return (
    <ServicePageLayout
      title="Mold Damage Claims"
      subtitle="Mold is rarely the real problem — it's the symptom of a water loss insurers don't want to pay for."
      serviceSlug="mold-claims"
      description={[
        "In Florida's heat and humidity, mold can take hold within 24 to 48 hours of a water intrusion. A burst pipe behind a wall, a slow roof leak, or storm-driven moisture can seed mold growth long before anyone sees a stain. By the time it surfaces, the damage spans drywall, insulation, framing, and HVAC systems — and the remediation cost climbs fast.",
        "Insurers know this, which is why mold is one of the most heavily disputed claims in the state. Most Florida policies cap mold coverage or exclude it entirely unless the mold results from a covered peril — a sudden, accidental water event. Carriers routinely deny these claims as 'long-term maintenance,' 'humidity,' or 'wear and tear' to avoid paying. The difference between a denial and a paid claim is almost always documentation.",
        "Claim Remedy works with certified mold assessors and industrial hygienists to trace the mold back to its triggering water event, establish the timeline, and document the full remediation protocol — containment, removal, air quality testing, and rebuild. We build the causation argument your insurer cannot dismiss, so a covered loss isn't written off as your fault.",
      ]}
      handles={[
        "Mold caused by burst or leaking pipes and supply lines",
        "Mold following roof leaks and storm-driven water intrusion",
        "Hidden mold behind walls, under flooring, and in HVAC systems",
        "Claims wrongly denied as 'maintenance' or 'humidity'",
        "Mold remediation, containment, and air-quality testing scope",
        "Coverage-cap disputes on Florida mold endorsements",
      ]}
      caseResult={{
        type: "Mold Claim",
        initial: 3800,
        recovered: 28500,
        review: {
          text: "From getting the plumber and the mold expert to assess the damage, Eddy was on it. He kept me informed of any delays and of everything that was happening.",
          author: "Charles Jacque",
          timeAgo: "1 year ago",
          googleReviewUrl:
            "https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI",
        },
      }}
    />
  );
}
