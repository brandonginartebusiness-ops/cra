"use client";

import { motion, type Variants } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

let firstHeroMount = true;

const heroStagger = (delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: delay },
  },
});

export default function Hero() {
  const isFirst = firstHeroMount;
  if (firstHeroMount) firstHeroMount = false;
  const animDelay = isFirst ? 2.0 : 0;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-stretch overflow-hidden bg-[#0a0a0f]"
    >
      {/* Subtle teal top-right accent blob */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[55%] h-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 85% 30%, rgba(13,148,136,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Blue bottom-left soft glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[40%] h-1/2"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 10% 90%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Left content */}
      <motion.div
        className="relative z-10 w-full lg:w-3/5 flex flex-col justify-center px-8 md:px-14 lg:px-20 pt-24 pb-16"
        variants={heroStagger(animDelay)}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.p
          variants={fadeInLeft}
          className="font-serif text-sm text-[#0d9488] mb-5 tracking-wide"
        >
          Licensed Florida Public Adjusters
        </motion.p>

        <motion.h1
          variants={fadeInLeft}
          className="font-bebas text-[clamp(3.6rem,8vw,8rem)] leading-none tracking-tight text-[#f0f0f5]"
        >
          Your Claim.
          <br />
          <span className="text-gradient">Our Fight.</span>
        </motion.h1>

        <motion.div
          variants={fadeInLeft}
          className="mt-6 flex items-center gap-3"
        >
          <div className="w-12 h-[3px] bg-[#3b82f6] rounded-full" />
          <div className="w-6 h-[3px] bg-[#0d9488] rounded-full" />
        </motion.div>

        <motion.p
          variants={fadeInLeft}
          className="mt-6 text-base md:text-lg text-[#9999aa] leading-relaxed max-w-lg"
        >
          Your insurer offered $18K. We recovered $147K. That&apos;s what
          having an advocate means. We represent homeowners &mdash; never
          insurance companies.
        </motion.p>

        <motion.div variants={fadeInLeft} className="mt-8 flex flex-wrap gap-3">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#3b82f6] text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)] transition-[opacity,transform,box-shadow] duration-200"
          >
            Get Your Free Claim Review &rarr;
          </a>
          <a
            href="tel:+17862237867"
            className="inline-flex items-center gap-2 bg-[#111118] border border-white/8 text-[#f0f0f5] font-semibold text-sm px-7 py-3.5 rounded-full hover:border-[#d1d1d6] transition-[border-color] duration-200"
          >
            (786) 223-7867
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          variants={fadeInLeft}
          className="mt-10 flex flex-wrap items-center gap-6 text-xs text-[#666677]"
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            No recovery, no fee
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Licensed in all 67 FL counties
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            5.0 ★ Google Rating
          </span>
        </motion.div>
      </motion.div>

      {/* Right image */}
      <motion.div
        className="hidden lg:block absolute inset-y-0 right-0 w-2/5 bg-cover bg-center rounded-l-3xl overflow-hidden"
        variants={fadeInRight}
        initial="hidden"
        animate="visible"
        transition={{ delay: animDelay + 0.3, duration: 0.7 }}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/15 to-transparent" />
      </motion.div>
    </section>
  );
}
