import Link from "next/link";
import { ArrowRight, Flag, Gauge, Trophy } from "lucide-react";

export default function F1Section() {
  return (
    <section className="f1-section">
      <div className="f1-bg parallax-img" data-speed="0.08" />
      <div className="container">
        <div className="f1-grid">
          <div className="f1-content reveal">
            <span className="f1-eyebrow">
              <span className="dot" /> Live · 2026 Season · 24 Grand Prix
            </span>
            <h2>
              Lights out.<br />
              <span className="f1-accent">Stream every lap.</span>
            </h2>
            <p>
              The full Formula 1 calendar in 4K UHD — every practice, qualifying, sprint and race.
              Onboard cameras, team radios, live timing telemetry. Everything from the grid to the chequered flag.
            </p>
            <div className="f1-stats">
              <div className="f1-stat">
                <Trophy size={18} />
                <div>
                  <b>24</b>
                  <span>Grand Prix</span>
                </div>
              </div>
              <div className="f1-stat">
                <Gauge size={18} />
                <div>
                  <b>4K</b>
                  <span>UHD streams</span>
                </div>
              </div>
              <div className="f1-stat">
                <Flag size={18} />
                <div>
                  <b>20+</b>
                  <span>Onboard feeds</span>
                </div>
              </div>
            </div>
            <div className="f1-cta">
              <Link href="/pricing" className="btn btn-f1">
                Watch the season <ArrowRight size={16} />
              </Link>
              <Link href="/installation-guide" className="btn btn-ghost">Setup guides</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
