"use client";

import { motion, type Variants } from "framer-motion";

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

const scorecard = [
  { val: "5.0", suffix: "/ 5", label: "Google rating" },
  { val: "67", suffix: "/ 67", label: "FL counties" },
  { val: "$0", suffix: "", label: "Upfront, ever", emphasis: true },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#faf8f5]"
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

      {/* Centered content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 md:px-14 pt-32 pb-20 max-w-4xl mx-auto"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={heroItem}
          className="font-bebas font-extrabold text-[clamp(2.5rem,6vw,7rem)] leading-none tracking-tight text-[#1a1a2e]"
        >
          Your Claim.
          <br />
          <span className="text-gradient">Our Fight.</span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mt-7 text-sm md:text-base text-[#5a5a72] leading-relaxed max-w-lg"
        >
          Your insurer offered $18K. We recovered $147K.{" "}
          <em className="font-serif not-italic text-[#1a1a2e] font-medium italic">
            That&apos;s what having an advocate means.
          </em>{" "}
          We represent homeowners &mdash; never insurance companies.
        </motion.p>

        <motion.div variants={heroItem} className="mt-8 flex flex-wrap justify-center gap-3">
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

        {/* Scorecard — replaces pill chips */}
        <motion.div
          variants={heroItem}
          className="mt-13 w-full max-w-lg border-t border-[#1a1a2e]/10 pt-7 grid grid-cols-3 gap-4"
        >
          {scorecard.map((c) => (
            <div
              key={c.label}
              className="flex flex-col items-start text-left"
            >
              <div className="font-bebas font-extrabold text-[1.95rem] leading-none tabular-nums text-[#1a1a2e]">
                <span className={c.emphasis ? "text-[#2563eb]" : ""}>{c.val}</span>
                {c.suffix && (
                  <span className="text-[#8888a0] font-semibold ml-1">{c.suffix}</span>
                )}
              </div>
              <div className="mt-1.5 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#5a5a72]">
                {c.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Seamless bottom fade */}
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
