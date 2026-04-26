import { supabaseAdmin } from "./supabase/server";
import { sendTemplatedEmail } from "./email";
import { tgEditMessage } from "./telegram";
import { generateIptvCredentials } from "./credentials";

type Outcome = { ok: true } | { ok: false; error: string };

type LoadResult =
  | { error: string }
  | { sb: ReturnType<typeof supabaseAdmin>; order: Record<string, any>; settings: Record<string, any> };

async function loadOrderAndSettings(id: string): Promise<LoadResult> {
  const sb = supabaseAdmin();
  const { data: order, error: oe } = await sb.from("orders").select("*").eq("id", id).single();
  if (oe || !order) return { error: oe?.message || "Order not found" };
  const { data: settings, error: se } = await sb.from("settings").select("*").eq("id", 1).single();
  if (se || !settings) return { error: se?.message || "Settings missing" };
  return { sb, order, settings };
}

/** Generate creds if missing, persist, send credentials email, mark paid, edit Telegram message. */
export async function approveAndSendCredentials(id: string): Promise<Outcome> {
  const ctx = await loadOrderAndSettings(id);
  if ("error" in ctx) return { ok: false, error: ctx.error };
  const { sb, order, settings } = ctx;

  if (order.iptv_sent_at) {
    return { ok: false, error: "Credentials already sent for this order." };
  }

  if (!settings.smtp_host || !settings.smtp_user || !settings.smtp_pass_enc) {
    return { ok: false, error: "SMTP not configured — fill in /admin/settings first." };
  }

  const creds = order.iptv_username && order.iptv_password
    ? { username: order.iptv_username, password: order.iptv_password }
    : generateIptvCredentials();

  try {
    await sendTemplatedEmail({
      smtp: {
        host: settings.smtp_host, port: settings.smtp_port,
        user: settings.smtp_user, passEnc: settings.smtp_pass_enc,
        from: settings.smtp_from, secure: settings.smtp_secure,
      },
      to: order.email,
      subject: settings.credentials_email_subject || "Your StreamlixIPTV credentials",
      htmlTemplate: settings.credentials_email_html || "",
      vars: {
        name: order.name,
        order_id: order.id,
        plan: order.plan_name,
        total: String(order.total),
        iptv_username: creds.username,
        iptv_password: creds.password,
      },
    });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Email send failed" };
  }

  await sb.from("orders").update({
    status: "paid",
    iptv_username: creds.username,
    iptv_password: creds.password,
    iptv_sent_at: new Date().toISOString(),
  }).eq("id", id);

  // Edit Telegram message (best effort)
  if (settings.telegram_bot_token_enc && settings.telegram_chat_id && order.telegram_message_id) {
    try {
      await tgEditMessage(
        settings.telegram_bot_token_enc,
        settings.telegram_chat_id,
        order.telegram_message_id,
        `✅ <b>Sent</b> · ${order.name} · ${order.email}\n<code>${creds.username}</code> / <code>${creds.password}</code>`,
      );
    } catch (e) { /* ignore */ }
  }

  return { ok: true };
}

export async function holdOrder(id: string): Promise<Outcome> {
  const ctx = await loadOrderAndSettings(id);
  if ("error" in ctx) return { ok: false, error: ctx.error };
  const { sb, order, settings } = ctx;

  await sb.from("orders").update({ status: "on_hold" }).eq("id", id);

  if (settings.telegram_bot_token_enc && settings.telegram_chat_id && order.telegram_message_id) {
    try {
      await tgEditMessage(
        settings.telegram_bot_token_enc,
        settings.telegram_chat_id,
        order.telegram_message_id,
        `⏸ <b>On hold</b> · ${order.name} · ${order.email}`,
      );
    } catch (e) { /* ignore */ }
  }

  return { ok: true };
}
