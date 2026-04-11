"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { caseResults } from "@/data/results";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import StarRating from "@/components/ui/StarRating";
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
            heading='Real recoveries.<br/><span class="text-gradient">Not projections.</span>'
          />
          <p className="text-sm text-[#5a5a72] max-w-md mx-auto leading-relaxed">
            Six claim types. Six real outcomes. Every quote below is a verified
            Google review from a Florida homeowner or business we represented.
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
                className="text-left w-full bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:shadow-[0_8px_40px_rgba(37,99,235,0.12)] hover:border-[#2563eb]/20 transition-[shadow,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
                aria-label={`${r.type} case result — press to see details`}
              >
                {/* Tag */}
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2563eb]">
                  {r.type}
                </p>

                {/* Amounts */}
                <div className="flex items-baseline gap-3">
                  <span className="text-base text-[#8888a0] line-through">
                    {r.initialLabel ??
                      (r.initial ? `$${r.initial.toLocaleString()}` : "")}
                  </span>
                  <span className="text-[#2563eb]">&rarr;</span>
                  <AnimatedCounter
                    value={r.recovered}
                    className="font-bebas text-3xl text-[#1a1a2e] tracking-tight"
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-[#2563eb]/20" />

                {/* Quote */}
                <blockquote className="text-sm text-[#5a5a72] italic leading-relaxed flex-1">
                  &ldquo;{r.review.text}&rdquo;
                </blockquote>

                {/* Reviewer */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1a1a2e]">
                      {r.review.author}
                    </span>
                    <StarRating className="text-sm" />
                  </div>
                  <p className="text-[0.7rem] text-[#8888a0] mt-0.5">
                    Google Review &middot; {r.review.timeAgo}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <CaseResultModal result={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
