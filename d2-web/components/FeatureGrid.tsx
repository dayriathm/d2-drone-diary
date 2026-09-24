import { Reveal } from "@/components/ui/Reveal";
import { Activity, BatteryCharging, Cpu } from "lucide-react";

const FEATURES = [
  {
    icon: Activity,
    title: "Flight Analytics",
    body: "Replay 120Hz MAVLink streams as mission-grade curves: voltage sag, altitude, throttle, current, and RSSI aligned to the same clock.",
  },
  {
    icon: BatteryCharging,
    title: "Hardware WMS & Battery Lifespan",
    body: "Track packs, cycles, internal resistance, and remaining useful life so the warehouse knows which battery flies next — and which one retires.",
  },
  {
    icon: Cpu,
    title: "AI Predictive Maintenance",
    body: "Detect rising IR, chronic sag under sprint throttle, and motor current outliers before a craft fails on a revenue flight.",
  },
] as const;

export function FeatureGrid() {
  return (
    <section id="features" className="border-t border-white/8">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            Platform
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-white">
            Operations, energy, and airframes in one diary.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.08}>
              <article className="glass-panel h-full rounded-xl p-6 transition-colors hover:border-cyan/30">
                <feature.icon className="h-5 w-5 text-cyan" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{feature.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
