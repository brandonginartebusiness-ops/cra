import type { Metadata } from "next";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export const metadata: Metadata = {
  title: "Roof Damage Insurance Claim Florida — Fight Your Insurer",
  description:
    "Florida public adjuster for roof damage claims. Engineering reports, Xactimate estimates, and NOAA storm data — we prove your roof damage and fight for full replacement value.",
  openGraph: {
    title: "Roof Damage Insurance Claim Florida — Claim Remedy Adjusters",
    description:
      "Roof claim denied or underpaid? Our Florida public adjusters use engineering reports and storm data to prove your loss.",
    url: "https://claimremedyadjusters.com/services/roof-claims",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/services/roof-claims" },
};

export default function RoofClaimsPage() {
  return (
    <ServicePageLayout
      title="Roof Damage Claims"
      subtitle="Proving storm damage versus wear is where claims are won or lost."
      heroImage=""
      serviceSlug="roof-claims"
      description={[
        "Roof claims are the most contested category of property insurance claims in Florida. Insurers invest heavily in strategies to deny or minimize roof damage payouts — attributing legitimate storm damage to age, wear and tear, or improper maintenance. Without independent engineering evidence, homeowners are fighting blind.",
        "The difference between a $12,000 payout and a $90,000 recovery often comes down to one thing: the quality of the damage documentation. Insurance company adjusters spend 15 minutes on your roof. Our team spends hours — measuring, photographing, testing, and mapping every damaged area against weather event data.",
        "Claim Remedy brings licensed roofing engineers and independent contractors to perform detailed assessments. We cross-reference damage patterns with NOAA storm data, produce engineering reports with failure analysis, and deliver Xactimate estimates that hold up against insurer pushback.",
      ]}
      handles={[
        "Missing, cracked, or lifted shingles from wind events",
        "Tile roof damage: cracked, displaced, or broken tiles",
        "Flat roof membrane tears and punctures",
        "Fascia, soffit, and gutter damage",
        "Underlayment exposure and secondary water barriers",
        "Interior ceiling damage from active roof leaks",
      ]}
      caseResult={{
        type: "Roof Claim",
        initial: 12600,
        recovered: 89400,
        review: {
          text: "When the June 2024 rainstorms left my roof in rough shape, I felt overwhelmed until Claim Remedy Adjusters stepped in…He was proactive, thorough, and always on my side.",
          author: "Charlie Ramos",
          timeAgo: "6 months ago",
          googleReviewUrl:
            "https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI",
        },
      }}
    />
  );
}
