"use client";

import { useMemo, useState } from "react";
import { updateOrderStatus, resendOrderEmail, approveAndSendCredentials, holdOrder } from "@/app/admin/actions";

type Order = {
  id: string;
  created_at: string;
  status: "pending" | "paid" | "activated" | "cancelled" | "on_hold";
  plan_name: string;
  total: number;
  app: string;
  activation: string | null;
  mac_address: string | null;
  secret_code: string | null;
  payment_method: "stripe" | "crypto";
  payment_link: string | null;
  payment_sent_at: string | null;
  name: string;
  email: string;
  phone: string;
  phone_cc: string;
  device: string | null;
  seats: number;
  preferred_channel: "whatsapp" | "email";
  notes: string | null;
  promo: string | null;
  subtotal: number;
  discount: number;
  admin_notes: string | null;
  iptv_username: string | null;
  iptv_password: string | null;
  iptv_sent_at: string | null;
};

const STATUS_OPTIONS: Order["status"][] = ["pending", "paid", "activated", "cancelled", "on_hold"];

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (!term) return true;
      return (
        o.name.toLowerCase().includes(term) ||
        o.email.toLowerCase().includes(term) ||
        o.phone.toLowerCase().includes(term) ||
        o.id.toLowerCase().includes(term)
      );
    });
  }, [orders, q, statusFilter]);

  return (
    <div className="admin-card">
      <div className="admin-toolbar">
        <input
          className="admin-input"
          placeholder="Search by name, email, phone, id…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="admin-input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          style={{ width: 180 }}
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="admin-counter">{filtered.length} / {orders.length}</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Plan</th>
              <th>App</th>
              <th>Pay</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <>
                <tr key={o.id} className={open === o.id ? "is-open" : ""}>
                  <td className="mono">{new Date(o.created_at).toLocaleString()}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{o.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-mute)" }}>{o.email}</div>
                  </td>
                  <td>{o.plan_name}</td>
                  <td>
                    <span className={`pill pill--${o.app}`}>{o.app}{o.activation ? ` · ${o.activation}` : ""}</span>
                  </td>
                  <td>
                    <span className={`pill pill--${o.payment_method}`}>{o.payment_method}</span>
                  </td>
                  <td className="mono">{o.total.toFixed(2)}€</td>
                  <td>
                    <select
                      className="admin-input admin-status"
                      value={o.status}
                      onChange={async (e) => {
                        await updateOrderStatus(o.id, e.target.value as Order["status"]);
                      }}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <button className="admin-btn admin-btn--ghost" onClick={() => setOpen(open === o.id ? null : o.id)}>
                      {open === o.id ? "Hide" : "Details"}
                    </button>
                  </td>
                </tr>
                {open === o.id && (
                  <tr key={`${o.id}-x`} className="admin-detail-row">
                    <td colSpan={8}>
                      <OrderDetail order={o} />
                    </td>
                  </tr>
                )}
              </>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: "center", padding: 32, color: "var(--text-mute)" }}>No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrderDetail({ order }: { order: Order }) {
  const [busy, setBusy] = useState<null | "resend" | "approve" | "hold">(null);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="admin-detail">
      <div className="admin-detail-grid">
        <div>
          <h4>Customer</h4>
          <dl>
            <dt>Name</dt><dd>{order.name}</dd>
            <dt>Email</dt><dd><a href={`mailto:${order.email}`}>{order.email}</a></dd>
            <dt>Phone</dt><dd>{order.phone_cc} {order.phone}</dd>
            <dt>Preferred</dt><dd>{order.preferred_channel}</dd>
            <dt>Device</dt><dd>{order.device ?? "—"}</dd>
            <dt>Seats</dt><dd>{order.seats}</dd>
          </dl>
        </div>
        <div>
          <h4>Order</h4>
          <dl>
            <dt>Plan</dt><dd>{order.plan_name}</dd>
            <dt>App</dt><dd>{order.app}</dd>
            <dt>Activation</dt><dd>{order.activation ?? "—"}</dd>
            <dt>MAC address</dt><dd className="mono">{order.mac_address ?? "—"}</dd>
            <dt>Secret code</dt><dd className="mono">{order.secret_code ?? "—"}</dd>
            <dt>Promo</dt><dd>{order.promo ?? "—"}</dd>
          </dl>
        </div>
        <div>
          <h4>Payment</h4>
          <dl>
            <dt>Method</dt><dd>{order.payment_method}</dd>
            <dt>Subtotal</dt><dd>{order.subtotal.toFixed(2)}€</dd>
            <dt>Discount</dt><dd>{order.discount.toFixed(2)}€</dd>
            <dt>Total</dt><dd><b>{order.total.toFixed(2)}€</b></dd>
            <dt>Email sent</dt><dd>{order.payment_sent_at ? new Date(order.payment_sent_at).toLocaleString() : "—"}</dd>
            {order.payment_link && (
              <>
                <dt>Link</dt>
                <dd className="mono" style={{ wordBreak: "break-all" }}>
                  <a href={order.payment_link} target="_blank" rel="noopener noreferrer">{order.payment_link}</a>
                </dd>
              </>
            )}
          </dl>
        </div>
        <div>
          <h4>IPTV credentials</h4>
          <dl>
            <dt>Username</dt><dd className="mono">{order.iptv_username ?? "—"}</dd>
            <dt>Password</dt><dd className="mono">{order.iptv_password ?? "—"}</dd>
            <dt>Sent</dt><dd>{order.iptv_sent_at ? new Date(order.iptv_sent_at).toLocaleString() : "—"}</dd>
          </dl>
        </div>
      </div>
      {order.notes && (
        <div className="admin-detail-notes">
          <h4>Customer notes</h4>
          <p>{order.notes}</p>
        </div>
      )}
      <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
        <button
          className="admin-btn admin-btn--primary"
          onClick={async () => {
            setBusy("approve"); setMsg(null);
            const r = await approveAndSendCredentials(order.id);
            setBusy(null);
            setMsg(r.ok ? "Credentials sent." : `Failed: ${r.error}`);
          }}
          disabled={busy !== null || !!order.iptv_sent_at}
          title={order.iptv_sent_at ? "Already sent" : "Generate creds and email customer"}
        >
          {busy === "approve" ? "Sending…" : "✅ Send credentials"}
        </button>
        <button
          className="admin-btn admin-btn--ghost"
          onClick={async () => {
            setBusy("hold"); setMsg(null);
            const r = await holdOrder(order.id);
            setBusy(null);
            setMsg(r.ok ? "On hold." : `Failed: ${r.error}`);
          }}
          disabled={busy !== null}
        >
          ⏸ Hold
        </button>
        <button
          className="admin-btn admin-btn--ghost"
          onClick={async () => {
            setBusy("resend"); setMsg(null);
            const r = await resendOrderEmail(order.id);
            setBusy(null);
            setMsg(r.ok ? "Payment email sent." : `Failed: ${r.error}`);
          }}
          disabled={busy !== null}
        >
          {busy === "resend" ? "Sending…" : "Resend payment email"}
        </button>
        {msg && <span style={{ fontSize: 13, color: "var(--text-dim)" }}>{msg}</span>}
      </div>
    </div>
  );
}
