"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-stretch overflow-hidden bg-[#0a0a0f]"
    >
      {/* Left content */}
      <motion.div
        className="relative z-10 w-full lg:w-3/5 flex flex-col justify-center px-8 md:px-14 lg:px-20 pt-24 pb-16"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeInUp}
          className="font-bebas text-[clamp(4.5rem,10vw,10rem)] leading-none tracking-tight text-[#f0f0f5]"
        >
          Your Claim.
          <br />
          <span className="text-[#3b82f6]">Our Fight.</span>
        </motion.h1>

        <motion.div
          variants={fadeInUp}
          className="mt-6 w-20 h-1 bg-[#3b82f6] rounded-full"
        />

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-base md:text-lg text-[#9999aa] leading-relaxed max-w-lg"
        >
          Your insurer offered $18K. We recovered $147K. That&apos;s what
          having an advocate means. We represent homeowners &mdash; never
          insurance companies.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#3b82f6] text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all"
          >
            Get Your Free Claim Review &rarr;
          </a>
        </motion.div>
      </motion.div>

      {/* Right image */}
      <div
        className="hidden lg:block absolute inset-y-0 right-0 w-2/5 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />
      </div>
    </section>
  );
}
