import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";
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

const montserrat = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const roboto = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Public Adjuster Miami | Claim Remedy Adjusters — Your Claim. Our Fight.",
    template: "%s | Claim Remedy Adjusters",
  },
  description:
    "Licensed Florida Public Adjusters representing homeowners across South Florida. We fight for the settlement you deserve on hurricane, water, fire, and roof damage claims. No recovery, no fee.",
  metadataBase: new URL("https://claimremedyadjusters.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://claimremedyadjusters.com",
    siteName: "Claim Remedy Adjusters",
    title: "Public Adjuster Miami | Claim Remedy Adjusters",
    description:
      "Licensed Florida Public Adjusters. We fight for the settlement you deserve on hurricane, water, fire, and roof damage claims. No recovery, no fee.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Public Adjuster Miami | Claim Remedy Adjusters",
    description:
      "Licensed Florida Public Adjusters. We fight for the settlement you deserve. No recovery, no fee.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://claimremedyadjusters.com",
    languages: {
      "en-US": "https://claimremedyadjusters.com",
      "es-US": "https://claimremedyadjusters.com/es",
    },
  },
  verification: {
    google: "tJrfTZx85bkJy-0dfJ9sC9n0hfYLXGzoIwvhI0oAJEg",
  },
  other: {
    "facebook-domain-verification": "wqv0ywr7k59nzmutvu18bcvlej74b2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${roboto.variable} overflow-x-hidden`}
    >
      <body className="overflow-x-clip pb-20 md:pb-0">
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
      </body>
    </html>
  );
}
