"use client";

import { useState } from "react";
import { Send, Check, User, Mail, MessageSquare } from "lucide-react";

const subjects = ["Sales enquiry", "Technical support", "Billing", "Reseller / partnership", "Other"];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="contact-card" style={{ textAlign: "center", padding: 56 }}>
        <div style={{
          width: 64, height: 64, margin: "0 auto 20px",
          borderRadius: 18, display: "grid", placeItems: "center",
          background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.4)",
          color: "var(--green)",
          boxShadow: "0 0 40px rgba(34,197,94,0.3)",
        }}>
          <Check size={28} />
        </div>
        <h2 style={{ fontSize: 26, marginBottom: 10 }}>Message received</h2>
        <p style={{ color: "var(--text-dim)", maxWidth: 420, margin: "0 auto" }}>
          Thanks {name.split(" ")[0]} — we&apos;ll get back to you within a few hours, usually faster.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-card contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="c-name"><User size={12} style={{ display: "inline", marginRight: 6 }} />Full name</label>
          <input id="c-name" className="input" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Marco Rivera" />
        </div>
        <div className="field">
          <label htmlFor="c-email"><Mail size={12} style={{ display: "inline", marginRight: 6 }} />Email</label>
          <input id="c-email" type="email" className="input" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="c-subject">Subject</label>
        <select id="c-subject" className="select" value={subject} onChange={(e) => setSubject(e.target.value)}>
          {subjects.map((s) => <option key={s} value={s} style={{ background: "var(--panel)" }}>{s}</option>)}
        </select>
      </div>

      <div className="field">
        <label htmlFor="c-message"><MessageSquare size={12} style={{ display: "inline", marginRight: 6 }} />Message</label>
        <textarea
          id="c-message"
          className="textarea"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your setup, your devices, what you'd like to watch..."
        />
      </div>

      <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: "flex-start", padding: "16px 32px" }}>
        Send message <Send size={16} />
      </button>
      <p style={{ fontSize: 12, color: "var(--text-mute)" }}>
        We typically reply within a few hours. For urgent issues use the live chat in the bottom right of any page.
      </p>
    </form>
  );
}
