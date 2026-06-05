"use client";

import { motion } from "framer-motion";
import { slideInLeft, slideInRight, fadeInUp } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Pricing() {
  return (
    <section className="py-16 lg:py-32">
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
            className="h-full bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-8 flex flex-col gap-6"
          >
            <div>
              <h3 className="font-semibold text-[#1a1a2e] text-xl mb-2">
                Without a Public Adjuster
              </h3>
              <p className="text-sm text-[#5a5a72] leading-relaxed">
                You negotiate alone against a team of insurance adjusters whose
                job is to minimize your payout. Most homeowners settle for a
                fraction.
              </p>
            </div>
            <div>
              <div className="text-2xl font-bebas text-[#8888a0] mb-1">
                Lowball offers
              </div>
              <div className="text-xs text-[#8888a0]">
                Homeowners often settle for a fraction of the claim&apos;s value
              </div>
              <ul className="mt-5 flex flex-col gap-3">
                {[
                  "You handle paperwork alone",
                  "No damage documentation expertise",
                  "Insurance company sets the terms",
                  "Delays, denials, and lowball offers",
                  "Many homeowners recover less than they should",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#5a5a72]">
                    <svg aria-hidden="true" className="w-4 h-4 text-[#8888a0] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
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
            className="h-full bg-[#ffffff] border border-[#2563eb]/30 rounded-2xl p-8 flex flex-col gap-6 shadow-[0_0_40px_rgba(37,99,235,0.08)]"
          >
            <div>
              <h3 className="font-semibold text-[#1a1a2e] text-xl mb-2">
                With Claim Remedy
              </h3>
              <p className="text-sm text-[#5a5a72] leading-relaxed">
                Licensed Florida Public Adjusters in your corner. We handle
                everything from documentation to negotiation to settlement.
              </p>
            </div>
            <div>
              <div className="text-2xl font-bebas text-[#2563eb] mb-1">
                $0 upfront
              </div>
              <div className="text-xs text-[#8888a0]">No recovery, no fee</div>
              <ul className="mt-5 flex flex-col gap-3">
                {[
                  "Full damage inspection & documentation",
                  "Professional claim filing & evidence",
                  "Direct negotiation with insurer",
                  "Settlements built on full documentation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#1a1a2e]">
                    <svg aria-hidden="true" className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-[#8888a0]">
          A 2010 Florida state study (OPPAGA Report 10-06) found that
          policyholders who used a public adjuster recovered substantially more
          on their claims, on average, than those who did not. Individual
          results vary by policy, coverage, and the facts of each claim — past
          results do not guarantee future outcomes.
        </p>
      </div>
    </section>
  );
}
