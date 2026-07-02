import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import SiteShell from "@/components/layout/SiteShell";
import { getDict } from "@/i18n/dictionaries";

// Spanish root layout. Sibling to the English `(site)` root — having its own
// <html lang="es-US"> is the whole point of the route-group split: the Spanish
// pages now render the correct language at SSR instead of relying on a
// client-side patch. Per-page metadata (title/canonical/hreflang) is set on the
// /es pages themselves; this just provides Spanish defaults and the locale.
const esMeta = getDict("es").meta;

export const metadata: Metadata = {
  title: {
    default: esMeta.homeTitle,
    template: "%s | Claim Remedy Adjusters",
  },
  description: esMeta.homeDescription,
  metadataBase: new URL("https://claimremedyadjusters.com"),
  openGraph: {
    type: "website",
    locale: "es_US",
    siteName: "Claim Remedy Adjusters",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
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

export default function EsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-US" className={`${fontVariables} overflow-x-hidden`}>
      <body className="overflow-x-clip pb-20 md:pb-0">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
