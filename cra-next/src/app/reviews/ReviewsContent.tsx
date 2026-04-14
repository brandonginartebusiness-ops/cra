"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import {
  allReviews,
  featuredReviews,
  googleReviewsUrl,
  type GoogleReview,
} from "@/data/reviews";
import StarRating from "@/components/ui/StarRating";
import SectionHeading from "@/components/ui/SectionHeading";

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

const featuredIds = new Set(featuredReviews.map((r) => r.id));

function ReviewCard({
  review,
  featured = false,
}: {
  review: GoogleReview;
  featured?: boolean;
}) {
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
      className={`block bg-[#0a0a0f] rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)] transition-[box-shadow,border-color] duration-300 ${
        featured
          ? "border-2 border-[#d4a853]/30 hover:border-[#d4a853]/50"
          : "border border-white/8 hover:border-[#3b82f6]/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <StarRating className="text-sm" />
        {review.claimType && (
          <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-[#3b82f6] bg-[#3b82f6]/10 px-2 py-0.5 rounded-full">
            {review.claimType}
          </span>
        )}
      </div>
      <p className="text-sm text-[#9999aa] italic leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      <div>
        <p className="text-sm font-semibold text-[#f0f0f5]">{review.author}</p>
        <p className="text-[0.7rem] text-[#666677]">
          Google Review &middot; {review.timeAgo}
        </p>
      </div>
    </motion.a>
  );
}

export default function ReviewsContent() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "all"
      ? allReviews
      : allReviews.filter((r) => r.claimType === activeFilter);

  const featuredFiltered = filtered.filter((r) => featuredIds.has(r.id));
  const remainingFiltered = filtered.filter((r) => !featuredIds.has(r.id));

  return (
    <section className="bg-[#0a0a0f] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-6"
        >
          <SectionHeading
            label="Google Reviews"
            heading="What homeowners say"
            className="text-center"
            dark
          />
          <p className="text-lg text-[#9999aa] mt-4">
            5.0{" "}
            <span className="text-[#d4a853]">&#9733;</span> &middot; Verified
            Google Reviews
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeFilter === f.key
                  ? "bg-[#3b82f6] text-white"
                  : "bg-[#0a0a0f] text-[#9999aa] border border-white/8 hover:border-[#3b82f6]/30 hover:text-[#f0f0f5]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Featured reviews */}
        {featuredFiltered.length > 0 && (
          <>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#d4a853] mb-5">
              Featured Reviews
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              <AnimatePresence mode="popLayout">
                {featuredFiltered.map((r) => (
                  <ReviewCard key={r.id} review={r} featured />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Remaining reviews */}
        {remainingFiltered.length > 0 && (
          <>
            {featuredFiltered.length > 0 && (
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#666677] mb-5">
                More Reviews
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {remainingFiltered.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-[#666677] py-12">
            No reviews for this category yet.
          </p>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#3b82f6] hover:underline"
          >
            See all reviews on Google
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
