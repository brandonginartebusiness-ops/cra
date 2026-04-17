"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { caseResults } from "@/data/results";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionHeading from "@/components/ui/SectionHeading";
import CaseResultModal, { type ModalResult } from "@/components/ui/CaseResultModal";

export default function Results() {
  const [selected, setSelected] = useState<ModalResult | null>(null);

  return (
    <section id="results" className="bg-[#f0ede8] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex flex-col items-center text-center gap-4 mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <SectionHeading
            label="Featured results"
            heading={<>Real recoveries.<br /><span className="text-gradient">Not projections.</span></>}
          />
          <p className="text-sm text-[#5a5a72] max-w-md mx-auto leading-relaxed">
            Six claim types. Six real recoveries for Florida homeowners and
            businesses we represented. Tap any card for the full story.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {caseResults.map((r) => {
            const layoutId = `result-card-${r.type}`;
            return (
              <motion.button
                key={r.type}
                layoutId={layoutId}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() =>
                  setSelected({
                    layoutId,
                    type: r.type,
                    initial: r.initial,
                    initialLabel: r.initialLabel,
                    recovered: r.recovered,
                    review: r.review,
                  })
                }
                className="text-left w-full bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-6 flex flex-col gap-5 cursor-pointer hover:shadow-[0_8px_40px_rgba(37,99,235,0.12)] hover:border-[#2563eb]/20 transition-[shadow,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
                aria-label={`${r.type} case result — press to see details`}
              >
                {/* Tag */}
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2563eb]">
                  {r.type}
                </p>

                {/* Amounts */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-widest text-[#8888a0]">
                    Insurer&apos;s initial offer
                  </span>
                  <span className="text-lg text-[#8888a0] line-through">
                    {r.initialLabel ??
                      (r.initial ? `$${r.initial.toLocaleString()}` : "")}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-widest text-[#2563eb]">
                    Recovered for client
                  </span>
                  <AnimatedCounter
                    value={r.recovered}
                    className="font-bebas text-4xl text-[#1a1a2e] tracking-tight leading-none"
                  />
                </div>

                {/* CTA cue */}
                <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563eb]">
                  See the full story
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
          >
            See all verified Google reviews
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <CaseResultModal result={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
