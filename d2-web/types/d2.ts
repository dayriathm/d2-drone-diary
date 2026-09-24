export type AutopilotStack = "ArduPilot" | "PX4" | "Betaflight";

export type FlightStatus = "nominal" | "warning" | "critical" | "complete";

export interface FlightLog {
  id: string;
  craft: string;
  firmware: AutopilotStack;
  mission: string;
  startedAt: string;
  durationSec: number;
  maxAltitudeM: number;
  minVoltageV: number;
  throttleAvgPct: number;
  location: string;
  status: FlightStatus;
  batteryCycles: number;
}

export interface TelemetrySample {
  t: number;
  voltage: number;
  altitude: number;
  throttle: number;
  current: number;
  rssi: number;
}

export interface TelemetryData {
  sessionId: string;
  craft: string;
  hz: number;
  samples: TelemetrySample[];
}

export interface BatteryHealth {
  packId: string;
  chemistry: string;
  cycles: number;
  stateOfHealthPct: number;
  internalResistanceMOhm: number;
  predictedRulHours: number;
  lastFlightId: string;
}
