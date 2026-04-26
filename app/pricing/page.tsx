import { Check, X, ShieldCheck, CreditCard, Zap } from "lucide-react";
import PlansGrid from "@/components/site/PlansGrid";
import FAQ from "@/components/site/FAQ";
import CTABanner from "@/components/site/CTABanner";

const compareRows: { label: string; values: (string | boolean)[] }[] = [
  { label: "Live channels", values: ["28,000+", "28,000+", "28,000+", "28,000+"] },
  { label: "Stream quality", values: ["Full HD / 4K", "Full HD / 4K", "Up to 8K", "Up to 8K"] },
  { label: "Simultaneous devices", values: ["1", "1", "2", "2"] },
  { label: "VOD library (160K)", values: [true, true, true, true] },
  { label: "Multi-language audio", values: [false, true, true, true] },
  { label: "EPG & catch-up", values: ["—", "7 days", "14 days", "30 days"] },
  { label: "8K UHD where available", values: [false, false, true, true] },
  { label: "Anti-buffer engine", values: [true, true, true, true] },
  { label: "Priority chat support", values: [false, false, true, true] },
  { label: "Best value", values: [false, false, false, true] },
  { label: "Support", values: ["Email", "Priority email", "Priority chat", "24/7 priority"] },
];

const faqs = [
  { q: "Can I switch plans later?", a: "Yes. You can upgrade at any time and the difference is pro-rated. Downgrades take effect at the next renewal." },
  { q: "Do you offer a free trial?", a: "We offer a 7-day money-back guarantee on every plan, plus a low-cost 1-month Trial tier so you can take everything for a spin." },
  { q: "Which payment methods are accepted?", a: "All major credit/debit cards, Apple Pay, Google Pay, Klarna, plus crypto (BTC, USDT, ETH)." },
  { q: "Can I share my account?", a: "Plans include 1–4 simultaneous devices. You can sign in on more devices but only the device limit may stream concurrently." },
  { q: "Is VAT included?", a: "Yes — all listed prices are inclusive of VAT and payment fees. No surprises at checkout." },
];

export default function PricingPage() {
  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-bg" />
        <div className="container">
          <span className="eyebrow"><span className="dot" />Pricing · Pick your plan · Cancel anytime</span>
          <h1 style={{ margin: "24px 0" }}>
            Pricing built for <span className="accent">every fan</span>
          </h1>
          <p>Trial, Starter, Pro, Elite — same library, same speed, scaled to how often you watch and how many screens you stream on.</p>
        </div>
      </section>

      <section className="section plans-section" style={{ paddingTop: 40 }}>
        <div className="section-bg" />
        <div className="container">
          <PlansGrid />

          <div style={{
            marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
          }} className="reveal">
            <div className="feature">
              <div className="feature-icon"><ShieldCheck size={22} /></div>
              <h3>7-day money back</h3>
              <p>Not happy in the first week? Email us and we&apos;ll refund every cent. No forms, no questions.</p>
            </div>
            <div className="feature">
              <div className="feature-icon"><CreditCard size={22} /></div>
              <h3>Secure checkout</h3>
              <p>Stripe-grade encryption, Apple Pay, Google Pay, Klarna, plus crypto. PCI-DSS compliant.</p>
            </div>
            <div className="feature">
              <div className="feature-icon"><Zap size={22} /></div>
              <h3>Activated in minutes</h3>
              <p>Credentials in your inbox under 5 minutes. Most subscribers are streaming in under 10.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">Compare</span>
            <h2>Every feature, <span className="accent">side by side</span></h2>
            <p>Side-by-side breakdown of what each plan unlocks.</p>
          </div>

          <div className="reveal" style={{
            border: "1px solid var(--line-2)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            backdropFilter: "blur(20px)",
            background: "rgba(11,14,34,0.55)",
          }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                    <th style={{ padding: "20px 24px", textAlign: "left", fontSize: 12, color: "var(--text-mute)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Feature</th>
                    <th style={{ padding: "20px 16px", fontSize: 14, fontWeight: 600 }}>Trial</th>
                    <th style={{ padding: "20px 16px", fontSize: 14, fontWeight: 600 }}>Starter</th>
                    <th style={{ padding: "20px 16px", fontSize: 14, fontWeight: 600 }}>Half-Year</th>
                    <th style={{ padding: "20px 16px", fontSize: 14, fontWeight: 600, color: "var(--blue)" }}>Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: "var(--text-dim)" }}>{row.label}</td>
                      {row.values.map((v, j) => (
                        <td key={j} style={{ padding: "16px", textAlign: "center", fontSize: 14 }}>
                          {v === true ? <Check size={18} color="var(--blue)" style={{ margin: "0 auto" }} />
                            : v === false ? <X size={18} color="var(--text-mute)" style={{ margin: "0 auto" }} />
                            : <span style={{ color: "var(--text)" }}>{v}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">FAQ</span>
            <h2>Pricing, <span className="accent">cleared up</span></h2>
            <p>The most-asked billing & plan questions. More on the contact page.</p>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
