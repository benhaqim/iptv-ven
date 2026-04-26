import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { tgAnswerCallbackQuery } from "@/lib/telegram";
import { approveAndSendCredentials, holdOrder } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const sb = supabaseAdmin();
  const { data: settings } = await sb.from("settings").select("telegram_bot_token_enc, telegram_chat_id, telegram_webhook_secret").eq("id", 1).single();
  if (!settings?.telegram_webhook_secret || !settings?.telegram_bot_token_enc) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  // Telegram includes the secret you set via setWebhook
  const secret = req.headers.get("x-telegram-bot-api-secret-token");
  if (secret !== settings.telegram_webhook_secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = await req.json().catch(() => null);
  const cq = update?.callback_query;
  if (!cq) return NextResponse.json({ ok: true }); // ignore non-callback updates

  // Only respond to messages from our configured chat
  const fromChat = String(cq.message?.chat?.id ?? "");
  if (fromChat !== String(settings.telegram_chat_id)) {
    await tgAnswerCallbackQuery(settings.telegram_bot_token_enc, cq.id, "Unauthorized chat");
    return NextResponse.json({ ok: true });
  }

  const data = String(cq.data || "");
  const [action, orderId] = data.split(":");
  if (!orderId) {
    await tgAnswerCallbackQuery(settings.telegram_bot_token_enc, cq.id, "Bad payload");
    return NextResponse.json({ ok: true });
  }

  let result: { ok: true } | { ok: false; error: string };
  if (action === "approve") {
    result = await approveAndSendCredentials(orderId);
  } else if (action === "hold") {
    result = await holdOrder(orderId);
  } else {
    result = { ok: false, error: "Unknown action" };
  }

  await tgAnswerCallbackQuery(
    settings.telegram_bot_token_enc,
    cq.id,
    result.ok
      ? action === "approve" ? "✅ Credentials sent" : "⏸ On hold"
      : `Error: ${result.error}`.slice(0, 200),
  );
  return NextResponse.json({ ok: true });
}
