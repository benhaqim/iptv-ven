export type Plan = {
  id: string;
  name: string;
  duration: string;
  price: number;
  period: string;
  badge?: string;
  featured?: boolean;
  savings?: string;
  features: string[];
  cta: string;
};

export const PLANS: Plan[] = [
  {
    id: "1m",
    name: "Trial",
    duration: "1 month",
    price: 9.99,
    period: "/month",
    features: ["28,000+ live channels", "Full HD & 4K streams", "1 connection / device", "Anti-buffer technology", "Email support"],
    cta: "Try for 1 month",
  },
  {
    id: "3m",
    name: "Starter",
    duration: "3 months",
    price: 19.99,
    period: "/quarter",
    features: ["Everything in Trial", "Multi-language audio tracks", "EPG & 7-day catch-up", "Priority email support"],
    cta: "Choose Starter",
  },
  {
    id: "6m",
    name: "Half-Year",
    duration: "6 months",
    price: 29.99,
    period: "/6 months",
    savings: "Save 25% vs quarterly",
    features: ["Everything in Starter", "2 simultaneous devices", "8K UHD where available", "14-day catch-up replay", "Priority chat support"],
    cta: "Choose Half-Year",
  },
  {
    id: "12m",
    name: "Pro",
    duration: "12 months",
    price: 54.99,
    period: "/year",
    savings: "Save 31% vs quarterly",
    featured: true,
    badge: "Most popular",
    features: ["Everything in Starter", "8K UHD where available", "2 simultaneous devices", "Full VOD library (160K)", "Priority 24/7 support", "30-day catch-up replay"],
    cta: "Choose Pro",
  },
];
