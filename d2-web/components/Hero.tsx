"use client";

import { motion } from "framer-motion";
import { ArrowRight, Radio } from "lucide-react";
import { useMemo, useState } from "react";

export function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const transform = useMemo(
    () =>
      `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
    [tilt],
  );

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.12),transparent_42%)]" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
            <Radio className="h-3 w-3" />
            120Hz MAVLink · SignalR · SQLite
          </p>
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            The flight diary for fleets that never guess.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg">
            d2 captures enterprise drone operations as a durable diary: live
            MAVLink telemetry, hardware WMS, battery lifespan, and predictive
            maintenance — from the first arming beep to the last land.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan px-5 py-2.5 text-sm font-semibold text-[#041218] transition-opacity hover:opacity-90"
            >
              Launch Dashboard
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#developers"
              className="inline-flex items-center justify-center rounded-md border border-white/12 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-cyan/40 hover:text-cyan"
            >
              View C# SDK
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/8 pt-6 font-mono text-xs text-muted">
            <div>
              <dt>Sample rate</dt>
              <dd className="mt-1 text-lg text-white">120 Hz</dd>
            </div>
            <div>
              <dt>Store</dt>
              <dd className="mt-1 text-lg text-white">SQLite</dd>
            </div>
            <div>
              <dt>Stacks</dt>
              <dd className="mt-1 text-lg text-white">PX4+</dd>
            </div>
          </dl>
        </div>

        <motion.div
          className="relative"
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
            setTilt({ x, y });
          }}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <div
            className="glass-panel hud-grid relative overflow-hidden rounded-2xl p-4 sm:p-6"
            style={{ transform, transformStyle: "preserve-3d" }}
          >
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-cyan">
              <span>HUD · ATTITUDE</span>
              <span className="flex items-center gap-2 text-cyan">
                <span className="status-pulse h-1.5 w-1.5 rounded-full bg-cyan" />
                LINK OK
              </span>
            </div>
            <DroneHud />
            <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[11px]">
              <HudStat label="ALT" value="87.4 m" />
              <HudStat label="Vbat" value="15.92 V" warn={false} />
              <HudStat label="THR" value="61%" />
              <HudStat label="MODE" value="AUTO" />
              <HudStat label="GPS" value="14 SAT" />
              <HudStat label="RSSI" value="-51 dB" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HudStat({
  label,
  value,
  warn = false,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="rounded-md border border-white/8 bg-black/25 px-2.5 py-2">
      <p className="text-[9px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className={warn ? "mt-1 text-alert" : "mt-1 text-white"}>{value}</p>
    </div>
  );
}

function DroneHud() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
      <div className="absolute inset-6 rounded-full border border-cyan/20" />
      <div className="absolute inset-12 rounded-full border border-dashed border-cyan/15" />
      <svg viewBox="0 0 240 180" className="relative h-full w-full">
        <line x1="120" y1="18" x2="120" y2="162" stroke="rgba(0,229,255,0.18)" />
        <line x1="24" y1="90" x2="216" y2="90" stroke="rgba(0,229,255,0.18)" />
        <g transform="translate(120 90)">
          <rect x="-18" y="-8" width="36" height="16" rx="4" fill="#1A1D27" stroke="#00E5FF" />
          <circle cx="0" cy="0" r="3" fill="#00E5FF" />
          <g className="prop-spin" transform="translate(-46 -28)">
            <ellipse cx="0" cy="0" rx="18" ry="4" fill="rgba(0,229,255,0.35)" />
          </g>
          <g className="prop-spin-rev" transform="translate(46 -28)">
            <ellipse cx="0" cy="0" rx="18" ry="4" fill="rgba(0,229,255,0.35)" />
          </g>
          <g className="prop-spin-rev" transform="translate(-46 28)">
            <ellipse cx="0" cy="0" rx="18" ry="4" fill="rgba(0,229,255,0.35)" />
          </g>
          <g className="prop-spin" transform="translate(46 28)">
            <ellipse cx="0" cy="0" rx="18" ry="4" fill="rgba(0,229,255,0.35)" />
          </g>
          <path d="M-46 -28 L-18 -4 M46 -28 L18 -4 M-46 28 L-18 4 M46 28 L18 4" stroke="#00E5FF" fill="none" />
        </g>
        <text x="28" y="28" fill="#00E5FF" fontSize="8" fontFamily="ui-monospace, monospace">
          ROLL +1.4°
        </text>
        <text x="164" y="28" fill="#8B90A0" fontSize="8" fontFamily="ui-monospace, monospace">
          PITCH -0.6°
        </text>
      </svg>
    </div>
  );
}
