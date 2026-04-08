"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import StarRating from "@/components/ui/StarRating";

const GOOGLE_REVIEWS_URL =
  "https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI";

export interface ModalResult {
  layoutId: string;
  type: string;
  initial?: number;
  initialLabel?: string;
  recovered: number;
  review: {
    text: string;
    author: string;
    timeAgo: string;
    googleReviewUrl?: string;
  };
}

interface Props {
  result: ModalResult | null;
  onClose: () => void;
}

export default function CaseResultModal({ result, onClose }: Props) {
  // Lock body scroll while open
  useEffect(() => {
    if (result) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [result]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const reviewUrl = result?.review.googleReviewUrl ?? GOOGLE_REVIEWS_URL;
  const initialDisplay =
    result?.initialLabel ??
    (result?.initial ? `$${result.initial.toLocaleString()}` : "");

  return (
    <AnimatePresence>
      {result && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] backdrop-blur-md bg-black/60"
            onClick={onClose}
          />

          {/* Centering wrapper — pointer-events-none so backdrop click still fires */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal-card"
              layoutId={result.layoutId}
              className="relative bg-[#16161f] border border-white/10 rounded-2xl p-8 w-full max-w-[500px] pointer-events-auto shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/12 text-[#9999aa] hover:text-[#f0f0f5] transition-colors"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Claim type */}
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3b82f6] mb-6 text-center drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
                {result.type}
              </p>

              {/* Amounts row */}
              <div className="flex items-center justify-center gap-4 mb-6">
                {initialDisplay && (
                  <span className="text-2xl font-semibold text-[#ef4444]/80 line-through">
                    {initialDisplay}
                  </span>
                )}
                <span className="text-[#3b82f6] text-2xl font-bold leading-none drop-shadow-[0_0_6px_rgba(59,130,246,0.7)]">
                  →
                </span>
                <AnimatedCounter
                  value={result.recovered}
                  className="font-bebas text-6xl text-[#22c55e] tracking-tight leading-none drop-shadow-[0_0_16px_rgba(34,197,94,0.7)]"
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-[#3b82f6]/20 mb-5" />

              {/* Full review quote */}
              <blockquote className="text-sm text-[#9999aa] italic leading-relaxed mb-5">
                &ldquo;{result.review.text}&rdquo;
              </blockquote>

              {/* Reviewer */}
              <div className="flex items-center justify-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-[#f0f0f5]">
                  {result.review.author}
                </span>
                <StarRating className="text-sm" />
              </div>
              <p className="text-[0.7rem] text-[#666677] mb-7 text-center">
                Google Review &middot; {result.review.timeAgo}
              </p>

              {/* CTAs */}
              <div className="flex flex-row gap-3">
                <a
                  href={reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 bg-white/5 border border-white/10 text-[#f0f0f5] text-xs font-semibold px-3 py-2.5 rounded-full hover:border-white/20 transition-colors"
                >
                  Google Reviews
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center bg-[#3b82f6] text-white text-xs font-semibold px-3 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  Free Claim Review
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
