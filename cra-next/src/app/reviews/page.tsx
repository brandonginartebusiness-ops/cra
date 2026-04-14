import type { Metadata } from "next";
import ReviewsContent from "./ReviewsContent";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Florida Public Adjuster Reviews — Claim Remedy Adjusters",
  description:
    "Verified Google reviews from Florida homeowners and businesses represented by Claim Remedy Adjusters. See what clients say about our public adjuster services.",
  openGraph: {
    title: "Florida Public Adjuster Reviews — Claim Remedy Adjusters",
    description:
      "Verified Google reviews from Florida homeowners we've helped recover fair insurance settlements.",
    url: "https://claimremedyadjusters.com/reviews",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/reviews" },
};

export default function ReviewsPage() {
  return (
    <PageTransition>
      <div className="pt-24 bg-[#0a0a0f]">
        <ReviewsContent />
      </div>
    </PageTransition>
  );
}
