import { Suspense } from "react";
import type { Metadata } from "next";
import ThankYouClient from "@/components/site/ThankYouClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Order confirmed",
  description: "Thanks for ordering with Streamlix — your subscription will be activated within minutes.",
  path: "/checkout/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "120px 24px" }} />}>
      <ThankYouClient />
    </Suspense>
  );
}
