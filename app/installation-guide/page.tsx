import Link from "next/link";
import type { Metadata } from "next";
import { Wrench, MessageCircle } from "lucide-react";
import CTABanner from "@/components/site/CTABanner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Installation Guide",
  description: "Step-by-step Streamlix setup walkthroughs for every device — Smart TV, Fire Stick, Apple TV, iPhone, Android, Mac and PC.",
  path: "/installation-guide",
});

export default function InstallationGuidePage() {
  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-bg" />
        <div className="container">
          <span className="eyebrow"><span className="dot" />Setup · Devices · Apps</span>
          <h1 style={{ margin: "24px 0" }}>
            Installation <span className="accent">guide</span>
          </h1>
          <p>Step-by-step walkthroughs for every device. Coming soon.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="placeholder-card reveal">
            <div className="placeholder-icon"><Wrench size={36} /></div>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>Guide structure pending</h2>
            <p style={{ color: "var(--text-dim)", maxWidth: 480, margin: "0 auto 28px" }}>
              The full installation guide will land here once the device list and step-by-step structure is finalised.
              Need help right now? Our support team can walk you through any setup.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary">
                <MessageCircle size={16} /> Get setup help
              </Link>
              <Link href="/blog" className="btn btn-ghost">Read setup articles</Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
