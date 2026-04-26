"use client";

import { useState } from "react";
import { saveSettings } from "@/app/admin/actions";

type Props = {
  initial: {
    stripe_link: string;
    crypto_link: string;
    email_subject: string;
    email_html: string;
    smtp_host: string;
    smtp_port: number;
    smtp_user: string;
    smtp_from: string;
    smtp_secure: boolean;
    has_smtp_pass: boolean;
    telegram_chat_id: string;
    has_telegram_token: boolean;
    credentials_email_subject: string;
    credentials_email_html: string;
  };
};

export default function SettingsForm({ initial }: Props) {
  const [s, setS] = useState({
    ...initial,
    smtp_pass: "",
    telegram_bot_token: "",
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const r = await saveSettings({
      stripe_link: s.stripe_link,
      crypto_link: s.crypto_link,
      email_subject: s.email_subject,
      email_html: s.email_html,
      smtp_host: s.smtp_host,
      smtp_port: Number(s.smtp_port),
      smtp_user: s.smtp_user,
      smtp_pass: s.smtp_pass,
      smtp_from: s.smtp_from,
      smtp_secure: s.smtp_secure,
      telegram_bot_token: s.telegram_bot_token,
      telegram_chat_id: s.telegram_chat_id,
      credentials_email_subject: s.credentials_email_subject,
      credentials_email_html: s.credentials_email_html,
    });
    setBusy(false);
    if (r.ok) {
      setMsg({
        kind: "ok",
        text: r.webhook
          ? `Settings saved. Telegram webhook registered: ${r.webhook}`
          : "Settings saved.",
      });
      setS((p) => ({ ...p, smtp_pass: "", telegram_bot_token: "" }));
    } else {
      setMsg({ kind: "err", text: r.error });
    }
  };

  return (
    <form onSubmit={onSubmit} className="admin-card admin-form">
      <section>
        <h3>Payment links</h3>
        <p className="admin-help">
          Templated. Variables: <code>{"{{order_id}}"}</code>, <code>{"{{name}}"}</code>, <code>{"{{total}}"}</code>, <code>{"{{plan}}"}</code>.
        </p>
        <label>Stripe link
          <input value={s.stripe_link} onChange={(e) => setS({ ...s, stripe_link: e.target.value })} placeholder="https://buy.stripe.com/..." />
        </label>
        <label>Crypto link
          <input value={s.crypto_link} onChange={(e) => setS({ ...s, crypto_link: e.target.value })} placeholder="https://nowpayments.io/..." />
        </label>
      </section>

      <section>
        <h3>Customer email — payment link</h3>
        <p className="admin-help">
          Variables: <code>{"{{name}}"}</code>, <code>{"{{order_id}}"}</code>, <code>{"{{plan}}"}</code>, <code>{"{{total}}"}</code>, <code>{"{{payment_link}}"}</code>, <code>{"{{payment_method}}"}</code>.
        </p>
        <label>Subject
          <input value={s.email_subject} onChange={(e) => setS({ ...s, email_subject: e.target.value })} />
        </label>
        <label>HTML body
          <textarea rows={8} value={s.email_html} onChange={(e) => setS({ ...s, email_html: e.target.value })} />
        </label>
      </section>

      <section>
        <h3>Customer email — IPTV credentials</h3>
        <p className="admin-help">
          Sent automatically when you tap <b>Yes — send credentials</b> in Telegram. Variables: <code>{"{{name}}"}</code>, <code>{"{{order_id}}"}</code>, <code>{"{{plan}}"}</code>, <code>{"{{iptv_username}}"}</code>, <code>{"{{iptv_password}}"}</code>.
        </p>
        <label>Subject
          <input value={s.credentials_email_subject} onChange={(e) => setS({ ...s, credentials_email_subject: e.target.value })} />
        </label>
        <label>HTML body
          <textarea rows={8} value={s.credentials_email_html} onChange={(e) => setS({ ...s, credentials_email_html: e.target.value })} />
        </label>
      </section>

      <section>
        <h3>SMTP</h3>
        <p className="admin-help">Password is AES-encrypted with <code>SETTINGS_ENC_KEY</code>. Leave blank to keep existing.</p>
        <div className="admin-row">
          <label>Host
            <input value={s.smtp_host} onChange={(e) => setS({ ...s, smtp_host: e.target.value })} placeholder="smtp.mailgun.org" />
          </label>
          <label>Port
            <input type="number" value={s.smtp_port} onChange={(e) => setS({ ...s, smtp_port: Number(e.target.value) })} />
          </label>
        </div>
        <label>User
          <input value={s.smtp_user} onChange={(e) => setS({ ...s, smtp_user: e.target.value })} placeholder="postmaster@…" />
        </label>
        <label>Password {initial.has_smtp_pass && <span className="admin-help" style={{ marginLeft: 8 }}>(stored — leave blank to keep)</span>}
          <input type="password" value={s.smtp_pass} onChange={(e) => setS({ ...s, smtp_pass: e.target.value })} placeholder={initial.has_smtp_pass ? "•••••••• (kept)" : "Enter SMTP password"} />
        </label>
        <label>From
          <input value={s.smtp_from} onChange={(e) => setS({ ...s, smtp_from: e.target.value })} placeholder="contact@streamlixiptv.com" />
        </label>
        <label className="admin-check">
          <input type="checkbox" checked={s.smtp_secure} onChange={(e) => setS({ ...s, smtp_secure: e.target.checked })} />
          Use TLS (port 465)
        </label>
      </section>

      <section>
        <h3>Telegram bot</h3>
        <p className="admin-help">
          Create a bot with <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>@BotFather</a>, then start a chat with it and send <code>/start</code>. Find your chat id by visiting <code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code>.
          On save we automatically register the webhook at <code>{(process.env.NEXT_PUBLIC_SITE_URL || "https://your-site")}/api/telegram/webhook</code>.
        </p>
        <label>Bot token {initial.has_telegram_token && <span className="admin-help" style={{ marginLeft: 8 }}>(stored — leave blank to keep)</span>}
          <input
            type="password"
            value={s.telegram_bot_token}
            onChange={(e) => setS({ ...s, telegram_bot_token: e.target.value })}
            placeholder={initial.has_telegram_token ? "•••••••• (kept)" : "123456789:AA…"}
          />
        </label>
        <label>Chat ID
          <input value={s.telegram_chat_id} onChange={(e) => setS({ ...s, telegram_chat_id: e.target.value })} placeholder="123456789" />
        </label>
      </section>

      <div className="admin-form-foot">
        {msg && <span className={`admin-msg admin-msg--${msg.kind}`}>{msg.text}</span>}
        <button type="submit" className="admin-btn admin-btn--primary" disabled={busy}>
          {busy ? "Saving…" : "Save settings"}
        </button>
      </div>
    </form>
  );
}
