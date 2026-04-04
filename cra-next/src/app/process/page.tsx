import type { Metadata } from "next";
import Process from "@/components/sections/Process";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Our Process — Claim Remedy Adjusters",
  description:
    "From damage to recovery in four steps. Learn how Claim Remedy handles your Florida property insurance claim from start to finish.",
};

export default function ProcessPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <Process />
      </div>
    </PageTransition>
  );
}
