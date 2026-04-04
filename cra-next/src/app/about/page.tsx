import type { Metadata } from "next";
import About from "@/components/sections/About";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "About — Claim Remedy Adjusters",
  description:
    "Meet Eddy D Gomez, licensed Florida public adjuster. Learn about Claim Remedy's mission to represent homeowners — never insurance companies.",
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
