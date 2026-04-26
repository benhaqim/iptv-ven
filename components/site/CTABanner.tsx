import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="container">
      <div className="cta-banner reveal">
        <div className="cta-banner-bg" />
        <span className="eyebrow"><span className="dot" />7-day money back · Cancel anytime</span>
        <h2 style={{ margin: "20px 0 16px" }}>
          Ready for kickoff?<br />
          <span
            style={{
              background: "linear-gradient(120deg, #1E90FF 0%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            The next match is yours.
          </span>
        </h2>
        <p>Join 240,000+ subscribers across 80 countries. Activate in minutes, cancel anytime.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" className="btn btn-primary btn-lg">
            Start your subscription <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn btn-ghost btn-lg">Talk to sales</Link>
        </div>
      </div>
    </section>
  );
}
