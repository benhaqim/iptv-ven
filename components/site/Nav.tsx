"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoMark from "./LogoMark";

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/installation-guide", label: "Installation Guide" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));
  const transparentOnHome = pathname === "/";

  return (
    <nav className={`nav ${transparentOnHome ? "nav--transparent" : ""}`}>
      <div className="container nav-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <LogoMark />
          <span>
            Streamlix<span style={{ color: "var(--blue)" }}>IPTV</span>
          </span>
        </Link>

        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : ""}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="nav-cta">
          <Link href="/pricing" className="btn btn-primary">Get started</Link>
          <button
            className="nav-mobile-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`nav-mobile-drawer ${open ? "open" : ""}`}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={isActive(l.href) ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
