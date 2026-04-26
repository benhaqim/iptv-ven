"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-11T20:00:00-05:00").getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export default function WorldCupCountdown() {
  const [t, setT] = useState(calc());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="wc-countdown">
      <div className="wc-edge wc-edge--top" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <span className="wc-tribune" key={`t-${i}`} />
        ))}
      </div>
      <div className="wc-inner">
        <div className="wc-numbers">
          <div className="wc-cell">
            <span className="wc-num">{mounted ? pad(t.days) : "--"}</span>
            <span className="wc-label">Days</span>
          </div>
          <span className="wc-sep">:</span>
          <div className="wc-cell">
            <span className="wc-num">{mounted ? pad(t.hours) : "--"}</span>
            <span className="wc-label">Hours</span>
          </div>
          <span className="wc-sep">:</span>
          <div className="wc-cell">
            <span className="wc-num">{mounted ? pad(t.minutes) : "--"}</span>
            <span className="wc-label">Minutes</span>
          </div>
          <span className="wc-sep">:</span>
          <div className="wc-cell">
            <span className="wc-num">{mounted ? pad(t.seconds) : "--"}</span>
            <span className="wc-label">Seconds</span>
          </div>
        </div>
        <div className="wc-divider" />
        <p className="wc-caption">UNTIL FIFA WORLD CUP 26™ KICKOFF</p>
      </div>
      <div className="wc-edge wc-edge--bottom" aria-hidden>
        {Array.from({ length: 4 }).map((_, i) => (
          <span className="wc-tribune" key={`b-${i}`} />
        ))}
      </div>
    </section>
  );
}
