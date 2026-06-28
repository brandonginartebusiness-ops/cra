import { MetadataRoute } from "next";
import { execSync } from "node:child_process";
import { allSlugs } from "@/data/cities";

const BASE = "https://claimremedyadjusters.com";

// Last git commit date for a source file, so sitemap <lastmod> reflects when a
// page's content actually changed instead of the build timestamp (which made
// every URL identical and looked machine-generated). Memoized; falls back to
// the build time if git history is unavailable (e.g. a shallow CI checkout).
const buildTime = new Date();
const dateCache = new Map<string, Date>();

function lastModified(relPath: string): Date {
  const cached = dateCache.get(relPath);
  if (cached) return cached;

  let result = buildTime;
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const parsed = out ? new Date(out) : null;
    if (parsed && !Number.isNaN(parsed.getTime())) result = parsed;
  } catch {
    // git unavailable — keep the build-time fallback.
  }

  dateCache.set(relPath, result);
  return result;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // [url, source file used to date it, changeFrequency, priority]
  const staticRoutes: [string, string, "weekly" | "monthly" | "yearly", number][] = [
    ["", "src/app/page.tsx", "weekly", 1.0],
    ["/services", "src/app/services/page.tsx", "monthly", 0.9],
    ["/services/storm-hurricane", "src/app/services/storm-hurricane/page.tsx", "monthly", 0.8],
    ["/services/water-damage", "src/app/services/water-damage/page.tsx", "monthly", 0.8],
    ["/services/fire-smoke", "src/app/services/fire-smoke/page.tsx", "monthly", 0.8],
    ["/services/roof-claims", "src/app/services/roof-claims/page.tsx", "monthly", 0.8],
    ["/services/appraisal", "src/app/services/appraisal/page.tsx", "monthly", 0.8],
    ["/services/mold-claims", "src/app/services/mold-claims/page.tsx", "monthly", 0.8],
    ["/services/denied-claims", "src/app/services/denied-claims/page.tsx", "monthly", 0.8],
    ["/services/commercial-property", "src/app/services/commercial-property/page.tsx", "monthly", 0.8],
    ["/do-i-need-a-public-adjuster", "src/app/do-i-need-a-public-adjuster/page.tsx", "monthly", 0.8],
    ["/areas", "src/app/areas/AreasContent.tsx", "monthly", 0.9],
    ["/process", "src/app/process/page.tsx", "monthly", 0.7],
    ["/about", "src/app/about/page.tsx", "monthly", 0.7],
    ["/reviews", "src/data/reviews.ts", "weekly", 0.8],
    ["/faq", "src/app/faq/page.tsx", "monthly", 0.7],
    ["/contact", "src/app/contact/page.tsx", "monthly", 0.9],
    ["/privacy", "src/app/privacy/page.tsx", "yearly", 0.3],
    ["/es", "src/app/es/page.tsx", "weekly", 0.9],
    ["/es/contact", "src/app/es/contact/page.tsx", "monthly", 0.8],
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map(
    ([path, file, changeFrequency, priority]) => ({
      url: `${BASE}${path}`,
      lastModified: lastModified(file),
      changeFrequency,
      priority,
    })
  );

  // City pages all render from the shared cities dataset, so date them by it.
  const cityLastMod = lastModified("src/data/cities.ts");
  const cityRoutes: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${BASE}/areas/${slug}`,
    lastModified: cityLastMod,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...cityRoutes];
}
