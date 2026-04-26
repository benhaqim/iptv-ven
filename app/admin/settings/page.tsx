import { supabaseAdmin } from "@/lib/supabase/server";
import SettingsForm from "@/components/admin/SettingsForm";

export const metadata = { title: "Settings — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const sb = supabaseAdmin();
  const { data } = await sb.from("settings").select("*").eq("id", 1).single();

  return (
    <div>
      <header className="admin-header">
        <div>
          <h1>Settings</h1>
          <p>Payment links, customer email, and SMTP configuration.</p>
        </div>
      </header>
      <SettingsForm
        initial={{
          stripe_link: data?.stripe_link ?? "",
          crypto_link: data?.crypto_link ?? "",
          email_subject: data?.email_subject ?? "",
          email_html: data?.email_html ?? "",
          smtp_host: data?.smtp_host ?? "",
          smtp_port: data?.smtp_port ?? 587,
          smtp_user: data?.smtp_user ?? "",
          smtp_from: data?.smtp_from ?? "",
          smtp_secure: data?.smtp_secure ?? false,
          has_smtp_pass: !!data?.smtp_pass_enc,
          telegram_chat_id: data?.telegram_chat_id ?? "",
          has_telegram_token: !!data?.telegram_bot_token_enc,
          credentials_email_subject: data?.credentials_email_subject ?? "",
          credentials_email_html: data?.credentials_email_html ?? "",
        }}
      />
    </div>
  );
}
