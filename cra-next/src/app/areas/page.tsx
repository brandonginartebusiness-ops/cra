import type { Metadata } from "next";
import AreasContent from "./AreasContent";

export const metadata: Metadata = {
  title: "Service Areas — Public Adjusters Across Florida | Claim Remedy Adjusters",
  description:
    "Licensed public adjusters serving all 67 Florida counties. We handle hurricane, water, fire, roof, and mold damage claims in Miami, Fort Lauderdale, Tampa, Orlando, and every major Florida city.",
  openGraph: {
    title: "Florida Public Adjuster Service Areas — Claim Remedy Adjusters",
    description:
      "Licensed to represent homeowners and businesses across all of Florida. Find your city for local claim expertise.",
    url: "https://claimremedyadjusters.com/areas",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/areas" },
};

export default function AreasPage() {
  return <AreasContent />;
}
