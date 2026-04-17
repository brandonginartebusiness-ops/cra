import { MetadataRoute } from "next";
import { allSlugs } from "@/data/cities";

const BASE = "https://claimremedyadjusters.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/storm-hurricane`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/water-damage`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/fire-smoke`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/roof-claims`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/appraisal`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const cityRoutes: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${BASE}/areas/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...cityRoutes];
}
