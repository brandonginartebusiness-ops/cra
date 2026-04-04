import type { Metadata } from "next";
import Results from "@/components/sections/Results";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Results — Claim Remedy Adjusters",
  description:
    "Real recoveries from Florida property damage claims. See verified case results and Google reviews from homeowners we've represented.",
};

export default function ResultsPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <Results />
      </div>
    </PageTransition>
  );
}
