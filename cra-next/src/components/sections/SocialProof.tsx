"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import StarRating from "@/components/ui/StarRating";
import { caseResults } from "@/data/results";
import { allReviews, googleReviewsUrl, totalGoogleReviewCount } from "@/data/reviews";

const recoveryRows = [...caseResults]
  .sort((a, b) => b.recovered - a.recovered)
  .map((r) => ({ type: r.type, recovered: r.recovered }));

const maxRecovered = Math.max(...recoveryRows.map((r) => r.recovered));

const CLAIM_CHIPS = [
  "Hurricane",
  "Water",
  "Roof",
  "Mold",
  "Denied",
  "Commercial",
];

const resultsAuthors = new Set(caseResults.map((r) => r.review.author));
const displayReviews = allReviews
  .filter((r) => !resultsAuthors.has(r.author))
  .slice(0, 4);

const formatK = (n: number) => `$${Math.round(n / 1000)}K`;

export default function SocialProof() {
  return (
    <section id="social-proof" className="bg-[#f5f3f0] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="flex flex-col items-center text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8888a0] mb-3">
            Social proof
          </span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-[#1a1a2e] leading-none tracking-tight">
            What clients say.<br className="md:hidden" /> What we recover.
          </h2>
        </motion.div>

        {/* Main proof card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
          className="bg-[#ffffff] border border-[#1a1a2e]/10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(26,26,46,0.12)] overflow-hidden"
        >
          {/* Top: Rating + Bar chart */}
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

          {/* Chip row */}
          <div className="px-8 lg:px-10 pb-7 border-t border-[#1a1a2e]/8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#8888a0] pt-6 pb-3">
              5.0 across every claim type
            </p>
            <div className="flex flex-wrap gap-2">
              {CLAIM_CHIPS.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#1a1a2e]/10 bg-[#faf8f5] px-3 py-1.5 text-xs"
                >
                  <span className="font-semibold text-[#10b981]">5.0</span>
                  <span className="text-[#1a1a2e]">{label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Review list */}
          <ul className="border-t border-[#1a1a2e]/8 divide-y divide-[#1a1a2e]/8">
            {displayReviews.map((r) => (
              <li key={r.id} className="px-8 lg:px-10 py-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      aria-hidden="true"
                      className="flex-shrink-0 h-9 w-9 rounded-full bg-[#2563eb]/10 flex items-center justify-center text-sm font-semibold text-[#2563eb]"
                    >
                      {r.author.trim().charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1a1a2e] leading-tight truncate">
                        {r.author}
                      </p>
                      <p className="text-[0.7rem] text-[#8888a0] leading-tight mt-0.5">
                        {r.timeAgo}
                      </p>
                    </div>
                  </div>
                  <StarRating className="text-sm shrink-0 mt-1" />
                </div>
                <p className="text-sm text-[#3a3a52] leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
              </li>
            ))}
          </ul>

          {/* See all */}
          <div className="border-t border-[#1a1a2e]/8 px-8 lg:px-10 py-5 text-center">
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
        </motion.div>

        <p className="text-center text-xs text-[#8888a0] mt-6 max-w-2xl mx-auto">
          Recoveries shown are illustrative outcomes from recent client cases. Individual results vary by policy, coverage, and the facts of each claim.
        </p>
      </div>
    </section>
  );
}
