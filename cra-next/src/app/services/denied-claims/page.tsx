import type { Metadata } from "next";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export const metadata: Metadata = {
  title: "Denied Insurance Claim Help Florida — Public Adjuster",
  description:
    "A denied or underpaid Florida claim is not the end. We review the denial, find what the insurer missed or misapplied, and re-document the loss to fight for the payout you're owed. No recovery, no fee.",
  openGraph: {
    title: "Denied Insurance Claim Help Florida — Claim Remedy Adjusters",
    description:
      "Florida public adjuster for denied and underpaid claims. We re-open the file, rebuild the documentation, and challenge the carrier's basis for denial.",
    url: "https://claimremedyadjusters.com/services/denied-claims",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "https://claimremedyadjusters.com/services/denied-claims" },
};

export default function DeniedClaimsPage() {
  return (
    <ServicePageLayout
      title="Denied Claim Help"
      subtitle="A denial is not the end of your claim. It's often the beginning of a stronger one."
      serviceSlug="denied-claims"
      description={[
        "A denial letter feels final — but in Florida, a large share of denied and underpaid claims are reversed once they're properly documented and challenged. Carriers deny for predictable reasons: missed deadlines, incomplete documentation, a disputed cause of loss, or a policy exclusion applied too broadly. None of those reasons mean your loss wasn't covered.",
        "The problem is that most homeowners accept the denial at face value, or appeal with the same paperwork that was rejected the first time. Insurers count on that. A denial that simply says 'wear and tear' or 'pre-existing damage' can often be answered with an engineering report, a corrected timeline, or the right reading of your own policy language.",
        "Claim Remedy starts by pulling apart the denial itself — the exact basis the carrier cited — then rebuilds the claim file to answer it directly. We bring in the experts the situation calls for, re-document the loss, and re-present the claim with the evidence the first submission lacked. If your claim was denied or shorted, get a second set of eyes before you accept it.",
      ]}
      handles={[
        "Claims denied for 'wear and tear' or 'pre-existing damage'",
        "Disputed cause-of-loss and coverage determinations",
        "Underpaid claims and lowball settlement offers",
        "Denials based on documentation or deadline technicalities",
        "Re-opening and re-presenting a previously denied claim",
        "Policy-language disputes and misapplied exclusions",
      ]}
      caseResult={{
        type: "Denied Claim",
        initial: 0,
        initialLabel: "$0 denied",
        recovered: 67200,
        review: {
          text: "The insurance company was very difficult but Eddy was key in staying on top of them to get us best resolution. The team was very transparent from beginning to end.",
          author: "Mayra Peralta",
          timeAgo: "6 months ago",
          googleReviewUrl:
            "https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI",
        },
      }}
    />
  );
}
