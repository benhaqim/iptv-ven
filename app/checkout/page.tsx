import { Suspense } from "react";
import CheckoutClient from "@/components/site/CheckoutClient";

export const metadata = { title: "Checkout — StreamlixIPTV" };

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "120px 24px" }} />}>
      <CheckoutClient />
    </Suspense>
  );
}
