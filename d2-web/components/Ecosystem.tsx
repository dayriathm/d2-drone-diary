import { Reveal } from "@/components/ui/Reveal";

const BADGES = [
  "ArduPilot",
  "PX4",
  "Betaflight",
  "ESP32",
  "C# .NET Core",
  "MAVLink",
] as const;

export function Ecosystem() {
  return (
    <section className="border-t border-white/8">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Native ecosystem
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/10 bg-panel px-4 py-1.5 font-mono text-xs text-white"
              >
                {badge}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
