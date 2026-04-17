"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import {
  allReviews,
  googleReviewsUrl,
  totalGoogleReviewCount,
  type GoogleReview,
} from "@/data/reviews";
import { caseResults } from "@/data/results";
import StarRating from "@/components/ui/StarRating";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CaseResultModal, { type ModalResult } from "@/components/ui/CaseResultModal";

const filters = [
  { key: "all", label: "All" },
  { key: "hurricane", label: "Hurricane" },
  { key: "water", label: "Water" },
  { key: "roof", label: "Roof" },
  { key: "mold", label: "Mold" },
  { key: "denied", label: "Denied" },
  { key: "commercial", label: "Commercial" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

const recoveryRows = [...caseResults]
  .sort((a, b) => b.recovered - a.recovered)
  .map((r) => ({ type: r.type, recovered: r.recovered }));
const maxRecovered = Math.max(...recoveryRows.map((r) => r.recovered));
const formatK = (n: number) => `$${Math.round(n / 1000)}K`;

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <motion.a
      layout
      href={googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="block bg-[#ffffff] rounded-2xl p-6 border border-[#1a1a2e]/8 hover:border-[#2563eb]/25 transition-[border-color] duration-150 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-3">
        <StarRating className="text-sm" />
        {review.claimType && (
          <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-2 py-0.5 rounded-full">
            {review.claimType}
          </span>
        )}
      </div>
      <p className="text-sm text-[#3a3a52] italic leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-1">
        <div
          aria-hidden="true"
          className="flex-shrink-0 h-9 w-9 rounded-full bg-[#2563eb]/10 flex items-center justify-center text-sm font-semibold text-[#2563eb]"
        >
          {review.author.trim().charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#1a1a2e] leading-tight truncate">
            {review.author}
          </p>
          <p className="text-[0.7rem] text-[#8888a0] leading-tight mt-0.5">
            Google Review &middot; {review.timeAgo}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

export default function ReviewsContent() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selected, setSelected] = useState<ModalResult | null>(null);

  const filtered =
    activeFilter === "all"
      ? allReviews
      : allReviews.filter((r) => r.claimType === activeFilter);

  return (
    <section className="bg-[#f5f3f0] py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col items-center text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8888a0] mb-3">
            Google Reviews &amp; Case Results
          </span>
          <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-[#1a1a2e] leading-none tracking-tight mb-4">
            What clients say.<br className="md:hidden" /> What we recover.
          </h1>
          <p className="text-base text-[#5a5a72] max-w-xl">
            Every recovery below is a real Florida client case. Every quote is a verified Google review.
          </p>
        </motion.div>

        {/* Main proof card — rating + recoveries bar chart */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
          className="bg-[#ffffff] border border-[#1a1a2e]/10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(26,26,46,0.12)] overflow-hidden mb-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-10 p-8 lg:p-10">
            {/* Left: big rating */}
            <div className="flex flex-col items-center lg:items-start lg:border-r lg:border-[#1a1a2e]/10 lg:pr-10">
              <div className="font-bebas text-7xl lg:text-[7rem] text-[#1a1a2e] leading-none">
                5.0
              </div>
              <StarRating className="text-xl mt-2" />
              <p className="text-sm text-[#5a5a72] mt-3">
                <strong className="text-[#1a1a2e]">{totalGoogleReviewCount}+</strong> verified reviews
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#8888a0] mt-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Powered by Google
              </span>
            </div>

            {/* Right: recoveries bar chart */}
            <div className="min-w-0">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#8888a0] mb-4">
                Recent recoveries by claim type
              </p>
              <div className="flex flex-col gap-3.5">
                {recoveryRows.map((row, i) => {
                  const pct = (row.recovered / maxRecovered) * 100;
                  return (
                    <div
                      key={row.type}
                      className="grid grid-cols-[1fr_auto] items-center gap-4 text-sm"
                    >
                      <div className="h-2.5 bg-[#1a1a2e]/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{
                            duration: 0.9,
                            delay: 0.05 * i,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
                        />
                      </div>
                      <div className="flex items-baseline gap-2 justify-end whitespace-nowrap">
                        <span className="font-bebas text-xl text-[#1a1a2e] leading-none tracking-tight">
                          {formatK(row.recovered)}
                        </span>
                        <span className="text-xs text-[#5a5a72]">
                          {row.type}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Case results grid */}
        <div id="case-results" className="scroll-mt-24 mb-16">
          <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
            <h2 className="font-bebas text-3xl md:text-4xl text-[#1a1a2e] tracking-tight">
              Real recoveries.
            </h2>
            <p className="text-xs text-[#8888a0] hidden sm:block">
              Tap any card for the full story
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
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
                  className="text-left w-full bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-6 flex flex-col gap-5 cursor-pointer hover:border-[#2563eb]/25 transition-[border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
                  aria-label={`${r.type} case result — press to see details`}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#2563eb]">
                    {r.type}
                  </p>

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
        </div>

        {/* Reviews list */}
        <div id="reviews-list" className="scroll-mt-24">
          <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
            <h2 className="font-bebas text-3xl md:text-4xl text-[#1a1a2e] tracking-tight">
              What clients say.
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 ${
                  activeFilter === f.key
                    ? "bg-[#2563eb] text-white border border-[#2563eb]"
                    : "bg-[#ffffff] text-[#5a5a72] border border-[#1a1a2e]/10 hover:border-[#2563eb]/30 hover:text-[#1a1a2e]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <p className="text-center text-[#8888a0] py-12">
              No reviews for this category yet.
            </p>
          )}

          <div className="mt-10 text-center">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
            >
              See all verified Google reviews
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>

          <p className="text-center text-xs text-[#8888a0] mt-8 max-w-2xl mx-auto">
            Recoveries shown are illustrative outcomes from recent client cases. Individual results vary by policy, coverage, and the facts of each claim.
          </p>
        </div>
      </div>

      <CaseResultModal result={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
