-- ============================================================
-- StreamlixIPTV — Telegram bot + IPTV credentials
-- Additive migration. Safe to re-run.
-- ============================================================

-- Allow `on_hold` status
alter table public.orders
  drop constraint if exists orders_status_check;
alter table public.orders
  add constraint orders_status_check
  check (status in ('pending', 'paid', 'activated', 'cancelled', 'on_hold'));

-- IPTV credentials + telegram bookkeeping on the order
alter table public.orders add column if not exists iptv_username      text;
alter table public.orders add column if not exists iptv_password      text;
alter table public.orders add column if not exists iptv_sent_at       timestamptz;
alter table public.orders add column if not exists telegram_message_id bigint;

-- Telegram + credentials email config in settings
alter table public.settings add column if not exists telegram_bot_token_enc   text not null default '';
alter table public.settings add column if not exists telegram_chat_id         text not null default '';
alter table public.settings add column if not exists telegram_webhook_secret  text not null default '';

alter table public.settings add column if not exists credentials_email_subject text not null default
  'Your StreamlixIPTV credentials';
alter table public.settings add column if not exists credentials_email_html    text not null default
  '<p>Hi {{name}},</p><p>Your subscription is active. Here are your credentials:</p><p><b>Username:</b> {{iptv_username}}<br/><b>Password:</b> {{iptv_password}}</p><p>Need help getting set up? Reply to this email or message us on WhatsApp.</p><p>— StreamlixIPTV</p>';
