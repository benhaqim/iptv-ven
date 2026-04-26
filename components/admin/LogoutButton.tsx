"use client";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return (
    <button
      type="button"
      className="admin-link-out"
      onClick={async () => {
        await supabase.auth.signOut();
        router.replace("/admin/login");
        router.refresh();
      }}
    >
      <LogOut size={14} /> Sign out
    </button>
  );
}
