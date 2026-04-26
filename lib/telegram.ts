import { decrypt } from "./crypto";

const API = "https://api.telegram.org";

type SendOpts = {
  tokenEnc: string;
  chatId: string;
  text: string;
  buttons?: { text: string; callback_data: string }[][];
  replyToMessageId?: number;
};

export async function tgRequest(tokenEnc: string, method: string, body: unknown) {
  const token = decrypt(tokenEnc);
  if (!token) throw new Error("Telegram bot token not configured");
  const res = await fetch(`${API}/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(`Telegram ${method} failed: ${json.description || res.statusText}`);
  return json.result;
}

export async function tgSendMessage({ tokenEnc, chatId, text, buttons, replyToMessageId }: SendOpts): Promise<{ message_id: number }> {
  return tgRequest(tokenEnc, "sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_to_message_id: replyToMessageId,
    reply_markup: buttons ? { inline_keyboard: buttons } : undefined,
  });
}

export async function tgEditMessage(tokenEnc: string, chatId: string, messageId: number, text: string) {
  return tgRequest(tokenEnc, "editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

export async function tgAnswerCallbackQuery(tokenEnc: string, callbackQueryId: string, text?: string) {
  return tgRequest(tokenEnc, "answerCallbackQuery", { callback_query_id: callbackQueryId, text });
}

export async function tgSetWebhook(tokenEnc: string, url: string, secret: string) {
  return tgRequest(tokenEnc, "setWebhook", {
    url,
    secret_token: secret,
    allowed_updates: ["callback_query"],
    drop_pending_updates: true,
  });
}

export async function tgDeleteWebhook(tokenEnc: string) {
  return tgRequest(tokenEnc, "deleteWebhook", { drop_pending_updates: true });
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function newOrderMessage(o: {
  id: string;
  name: string;
  email: string;
  phone_cc: string;
  phone: string;
  preferred_channel: string;
  plan_name: string;
  app: string;
  activation: string | null;
  payment_method: string;
  total: number | string;
}): string {
  const total = typeof o.total === "number" ? o.total.toFixed(2) : String(o.total);
  return [
    `<b>🛒 New order — payment received?</b>`,
    ``,
    `<b>Client:</b> ${escapeHtml(o.name)}`,
    `<b>Email:</b> ${escapeHtml(o.email)}`,
    `<b>Phone:</b> ${escapeHtml(o.phone_cc)} ${escapeHtml(o.phone)} (${escapeHtml(o.preferred_channel)})`,
    ``,
    `<b>Plan:</b> ${escapeHtml(o.plan_name)}`,
    `<b>App:</b> ${escapeHtml(o.app)}${o.activation ? ` · ${escapeHtml(o.activation)}` : ""}`,
    `<b>Payment:</b> ${escapeHtml(o.payment_method)}`,
    `<b>Total:</b> <b>${total}€</b>`,
    ``,
    `<code>#${o.id.slice(0, 8)}</code>`,
  ].join("\n");
}
