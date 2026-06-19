"use client";

import { LazyMotion, domMax } from "framer-motion";

/**
 * Wraps the app so `m.*` components work without pulling Framer Motion's full
 * feature set into the initial JS bundle. The animation features are loaded
 * lazily via `domMax`.
 *
 * Why domMax (not domAnimation): the case-result modal uses shared-layout
 * animations (`layout` / `layoutId`) in Results, ReviewsContent,
 * ServicePageLayout, CityCaseResultCard, and CaseResultModal. Layout
 * animations live in `domMax`; `domAnimation` would silently break them.
 *
 * `strict` makes any remaining `motion.*` throw, so it doubles as a guard that
 * the codebase fully migrated to `m.*`.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
