"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import StarRating from "@/components/ui/StarRating";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";
import { allReviews, googleReviewsUrl } from "@/data/reviews";

const claimLabel = (t?: string) => {
  switch (t) {
    case "hurricane":
      return "Hurricane Claim";
    case "water":
      return "Water Damage Claim";
    case "roof":
      return "Roof Claim";
    case "mold":
      return "Mold Claim";
    case "denied":
      return "Denied Claim Reopened";
    case "commercial":
      return "Commercial Claim";
    default:
      return "Verified Google Review";
  }
};

const testimonials: Testimonial[] = allReviews.map((r) => ({
  text: r.text,
  name: r.author,
  role: claimLabel(r.claimType),
}));

const firstColumn = testimonials.slice(0, 4);
const secondColumn = testimonials.slice(4, 8);
const thirdColumn = testimonials.slice(8, 12);

export default function Reviews() {
  return (
    <section id="testimonials" className="bg-[#f5f3f0] py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Trust header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8888a0] mb-3">
            Social proof
          </span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-[#1a1a2e] leading-none tracking-tight mb-6">
            What homeowners say
          </h2>

          <div className="inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full border border-[#1a1a2e]/10 bg-[#ffffff] px-6 py-3 shadow-sm">
            <span className="inline-flex items-center gap-2">
              <span className="font-bebas text-2xl text-[#1a1a2e] leading-none">5.0</span>
              <StarRating className="text-base" />
            </span>
            <span className="h-4 w-px bg-[#1a1a2e]/10 hidden sm:block" />
            <span className="text-sm text-[#5a5a72]">
              <strong className="text-[#1a1a2e]">{allReviews.length}+</strong> verified Google reviews
            </span>
            <span className="h-4 w-px bg-[#1a1a2e]/10 hidden sm:block" />
            <span className="inline-flex items-center gap-1.5 text-xs text-[#5a5a72]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Powered by Google
            </span>
          </div>
        </motion.div>

        {/* Scrolling columns */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={22} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={28} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={25} />
        </div>

        <div className="mt-10 text-center">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
          >
            See all reviews on Google
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
