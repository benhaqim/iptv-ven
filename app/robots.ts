import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const SOCIAL_BOTS = [
  "facebookexternalhit",
  "facebookcatalog",
  "Facebot",
  "Twitterbot",
  "WhatsApp",
  "Telegrambot",
  "TelegramBot",
  "LinkedInBot",
  "Slackbot",
  "Slackbot-LinkExpanding",
  "Discordbot",
  "Pinterestbot",
  "Applebot",
  "redditbot",
  "ia_archiver",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Social-preview crawlers: full access, no disallow paths whatsoever.
      ...SOCIAL_BOTS.map((bot) => ({ userAgent: bot, allow: "/" })),
      // Search engines & everyone else: allow public site, block private/transactional paths.
      { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/", "/api/", "/checkout/thank-you"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
