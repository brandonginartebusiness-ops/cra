"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#connect" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/5 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" aria-label="Home">
            <Image
              src="/brand_assets/logo-transparent.png"
              alt="Claim Remedy Adjusters"
              width={120}
              height={36}
              priority
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleLink(l.href)}
                  className="text-sm text-[#9999aa] hover:text-[#f0f0f5] transition-colors cursor-pointer"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLink("#connect")}
              className="hidden sm:inline-flex items-center gap-2 bg-[#3b82f6] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Free Claim Review
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              aria-label="Menu"
            >
              <span
                className={`block w-5 h-0.5 bg-[#f0f0f5] transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-[#f0f0f5] transition-all ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-[#f0f0f5] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0f]/98 backdrop-blur-lg flex flex-col justify-center px-8 transition-all duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleLink(l.href)}
                className="text-2xl font-semibold text-[#f0f0f5] hover:text-[#3b82f6] transition-colors cursor-pointer"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <a
          href="tel:+17862237867"
          className="mt-10 inline-flex items-center justify-center bg-[#3b82f6] text-white font-semibold py-4 rounded-full text-lg"
          onClick={() => setOpen(false)}
        >
          Call Now
        </a>
      </div>
    </>
  );
}
