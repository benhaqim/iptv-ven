import type { Metadata } from "next";
import { Inter, Space_Grotesk, Montserrat } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ScrollEffects from "@/components/site/ScrollEffects";
import WhatsAppButton from "@/components/site/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-grotesk", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  title: "StreamlixIPTV — Premium IPTV",
  description: "Premium 4K & 8K live sport, 28,000+ channels, 160,000 films and series. Zero buffering.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = headers().get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${montserrat.variable}`}>
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
