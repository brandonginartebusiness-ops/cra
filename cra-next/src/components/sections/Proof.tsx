"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const panels = [
  {
    image: "/images/proof-storm-evidence.png",
    tag: "Storm damage evidence",
    title: "Storm damage evidence",
    body: "Thorough photo documentation of every affected surface — structural compromise, interior water intrusion, and overlooked secondary damage — captured before repairs begin.",
    fallback:
      "https://images.unsplash.com/photo-1601275338399-a41e3a3ec38d?w=800&auto=format&fit=crop&q=80",
  },
  {
    image: "/images/proof-claim-file.png",
    tag: "Engineering & estimate depth",
    title: "Claim file depth",
    body: "Engineering reports, moisture mapping, and line-by-line Xactimate estimates that insurers can't easily dispute — the paperwork that drives larger recoveries.",
    fallback:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80",
    tag: "Roof · Water · Mold · Fire · Denial",
    title: "Range of claim types",
    body: "Hurricane, water, mold, fire, denied claims, and commercial losses — every property damage scenario Florida homeowners face, handled under one roof.",
    fallback: null,
  },
];

export default function Proof() {
  return (
    <section className="bg-[#111118] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {panels.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              className="bg-[#0a0a0f] border border-white/8 rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f7] via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs bg-black/60 text-[#f0f0f5] border border-white/8 px-3 py-1 rounded-full">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#f0f0f5] text-lg mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-[#9999aa] leading-relaxed">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
