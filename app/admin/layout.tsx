import Link from "next/link";
import { headers } from "next/headers";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = headers().get("x-pathname") || "";
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-aside">
        <div className="admin-brand">
          <span className="admin-brand-mark">S</span>
          <div>
            <div className="admin-brand-name">Streamlix<span style={{ color: "var(--blue)" }}>IPTV</span></div>
            <div className="admin-brand-sub">Admin</div>
          </div>
        </div>
        <AdminNav />
        <div className="admin-aside-foot">
          <Link href="/" className="admin-link-back">← Back to site</Link>
          <LogoutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
