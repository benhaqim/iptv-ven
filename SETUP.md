# StreamlixIPTV — Setup

## 1. Create the Supabase project
1. Go to https://supabase.com → **New project** → pick a region close to your customers.
2. After it's ready, open **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret — server-only)

## 2. Apply the schema
Open **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, run it. It creates the `orders` and `settings` tables, the singleton settings row, RLS policies, and triggers. Re-running is safe.

## 3. Create the admin user
**Authentication → Users → Add user → Create new user** (the simple flow, NOT magic link):
- Email: your admin email
- Password: choose a strong one
- ✅ tick **Auto-confirm user** (or confirm via the email after).

That single user is the admin. (RLS policies in the schema currently grant any authenticated user full admin access; since we don't expose a public sign-up flow, this is fine for one operator.)

## 4. Local environment
```bash
cp .env.example .env.local
```
Fill in the four Supabase values. Generate the encryption key for SMTP storage:
```bash
openssl rand -base64 32
```
Paste it into `SETTINGS_ENC_KEY`. Set `NEXT_PUBLIC_SITE_URL` to your dev or prod URL.

## 5. Run
```bash
npm install
npm run dev
```
- `/admin/login` — sign in with the admin user you created.
- `/admin` — orders list (newest 200), filters, status updates, resend email.
- `/admin/settings` — Stripe link, crypto link, customer email subject + HTML, SMTP host/port/user/password/from. SMTP password is AES-256-GCM encrypted using `SETTINGS_ENC_KEY` before being written to Postgres.

## 6. Templates
Both **payment links** and the **email body** are mustache-style templated:
- `{{order_id}}` · `{{name}}` · `{{plan}}` · `{{total}}` · `{{payment_link}}` · `{{payment_method}}`

Example crypto link: `https://nowpayments.io/payment/?iid=abc&order={{order_id}}&amount={{total}}`

## 7. Order flow
1. Customer fills `/checkout`, picks app + duration + MAC (and secret code for IBO), selects Stripe or Crypto, submits.
2. `POST /api/orders` writes the row, resolves the right link template, sends the customer email through the SMTP you configured, redirects them to `/checkout/thank-you`.
3. Email failure does not block the order — the admin can **Resend payment email** from the order detail.

## 8. Production
- Set the same env vars in your hosting provider (Vercel: Settings → Environment Variables).
- `SETTINGS_ENC_KEY` MUST stay constant across deploys — rotating it makes existing encrypted SMTP passwords / Telegram tokens unrecoverable. Save a copy in your password manager.
- `NEXT_PUBLIC_SITE_URL` should be the production domain.

## 9. Telegram bot (optional but recommended)

When a customer places an order, the bot pings you in Telegram with two buttons:
- **✅ Yes — send credentials** → generates random IPTV username + password, marks the order paid, and emails the credentials to the customer (using the "IPTV credentials" template).
- **⏸ Hold** → marks the order `on_hold`. Come back to it later in `/admin`.

Setup:

1. **Apply the migration**: open the Supabase SQL editor and run `supabase/migrations/002_telegram.sql`.
2. **Create a bot**: message [@BotFather](https://t.me/BotFather) → `/newbot` → name + username. Copy the token.
3. **Find your chat id**:
   - Open a chat with your new bot, send `/start`.
   - Visit `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser.
   - Find `"chat":{"id":NNNNNN,...}` — that number is your chat id.
4. In `/admin/settings` → **Telegram bot**:
   - Paste the bot token (encrypted before save).
   - Paste your chat id.
   - Hit **Save settings**. The webhook is registered automatically at `${NEXT_PUBLIC_SITE_URL}/api/telegram/webhook` with a random secret.
5. Place a test order from `/checkout`. You should get a Telegram message with the two buttons.

**Important:** the webhook target must be reachable from Telegram's servers. Locally use [ngrok](https://ngrok.com) or [cloudflared tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/), set `NEXT_PUBLIC_SITE_URL` to the public URL, and re-save settings to re-register the webhook.

Manual fallback: every order has the same **Send credentials / Hold / Resend payment email** buttons in its admin detail row, so the bot is never the only path.
