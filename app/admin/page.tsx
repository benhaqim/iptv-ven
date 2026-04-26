import { supabaseAdmin } from "@/lib/supabase/server";
import OrdersTable from "@/components/admin/OrdersTable";

export const metadata = { title: "Orders — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <header className="admin-header">
        <div>
          <h1>Orders</h1>
          <p>Latest 200 orders, newest first.</p>
        </div>
      </header>
      {error ? (
        <div className="admin-error">Couldn&apos;t load orders: {error.message}</div>
      ) : (
        <OrdersTable orders={data ?? []} />
      )}
    </div>
  );
}
