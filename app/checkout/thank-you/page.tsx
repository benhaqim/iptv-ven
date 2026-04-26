import { Suspense } from "react";
import ThankYouClient from "@/components/site/ThankYouClient";

export const metadata = { title: "Order confirmed — StreamlixIPTV" };

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "120px 24px" }} />}>
      <ThankYouClient />
    </Suspense>
  );
}
