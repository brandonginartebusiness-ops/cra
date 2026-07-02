"use client";

import { LazyMotion, MotionConfig, type FeatureBundle } from "framer-motion";

/**
 * Wraps the app so `m.*` components work without pulling Framer Motion's full
 * feature set into the initial JS bundle. `domMax` is fetched as its own
 * chunk via this loader (instead of a static import) so it downloads/executes
 * off the critical path instead of competing with initial hydration — `m.*`
 * components render inert until the promise resolves, then pick up animation.
 *
 * Why domMax (not domAnimation): the case-result modal uses shared-layout
 * animations (`layout` / `layoutId`) in Results, ReviewsContent,
 * ServicePageLayout, CityCaseResultCard, and CaseResultModal. Layout
 * animations live in `domMax`; `domAnimation` would silently break them.
 *
 * `strict` makes any remaining `motion.*` throw, so it doubles as a guard that
 * the codebase fully migrated to `m.*`.
 */
const loadFeatures = (): Promise<FeatureBundle> =>
  import("framer-motion").then((mod) => mod.domMax);

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
