"use client";

import { useEffect } from "react";

/**
 * The root layout owns the single <html> element and hardcodes lang="en".
 * Next.js App Router does not allow a nested layout to override the html lang
 * for SSR without a second root layout (route groups). As a pragmatic fix we
 * set the document language to Spanish on the client for every /es route, so
 * the rendered DOM, assistive tech, and JS-executing crawlers see lang="es-US".
 * On unmount we restore "en" so client navigations back to English routes are
 * correct without a full reload.
 */
export default function EsLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.lang;
    root.lang = "es-US";
    return () => {
      root.lang = previous || "en";
    };
  }, []);

  return <>{children}</>;
}
