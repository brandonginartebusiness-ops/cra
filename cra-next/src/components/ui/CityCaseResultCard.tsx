"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CaseResultModal, { type ModalResult } from "@/components/ui/CaseResultModal";
import StarRating from "@/components/ui/StarRating";

interface CaseResult {
  type: string;
  initial?: number;
  initialLabel?: string;
  recovered: number;
  review: {
    text: string;
    author: string;
    timeAgo: string;
  };
}

interface Props {
  citySlug: string;
  caseResult: CaseResult;
}

export default function CityCaseResultCard({ citySlug, caseResult }: Props) {
  const [modalResult, setModalResult] = useState<ModalResult | null>(null);
  const layoutId = `city-result-${citySlug}`;

  return (
    <>
      <motion.button
        layoutId={layoutId}
        onClick={() =>
          setModalResult({
            layoutId,
            type: caseResult.type,
            initial: caseResult.initial,
            initialLabel: caseResult.initialLabel,
            recovered: caseResult.recovered,
            review: {
              text: caseResult.review.text,
              author: caseResult.review.author,
              timeAgo: caseResult.review.timeAgo,
            },
          })
        }
        className="text-left w-full bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-8 cursor-pointer hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(37,99,235,0.12)] hover:border-[#2563eb]/20 transition-[transform,box-shadow,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
        aria-label={`${caseResult.type} case result — press to see details`}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] mb-4">
          {caseResult.type}
        </p>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-lg text-[#8888a0] line-through">
            {caseResult.initialLabel ?? (caseResult.initial ? `$${caseResult.initial.toLocaleString()}` : "")}
          </span>
          <span className="text-[#2563eb] text-xl">&rarr;</span>
          <AnimatedCounter
            value={caseResult.recovered}
            className="font-bebas font-bold text-4xl text-[#1a1a2e] tracking-tight"
          />
        </div>
        <div className="h-px bg-[#2563eb]/20 mb-5" />
        <blockquote className="text-base text-[#5a5a72] italic leading-relaxed mb-5">
          &ldquo;{caseResult.review.text}&rdquo;
        </blockquote>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#1a1a2e]">{caseResult.review.author}</span>
          <StarRating className="text-sm" />
        </div>
        <p className="text-[0.7rem] text-[#8888a0] mt-1">
          Google Review · {caseResult.review.timeAgo}
        </p>
      </motion.button>
      <CaseResultModal result={modalResult} onClose={() => setModalResult(null)} />
    </>
  );
}
