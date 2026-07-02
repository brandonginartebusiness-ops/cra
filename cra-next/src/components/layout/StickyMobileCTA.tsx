// Mobile-only sticky conversion bar. On mobile the hero stacks copy above the
// lead form, so the primary action is off-screen at landing — the #1 bounce
// driver on paid traffic. This keeps "Call" and "Free Claim Review" one tap
// away on every page. Server component (just links — no client JS).
//
// Hidden on md+ (desktop shows the form beside the hero copy). The merged
// mobile contact launcher (WhatsApp + chat) is lifted above this bar on
// mobile so nothing overlaps — see ChatWidget.

const PHONE = "+13057331670";

export default function StickyMobileCTA() {
  return (
    <div
      className="floating-cta md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#14141c]/95 backdrop-blur-md px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Quick contact"
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <a
          href={`tel:${PHONE}`}
          aria-label="Call Claim Remedy Adjusters at (305) 733-1670"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-[#f0f0f5] hover:bg-white/12 transition-[background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          Call
        </a>
        <a
          href="/contact"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:bg-[#1d4ed8] transition-[background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#14141c]"
        >
          Free Claim Review
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
