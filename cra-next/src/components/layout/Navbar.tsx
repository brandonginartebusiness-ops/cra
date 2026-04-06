"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Services", href: "/services" },
  { label: "Results", href: "/results" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding,box-shadow] duration-300 ${
          scrolled
            ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5 shadow-lg py-3"
            : "bg-[#0a0a0f]/90 backdrop-blur-md py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" aria-label="Home">
            <Image
              src="/brand_assets/logo-transparent.png"
              alt="Claim Remedy Adjusters"
              width={120}
              height={35}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm transition-colors ${
                    pathname === l.href || pathname.startsWith(l.href + "/")
                      ? "text-[#f0f0f5]"
                      : "text-[#9999aa] hover:text-[#f0f0f5]"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-[#3b82f6] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-[opacity,transform]"
            >
              Free Claim Review
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              aria-label="Menu"
            >
              <span
                className={`block w-5 h-0.5 bg-[#f0f0f5] transition-transform ${open ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-[#f0f0f5] transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-[#f0f0f5] transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0f]/98 backdrop-blur-lg flex flex-col justify-center px-8 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-2xl font-semibold transition-colors ${
                  pathname === l.href || pathname.startsWith(l.href + "/")
                    ? "text-[#3b82f6]"
                    : "text-[#f0f0f5] hover:text-[#3b82f6]"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="tel:+17862237867"
          className="mt-10 inline-flex items-center justify-center bg-[#3b82f6] text-white font-semibold py-4 rounded-full text-lg"
        >
          Call Now
        </a>
      </div>
    </>
  );
}
