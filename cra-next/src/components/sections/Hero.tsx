"use client";

import { useRef, useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

const heroStagger = (delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: delay },
  },
});

const badges = [
  "No recovery, no fee",
  "Licensed in all 67 FL counties",
  "5.0 ★ Google Rating",
];

export default function Hero() {
  const mountedRef = useRef(false);
  const [animDelay, setAnimDelay] = useState(2.0);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
    } else {
      setAnimDelay(0);
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-stretch overflow-hidden bg-[#faf8f5]"
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

      {/* Left content */}
      <motion.div
        className="relative z-10 w-full lg:w-3/5 flex flex-col justify-center px-8 md:px-14 lg:px-20 pt-24 pb-16"
        variants={heroStagger(animDelay)}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeInLeft}
          className="font-bebas font-extrabold text-[clamp(4rem,9vw,11rem)] leading-none tracking-tight text-[#1a1a2e]"
        >
          Your Claim.
          <br />
          <span className="text-gradient">Our Fight.</span>
        </motion.h1>

        <motion.p
          variants={fadeInLeft}
          className="mt-7 text-sm md:text-base text-[#5a5a72] leading-relaxed max-w-lg"
        >
          Your insurer offered $18K. We recovered $147K. That&apos;s what
          having an advocate means. We represent homeowners &mdash; never
          insurance companies.
        </motion.p>

        <motion.div variants={fadeInLeft} className="mt-8 flex flex-wrap gap-3">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)] transition-[opacity,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
          >
            Get Your Free Claim Review
          </a>
          <a
            href="tel:+17862237867"
            className="inline-flex items-center gap-2 bg-[#f0ede8] border border-[#1a1a2e]/12 text-[#1a1a2e] font-semibold text-sm px-7 py-3.5 rounded-full hover:border-[#1a1a2e]/25 transition-[border-color] duration-200"
          >
            (786) 223-7867
          </a>
        </motion.div>

        {/* Trust badges — pill style */}
        <motion.div
          variants={fadeInLeft}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-4 py-1.5 rounded-full border border-[#2563eb]/20 bg-[#2563eb]/8 text-[#2563eb] text-sm font-medium tracking-wide"
            >
              {badge}
            </span>
          ))}
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/20 to-transparent" />
      </motion.div>

      {/* Seamless bottom fade into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #f0ede8 100%)",
        }}
      />
    </section>
  );
}
