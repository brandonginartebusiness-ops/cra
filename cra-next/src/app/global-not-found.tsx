import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import SiteShell from "@/components/layout/SiteShell";

// Global 404 for the whole app. Required because the two root layouts (the
// English `(site)` and Spanish `(es)` route groups) leave no single layout to
// compose a global not-found from. This file owns its own <html>/<body> and
// reuses the standard site chrome so a 404 still has the nav, footer and theme.
export const metadata: Metadata = {
  title: "Page Not Found | Claim Remedy Adjusters",
  description: "The page you are looking for does not exist.",
  metadataBase: new URL("https://claimremedyadjusters.com"),
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${fontVariables} overflow-x-hidden`}>
      <body className="overflow-x-clip pb-20 md:pb-0">
        <SiteShell>
          <section className="min-h-[65vh] flex flex-col items-center justify-center text-center px-6 py-32">
            <p className="font-bebas font-extrabold text-7xl md:text-8xl leading-none text-[#f0f0f5]">
              404
            </p>
            <h1 className="mt-4 font-bebas text-2xl md:text-3xl tracking-tight text-[#f0f0f5]">
              This page could not be found
            </h1>
            <p className="mt-3 max-w-md text-[#c0c0d0] leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition-[background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/70"
            >
              Back to home
            </Link>
          </section>
        </SiteShell>
      </body>
    </html>
  );
}
