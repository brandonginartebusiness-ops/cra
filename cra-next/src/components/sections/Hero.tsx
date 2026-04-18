"use client";

import { motion, type Variants } from "framer-motion";
import LeadCaptureForm from "@/components/ui/LeadCaptureForm";

const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const badges = [
  "No recovery, no fee",
  "Licensed in all 67 FL counties",
  "5.0 ★ Google Rating",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#faf8f5] pt-28 pb-16 lg:pt-32 lg:pb-20"
    >
      {/* Blue top-right accent blob */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[55%] h-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 85% 30%, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Teal bottom-left soft glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[40%] h-1/2"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 10% 90%, rgba(13,148,136,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Left — copy */}
          <motion.div
            className="flex flex-col text-center lg:text-left"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={heroItem}
              className="font-bebas font-extrabold text-[clamp(2.1rem,4.6vw,4.5rem)] leading-[1.05] tracking-tight text-[#1a1a2e]"
            >
              Denied, Lowballed, or Ignored by Your Insurance?{" "}
              <span className="text-gradient">You May Be Owed Significantly More.</span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-6 text-sm md:text-base text-[#5a5a72] leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Licensed FL public adjusters. Recent client: insurer offered{" "}
              <span className="font-semibold text-[#1a1a2e]">$18K</span> &rarr;{" "}
              we recovered{" "}
              <span className="font-semibold text-[#1a1a2e]">$147K</span>. Free
              claim review. You pay $0 unless we beat what your insurance
              already offered.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-7 flex flex-wrap justify-center lg:justify-start gap-3"
            >
              <a
                href="tel:+17862237867"
                className="inline-flex items-center gap-2 bg-[#1a1a2e] text-white font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-[opacity,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
              >
                Call (786) 223-7867
              </a>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-2.5"
            >
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3.5 py-1.5 rounded-full border border-[#2563eb]/20 bg-[#2563eb]/8 text-[#2563eb] text-xs md:text-sm font-medium tracking-wide"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full"
          >
            <LeadCaptureForm servicePage="homepage" ctaText="Get My Free Claim Review" />
          </motion.div>
        </div>
      </div>

      {/* Seamless bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #f0ede8 100%)",
        }}
      />
    </section>
  );
}
