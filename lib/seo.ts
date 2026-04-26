import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://iptv.venomxjsx.com";
export const SITE_NAME = "Streamlix";
export const SITE_TWITTER = "@streamlix";
export const DEFAULT_OG = "/og.png";

export const SITE_TAGLINE = "Stream every match. Every movie. Every screen.";
export const SITE_DESCRIPTION =
  "Streamlix is premium IPTV with 28,000+ live channels and 160,000+ movies & series in 4K & 8K UHD. " +
  "Football, F1, NBA, NFL, MMA — plus the full FIFA World Cup 2026. One subscription, zero buffering, activated in minutes.";

type Args = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
  noindex?: boolean;
};

export function buildMetadata(args: Args = {}): Metadata {
  const title = args.title ? `${args.title} — ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
  const description = args.description ?? SITE_DESCRIPTION;
  const url = args.path ? `${SITE_URL}${args.path}` : SITE_URL;
  const image = args.image ?? DEFAULT_OG;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const imageAlt = args.imageAlt ?? `${SITE_NAME} — ${SITE_TAGLINE}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    keywords: [
      "Streamlix", "IPTV", "premium IPTV", "live TV streaming",
      "4K IPTV", "8K IPTV", "football streaming", "World Cup 2026 streaming",
      "Champions League streaming", "F1 streaming", "NBA streaming", "movies streaming",
    ],
    alternates: { canonical: url },
    robots: args.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: {
      type: args.type ?? "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: "en_US",
      images: [{ url: absoluteImage, width: 1920, height: 1080, alt: imageAlt }],
      ...(args.type === "article" && {
        publishedTime: args.publishedTime,
        authors: args.authors,
        tags: args.tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
      site: SITE_TWITTER,
      creator: SITE_TWITTER,
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: "/og.png",
    },
    other: {
      // Helps WhatsApp / Telegram / Discord pick the right preview
      "og:image:width": "1920",
      "og:image:height": "1080",
      "theme-color": "#03050F",
    },
  };
}
