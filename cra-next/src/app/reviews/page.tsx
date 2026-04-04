import type { Metadata } from "next";
import ReviewsContent from "./ReviewsContent";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Reviews — Claim Remedy Adjusters",
  description:
    "Verified Google reviews from Florida homeowners and businesses represented by Claim Remedy Adjusters.",
};

export default function ReviewsPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <ReviewsContent />
      </div>
    </PageTransition>
  );
}
