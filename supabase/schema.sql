-- ============================================================
-- StreamlixIPTV — Supabase schema
-- Run this in the Supabase SQL editor (one-shot, idempotent).
-- ============================================================

-- 1. Tables ---------------------------------------------------

create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  status          text not null default 'pending'
                  check (status in ('pending', 'paid', 'activated', 'cancelled')),

  -- Plan
  plan_id         text not null,
  plan_name       text not null,
  plan_price      numeric(10, 2) not null,

  -- App + activation
  app             text not null check (app in ('ibo', 'hot', 'free')),
  activation      text check (activation in ('12m', 'lifetime')),
  activation_price numeric(10, 2) not null default 0,
  mac_address     text,
  secret_code     text,

  -- Payment
  payment_method  text not null check (payment_method in ('stripe', 'crypto')),
  payment_link    text,
  payment_sent_at timestamptz,

  -- Customer
  name            text not null,
  email           text not null,
  phone           text not null,
  phone_cc        text not null,
  device          text,
  seats           int not null default 1,
  preferred_channel text not null check (preferred_channel in ('whatsapp', 'email')),
  notes           text,

  -- Money
  promo           text,
  subtotal        numeric(10, 2) not null,
  discount        numeric(10, 2) not null default 0,
  total           numeric(10, 2) not null,

  -- Admin
  admin_notes     text
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx     on public.orders (status);
create index if not exists orders_email_idx      on public.orders (email);

-- Settings: single-row key/value store -----------------------

create table if not exists public.settings (
  id              int primary key default 1,
  updated_at      timestamptz not null default now(),

  -- Payment links (templated; use {{order_id}} {{name}} {{total}})
  stripe_link     text not null default '',
  crypto_link     text not null default '',

  -- Email
  email_subject   text not null default 'Your StreamlixIPTV order — payment link inside',
  email_html      text not null default '<p>Hi {{name}},</p><p>Thanks for your order ({{order_id}}). To finalize your activation, please complete the payment here:</p><p><a href="{{payment_link}}">{{payment_link}}</a></p><p>— StreamlixIPTV</p>',

  -- SMTP (smtp_pass_enc is AES-encrypted with SETTINGS_ENC_KEY)
  smtp_host       text not null default '',
  smtp_port       int  not null default 587,
  smtp_user       text not null default '',
  smtp_pass_enc   text not null default '',
  smtp_from       text not null default 'contact@streamlixiptv.com',
  smtp_secure     boolean not null default false,

  constraint settings_singleton check (id = 1)
);

insert into public.settings (id) values (1) on conflict (id) do nothing;

-- 2. Updated-at trigger --------------------------------------

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

drop trigger if exists settings_touch_updated_at on public.settings;
create trigger settings_touch_updated_at
  before update on public.settings
  for each row execute function public.touch_updated_at();

-- 3. Row-level security --------------------------------------

alter table public.orders   enable row level security;
alter table public.settings enable row level security;

-- Orders: server-side only (no anon read/write); service-role bypasses RLS.
drop policy if exists "deny all anon orders"   on public.orders;
create policy "deny all anon orders"   on public.orders   for all to anon using (false) with check (false);

drop policy if exists "deny all anon settings" on public.settings;
create policy "deny all anon settings" on public.settings for all to anon using (false) with check (false);

-- Authenticated admins (any signed-in user, given we seed only one) can read/write everything.
drop policy if exists "admins read orders"   on public.orders;
create policy "admins read orders"   on public.orders   for select to authenticated using (true);
drop policy if exists "admins write orders"  on public.orders;
create policy "admins write orders"  on public.orders   for update to authenticated using (true) with check (true);

drop policy if exists "admins read settings"  on public.settings;
create policy "admins read settings"  on public.settings for select to authenticated using (true);
drop policy if exists "admins write settings" on public.settings;
create policy "admins write settings" on public.settings for update to authenticated using (true) with check (true);
