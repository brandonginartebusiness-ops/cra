import type { Metadata } from "next";
import Results from "@/components/sections/Results";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Florida Insurance Claim Results — Real Recoveries by Claim Remedy",
  description:
    "Real recoveries from Florida property damage insurance claims. Verified case results from hurricane, water, fire, and roof damage claims — and Google reviews from homeowners we've represented.",
  openGraph: {
    title: "Florida Insurance Claim Results — Real Recoveries by Claim Remedy",
    description:
      "See verified case results from real Florida homeowners. Hurricane, water, fire, and roof damage claim recoveries.",
    url: "https://claimremedyadjusters.com/results",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/results" },
};

export default function ResultsPage() {
  return (
    <PageTransition>
      <div className="pt-24 bg-[#f0ede8]">
        <Results />
      </div>
    </PageTransition>
  );
}
