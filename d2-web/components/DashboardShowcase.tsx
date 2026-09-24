"use client";

import {
  flightLogsToCsv,
  formatDuration,
  generateBatteryHealth,
  generateFlightLogs,
  generateTelemetryData,
} from "@/lib/mock-telemetry";
import { Reveal } from "@/components/ui/Reveal";
import type { AutopilotStack, FlightLog, FlightStatus } from "@/types/d2";
import { Download, Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const telemetry = generateTelemetryData();
const allLogs = generateFlightLogs();
const packs = generateBatteryHealth();

type FirmwareFilter = "all" | AutopilotStack | "alerts";

export function DashboardShowcase() {
  const [cursor, setCursor] = useState(0);
  const [filter, setFilter] = useState<FirmwareFilter>("all");

  useEffect(() => {
    const id = window.setInterval(() => {
      setCursor((value) => (value + 1) % Math.max(1, telemetry.samples.length - 80));
    }, 90);
    return () => window.clearInterval(id);
  }, []);

  const chartData = useMemo(
    () => telemetry.samples.slice(cursor, cursor + 80),
    [cursor],
  );

  const logs = useMemo(() => {
    if (filter === "all") return allLogs;
    if (filter === "alerts") {
      return allLogs.filter((log) => log.status === "warning" || log.status === "critical");
    }
    return allLogs.filter((log) => log.firmware === filter);
  }, [filter]);

  const latest = chartData[chartData.length - 1];

  return (
    <section id="dashboard" className="border-t border-white/8">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            Live diary
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            High-density telemetry, not a toy dashboard.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Status, 120Hz-derived curves, and a flight log grid that exports to
            CSV. Voltage sag is modeled against throttle so sprint legs read as
            real pack stress.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          <div className="glass-panel overflow-hidden rounded-2xl">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/8 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] sm:gap-4">
              <StatusChip ok label="MAVLink Active" />
              <StatusChip ok label={`SignalR ${telemetry.hz}Hz`} />
              <StatusChip ok label="SQLite Sync OK" />
              <span className="ml-auto text-muted">
                {telemetry.sessionId} · {telemetry.craft}
              </span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_220px]">
              <div className="p-4">
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted">Multi-axis stream</p>
                    <p className="font-mono text-sm text-white">
                      Voltage · Altitude · Throttle
                    </p>
                  </div>
                  {latest ? (
                    <div className="flex gap-4 font-mono text-xs">
                      <span className="text-cyan">{latest.voltage.toFixed(2)} V</span>
                      <span className="text-white">{latest.altitude.toFixed(1)} m</span>
                      <span className="text-alert">{latest.throttle.toFixed(0)}%</span>
                    </div>
                  ) : null}
                </div>
                <div className="h-64 w-full sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis
                        dataKey="t"
                        tick={{ fill: "#8B90A0", fontSize: 11, fontFamily: "var(--font-jetbrains)" }}
                        tickFormatter={(value: number) => `${value}s`}
                        stroke="rgba(255,255,255,0.08)"
                      />
                      <YAxis
                        yAxisId="voltage"
                        domain={[13.5, 17]}
                        tick={{ fill: "#00E5FF", fontSize: 11 }}
                        stroke="rgba(0,229,255,0.2)"
                        width={42}
                      />
                      <YAxis
                        yAxisId="alt"
                        orientation="right"
                        tick={{ fill: "#E8EAEF", fontSize: 11 }}
                        stroke="rgba(255,255,255,0.12)"
                        width={40}
                      />
                      <YAxis yAxisId="thr" hide domain={[0, 100]} />
                      <Tooltip content={<ChartTooltip />} />
                      <Legend
                        wrapperStyle={{ fontSize: 12, color: "#8B90A0" }}
                      />
                      <Line
                        yAxisId="voltage"
                        type="monotone"
                        dataKey="voltage"
                        name="Voltage"
                        stroke="#00E5FF"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        yAxisId="alt"
                        type="monotone"
                        dataKey="altitude"
                        name="Altitude"
                        stroke="#E8EAEF"
                        strokeWidth={1.6}
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        yAxisId="thr"
                        type="monotone"
                        dataKey="throttle"
                        name="Throttle"
                        stroke="#FF5E00"
                        strokeWidth={1.6}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <aside className="border-t border-white/8 p-4 lg:border-l lg:border-t-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Battery health
                </p>
                <ul className="mt-3 space-y-3">
                  {packs.map((pack) => (
                    <li key={pack.packId} className="rounded-md border border-white/8 bg-black/20 p-3">
                      <p className="font-mono text-xs text-white">{pack.packId}</p>
                      <p className="mt-1 text-[11px] text-muted">{pack.chemistry}</p>
                      <p className="mt-2 font-mono text-sm text-cyan">
                        SoH {pack.stateOfHealthPct.toFixed(1)}%
                      </p>
                      <p className="font-mono text-[11px] text-muted">
                        RUL {pack.predictedRulHours.toFixed(1)} h · {pack.cycles} cyc
                      </p>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>

            <FlightLogGrid
              logs={logs}
              filter={filter}
              onFilter={setFilter}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatusChip({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-white">
      <span
        className={`h-1.5 w-1.5 rounded-full ${ok ? "status-pulse bg-cyan" : "bg-alert"}`}
      />
      {label}
    </span>
  );
}

interface TooltipPayloadItem {
  name?: string;
  value?: number;
  color?: string;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-white/10 bg-[#0F111A]/95 px-3 py-2 font-mono text-[11px]">
      <p className="mb-1 text-muted">{label}s</p>
      {payload.map((item) => (
        <p key={item.name} style={{ color: item.color }}>
          {item.name}: {typeof item.value === "number" ? item.value.toFixed(2) : item.value}
        </p>
      ))}
    </div>
  );
}

interface FlightLogGridProps {
  logs: FlightLog[];
  filter: FirmwareFilter;
  onFilter: (value: FirmwareFilter) => void;
}

function FlightLogGrid({ logs, filter, onFilter }: FlightLogGridProps) {
  const exportCsv = () => {
    const blob = new Blob([flightLogsToCsv(logs)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "d2-flight-logs.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border-t border-white/8">
      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-muted">
          <Filter className="h-3.5 w-3.5" />
          Flight logs
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "PX4", "ArduPilot", "Betaflight", "alerts"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onFilter(value)}
              className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
                filter === value
                  ? "border-cyan/50 bg-cyan/15 text-cyan"
                  : "border-white/10 text-muted hover:border-white/20"
              }`}
            >
              {value}
            </button>
          ))}
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-[11px] text-white hover:border-cyan/40 hover:text-cyan"
          >
            <Download className="h-3.5 w-3.5" />
            CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left font-mono text-[11px]">
          <thead className="bg-black/30 text-muted">
            <tr>
              <th className="px-4 py-2 font-medium">ID</th>
              <th className="px-4 py-2 font-medium">Craft</th>
              <th className="px-4 py-2 font-medium">FW</th>
              <th className="px-4 py-2 font-medium">Mission</th>
              <th className="px-4 py-2 font-medium">Duration</th>
              <th className="px-4 py-2 font-medium">Max alt</th>
              <th className="px-4 py-2 font-medium">Min V</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-white/6 hover:bg-white/3">
                <td className="px-4 py-2 text-cyan">{log.id}</td>
                <td className="px-4 py-2 text-white">{log.craft}</td>
                <td className="px-4 py-2 text-muted">{log.firmware}</td>
                <td className="px-4 py-2 text-white">{log.mission}</td>
                <td className="px-4 py-2 text-muted">{formatDuration(log.durationSec)}</td>
                <td className="px-4 py-2 text-white">{log.maxAltitudeM.toFixed(1)} m</td>
                <td className={`px-4 py-2 ${log.minVoltageV < 14 ? "text-alert" : "text-white"}`}>
                  {log.minVoltageV.toFixed(2)} V
                </td>
                <td className="px-4 py-2">
                  <StatusBadge status={log.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: FlightStatus }) {
  const styles: Record<FlightStatus, string> = {
    complete: "border-cyan/30 text-cyan",
    nominal: "border-white/20 text-white",
    warning: "border-alert/40 text-alert",
    critical: "border-alert bg-alert/15 text-alert",
  };
  return (
    <span className={`rounded-full border px-2 py-0.5 uppercase tracking-[0.12em] ${styles[status]}`}>
      {status}
    </span>
  );
}
