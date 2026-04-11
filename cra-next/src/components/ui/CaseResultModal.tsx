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
            className="fixed inset-0 z-[100] backdrop-blur-md bg-black/50"
            onClick={onClose}
          />

          {/* Centering wrapper */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal-card"
              layoutId={result.layoutId}
              className="relative bg-[#ffffff] border border-[#1a1a2e]/10 rounded-2xl p-8 w-full max-w-[500px] pointer-events-auto shadow-[0_32px_80px_rgba(0,0,0,0.2)]"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#1a1a2e]/5 hover:bg-[#1a1a2e]/10 text-[#5a5a72] hover:text-[#1a1a2e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/50"
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
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2563eb] mb-6 text-center">
                {result.type}
              </p>

              {/* Amounts row */}
              <div className="flex items-center justify-center gap-4 mb-6">
                {initialDisplay && (
                  <span className="text-3xl font-semibold text-[#ef4444] line-through drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                    {initialDisplay}
                  </span>
                )}
                <span className="text-[#2563eb] text-2xl font-bold leading-none">
                  →
                </span>
                <AnimatedCounter
                  value={result.recovered}
                  className="font-bebas text-6xl text-[#16a34a] tracking-tight leading-none drop-shadow-[0_0_16px_rgba(22,163,74,0.4)]"
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-[#2563eb]/15 mb-5" />

              {/* Full review quote */}
              <blockquote className="text-sm text-[#5a5a72] italic leading-relaxed mb-5">
                &ldquo;{result.review.text}&rdquo;
              </blockquote>

              {/* Reviewer */}
              <div className="flex items-center justify-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-[#1a1a2e]">
                  {result.review.author}
                </span>
                <StarRating className="text-sm" />
              </div>
              <p className="text-[0.7rem] text-[#8888a0] mb-7 text-center">
                Google Review &middot; {result.review.timeAgo}
              </p>

              {/* CTAs */}
              <div className="flex flex-row gap-3">
                <a
                  href={reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 bg-[#1a1a2e]/5 border border-[#1a1a2e]/10 text-[#1a1a2e] text-xs font-semibold px-3 py-2.5 rounded-full hover:border-[#1a1a2e]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/50"
                >
                  Google Reviews
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center bg-[#2563eb] text-white text-xs font-semibold px-3 py-2.5 rounded-full hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
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
