import type { Metadata } from "next";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export const metadata: Metadata = {
  title: "Commercial Property Claim Florida",
  description:
    "Florida commercial property claims carry higher stakes: business interruption, complex valuations, and tougher carrier scrutiny. We handle commercial losses end to end so your business recovers fully. No recovery, no fee.",
  openGraph: {
    title: "Commercial Property Claim Help Florida — Claim Remedy Adjusters",
    description:
      "Florida public adjuster for commercial property claims — business interruption, complex valuations, and large-loss documentation handled end to end.",
    url: "https://claimremedyadjusters.com/services/commercial-property",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "https://claimremedyadjusters.com/services/commercial-property" },
};

export default function CommercialPropertyPage() {
  return (
    <ServicePageLayout
      title="Commercial Property Claims"
      subtitle="Higher stakes, complex valuations, and a carrier that brings its own experts. So do we."
      serviceSlug="commercial-property"
      description={[
        "A commercial property loss is rarely just about the building. Damage to a storefront, office, warehouse, or rental property can halt operations, interrupt income, and put leases and obligations at risk. The claim isn't only the cost to repair — it's the cost of being unable to operate while you do.",
        "Commercial policies are also more complex than residential ones: business interruption coverage, extra-expense provisions, actual loss sustained calculations, co-insurance penalties, and detailed proof-of-loss requirements. Carriers assign their own adjusters and forensic accountants to these files, and an unrepresented business owner is negotiating against a team built to minimize the payout.",
        "Claim Remedy levels that field. We document the physical damage and the financial loss together — repair scope, lost income, extra expenses, and the records needed to support every line. We coordinate with your accountant and the right experts, prepare the proof of loss, and negotiate the full value of the claim so your business can get back to operating, not arguing.",
      ]}
      handles={[
        "Business interruption and lost-income claims",
        "Storm, water, fire, and roof damage to commercial buildings",
        "Complex valuations, co-insurance, and proof-of-loss preparation",
        "Retail, office, warehouse, and multi-unit rental properties",
        "Extra-expense and continuing-expense documentation",
        "Large-loss claims and disputes with carrier adjusters",
      ]}
      caseResult={{
        type: "Commercial Loss",
        initial: 22100,
        recovered: 156800,
        review: {
          text: "Excellent service from start to finish. Eddy and his team handled everything professionally and kept us informed throughout the entire process. They recovered significantly more than what our insurance company initially offered.",
          author: "Roberto Martinez",
          timeAgo: "4 months ago",
          googleReviewUrl:
            "https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI",
        },
      }}
    />
  );
}
