import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendOrderEmail } from "@/lib/email";
import { tgSendMessage, newOrderMessage } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REQUIRED = [
  "plan_id", "plan_name", "plan_price",
  "app", "activation_price",
  "payment_method",
  "name", "email", "phone", "phone_cc",
  "preferred_channel",
  "subtotal", "total",
] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  for (const key of REQUIRED) {
    if (body[key] === undefined || body[key] === null || body[key] === "") {
      return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
    }
  }
  if (!["stripe", "crypto"].includes(String(body.payment_method))) {
    return NextResponse.json({ error: "Invalid payment_method" }, { status: 400 });
  }
  if (!["ibo", "hot", "free"].includes(String(body.app))) {
    return NextResponse.json({ error: "Invalid app" }, { status: 400 });
  }
  if (!/\S+@\S+\.\S+/.test(String(body.email))) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = supabaseAdmin();

  // 1. Insert order
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      plan_id: body.plan_id,
      plan_name: body.plan_name,
      plan_price: body.plan_price,
      app: body.app,
      activation: body.activation ?? null,
      activation_price: body.activation_price,
      mac_address: body.mac_address ?? null,
      secret_code: body.secret_code ?? null,
      payment_method: body.payment_method,
      name: body.name,
      email: body.email,
      phone: body.phone,
      phone_cc: body.phone_cc,
      device: body.device ?? null,
      seats: body.seats ?? 1,
      preferred_channel: body.preferred_channel,
      notes: body.notes ?? null,
      promo: body.promo ?? null,
      subtotal: body.subtotal,
      discount: body.discount ?? 0,
      total: body.total,
    })
    .select("id, total, name, email, phone, phone_cc, preferred_channel, plan_name, app, activation, payment_method")
    .single();

  if (orderErr || !order) {
    console.error("[orders] insert failed", orderErr);
    return NextResponse.json({ error: "Couldn't save order. Try again or contact support." }, { status: 500 });
  }

  // 2. Load settings (for payment links + SMTP + Telegram)
  const { data: settings } = await supabase.from("settings").select("*").eq("id", 1).single();

  if (settings) {
    const linkTemplate = order.payment_method === "stripe" ? settings.stripe_link : settings.crypto_link;
    const paymentLink = renderTemplate(linkTemplate || "", {
      order_id: order.id,
      name: order.name,
      total: String(order.total),
      plan: order.plan_name,
    });

    // Persist resolved link
    await supabase.from("orders").update({
      payment_link: paymentLink || null,
      payment_sent_at: settings.smtp_host ? new Date().toISOString() : null,
    }).eq("id", order.id);

    // 3. Send customer email if SMTP is configured
    if (settings.smtp_host && settings.smtp_user && settings.smtp_pass_enc) {
      try {
        await sendOrderEmail({
          smtp: {
            host: settings.smtp_host,
            port: settings.smtp_port,
            user: settings.smtp_user,
            passEnc: settings.smtp_pass_enc,
            from: settings.smtp_from,
            secure: settings.smtp_secure,
          },
          to: order.email,
          subject: settings.email_subject,
          htmlTemplate: settings.email_html,
          vars: {
            name: order.name,
            order_id: order.id,
            plan: order.plan_name,
            total: String(order.total),
            payment_link: paymentLink,
            payment_method: order.payment_method,
          },
        });
      } catch (e) {
        console.error("[orders] email send failed", e);
        // Don't fail the order — admin can resend from dashboard.
      }
    }

    // 4. Telegram notification with Yes/Hold buttons
    if (settings.telegram_bot_token_enc && settings.telegram_chat_id) {
      try {
        const result = await tgSendMessage({
          tokenEnc: settings.telegram_bot_token_enc,
          chatId: settings.telegram_chat_id,
          text: newOrderMessage({
            id: order.id,
            name: order.name,
            email: order.email,
            phone_cc: order.phone_cc,
            phone: order.phone,
            preferred_channel: order.preferred_channel,
            plan_name: order.plan_name,
            app: order.app,
            activation: order.activation,
            payment_method: order.payment_method,
            total: order.total,
          }),
          buttons: [[
            { text: "✅ Yes — send credentials", callback_data: `approve:${order.id}` },
            { text: "⏸ Hold", callback_data: `hold:${order.id}` },
          ]],
        });
        if (result?.message_id) {
          await supabase.from("orders").update({ telegram_message_id: result.message_id }).eq("id", order.id);
        }
      } catch (e) {
        console.error("[orders] telegram notify failed", e);
      }
    }
  }

  return NextResponse.json({ id: order.id, total: order.total });
}

function renderTemplate(t: string, vars: Record<string, string>): string {
  return t.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => vars[k] ?? "");
}
