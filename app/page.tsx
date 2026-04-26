import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight, Play, Shield, Zap, Globe, Tv, Smartphone, Laptop, Tablet, Cast,
  Headphones, RefreshCcw, Award,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: undefined,
  path: "/",
});
import PlansGrid from "@/components/site/PlansGrid";
import FAQ from "@/components/site/FAQ";
import CTABanner from "@/components/site/CTABanner";
import LatestMovies from "@/components/site/LatestMovies";
import SportsChannels from "@/components/site/SportsChannels";
import ImageTestimonials from "@/components/site/ImageTestimonials";
import F1Section from "@/components/site/F1Section";
import WorldCupCountdown from "@/components/site/WorldCupCountdown";

const features = [
  { icon: Zap, title: "Anti-buffer engine", desc: "Edge servers across 32 regions deliver sub-second latency, even on peak match nights." },
  { icon: Award, title: "4K & 8K UHD", desc: "True UHD with HDR10+ on supported channels. Cinema-grade image, broadcast reliability." },
  { icon: Globe, title: "Global catalogue", desc: "Football, F1, NBA, MMA, tennis — plus 160,000 films and series, in 12 audio tracks." },
  { icon: Shield, title: "Encrypted by default", desc: "Every stream travels over TLS 1.3. Your account, viewing history and payments are private." },
  { icon: Headphones, title: "Real human support", desc: "24/7 live chat with average reply time under 90 seconds. Setup guidance included." },
  { icon: RefreshCcw, title: "Catch-up replay", desc: "Missed kickoff? Rewind any match up to 7 days. EPG with one-tap channel jump." },
];

const devices = [
  { icon: Tv, name: "Smart TV" },
  { icon: Laptop, name: "Mac & PC" },
  { icon: Smartphone, name: "iPhone & Android" },
  { icon: Tablet, name: "Tablets" },
  { icon: Cast, name: "Streaming sticks" },
];

const steps = [
  { n: "01", t: "Pick a plan", d: "Trial, Starter, Half-Year or Pro — switch tiers any time." },
  { n: "02", t: "Pay securely", d: "Card, PayPal or crypto. SSL-encrypted checkout." },
  { n: "03", t: "Get credentials", d: "Login details delivered by email in under 5 minutes." },
  { n: "04", t: "Start streaming", d: "Open any compatible app and you're live." },
];

