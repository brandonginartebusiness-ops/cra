import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import LoadingScreen from "@/components/ui/LoadingScreen";
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
        url: "/brand_assets/logo-transparent.png",
        width: 1200,
        height: 630,
        alt: "Claim Remedy Adjusters — Public Adjusters Miami Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Public Adjuster Miami | Claim Remedy Adjusters",
    description:
      "Licensed Florida Public Adjusters. We fight for the settlement you deserve. No recovery, no fee.",
    images: ["/brand_assets/logo-transparent.png"],
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
      className={`${bebasNeue.variable} ${dmSans.variable}`}
    >
      <body>
        <LocalBusinessSchema />
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
