"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

export default function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list reveal">
      {items.map((item, i) => (
        <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{item.q}</span>
            <span className="faq-toggle">+</span>
          </button>
          <div className="faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  );
}
