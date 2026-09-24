import type {
  BatteryHealth,
  FlightLog,
  TelemetryData,
  TelemetrySample,
} from "@/types/d2";

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

/** Display stream: 2 Hz samples representing a 120 Hz MAVLink capture. */
export function generateTelemetrySamples(seed = 42, points = 360): TelemetrySample[] {
  const rand = mulberry32(seed);
  const samples: TelemetrySample[] = [];
  let altitude = 0;
  let voltage = 16.8;

  for (let i = 0; i < points; i += 1) {
    const t = i * 0.5;
    const phase = i / (points - 1);
    let throttle = 0.18;

    if (phase < 0.1) {
      throttle = 0.12 + phase * 5.4;
    } else if (phase < 0.42) {
      throttle = 0.44 + Math.sin(i / 7) * 0.07;
    } else if (phase < 0.58) {
      throttle = 0.9;
    } else if (phase < 0.82) {
      throttle = 0.52 + Math.sin(i / 11) * 0.06;
    } else {
      throttle = Math.max(0.06, 0.48 - (phase - 0.82) * 2.4);
    }

    throttle = clamp(throttle + (rand() - 0.5) * 0.035, 0, 1);

    const climbRate = (throttle - 0.34) * 2.4;
    altitude = Math.max(0, altitude + climbRate * 0.55 + (rand() - 0.5) * 0.35);
    if (phase > 0.86) {
      altitude *= 0.9;
    }

    const sag = throttle * 1.28 + (throttle > 0.78 ? 0.62 : 0);
    voltage = 16.8 - phase * 1.18 - sag * 0.2 + (rand() - 0.5) * 0.028;

    samples.push({
      t: round(t, 2),
      voltage: round(voltage, 3),
      altitude: round(altitude, 2),
      throttle: round(throttle * 100, 1),
      current: round(throttle * 36 + 2.4 + rand() * 1.6, 2),
      rssi: round(-42 - throttle * 14 - rand() * 5, 1),
    });
  }

  return samples;
}

export function generateTelemetryData(): TelemetryData {
  return {
    sessionId: "sess-7F2A-120HZ",
    craft: "PX4-Copter-04",
    hz: 120,
    samples: generateTelemetrySamples(),
  };
}

export function generateFlightLogs(): FlightLog[] {
  return [
    {
      id: "FLT-2042",
      craft: "PX4-Copter-04",
      firmware: "PX4",
      mission: "Corridor mapping",
      startedAt: "2026-09-24T14:12:08Z",
      durationSec: 1486,
      maxAltitudeM: 118.4,
      minVoltageV: 14.62,
      throttleAvgPct: 54.1,
      location: "Incheon, KR",
      status: "complete",
      batteryCycles: 86,
    },
    {
      id: "FLT-2041",
      craft: "APM-Quad-12",
      firmware: "ArduPilot",
      mission: "Battery sag test",
      startedAt: "2026-09-24T09:04:41Z",
      durationSec: 902,
      maxAltitudeM: 64.2,
      minVoltageV: 13.91,
      throttleAvgPct: 71.8,
      location: "Suwon, KR",
      status: "warning",
      batteryCycles: 141,
    },
    {
      id: "FLT-2040",
      craft: "BF-Freestyle-03",
      firmware: "Betaflight",
      mission: "Training circuit",
      startedAt: "2026-09-23T18:33:19Z",
      durationSec: 412,
      maxAltitudeM: 42.0,
      minVoltageV: 14.18,
      throttleAvgPct: 82.4,
      location: "Songdo, KR",
      status: "nominal",
      batteryCycles: 39,
    },
    {
      id: "FLT-2039",
      craft: "PX4-VTOL-01",
      firmware: "PX4",
      mission: "Coastal inspection",
      startedAt: "2026-09-23T06:21:55Z",
      durationSec: 2310,
      maxAltitudeM: 186.7,
      minVoltageV: 21.04,
      throttleAvgPct: 48.6,
      location: "Busan, KR",
      status: "complete",
      batteryCycles: 62,
    },
    {
      id: "FLT-2038",
      craft: "APM-Hex-07",
      firmware: "ArduPilot",
      mission: "WMS pack audit",
      startedAt: "2026-09-22T11:48:02Z",
      durationSec: 764,
      maxAltitudeM: 51.3,
      minVoltageV: 13.22,
      throttleAvgPct: 63.0,
      location: "Seoul, KR",
      status: "critical",
      batteryCycles: 208,
    },
    {
      id: "FLT-2037",
      craft: "PX4-Copter-04",
      firmware: "PX4",
      mission: "Night waypoint",
      startedAt: "2026-09-21T21:09:44Z",
      durationSec: 1198,
      maxAltitudeM: 97.8,
      minVoltageV: 15.01,
      throttleAvgPct: 49.2,
      location: "Incheon, KR",
      status: "complete",
      batteryCycles: 85,
    },
    {
      id: "FLT-2036",
      craft: "BF-Toothpick-09",
      firmware: "Betaflight",
      mission: "RSSI survey",
      startedAt: "2026-09-21T15:27:10Z",
      durationSec: 288,
      maxAltitudeM: 28.6,
      minVoltageV: 12.84,
      throttleAvgPct: 76.5,
      location: "Pangyo, KR",
      status: "warning",
      batteryCycles: 54,
    },
    {
      id: "FLT-2035",
      craft: "APM-Quad-12",
      firmware: "ArduPilot",
      mission: "Precision land",
      startedAt: "2026-09-20T08:16:33Z",
      durationSec: 640,
      maxAltitudeM: 33.9,
      minVoltageV: 14.77,
      throttleAvgPct: 41.3,
      location: "Suwon, KR",
      status: "complete",
      batteryCycles: 140,
    },
  ];
}

export function generateBatteryHealth(): BatteryHealth[] {
  return [
    {
      packId: "BAT-4S-118",
      chemistry: "Li-ion 4S",
      cycles: 86,
      stateOfHealthPct: 94.2,
      internalResistanceMOhm: 18.4,
      predictedRulHours: 41.5,
      lastFlightId: "FLT-2042",
    },
    {
      packId: "BAT-4S-044",
      chemistry: "LiPo 4S",
      cycles: 208,
      stateOfHealthPct: 71.8,
      internalResistanceMOhm: 41.2,
      predictedRulHours: 8.1,
      lastFlightId: "FLT-2038",
    },
    {
      packId: "BAT-6S-021",
      chemistry: "Li-ion 6S",
      cycles: 62,
      stateOfHealthPct: 97.1,
      internalResistanceMOhm: 12.9,
      predictedRulHours: 63.0,
      lastFlightId: "FLT-2039",
    },
  ];
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}m ${remainder.toString().padStart(2, "0")}s`;
}

export function flightLogsToCsv(logs: FlightLog[]): string {
  const headers = [
    "id",
    "craft",
    "firmware",
    "mission",
    "startedAt",
    "durationSec",
    "maxAltitudeM",
    "minVoltageV",
    "throttleAvgPct",
    "location",
    "status",
    "batteryCycles",
  ] as const;

  const rows = logs.map((log) =>
    headers
      .map((header) => {
        const value = log[header];
        return `"${String(value).replaceAll('"', '""')}"`;
      })
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}
