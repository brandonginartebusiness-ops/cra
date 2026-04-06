"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import StarRating from "@/components/ui/StarRating";
import SectionHeading from "@/components/ui/SectionHeading";
import LeadCaptureForm from "@/components/ui/LeadCaptureForm";
import CaseResultModal, { type ModalResult } from "@/components/ui/CaseResultModal";

const GOOGLE_REVIEWS_URL =
  "https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI";

interface ServicePageProps {
  title: string;
  subtitle: string;
  heroImage: string;
  description: string[];
  handles: string[];
  caseResult: {
    type: string;
    initial: number;
    initialLabel?: string;
    recovered: number;
    review: {
      text: string;
      author: string;
      timeAgo: string;
      googleReviewUrl: string;
    };
  };
  ctaText?: string;
  serviceSlug: string;
}

export default function ServicePageLayout({
  title,
  subtitle,
  heroImage,
  description,
  handles,
  caseResult,
  ctaText = "Get Your Free Claim Review",
  serviceSlug,
}: ServicePageProps) {
  const [modalResult, setModalResult] = useState<ModalResult | null>(null);
  const waLink = `https://wa.me/17862237867?text=Hi%20Claim%20Remedy%2C%20I%27d%20like%20to%20discuss%20a%20${encodeURIComponent(title)}%20claim.`;
  const cardLayoutId = `service-case-result-${serviceSlug}`;

  return (
    <div className="pt-24">
      {/* ─── Section 1: Hero Banner ─── */}
      <section className="relative overflow-hidden bg-[#0a0a0f] py-20 lg:py-28">
        {heroImage && (
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover opacity-[0.15]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex items-center gap-2 text-xs text-[#666677] mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-[#f0f0f5] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#f0f0f5] transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-[#9999aa]">{title}</span>
          </motion.nav>

          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-[#f0f0f5] leading-none tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-lg text-[#9999aa] max-w-xl">{subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Service Description ─── */}
      <section className="bg-[#111118] py-20 lg:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInLeft}
            >
              {description.map((para, i) => (
                <p
                  key={i}
                  className="text-base text-[#9999aa] leading-relaxed mb-5 last:mb-8"
                >
                  {para}
                </p>
              ))}

              <h3 className="font-bebas text-2xl text-[#f0f0f5] mb-4">
                What We Handle
              </h3>
              <ul className="flex flex-col gap-2.5">
                {handles.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#9999aa]">
                    <svg
                      className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/8 shadow-2xl"
            >
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#16161f] to-[#0a0a0f] flex items-center justify-center">
                  <span className="font-bebas text-3xl text-[#3b82f6]/40">
                    {title}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Case Result Card ─── */}
      <section className="bg-[#0a0a0f] py-20 lg:py-28 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <SectionHeading
              label="Proven result"
              heading="Real recovery.<br/>Real review."
              className="text-center"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
          >
            <motion.div
              layoutId={cardLayoutId}
              onClick={() =>
                setModalResult({
                  layoutId: cardLayoutId,
                  type: caseResult.type,
                  initial: caseResult.initial,
                  initialLabel: caseResult.initialLabel,
                  recovered: caseResult.recovered,
                  review: {
                    text: caseResult.review.text,
                    author: caseResult.review.author,
                    timeAgo: caseResult.review.timeAgo,
                    googleReviewUrl: caseResult.review.googleReviewUrl,
                  },
                })
              }
              className="block bg-[#16161f] border border-white/5 rounded-2xl p-8 cursor-pointer hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)] hover:border-[#3b82f6]/20 transition-[box-shadow,border-color] duration-300"
            >
              {/* Tag */}
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3b82f6] mb-4">
                {caseResult.type}
              </p>

              {/* Amounts */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-lg text-[#666677] line-through">
                  {caseResult.initialLabel ??
                    (caseResult.initial
                      ? `$${caseResult.initial.toLocaleString()}`
                      : "")}
                </span>
                <span className="text-[#3b82f6] text-xl">&rarr;</span>
                <AnimatedCounter
                  value={caseResult.recovered}
                  className="font-bebas text-4xl text-[#f0f0f5] tracking-tight"
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-[#3b82f6]/25 mb-5" />

              {/* Quote */}
              <blockquote className="text-base text-[#9999aa] italic leading-relaxed mb-5">
                &ldquo;{caseResult.review.text}&rdquo;
              </blockquote>

              {/* Reviewer */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#f0f0f5]">
                  {caseResult.review.author}
                </span>
                <StarRating className="text-sm" />
              </div>
              <p className="text-[0.7rem] text-[#666677] mt-1">
                Google Review &middot; {caseResult.review.timeAgo}
              </p>
            </motion.div>
          </motion.div>

          <CaseResultModal
            result={modalResult}
            onClose={() => setModalResult(null)}
          />
        </div>
      </section>

      {/* ─── Section 4: Lead Capture Form ─── */}
      <section className="bg-[#111118] py-20 lg:py-28 border-t border-white/5">
        <div className="max-w-xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <h2 className="font-bebas text-4xl md:text-5xl text-[#f0f0f5] leading-none tracking-tight mb-3">
              Ready to Fight for Your Claim?
            </h2>
            <p className="text-base text-[#9999aa]">
              Fill out the form below and our team will review your situation
              within 24 hours.
            </p>
          </motion.div>

          <LeadCaptureForm servicePage={serviceSlug} ctaText={ctaText} />
        </div>
      </section>

      {/* ─── Section 5: CTA Banner ─── */}
      <section className="bg-[#0a0a0f] py-16 lg:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
          >
            <h2 className="font-bebas text-3xl md:text-4xl text-[#f0f0f5] leading-none tracking-tight mb-6">
              Have Questions? Talk to Us Directly
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25d366] text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 hover:shadow-[0_0_24px_rgba(37,211,102,0.3)] transition-[opacity,box-shadow] duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
              <a
                href="tel:+17862237867"
                className="inline-flex items-center gap-3 bg-[#16161f] border border-white/10 text-[#f0f0f5] font-semibold px-7 py-3.5 rounded-full hover:border-[#3b82f6]/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.08)] transition-[border-color,box-shadow] duration-300"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call (786) 223-7867
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