const faqs = [
  { q: "Is the service legal in my country?", a: "StreamlixIPTV is a relay service — you're responsible for confirming local licensing. We provide the technology; the entertainment licensing depends on your jurisdiction." },
  { q: "Do I need a special box or VPN?", a: "No box, no VPN. Any modern smart TV, phone, tablet, computer or streaming stick will run our app. Setup is one URL and one login." },
  { q: "How fast is the activation?", a: "Credentials are emailed within 5 minutes of payment. Most customers are watching their first match within 10 minutes of signup." },
  { q: "Can I watch on multiple devices?", a: "Yes — Trial and Starter allow 1 device, Half-Year and Pro allow 2 simultaneous devices. You can swap devices anytime from your account dashboard." },
  { q: "What happens if a stream fails?", a: "Auto-failover routes you to a mirror in under 2 seconds. If the issue persists, our 24/7 support team escalates to engineering immediately." },
  { q: "Is there a refund policy?", a: "7-day money-back guarantee, no questions asked. If you're not happy, we're not happy." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero hero-full hero-centered">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero-stadium.avif"
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-bg-overlay" />

        <div className="hero-orbits" aria-hidden>
          <span className="hero-orbit hero-orbit--1" />
          <span className="hero-orbit hero-orbit--2" />
          <span className="hero-orbit hero-orbit--3" />
        </div>

        <div className="container hero-center">
          <span className="eyebrow"><span className="dot" />FIFA World Cup 2026 · All matches included</span>
          <h1 className="hero-title">
            <span className="hero-title-line">Every</span>
            <span className="hero-title-line hero-title-line--big">
              <span className="accent">match.</span>
            </span>
            <span className="hero-title-line">Every screen.</span>
          </h1>
          <div className="hero-flair" aria-hidden>
            <span className="hero-flair-line" />
            <span className="hero-flair-dot" />
            <span className="hero-flair-line" />
          </div>
          <p className="lede hero-lede">
            Premium 4K &amp; 8K live sport — football, basketball, F1, tennis, NFL — plus 160,000 films and series.
            One subscription. Zero buffering.
          </p>
          <div className="hero-cta hero-cta--center">
            <Link href="/pricing" className="btn btn-primary btn-lg">Start watching <ArrowRight size={16} /></Link>
            <Link href="#how" className="btn btn-ghost btn-lg"><Play size={14} /> How it works</Link>
          </div>
          <div className="hero-stats hero-stats--center">
            <div className="stat"><span className="stat-value">28K+</span><span className="stat-label">Live channels</span></div>
            <span className="hero-stat-sep" aria-hidden />
            <div className="stat"><span className="stat-value">160K</span><span className="stat-label">Films &amp; series</span></div>
            <span className="hero-stat-sep" aria-hidden />
            <div className="stat"><span className="stat-value">99.9%</span><span className="stat-label">Uptime SLA</span></div>
          </div>
        </div>

        <div className="hero-scroll-cue" aria-hidden>
          <span className="hero-scroll-cue-track" />
          <span className="hero-scroll-cue-label">Scroll</span>
        </div>
      </section>

      <LatestMovies />

      <section className="showcase">
        <div className="showcase-bg parallax-img" data-speed="0.1" />
        <div className="container">
          <div className="showcase-grid">
            <div className="showcase-content reveal">
              <span className="section-tag">FIFA World Cup 2026 · USA · Canada · Mexico</span>
              <h2>
                The world&apos;s{" "}
                <span style={{
                  background: "linear-gradient(120deg,#fff 0%, var(--gold) 100%)",
                  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                }}>
                  biggest tournament
                </span>
              </h2>
              <p>104 matches. 48 nations. Three host countries. Every kickoff, every penalty, every goal — streamed live in glorious 4K UHD.</p>
              <ul className="showcase-list">
                <li>All 104 matches</li>
                <li>Multi-angle replays</li>
                <li>Studio analysis & highlights</li>
                <li>12 commentary languages</li>
                <li>Pre & post-match shows</li>
                <li>Catch-up for 30 days</li>
              </ul>
              <Link href="/pricing" className="btn btn-wc btn-lg">Stream the World Cup <ArrowRight size={16} /></Link>
            </div>
            <div className="showcase-photo reveal">
              <span className="showcase-badge">★ Tournament 2026</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/world-cup-2026.webp" alt="FIFA World Cup 2026" />
              <div className="showcase-overlay-info">
                <h3>Opening match · June 11, 2026</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WorldCupCountdown />

      <section className="section section-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">Sports</span>
            <h2>Every league, every <span className="accent">match-day</span></h2>
            <p>From the Premier League to the NBA Finals — your full sports calendar in one app.</p>
          </div>
          <div className="sports-grid reveal-stagger">
            <div className="sport-tile large">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/champions-league.avif" alt="Champions League" />
              <span className="sport-channels"><b>320</b> channels</span>
              <div className="sport-tile-inner">
                <span className="sport-tile-tag">Football</span>
                <h3>UEFA Champions League</h3>
                <p>Every fixture, every round — through to the Final.</p>
              </div>
            </div>
            <div className="sport-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/sports-action.webp" alt="NBA action" />
              <span className="sport-channels"><b>92</b> channels</span>
              <div className="sport-tile-inner">
                <span className="sport-tile-tag">Basketball</span>
                <h3>NBA & EuroLeague</h3>
              </div>
            </div>
            <div className="sport-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/blog-worldcup.jpg" alt="World Cup" />
              <span className="sport-channels"><b>140</b> channels</span>
              <div className="sport-tile-inner">
                <span className="sport-tile-tag">Football</span>
                <h3>World Cup 2026</h3>
              </div>
            </div>
            <div className="sport-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/football-pitch.jpg" alt="Football pitch" />
              <span className="sport-channels"><b>180</b> channels</span>
              <div className="sport-tile-inner">
                <span className="sport-tile-tag">Football</span>
                <h3>Top 5 Leagues</h3>
              </div>
            </div>
            <div className="sport-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/stadium-night.jpg" alt="Stadium night" />
              <span className="sport-channels"><b>76</b> channels</span>
              <div className="sport-tile-inner">
                <span className="sport-tile-tag">NFL · F1 · UFC</span>
                <h3>And more...</h3>
              </div>
            </div>
          </div>
        </div>
      </section>


      <F1Section />

      <SportsChannels />

      <section className="section plans-section" id="plans">
        <div className="section-bg" />
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">Pricing</span>
            <h2>One subscription.<br /><span className="accent">Three ways to play.</span></h2>
            <p>Cancel anytime, no contract. Every plan includes the full live + VOD catalogue.</p>
          </div>
          <PlansGrid />
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/pricing" className="btn btn-ghost">See full pricing details <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="features">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">Built for the big nights</span>
            <h2>Engineered for <span className="accent">match-day pressure</span></h2>
            <p>Every part of the stack — from origin to your screen — is tuned for live sport.</p>
          </div>
          <div className="feature-grid reveal-stagger">
            {features.map((f) => {
              const I = f.icon;
              return (
                <div className="feature" key={f.title}>
                  <div className="feature-icon"><I size={22} /></div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section devices-section" id="devices">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">Watch anywhere</span>
            <h2>One account. <span className="accent">Every screen.</span></h2>
            <p>Native apps for every modern platform. No app store? No problem — sideload in 90 seconds.</p>
          </div>

          <div className="devices-stage reveal">
            <div className="devices-photo">
              <span className="devices-photo-glow" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/watchmovie.png" alt="Streaming on the couch" />
            </div>

            <div className="devices-list">
              {devices.map((d, i) => {
                const I = d.icon;
                return (
                  <div className="device-card" key={d.name} style={{ ["--i" as string]: i }}>
                    <span className="device-card-icon"><I size={22} /></span>
                    <div className="device-card-body">
                      <span className="device-card-name">{d.name}</span>
                      <span className="device-card-meta">Native app</span>
                    </div>
                    <span className="device-card-arrow">→</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="how">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">How it works</span>
            <h2>Streaming in <span className="accent">four steps</span></h2>
            <p>From sign-up to kickoff in less time than half-time.</p>
          </div>
          <div className="steps-grid reveal-stagger">
            {steps.map((s) => (
              <div className="step" key={s.n}>
                <div className="step-number">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageTestimonials />

      <section className="section section-alt" id="faq">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">FAQ</span>
            <h2>Questions, <span className="accent">answered</span></h2>
            <p>Still curious? Our team is one click away on live chat.</p>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
