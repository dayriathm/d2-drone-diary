import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    step: "01",
    title: "Fly & Record",
    body: "The companion captures MAVLink at 120Hz while you fly. No extra ground-station ritual — the diary starts at arm.",
  },
  {
    step: "02",
    title: "Auto-Sync & Parse",
    body: "SignalR ships the stream; SQLite commits a durable session. Packs, frames, and firmware versions attach automatically.",
  },
  {
    step: "03",
    title: "Analyze & Optimize",
    body: "Replay sag, altitude, and throttle together. Flag dying packs, tune hover current, and export CSV for the rest of the org.",
  },
] as const;

export function Workflow() {
  return (
    <section id="workflow" className="border-t border-white/8">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            Workflow
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            From first beep to fleet insight.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.08}>
              <article className="relative h-full rounded-xl border border-white/8 bg-panel p-6">
                {index < STEPS.length - 1 ? (
                  <span className="absolute right-[-10px] top-10 hidden h-px w-5 bg-cyan/40 md:block" />
                ) : null}
                <p className="font-mono text-xs text-cyan">{item.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
