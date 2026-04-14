import type { Metadata } from "next";
import FAQ from "@/components/sections/FAQ";
import FAQSchema from "@/components/seo/FAQSchema";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Public Adjuster FAQ — Florida Insurance Claim Questions Answered",
  description:
    "Common questions about working with a licensed Florida public adjuster. Learn about costs, timelines, denied claims, and what to expect from Claim Remedy Adjusters.",
  openGraph: {
    title: "Public Adjuster FAQ — Florida Insurance Claim Questions Answered",
    description:
      "Answers to the most common questions about Florida public adjusters — costs, timelines, denied claims, and more.",
    url: "https://claimremedyadjusters.com/faq",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/faq" },
};

export default function FAQPage() {
  return (
    <PageTransition>
      <FAQSchema />
      <div className="pt-24 bg-[#f0ede8]">
        <FAQ />
      </div>
    </PageTransition>
  );
}
