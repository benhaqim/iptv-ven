import { Suspense } from "react";
import type { Metadata } from "next";
import CheckoutClient from "@/components/site/CheckoutClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Checkout",
  description: "Finalize your Streamlix order — instant activation, secure payment, 24/7 support.",
  path: "/checkout",
  noindex: true,
});

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "120px 24px" }} />}>
      <CheckoutClient />
    </Suspense>
  );
}
