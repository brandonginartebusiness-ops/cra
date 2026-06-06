import type { Metadata } from "next";
import Process from "@/components/sections/Process";
import PageTransition from "@/components/ui/PageTransition";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "How We Handle Your Florida Insurance Claim — Our Process",
  description:
    "From damage to recovery in four steps. Learn how Claim Remedy's licensed public adjusters handle your Florida property insurance claim from inspection to settlement.",
  openGraph: {
    title: "How We Handle Your Florida Insurance Claim — Our Process",
    description:
      "Four steps from damage to recovery. See how Florida public adjusters at Claim Remedy handle your claim.",
    url: "https://claimremedyadjusters.com/process",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "https://claimremedyadjusters.com/process" },
};

export default function ProcessPage() {
  return (
    <PageTransition>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ]}
      />
      <div className="pt-24 bg-[#f0ede8]">
        <h1 className="sr-only">How Our Florida Public Adjuster Claim Process Works</h1>
        <Process />
      </div>
    </PageTransition>
  );
}
