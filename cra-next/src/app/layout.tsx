import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ChatWidget from "@/components/ui/ChatWidget";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Public Adjuster Miami | Claim Remedy Adjusters — Your Claim. Our Fight.",
    template: "%s | Claim Remedy Adjusters",
  },
  description:
    "Licensed Florida Public Adjusters representing homeowners across South Florida. We fight for the settlement you deserve on hurricane, water, fire, and roof damage claims. No recovery, no fee.",
  keywords:
    "public adjuster Miami, public adjuster Florida, public adjuster near me, hurricane damage claim help Florida, water damage claim, roof damage insurance claim, underpaid insurance claim Florida, denied insurance claim help",
  metadataBase: new URL("https://claimremedyadjusters.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://claimremedyadjusters.com",
    siteName: "Claim Remedy Adjusters",
    title: "Public Adjuster Miami | Claim Remedy Adjusters",
    description:
      "Licensed Florida Public Adjusters. We fight for the settlement you deserve on hurricane, water, fire, and roof damage claims. No recovery, no fee.",
    images: [
      {
        url: "https://claimremedyadjusters.com/brand_assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Claim Remedy Adjusters — Your Claim. Our Fight.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Public Adjuster Miami | Claim Remedy Adjusters",
    description:
      "Licensed Florida Public Adjusters. We fight for the settlement you deserve. No recovery, no fee.",
    images: ["https://claimremedyadjusters.com/brand_assets/og-image.png"],
  },
  alternates: {
    canonical: "https://claimremedyadjusters.com",
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
      className={`${bebasNeue.variable} ${dmSans.variable} ${dmSerifDisplay.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#3b82f6] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <LocalBusinessSchema />
        <LoadingScreen />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFAB />
        <ChatWidget />
      </body>
    </html>
  );
}
