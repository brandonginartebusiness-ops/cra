import { DM_Serif_Display, DM_Sans } from "next/font/google";

// Shared font instances so both root layouts (English `(site)` and Spanish
// `(es)`) expose the same CSS variables without loading the fonts twice.
export const displayFont = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = `${displayFont.variable} ${bodyFont.variable}`;
