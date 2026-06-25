"use client";

import { m } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import StarRating from "@/components/ui/StarRating";
import { caseResults } from "@/data/results";
import { totalGoogleReviewCount } from "@/data/reviews";

// Feature the most dramatic before→after stories (insurer's offer → our recovery).
const FEATURED_TYPES = ["Commercial Loss", "Hurricane Claim", "Roof Claim", "Denied Claim"];
const wins = FEATURED_TYPES.map((t) => caseResults.find((c) => c.type === t)).filter(
  (c): c is (typeof caseResults)[number] => Boolean(c)
);

const totalRecovered = caseResults.reduce((sum, c) => sum + c.recovered, 0);

function offerLabel(c: (typeof caseResults)[number]): string {
  if (c.initialLabel) return c.initialLabel;
  if (c.initial) return `$${c.initial.toLocaleString()}`;
  return "$0";
}

function multiplier(c: (typeof caseResults)[number]): string | null {
  if (!c.initial || c.initial <= 0) return null;
  return `${(c.recovered / c.initial).toFixed(1)}× the offer`;
}

export default function RecentWins() {
  return (
    <section id="recent-wins" className="py-16 lg:py-32 bg-[#111118]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="flex flex-col items-center text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8888a0] mb-3">
            Recent wins
          </span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-[#f0f0f5] leading-none tracking-tight">
            From lowball offer<br className="md:hidden" /> to full recovery.
          </h2>
          <p className="text-[#9999aa] text-base md:text-lg mt-4 max-w-xl">
            Real outcomes for Florida policyholders. The insurer made the first
            offer — we recovered what the claim was actually worth.
          </p>
        </m.div>

        {/* Trust-stat strip */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            {
              value: (
                <AnimatedCounter value={totalRecovered} format="currency" />
              ),
              label: "Recovered across recent client cases",
            },
            {
              value: <>{totalGoogleReviewCount}+</>,
              label: "Verified 5-star Google reviews",
            },
            {
              value: <>$0</>,
              label: "Upfront — no recovery, no fee",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#16161f] border border-white/8 rounded-2xl px-6 py-7 text-center"
            >
              <div className="font-bebas text-4xl lg:text-5xl text-[#f0f0f5] leading-none">
                {stat.value}
              </div>
              <p className="text-sm text-[#9999aa] mt-2 leading-snug">{stat.label}</p>
            </div>
          ))}
        </m.div>

        {/* Win cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {wins.map((c, i) => {
            const mult = multiplier(c);
            return (
              <m.div
                key={c.type}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: 0.05 * i }}
                className="bg-[#ffffff] border border-[#1a1a2e]/10 rounded-2xl p-5 sm:p-7 flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                    {c.type}
                  </span>
                  {mult && (
                    <span className="inline-flex items-center rounded-full bg-[#10b981]/10 text-[#0f9d6f] text-xs font-semibold px-3 py-1">
                      {mult}
                    </span>
                  )}
                </div>

                {/* Before → After */}
                <div className="flex items-end gap-3 sm:gap-4">
                  <div className="min-w-0">
                    <p className="text-[0.65rem] uppercase tracking-wide text-[#8888a0] mb-1">
                      Insurer offered
                    </p>
                    <p className="font-bebas text-2xl sm:text-3xl text-[#8888a0] leading-none line-through decoration-[#8888a0]/40">
                      {offerLabel(c)}
                    </p>
                  </div>
                  <svg
                    className="mb-1 shrink-0 text-[#2563eb]"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] uppercase tracking-wide text-[#0f9d6f] mb-1">
                      We recovered
                    </p>
                    <AnimatedCounter
                      value={c.recovered}
                      format="currency"
                      className="font-bebas text-4xl sm:text-5xl text-[#1a1a2e] leading-none block"
                    />
                  </div>
                </div>

                {/* Review */}
                <div className="mt-6 pt-5 border-t border-[#1a1a2e]/8">
                  <StarRating className="text-sm mb-2" />
                  <p className="text-sm text-[#3a3a52] leading-relaxed">
                    &ldquo;{c.review.text}&rdquo;
                  </p>
                  <p className="text-xs text-[#8888a0] mt-3">
                    <span className="font-semibold text-[#1a1a2e]">
                      {c.review.author}
                    </span>{" "}
                    · {c.review.timeAgo}
                  </p>
                </div>
              </m.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)] transition-[opacity,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
          >
            Get My Free Claim Review
          </a>
          <p className="text-xs text-[#8888a0]">No recovery, no fee.</p>
        </div>

        <p className="text-center text-xs text-[#8888a0] mt-8 max-w-2xl mx-auto">
          Case results describe outcomes for individual clients in specific
          circumstances. Individual results vary by policy, coverage, and the
          facts of each claim. Past results do not guarantee future outcomes.
        </p>
      </div>
    </section>
  );
}
