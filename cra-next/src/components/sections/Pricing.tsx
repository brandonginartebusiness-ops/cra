"use client";

import { motion } from "framer-motion";
import { slideInLeft, slideInRight, fadeInUp } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Pricing() {
  return (
    <section className="bg-[#111118] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mb-14"
        >
          <SectionHeading
            label="Why Claim Remedy?"
            heading="Simple, transparent pricing."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Without */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={slideInLeft}
            className="bg-[#0a0a0f] border border-white/8 rounded-2xl p-8 flex flex-col gap-6"
          >
            <div>
              <h3 className="font-semibold text-[#f0f0f5] text-xl mb-2">
                Without a Public Adjuster
              </h3>
              <p className="text-sm text-[#9999aa] leading-relaxed">
                You negotiate alone against a team of insurance adjusters whose
                job is to minimize your payout. Most homeowners settle for a
                fraction.
              </p>
            </div>
            <div>
              <div className="text-2xl font-bebas text-[#9999aa] mb-1">
                Time
              </div>
              <div className="text-xs text-[#666677]">
                More pressure, more paperwork
              </div>
              <ul className="mt-5 flex flex-col gap-3">
                {[
                  "You handle paperwork alone",
                  "No damage documentation expertise",
                  "Insurance company sets the terms",
                  "Delays, denials, and lowball offers",
                  "Many homeowners recover less than they should",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#9999aa]">
                    <span className="text-[#666677] mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* With CRA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={slideInRight}
            className="bg-[#0a0a0f] border border-[#3b82f6]/30 rounded-2xl p-8 flex flex-col gap-6 shadow-[0_0_40px_rgba(59,130,246,0.08)]"
          >
            <div>
              <h3 className="font-semibold text-[#f0f0f5] text-xl mb-2">
                With Claim Remedy
              </h3>
              <p className="text-sm text-[#9999aa] leading-relaxed">
                Licensed Florida Public Adjusters in your corner. We handle
                everything from documentation to negotiation to settlement.
              </p>
            </div>
            <div>
              <div className="text-2xl font-bebas text-[#3b82f6] mb-1">
                $0 upfront
              </div>
              <div className="text-xs text-[#666677]">No recovery, no fee</div>
              <ul className="mt-5 flex flex-col gap-3">
                {[
                  "Full damage inspection & documentation",
                  "Professional claim filing & evidence",
                  "Direct negotiation with insurer",
                  "Average 3–5× higher settlements",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#f0f0f5]">
                    <span className="text-[#3b82f6] mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
