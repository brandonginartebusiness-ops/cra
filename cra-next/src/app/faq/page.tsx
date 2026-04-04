import type { Metadata } from "next";
import FAQ from "@/components/sections/FAQ";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "FAQ — Claim Remedy Adjusters",
  description:
    "Common questions about working with a licensed Florida public adjuster. Learn about costs, timelines, and what to expect.",
};

export default function FAQPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <FAQ />
      </div>
    </PageTransition>
  );
}
