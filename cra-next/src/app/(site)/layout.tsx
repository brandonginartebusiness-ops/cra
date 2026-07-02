import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import SiteShell from "@/components/layout/SiteShell";

// English root layout. One of two root layouts (the Spanish root lives in
// `(es)/layout.tsx`); route groups let each own its own <html> so `lang` is
// correct at SSR. Navigating between the two triggers a full page load, which
// is the right behavior for a language switch.
export const metadata: Metadata = {
  title: {
    default: "Miami Public Adjuster | Claim Remedy Adjusters",
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
      "x-default": "https://claimremedyadjusters.com",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function SiteRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontVariables} overflow-x-hidden`}>
      <body className="overflow-x-clip pb-20 md:pb-0">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
