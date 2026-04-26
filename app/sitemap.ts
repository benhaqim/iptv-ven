import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { url: `${SITE_URL}/`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${SITE_URL}/pricing`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${SITE_URL}/blog`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${SITE_URL}/installation-guide`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/contact`, priority: 0.5, changeFrequency: "yearly" as const },
  ].map((p) => ({ ...p, lastModified: now }));

  const posts = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...posts];
}
