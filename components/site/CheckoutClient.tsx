"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck, Zap, Users, Mail, User, MessageCircle, Phone, Tv2,
  Lock, Ticket, Play, AlertTriangle, Info, Check, ShoppingCart, Download, Cpu,
} from "lucide-react";

type Plan = { id: string; name: string; price: number; group: "ultra" | "basic"; tag?: "TRIAL" | "POPULAR" | "DEAL" | "BEST" };

const PLANS: Plan[] = [
  { id: "1m", name: "1 Month", price: 9.99, group: "ultra", tag: "TRIAL" },
  { id: "3m", name: "3 Months", price: 19.99, group: "ultra", tag: "POPULAR" },
  { id: "6m", name: "6 Months", price: 29.99, group: "ultra", tag: "DEAL" },
  { id: "12m", name: "12 Months", price: 54.99, group: "ultra", tag: "BEST" },
  { id: "1mb", name: "1 Month", price: 6.99, group: "basic" },
  { id: "3mb", name: "3 Months", price: 14.99, group: "basic", tag: "POPULAR" },
  { id: "6mb", name: "6 Months", price: 21.99, group: "basic", tag: "DEAL" },
  { id: "12mb", name: "12 Months", price: 39.99, group: "basic", tag: "BEST" },
];

const COUNTRIES = [
  { code: "fr", flag: "🇫🇷", dial: "+33" },
  { code: "uk", flag: "🇬🇧", dial: "+44" },
  { code: "es", flag: "🇪🇸", dial: "+34" },
  { code: "de", flag: "🇩🇪", dial: "+49" },
  { code: "it", flag: "🇮🇹", dial: "+39" },
  { code: "us", flag: "🇺🇸", dial: "+1" },
];

const PROMO = "STREAMLIX10";
const ACTIVATION_PRICE = { "12m": 3, lifetime: 5 } as const;
type AppId = "ibo" | "hot" | "free";
type ActivationId = keyof typeof ACTIVATION_PRICE;

const WhatsAppIcon = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden>
    <path d="M16.003 3.2C9.04 3.2 3.4 8.84 3.4 15.8c0 2.5.7 4.86 1.92 6.86L3.2 28.8l6.32-2.07a12.5 12.5 0 0 0 6.48 1.78h.01c6.96 0 12.6-5.64 12.6-12.6S22.97 3.2 16 3.2zm0 23.05a10.4 10.4 0 0 1-5.3-1.45l-.38-.22-3.74 1.22 1.24-3.65-.25-.39a10.4 10.4 0 0 1-1.6-5.55c0-5.74 4.66-10.4 10.4-10.4 2.78 0 5.39 1.08 7.36 3.05a10.34 10.34 0 0 1 3.05 7.36c0 5.74-4.67 10.4-10.4 10.4zm5.7-7.78c-.31-.16-1.84-.91-2.13-1.01-.29-.1-.5-.16-.71.16-.21.31-.81 1.01-.99 1.21-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.51-1.55-.93-.83-1.55-1.85-1.74-2.16-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61s1.13 3.03 1.29 3.24c.16.21 2.23 3.4 5.4 4.77.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.07-.13-.28-.21-.59-.36z" />
  </svg>
);

