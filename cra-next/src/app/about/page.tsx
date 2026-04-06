import type { Metadata } from "next";
import About from "@/components/sections/About";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "About Our Florida Public Adjuster — Claim Remedy Adjusters",
  description:
    "Meet Eddy D Gomez, licensed Florida public adjuster. Claim Remedy represents homeowners and commercial property owners — never the insurance company.",
  openGraph: {
    title: "About Our Florida Public Adjuster — Claim Remedy Adjusters",
    description:
      "Meet Eddy D Gomez, licensed Florida public adjuster representing homeowners — never insurance companies.",
    url: "https://claimremedyadjusters.com/about",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/about" },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <About />
      </div>
    </PageTransition>
  );
}
