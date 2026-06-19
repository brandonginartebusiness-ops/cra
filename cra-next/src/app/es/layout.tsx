import type { Metadata } from "next";

// NOINDEX GATE — the Spanish copy is pending FL-native human review. Every page
// under /es inherits this `robots` directive, so nothing Spanish is indexed by
// Google until the review is done. The "go-live flip" (see the Phase 2 plan)
// removes this and adds /es to the sitemap + hreflang in ONE small PR.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
