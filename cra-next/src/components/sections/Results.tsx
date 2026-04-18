"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { caseResults } from "@/data/results";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionHeading from "@/components/ui/SectionHeading";
import CaseResultModal, { type ModalResult } from "@/components/ui/CaseResultModal";

/** Format a number as "$NK" for compact display on support tiles */
const formatK = (n: number) => {
  if (n >= 1000) {
    const k = n / 1000;
    return `$${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  return `$${n}`;
};

export default function Results() {
  const [selected, setSelected] = useState<ModalResult | null>(null);

  const [featured, ...supporting] = caseResults;
  const featuredLayoutId = `result-card-${featured.type}`;

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

        {/* ── Featured hero case ──────────────────────────────── */}
        <motion.button
          layoutId={featuredLayoutId}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
          onClick={() =>
            setSelected({
              layoutId: featuredLayoutId,
              type: featured.type,
              initial: featured.initial,
              initialLabel: featured.initialLabel,
              recovered: featured.recovered,
              review: featured.review,
            })
          }
          className="relative w-full text-left bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-10 md:p-14 mb-5 overflow-hidden cursor-pointer hover:shadow-[0_16px_60px_rgba(37,99,235,0.12)] hover:border-[#2563eb]/25 transition-[box-shadow,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 group"
          aria-label={`${featured.type} featured case result — press to see details`}
        >
          {/* Ribbon */}
          <div className="absolute top-7 right-7 flex items-center gap-2 text-[0.55rem] font-bold tracking-[0.22em] uppercase text-[#b8892e] font-mono">
            <span className="hidden sm:block w-6 h-px bg-[#b8892e]" />
            Signature recovery
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
            {/* Left: tag, initial offer, quote */}
            <div>
              <p className="text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[#2563eb] font-mono">
                {featured.type}
              </p>
              <p className="mt-5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#8888a0]">
                Insurer&apos;s initial offer
              </p>
              <div className="mt-1.5 font-bebas font-extrabold text-5xl md:text-6xl text-[#8888a0] line-through leading-none tabular-nums">
                {featured.initialLabel ??
                  (featured.initial ? `$${featured.initial.toLocaleString()}` : "")}
              </div>

              <blockquote className="mt-6 pl-5 border-l-2 border-[#b8892e] font-serif italic text-base md:text-lg leading-snug text-[#1a1a2e]">
                &ldquo;{featured.review.text}&rdquo;
                <footer className="mt-3 not-italic font-sans font-semibold text-[0.55rem] tracking-[0.18em] uppercase text-[#5a5a72]">
                  — {featured.review.author} · {featured.review.timeAgo}
                </footer>
              </blockquote>
            </div>

            {/* Right: massive recovered figure */}
            <div className="lg:border-l lg:border-[#1a1a2e]/8 lg:pl-12 flex flex-col gap-2.5">
              <div className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-[#2563eb]">
                Recovered for client
              </div>
              <AnimatedCounter
                value={featured.recovered}
                className="font-bebas font-extrabold text-[clamp(5rem,12vw,10rem)] text-[#1a1a2e] leading-[0.85] tracking-tight tabular-nums"
              />
              <div className="mt-2.5 text-[0.58rem] font-bold tracking-[0.22em] uppercase text-[#2563eb] inline-flex items-center gap-2 transition-[gap] duration-200 group-hover:gap-3">
                See the full story
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </motion.button>

        {/* ── Supporting row ──────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {supporting.map((r) => {
            const layoutId = `result-card-${r.type}`;
            return (
              <motion.button
                key={r.type}
                layoutId={layoutId}
                variants={fadeInUp}
                whileHover={{ y: -3 }}
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
                className="text-left bg-[#ffffff] border border-[#1a1a2e]/8 rounded-xl p-5 flex flex-col gap-2.5 cursor-pointer hover:border-[#2563eb]/25 transition-[border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
                aria-label={`${r.type} case result — press to see details`}
              >
                <span className="text-[0.5rem] font-bold uppercase tracking-[0.18em] text-[#2563eb] font-mono">
                  {r.type}
                </span>
                <span className="text-[0.6rem] text-[#8888a0] line-through tabular-nums">
                  {r.initialLabel ??
                    (r.initial ? `$${r.initial.toLocaleString()}` : "")}
                </span>
                <span className="font-bebas font-extrabold text-2xl text-[#1a1a2e] leading-none tracking-tight tabular-nums">
                  {formatK(r.recovered)}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="mt-12 text-center">
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
