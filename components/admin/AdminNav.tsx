"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Orders", match: (p: string) => p === "/admin" },
  { href: "/admin/settings", label: "Settings", match: (p: string) => p.startsWith("/admin/settings") },
];

export default function AdminNav() {
  const pathname = usePathname() || "";
  return (
    <nav className="admin-nav">
      {LINKS.map((l) => (
        <Link key={l.href} href={l.href} className={l.match(pathname) ? "active" : ""}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