export default function CheckoutClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [planId, setPlanId] = useState("12m");

  useEffect(() => {
    const id = params?.get("plan");
    if (id && PLANS.some((p) => p.id === id)) setPlanId(id);
  }, [params]);

  const [app, setApp] = useState<AppId | null>(null);
  const [activation, setActivation] = useState<ActivationId>("12m");
  const [macAddress, setMacAddress] = useState("");
  const [secretCode, setSecretCode] = useState("");

  const [pay, setPay] = useState<"stripe" | "crypto">("stripe");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCC, setPhoneCC] = useState("fr");
  const [device, setDevice] = useState("Android TV");
  const [seats, setSeats] = useState<1 | 2>(1);
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [notes, setNotes] = useState("");
  const [promo, setPromo] = useState("STREAMLIX10");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = PLANS.find((p) => p.id === planId)!;
  const ultra = PLANS.filter((p) => p.group === "ultra");
  const basic = PLANS.filter((p) => p.group === "basic");

  const appPrice = app === "free" ? 0 : app ? ACTIVATION_PRICE[activation] : 0;
  const subTotal = plan.price + appPrice;
  const promoValid = promo.trim().toUpperCase() === PROMO;
  const discount = promoValid ? subTotal * 0.1 : 0;
  const total = useMemo(() => +(subTotal - discount).toFixed(2), [subTotal, discount]);

  const macValid = !app || app === "free" || /^([0-9A-F]{2}[:-]){5}[0-9A-F]{2}$/i.test(macAddress.trim());
  const canSubmit = !!app && !!name.trim() && /\S+@\S+\.\S+/.test(email) && phone.trim().length >= 6 && macValid && (app !== "ibo" || secretCode.trim().length > 0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!canSubmit) {
      setError("Please complete all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_id: plan.id,
          plan_name: `${plan.name} · ${plan.group === "ultra" ? "Strong 8K Ultra" : "Max OTT"}`,
          plan_price: plan.price,
          app,
          activation: app === "free" ? null : activation,
          activation_price: appPrice,
          mac_address: app === "free" ? null : macAddress.trim() || null,
          secret_code: app === "ibo" ? secretCode.trim() || null : null,
          payment_method: pay,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          phone_cc: phoneCC,
          device,
          seats,
          preferred_channel: channel,
          notes: notes.trim() || null,
          promo: promoValid ? PROMO : null,
          subtotal: subTotal,
          discount,
          total,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Couldn't submit your order. Please try again.");
      }
      const data = await res.json();
      router.push(`/checkout/thank-you?id=${encodeURIComponent(data.id || "")}&channel=${channel}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't submit your order.");
      setSubmitting(false);
    }
  };

  return (
    <main className="checkout-page">
      <div className="checkout-bg" />
      <div className="container">

        <div className="checkout-header reveal">
          <div className="checkout-logo"><ShoppingCart size={28} strokeWidth={2.2} /></div>
          <h1>Finalize your <span className="accent">order</span></h1>
          <p>Instant activation · 24/7 support · Premium quality</p>
          <div className="trust-row">
            <span className="trust-pill green"><Users size={14} /> 240,000+ active users</span>
            <span className="trust-pill gold"><ShieldCheck size={14} /> Secure payment</span>
            <span className="trust-pill blue"><Zap size={14} /> Instant activation</span>
          </div>
        </div>

        <form className="checkout-grid" onSubmit={onSubmit}>
          <div>
            <div className="checkout-card reveal">
              <div className="step-head">
                <span className="step-num">1</span>
                <h2>Choose your offer</h2>
              </div>

              <div className="offer-group">
                <div className="offer-group-title">Offers · Strong 8K Ultra</div>
                <div className="offer-group-sub">More channels, full VOD, superior image quality (up to 8K on selected channels).</div>
                <div className="offer-grid">
                  {ultra.map((p) => (
                    <button type="button" key={p.id} className={`offer-tile ${planId === p.id ? "selected" : ""}`} onClick={() => setPlanId(p.id)}>
                      <span className="offer-check"><Check size={12} strokeWidth={3} /></span>
                      <div className="offer-tile-head">
                        <span className="offer-duration">{p.name}</span>
                        {p.tag && <span className={`offer-tag ${p.tag.toLowerCase()}`}>{p.tag}</span>}
                      </div>
                      <div className="offer-price">
                        {p.price}<span className="currency">€</span>
                      </div>
                      <div className="offer-sub">Payment fees included</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="offer-group">
                <div className="offer-group-title">Offers · Max OTT (Standard)</div>
                <div className="offer-group-sub">Great quality-to-price, essential content, works very well.</div>
                <div className="offer-grid">
                  {basic.map((p) => (
                    <button type="button" key={p.id} className={`offer-tile blue ${planId === p.id ? "selected" : ""}`} onClick={() => setPlanId(p.id)}>
                      <span className="offer-check"><Check size={12} strokeWidth={3} /></span>
                      <div className="offer-tile-head">
                        <span className="offer-duration">{p.name}</span>
                        {p.tag && <span className={`offer-tag ${p.tag.toLowerCase()}`}>{p.tag}</span>}
                      </div>
                      <div className="offer-price">
                        {p.price}<span className="currency">€</span>
                      </div>
                      <div className="offer-sub">Payment fees included</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="checkout-card reveal">
              <div className="step-head">
                <span className="step-num" style={{ background: "linear-gradient(135deg,var(--violet),var(--indigo))" }}>
                  <Tv2 size={16} />
                </span>
                <h2>IPTV Application <span className="req">*</span></h2>
              </div>
              <div className="app-info">
                We sell <b>the server / playlist</b>, not the application itself.<br />
                Free apps (Strong, Smart IPTV, etc.) often cause playback issues. <b>It&apos;s not our server</b>. For the best quality, we recommend a paid app below.
              </div>
              <div style={{ fontSize: 12, color: "var(--text-mute)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Choose the app</div>

              <div className="app-list">
                <button type="button" className={`app-option ${app === "ibo" ? "selected gold" : ""}`} onClick={() => setApp("ibo")}>
                  <div className="app-icon"><Play size={16} fill="currentColor" /></div>
                  <div>
                    <div className="app-name">IBO Player <span className="app-rec">Recommended</span></div>
                    <div className="app-meta">Activation + playlist management included</div>
                  </div>
                  <div className="app-price paid">+3€</div>
                </button>

                <button type="button" className={`app-option ${app === "hot" ? "selected gold" : ""}`} onClick={() => setApp("hot")}>
                  <div className="app-icon"><Play size={16} fill="currentColor" /></div>
                  <div>
                    <div className="app-name">Hot Player <span className="app-rec">Recommended</span></div>
                    <div className="app-meta">Activation + playlist management included</div>
                  </div>
                  <div className="app-price paid">+3€</div>
                </button>

                <button type="button" className={`app-option ${app === "free" ? "selected danger" : ""}`} onClick={() => setApp("free")}>
                  <div className="app-icon" style={{ background: "rgba(255,255,255,0.05)", borderColor: "var(--line)", color: "var(--text-mute)" }}><Play size={16} fill="currentColor" /></div>
                  <div>
                    <div className="app-name">Free app</div>
                    <div className="app-meta">No support — app issues are not our responsibility</div>
                  </div>
                  <div className="app-price free">0€</div>
                </button>
              </div>

              {(app === "ibo" || app === "hot") && (
                <div className="app-extra">
                  <div className="app-extra-label">Activation duration <span className="req">*</span></div>
                  <div className="activation-grid">
                    <button type="button" className={`activation-tile ${activation === "12m" ? "selected" : ""}`} onClick={() => setActivation("12m")}>
                      <span className="activation-price">3 €</span>
                      <span className="activation-meta">12 months</span>
                    </button>
                    <button type="button" className={`activation-tile ${activation === "lifetime" ? "selected" : ""}`} onClick={() => setActivation("lifetime")}>
                      <span className="activation-price">5 €</span>
                      <span className="activation-meta">Lifetime</span>
                    </button>
                  </div>
                  <div className="app-note">
                    <Cpu size={14} /> Activation is valid for <b>1 device</b> only.
                  </div>

                  <a
                    href={app === "ibo" ? "https://iboplayer.com" : "https://www.hotiptv.org"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="app-install"
                  >
                    <div className="app-install-icon"><Download size={16} /></div>
                    <div>
                      <div className="app-install-title">Install the app first</div>
                      <div className="app-install-sub">Open the app to find your MAC address.</div>
                    </div>
                    <span className="app-install-arrow">↗</span>
                  </a>

                  <div className="field" style={{ marginTop: 18 }}>
                    <label>MAC address <span className="req">*</span></label>
                    <div className="field-icon-wrap">
                      <span className="field-icon"><Cpu size={14} /></span>
                      <input
                        type="text"
                        placeholder="e.g. 00:1A:79:XX:XX:XX"
                        value={macAddress}
                        onChange={(e) => setMacAddress(e.target.value.toUpperCase())}
                        autoComplete="off"
                      />
                    </div>
                    <div className="field-help">
                      Open {app === "ibo" ? "IBO Player" : "Hot Player"} → Settings → you&apos;ll see your MAC address. You can also send it to us afterwards.
                    </div>
                  </div>

                  {app === "ibo" && (
                    <div className="field">
                      <label>Secret code <span className="req">*</span></label>
                      <div className="field-icon-wrap">
                        <span className="field-icon"><Lock size={14} /></span>
                        <input
                          type="text"
                          placeholder="e.g. 123456789"
                          value={secretCode}
                          onChange={(e) => setSecretCode(e.target.value)}
                          autoComplete="off"
                        />
                      </div>
                      <div className="field-help">
                        Visible inside IBO Player → Settings → Secret code. You can also send it after.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {app === "free" && (
                <div className="app-warning">
                  <div className="app-warning-head"><AlertTriangle size={16} /> No support with a free app</div>
                  <p>
                    With a free app, we provide <b>no technical support</b>. Outages, freezes or app slowness are <b>not covered</b>.
                    We strongly recommend choosing IBO Player or Hot Player for the best experience.
                  </p>
                </div>
              )}
            </div>

            <div className="checkout-card reveal">
              <div className="step-head">
                <span className="step-num">2</span>
                <h2>Payment method</h2>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 18 }}>
                PayPal is not offered. Pay by card (Stripe) or crypto.
              </p>
              <div className="pay-grid">
                <button type="button" className={`pay-tile stripe ${pay === "stripe" ? "selected" : ""}`} onClick={() => setPay("stripe")}>
                  <span className="pay-check">{pay === "stripe" && <Check size={12} strokeWidth={3} />}</span>
                  <div className="pay-tile-name">Stripe</div>
                  <div className="pay-tile-desc">Card · Apple Pay · Google Pay · Link · Klarna</div>
                </button>
                <button type="button" className={`pay-tile ${pay === "crypto" ? "selected" : ""}`} onClick={() => setPay("crypto")}>
                  <span className="pay-check">{pay === "crypto" && <Check size={12} strokeWidth={3} />}</span>
                  <div className="pay-tile-name" style={{ color: "var(--gold)" }}>₿ Crypto</div>
                  <div className="pay-tile-desc">BTC · USDT · ETH · instructions after order</div>
                </button>
              </div>
            </div>
          </div>

          <aside className="summary-side">
            <div className="checkout-card reveal">
              <div className="step-head">
                <span className="step-num">3</span>
                <h2>Your information</h2>
              </div>

              <div className="field">
                <label>Full name <span className="req">*</span></label>
                <div className="field-icon-wrap">
                  <span className="field-icon"><User size={14} /></span>
                  <input type="text" required placeholder="Ex: Jean Dupont" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <label>Email <span className="req">*</span></label>
                <div className="field-icon-wrap">
                  <span className="field-icon"><Mail size={14} /></span>
                  <input type="email" required placeholder="Ex: jean@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="email-info">
                <Info size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                <div>You&apos;ll receive an email from <b>contact@streamlixiptv.com</b> — check your spam if you don&apos;t see it.</div>
              </div>

              <div className="field">
                <label>WhatsApp <span className="req">*</span></label>
                <div className="phone-row">
                  <select value={phoneCC} onChange={(e) => setPhoneCC(e.target.value)}>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code} style={{ background: "var(--panel)" }}>
                        {c.flag} {c.dial}
                      </option>
                    ))}
                  </select>
                  <div className="field-icon-wrap">
                    <span className="field-icon" style={{ color: "#25D366" }}><WhatsAppIcon size={14} /></span>
                    <input type="tel" required placeholder="612345678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="field">
                <label>Preferred channel <span className="req">*</span></label>
                <div className="toggle-row">
                  <button type="button" className={`toggle-btn ${channel === "whatsapp" ? "green-active" : ""}`} onClick={() => setChannel("whatsapp")}>
                    <WhatsAppIcon size={14} /> WhatsApp
                  </button>
                  <button type="button" className={`toggle-btn ${channel === "email" ? "blue-active" : ""}`} onClick={() => setChannel("email")}>
                    <Mail size={14} /> Email
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="field">
                  <label>Device</label>
                  <select value={device} onChange={(e) => setDevice(e.target.value)}>
                    {["Android TV", "Apple TV", "Fire Stick", "Smart TV (Samsung/LG)", "iPhone / iPad", "Android phone", "PC / Mac"].map((d) => (
                      <option key={d} value={d} style={{ background: "var(--panel)" }}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Number of accounts</label>
                  <div className="qty-row">
                    <button type="button" className={`qty-btn ${seats === 1 ? "active" : ""}`} onClick={() => setSeats(1)}>1</button>
                    <button type="button" className={`qty-btn ${seats === 2 ? "active" : ""}`} onClick={() => setSeats(2)}>2</button>
                  </div>
                </div>
              </div>
              <div className="qty-help">
                2 = two separate subscriptions. Each account works on a single device. One connection / one device at a time per offer.
              </div>

              <div className="notes-card" style={{ marginTop: 18 }}>
                <div className="notes-card-head">
                  <AlertTriangle size={14} /> Before ordering
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label>Notes <span style={{ color: "var(--text-mute)" }}>(optional)</span></label>
                  <textarea placeholder="Ex: best hours to reach you, remarks…" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <div className="notes-card-help">
                  Add any useful information (schedules, preferences for your order…).<br />
                  <span style={{ color: "#FCA5A5" }}>Only order if you can pay. Cancellations and unanswered orders may be refused.</span>
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, display: "block" }}>Promo code</label>
                <div className="promo-row">
                  <div className="field" style={{ margin: 0 }}>
                    <div className="field-icon-wrap">
                      <span className="field-icon"><Ticket size={14} /></span>
                      <input type="text" value={promo} onChange={(e) => setPromo(e.target.value.toUpperCase())} />
                    </div>
                  </div>
                  <button type="button" className="promo-clear" onClick={() => setPromo("")} aria-label="Clear">✕</button>
                </div>
                {promoValid && (
                  <div className="promo-applied"><Check size={14} /> Promo code applied!</div>
                )}
                <div className="promo-help">Share this code with a friend — they get a discount too!</div>
              </div>

              <div className="total-row">
                <div>
                  <div className="total-label">Total to pay</div>
                  {(discount > 0 || appPrice > 0) && (
                    <div className="total-discount-line">
                      {discount > 0 && (
                        <>
                          <span className="total-old">{subTotal.toFixed(2)}€</span>
                          <span className="total-saving">-10%</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="total-amount">{total.toFixed(2)}€</div>
              </div>

              {error && (
                <div style={{
                  padding: "10px 14px", borderRadius: 10, marginBottom: 12,
                  background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)",
                  color: "#FCA5A5", fontSize: 13,
                }}>
                  {error}
                </div>
              )}

              <button type="submit" className="btn-checkout" disabled={!canSubmit || submitting}>
                {submitting ? "Placing order…" : "Place order"}
              </button>

              <div className="security-row">
                <span><Lock size={11} /> SSL encrypted</span>
                <span><MessageCircle size={11} /> 24/7 support</span>
              </div>

              <div className="legal-card">
                <h4><AlertTriangle size={11} style={{ display: "inline", marginRight: 4 }} /> Legal notice — please read before ordering</h4>
                <ul className="legal-list">
                  <li><span><b>No adult content</b> — we don&apos;t provide adult content.</span></li>
                  <li><span><b>No refund</b> once the order is validated and delivered.</span></li>
                  <li className="warn"><span>We are <b>resellers</b>, not server owners. Outages may happen, like on every online platform.</span></li>
                  <li className="warn"><span>Third-party apps (especially free ones) are <b>your responsibility</b>.</span></li>
                </ul>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
