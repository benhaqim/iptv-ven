import { Mail, MessageCircle, Clock, Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import ContactForm from "@/components/site/ContactForm";
import CTABanner from "@/components/site/CTABanner";

export const metadata = { title: "Contact — StreamlixIPTV" };

const contactInfo = [
  { icon: Mail, title: "Email us", body: "Our team replies within a few hours.", value: "support@streamlixiptv.com", href: "mailto:support@streamlixiptv.com" },
  { icon: MessageCircle, title: "Live chat", body: "Average response time under 90 seconds.", value: "Open in-app chat", href: "#" },
  { icon: Clock, title: "Support hours", body: "We\u2019re online 24/7 across every time zone.", value: "Always on" },
];

export default function ContactPage() {
  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-bg" />
        <div className="container">
          <span className="eyebrow"><span className="dot" />Support · Sales · Partnerships</span>
          <h1 style={{ margin: "24px 0" }}>Talk to <span className="accent">our team</span></h1>
          <p>Pre-sales question, setup help, partnership idea — pick a channel and we&apos;ll get back to you fast.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="contact-grid reveal">
            <ContactForm />

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {contactInfo.map((c) => {
                const I = c.icon;
                return (
                  <div className="contact-info-card" key={c.title}>
                    <div className="contact-info-icon"><I size={18} /></div>
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.body}</p>
                      {c.href ? (
                        <a href={c.href} style={{ display: "inline-block", marginTop: 6, fontSize: 14 }}>{c.value}</a>
                      ) : (
                        <div style={{ marginTop: 6, fontSize: 14, color: "var(--text)" }}>{c.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="contact-info-card" style={{ flexDirection: "column", alignItems: "stretch" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 14 }}>
                  <div className="contact-info-icon">
                    <Twitter size={18} />
                  </div>
                  <div>
                    <h3>Follow us</h3>
                    <p>Highlights, fixture reminders & setup tips.</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <a href="#" aria-label="Twitter" className="social-btn"><Twitter size={16} /></a>
                  <a href="#" aria-label="Instagram" className="social-btn"><Instagram size={16} /></a>
                  <a href="#" aria-label="YouTube" className="social-btn"><Youtube size={16} /></a>
                  <a href="#" aria-label="Facebook" className="social-btn"><Facebook size={16} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
