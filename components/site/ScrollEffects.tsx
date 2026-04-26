"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    let raf = 0;
    const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      const root = document.documentElement;
      root.style.setProperty("--scroll-y", `${-scroll * 0.5}px`);
      const progress = limit > 0 ? scroll / limit : 0;
      root.style.setProperty("--scroll-progress", `${progress}`);
      document.body.classList.toggle("scrolled", scroll > 24);
      document.querySelectorAll<HTMLElement>(".parallax-img").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.25");
        el.style.transform = `translate3d(0, ${scroll * speed}px, 0) scale(1.1)`;
      });
    };
    lenis.on("scroll", onScroll);
    onScroll({ scroll: window.scrollY, limit: document.documentElement.scrollHeight - window.innerHeight });

    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const observe = (el: Element) => {
      el.classList.remove("in");
      io.observe(el);
    };

    document.querySelectorAll(".reveal, .reveal-stagger").forEach(observe);

    const mo = new MutationObserver((records) => {
      records.forEach((rec) => {
        rec.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches?.(".reveal, .reveal-stagger")) observe(n);
          n.querySelectorAll?.(".reveal, .reveal-stagger").forEach(observe);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const fallback = window.setTimeout(() => {
      document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => el.classList.add("in"));
    }, 1500);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden />;
}
