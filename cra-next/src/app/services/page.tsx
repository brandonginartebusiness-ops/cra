import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Property Damage Claims — Florida Public Adjuster Services",
  description:
    "Hurricane, water, fire, roof, and appraisal claims handled by licensed Florida public adjusters. Claim Remedy fights for the settlement your policy supports — no recovery, no fee.",
  openGraph: {
    title: "Property Damage Claims — Florida Public Adjuster Services",
    description:
      "Hurricane, water, fire, roof, and appraisal claims handled by licensed Florida public adjusters. No recovery, no fee.",
    url: "https://claimremedyadjusters.com/services",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "https://claimremedyadjusters.com/services" },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <h1 className="sr-only">Florida Public Adjuster Services — Property Damage Claims</h1>
      <ServicesContent />
    </>
  );
}
