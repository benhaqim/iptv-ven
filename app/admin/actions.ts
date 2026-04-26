"use server";

import { revalidatePath } from "next/cache";
import crypto from "node:crypto";
import { supabaseAdmin, supabaseServer } from "@/lib/supabase/server";
import { sendOrderEmail } from "@/lib/email";
import { encrypt } from "@/lib/crypto";
import { tgSetWebhook, tgDeleteWebhook } from "@/lib/telegram";
import { approveAndSendCredentials as runApprove, holdOrder as runHold } from "@/lib/orders";

async function requireAdmin() {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function updateOrderStatus(id: string, status: "pending" | "paid" | "activated" | "cancelled" | "on_hold") {
  await requireAdmin();
  const sb = supabaseAdmin();
  const { error } = await sb.from("orders").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  return { ok: true };
}

export async function updateOrderAdminNotes(id: string, notes: string) {
  await requireAdmin();
  const sb = supabaseAdmin();
  const { error } = await sb.from("orders").update({ admin_notes: notes }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  return { ok: true };
}

export async function resendOrderEmail(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const sb = supabaseAdmin();
  const { data: order, error } = await sb.from("orders").select("*").eq("id", id).single();
  if (error || !order) return { ok: false, error: error?.message || "Order not found" };

  const { data: settings, error: sErr } = await sb.from("settings").select("*").eq("id", 1).single();
  if (sErr || !settings) return { ok: false, error: "Settings missing" };
  if (!settings.smtp_host || !settings.smtp_user || !settings.smtp_pass_enc) return { ok: false, error: "SMTP not configured" };

  const linkTemplate = order.payment_method === "stripe" ? settings.stripe_link : settings.crypto_link;
  const paymentLink = renderTemplate(linkTemplate || "", {
    order_id: order.id, name: order.name, total: String(order.total), plan: order.plan_name,
  });

  try {
    await sendOrderEmail({
      smtp: {
        host: settings.smtp_host, port: settings.smtp_port,
        user: settings.smtp_user, passEnc: settings.smtp_pass_enc,
        from: settings.smtp_from, secure: settings.smtp_secure,
      },
      to: order.email,
      subject: settings.email_subject,
      htmlTemplate: settings.email_html,
      vars: {
        name: order.name, order_id: order.id, plan: order.plan_name,
        total: String(order.total), payment_link: paymentLink,
        payment_method: order.payment_method,
      },
    });
    await sb.from("orders").update({
      payment_link: paymentLink || null,
      payment_sent_at: new Date().toISOString(),
    }).eq("id", id);
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Email failed" };
  }
}

export async function saveSettings(input: {
  stripe_link: string;
  crypto_link: string;
  email_subject: string;
  email_html: string;
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_pass: string; // empty = keep existing
  smtp_from: string;
  smtp_secure: boolean;
  telegram_bot_token: string; // empty = keep existing
  telegram_chat_id: string;
  credentials_email_subject: string;
  credentials_email_html: string;
}): Promise<{ ok: true; webhook?: string } | { ok: false; error: string }> {
  try {
    await requireAdmin();
    const sb = supabaseAdmin();

    // Pull existing token if input is empty (keep behaviour)
    const { data: existing } = await sb.from("settings").select("telegram_bot_token_enc, telegram_webhook_secret").eq("id", 1).single();

    const update: Record<string, unknown> = {
      stripe_link: input.stripe_link,
      crypto_link: input.crypto_link,
      email_subject: input.email_subject,
      email_html: input.email_html,
      smtp_host: input.smtp_host,
      smtp_port: input.smtp_port,
      smtp_user: input.smtp_user,
      smtp_from: input.smtp_from,
      smtp_secure: input.smtp_secure,
      telegram_chat_id: input.telegram_chat_id,
      credentials_email_subject: input.credentials_email_subject,
      credentials_email_html: input.credentials_email_html,
    };
    if (input.smtp_pass) update.smtp_pass_enc = encrypt(input.smtp_pass);

    let tokenEnc = existing?.telegram_bot_token_enc || "";
    if (input.telegram_bot_token) {
      tokenEnc = encrypt(input.telegram_bot_token);
      update.telegram_bot_token_enc = tokenEnc;
    }

    // Re-issue webhook secret on every save where we have a token + chat + site URL
    let webhookUrl = "";
    if (tokenEnc && input.telegram_chat_id && process.env.NEXT_PUBLIC_SITE_URL) {
      const secret = existing?.telegram_webhook_secret || crypto.randomBytes(24).toString("base64url");
      update.telegram_webhook_secret = secret;
      webhookUrl = `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/api/telegram/webhook`;
      try {
        await tgSetWebhook(tokenEnc, webhookUrl, secret);
      } catch (e) {
        return { ok: false, error: `Webhook registration failed: ${e instanceof Error ? e.message : "unknown"}` };
      }
    } else if (!tokenEnc && existing?.telegram_bot_token_enc) {
      // Token cleared — best-effort clear webhook
      try { await tgDeleteWebhook(existing.telegram_bot_token_enc); } catch { /* ignore */ }
      update.telegram_webhook_secret = "";
      update.telegram_bot_token_enc = "";
    }

    const { error } = await sb.from("settings").update(update).eq("id", 1);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/settings");
    return { ok: true, webhook: webhookUrl || undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function approveAndSendCredentials(id: string) {
  await requireAdmin();
  const r = await runApprove(id);
  revalidatePath("/admin");
  return r;
}

export async function holdOrder(id: string) {
  await requireAdmin();
  const r = await runHold(id);
  revalidatePath("/admin");
  return r;
}

function renderTemplate(t: string, vars: Record<string, string>): string {
  return t.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => vars[k] ?? "");
}
