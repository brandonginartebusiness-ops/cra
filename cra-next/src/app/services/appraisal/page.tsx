import type { Metadata } from "next";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export const metadata: Metadata = {
  title: "Insurance Appraisal Florida — Independent Appraisal Representation",
  description:
    "Licensed public adjuster appraisal representation for Florida homeowners. When you and your insurer disagree on the value of your claim, invoke the appraisal clause and let Claim Remedy fight for you.",
  openGraph: {
    title: "Insurance Appraisal Florida — Claim Remedy Adjusters",
    description:
      "Know your rights. Florida homeowners can invoke the appraisal clause to get an independent valuation — we represent you.",
    url: "https://claimremedyadjusters.com/services/appraisal",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/services/appraisal" },
};

export default function AppraisalPage() {
  return (
    <ServicePageLayout
      title="Appraisal Services"
      subtitle="When you and your insurer can't agree on the value, we step in."
      heroImage=""
      serviceSlug="appraisal"
      description={[
        "The appraisal process is a policyholder's right under most Florida insurance policies. When you and your insurance company cannot agree on the amount of a covered loss, either party can invoke the appraisal clause — bringing in independent appraisers to determine the fair value of the claim.",
        "Most homeowners don't know this option exists, and insurers certainly aren't going to tell you about it. The appraisal process bypasses the standard negotiation and puts the valuation in the hands of qualified, independent professionals who assess the damage on its merits — not on the insurer's budget.",
        "Claim Remedy provides experienced appraisal representation for Florida homeowners. We prepare detailed damage assessments, compile supporting documentation, and represent your interests throughout the appraisal process. Our goal is to reach a fair and accurate valuation that reflects the true cost of restoring your property.",
      ]}
      handles={[
        "Disputed claim amounts where insurer and homeowner disagree",
        "Underpaid claims where the settlement doesn't cover repair costs",
        "Complex claims with multiple damage types requiring independent valuation",
        "Reopened claims where additional damage was discovered after initial settlement",
        "Commercial property appraisals for business owners",
        "Umpire selection assistance when appraisers cannot agree",
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
