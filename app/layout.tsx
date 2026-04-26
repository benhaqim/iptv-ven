import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Montserrat } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ScrollEffects from "@/components/site/ScrollEffects";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import { buildMetadata, SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-grotesk", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = buildMetadata();
export const viewport: Viewport = {
  themeColor: "#03050F",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = headers().get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og.png`,
    description: SITE_DESCRIPTION,
    sameAs: [],
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={isAdmin ? "is-admin" : undefined}>
        {!isAdmin && <ScrollEffects />}
        {!isAdmin && <div className="bg-decor" aria-hidden />}
        {!isAdmin && <div className="scroll-grid" aria-hidden />}
        {!isAdmin && <Nav />}
        {children}
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppButton />}
      </body>
    </html>
  );
}
