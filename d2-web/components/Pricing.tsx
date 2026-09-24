import { Reveal } from "@/components/ui/Reveal";
import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  cadence: string;
  description: string;
  highlighted: boolean;
  cta: string;
  href: string;
  features: string[];
}

const TIERS: PricingTier[] = [
  {
    name: "Hobbyist",
    price: "$0",
    cadence: "forever",
    description: "Local SQLite diary for a single craft and weekend logs.",
    highlighted: false,
    cta: "Start flying",
    href: "#dashboard",
    features: [
      "1 airframe",
      "MAVLink replay",
      "CSV export",
      "Community GitHub",
    ],
  },
  {
    name: "Pro Pilot",
    price: "$12",
    cadence: "/ month",
    description: "120Hz SignalR, battery WMS, and predictive pack health.",
    highlighted: true,
    cta: "Go Pro",
    href: "#dashboard",
    features: [
      "Unlimited flights",
      "Hardware WMS",
      "Battery RUL models",
      "Priority sync",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "fleet",
    description: "SSO, air-gapped stores, and ops SLAs for commercial fleets.",
    highlighted: false,
    cta: "Talk to us",
    href: "#developers",
    features: [
      "Fleet policies",
      "On-prem SQLite clusters",
      "Audit trails",
      "Dedicated support",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-white/8">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Scale from a bench to a hangar.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TIERS.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.08}>
              <article
                className={`flex h-full flex-col rounded-xl border bg-panel p-6 ${
                  tier.highlighted
                    ? "cyan-glow border-cyan/50"
                    : "border-white/8"
                }`}
              >
                <h3 className="text-sm font-medium text-muted">{tier.name}</h3>
                <p className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-semibold text-white">{tier.price}</span>
                  <span className="mb-1 font-mono text-xs text-muted">{tier.cadence}</span>
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{tier.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-white">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-cyan" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.href}
                  className={`mt-8 inline-flex justify-center rounded-md px-4 py-2 text-sm font-semibold ${
                    tier.highlighted
                      ? "bg-cyan text-[#041218]"
                      : "border border-white/12 text-white hover:border-cyan/40"
                  }`}
                >
                  {tier.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
