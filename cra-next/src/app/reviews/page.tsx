import type { Metadata } from "next";
import ReviewsContent from "./ReviewsContent";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Florida Public Adjuster Reviews & Case Results — Claim Remedy Adjusters",
  description:
    "Verified Google reviews and real case recoveries from Florida homeowners and businesses represented by Claim Remedy Adjusters. Hurricane, water, roof, mold, commercial, and denied claim results.",
  openGraph: {
    title: "Florida Public Adjuster Reviews & Case Results — Claim Remedy Adjusters",
    description:
      "Verified Google reviews and real case recoveries from Florida homeowners we've helped recover fair insurance settlements.",
    url: "https://claimremedyadjusters.com/reviews",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/reviews" },
};

export default function ReviewsPage() {
  return (
    <PageTransition>
      <div className="pt-24 bg-[#f5f3f0]">
        <ReviewsContent />
      </div>
    </PageTransition>
  );
}
