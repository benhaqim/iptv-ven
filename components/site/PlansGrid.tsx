import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLANS } from "@/lib/plans";

export default function PlansGrid() {
  const displayed = PLANS;
  return (
    <div className={`plans reveal-stagger cols-auto`}>
      {displayed.map((p) => (
        <div className={`plan ${p.featured ? "featured" : ""}`} key={p.id}>
          {p.badge && <span className="plan-badge">{p.badge}</span>}
          <div className="plan-name">{p.name}</div>
          <div className="plan-duration">{p.duration}</div>
          <div className="plan-price">
            <div>
              <span className="currency">€</span>
              <span className="amount">{p.price}</span>
              <span className="period">{p.period}</span>
              {p.savings && <div className="plan-savings">↓ {p.savings}</div>}
            </div>
          </div>
          <ul className="plan-features">
            {p.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <Link href={`/checkout?plan=${p.id}`} className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`}>
            {p.cta} <ArrowRight size={16} />
          </Link>
        </div>
      ))}
    </div>
  );
}
