"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { caseResults } from "@/data/results";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import StarRating from "@/components/ui/StarRating";
import SectionHeading from "@/components/ui/SectionHeading";

const GOOGLE_REVIEWS_URL =
  "https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI";

export default function Results() {
  return (
    <section id="results" className="bg-[#111118] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <SectionHeading
            label="Featured results"
            heading="Real recoveries.<br/>Not projections."
          />
          <p className="text-sm text-[#9999aa] max-w-sm lg:text-right leading-relaxed">
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
          {caseResults.map((r) => (
            <motion.a
              key={r.type}
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-[#16161f] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)] hover:border-[#3b82f6]/20 transition-shadow transition-colors duration-300"
              aria-label={`${r.type} case result`}
            >
              {/* Tag */}
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3b82f6]">
                {r.type}
              </p>

              {/* Amounts */}
              <div className="flex items-baseline gap-3">
                <span className="text-base text-[#666677] line-through">
                  {r.initialLabel ?? (r.initial ? `$${r.initial.toLocaleString()}` : "")}
                </span>
                <span className="text-[#3b82f6]">&rarr;</span>
                <AnimatedCounter
                  value={r.recovered}
                  className="font-bebas text-3xl text-[#f0f0f5] tracking-tight"
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-[#3b82f6]/25" />

              {/* Quote */}
              <blockquote className="text-sm text-[#9999aa] italic leading-relaxed flex-1">
                &ldquo;{r.review.text}&rdquo;
              </blockquote>

              {/* Reviewer */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#f0f0f5]">
                    {r.review.author}
                  </span>
                  <StarRating className="text-sm" />
                </div>
                <p className="text-[0.7rem] text-[#666677] mt-0.5">
                  Google Review &middot; {r.review.timeAgo}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
