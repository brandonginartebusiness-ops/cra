import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Property Damage Claims — Florida Public Adjuster Services",
  description:
    "Hurricane, water, fire, roof, and appraisal claims handled by licensed Florida public adjusters. Claim Remedy fights for the settlement your policy supports — no recovery, no fee.",
  openGraph: {
    title: "Property Damage Claims — Florida Public Adjuster Services",
    description:
      "Hurricane, water, fire, roof, and appraisal claims handled by licensed Florida public adjusters. No recovery, no fee.",
    url: "https://claimremedyadjusters.com/services",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/services" },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
