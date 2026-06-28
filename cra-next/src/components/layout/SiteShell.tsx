import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import ChatWidget from "@/components/ui/ChatWidget";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import TransitionWrapper from "@/components/ui/TransitionWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import TrackingScripts from "@/components/analytics/TrackingScripts";
import PreconnectHints from "@/components/analytics/PreconnectHints";
import MotionProvider from "@/components/ui/MotionProvider";

// Everything that lives inside <body>, shared by both root layouts so the only
// difference between the English `(site)` and Spanish `(es)` roots is the
// <html lang> attribute and the default metadata.
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="cra-aurora" aria-hidden="true" />
      <TrackingScripts />
      <PreconnectHints />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#3b82f6] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <LocalBusinessSchema />
      <MotionProvider>
        <Navbar />
        <main id="main-content">
          <TransitionWrapper>{children}</TransitionWrapper>
        </main>
        <Footer />
        <WhatsAppFAB />
        <ChatWidget />
      </MotionProvider>
      <StickyMobileCTA />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
