"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params?.get("from") || "/admin";

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    router.replace(from);
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="admin-login-form">
      <label>Email
        <input type="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@streamlixiptv.com" />
      </label>
      <label>Password
        <input type="password" required value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
      </label>
      {err && <div className="admin-login-error">{err}</div>}
      <button type="submit" className="admin-btn admin-btn--primary" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
