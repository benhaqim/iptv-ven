# StreamlixIPTV

Premium IPTV reseller site — landing page, blog, checkout, and admin dashboard.

## Stack
- **Next.js 14** (App Router) + **TypeScript** + **Tailwind**
- **Supabase** (Postgres + Auth + RLS) for orders, settings, and admin sign-in
- **nodemailer** for SMTP (configurable from the admin)
- **Telegram Bot API** for one-tap order approvals
- **Lenis** for smooth scrolling, **lucide-react** for icons

## Routes
- `/` — landing
- `/pricing` — full plan comparison
- `/blog`, `/blog/[slug]` — magazine + reader
- `/contact`, `/installation-guide`
- `/checkout` — 3-step order form (offer → app → payment + customer info)
- `/checkout/thank-you` — confirmation
- `/admin/login`, `/admin`, `/admin/settings` — single-admin back-office

## Order flow
1. Customer submits `/checkout` → row written to `orders` → templated email goes out with the configured Stripe or crypto link → redirect to thank-you.
2. Admin gets a Telegram message with **✅ Yes — send credentials** / **⏸ Hold** buttons.
3. **Yes** → server generates random IPTV username + password, emails them to the customer using the credentials template, marks the order `paid`, updates the Telegram message in place. Same flow available via the admin dashboard as a manual fallback.

## Setup
See [`SETUP.md`](./SETUP.md). TL;DR:
1. Create a Supabase project, run `supabase/schema.sql` then `supabase/migrations/002_telegram.sql`.
2. Add a single admin user under Authentication → Users.
3. `cp .env.example .env.local` and fill the 5 vars (`SETTINGS_ENC_KEY` is generated with `openssl rand -base64 32`).
4. `npm install && npm run dev`, sign in at `/admin/login`, configure Stripe/crypto links + email templates + SMTP + Telegram bot in `/admin/settings`.

## Security notes
- Service role key and SMTP password / Telegram bot token never reach the browser.
- SMTP password and Telegram bot token are stored AES-256-GCM encrypted (key from `SETTINGS_ENC_KEY` env var).
- `/admin/*` is gated by Supabase auth via middleware.
- All `orders` and `settings` writes go through the service-role client; RLS denies anon entirely.
