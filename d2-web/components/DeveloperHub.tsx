"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const SNIPPET = `using D2.Sdk;

var client = new D2TelemetryClient(new D2ClientOptions
{
    HubUrl = "wss://hub.d2.dev/mavlink",
    SampleRateHz = 120,
    Store = D2Store.Sqlite("./d2-diary.db")
});

await client.ConnectAsync();

client.OnBattery((pkt) =>
{
    if (pkt.Voltage < 14.8m)
        Console.WriteLine($"ALERT pack sag {pkt.Voltage:F2}V");
});

var session = await client.StartSessionAsync("PX4-Copter-04");
await session.ExportCsvAsync("./logs/flight-042.csv");`;

const BULLETS = [
  "Typed C# .NET Core client for SignalR hubs and SQLite diaries.",
  "Subscribe to battery, attitude, and RC channels without parsing MAVLink by hand.",
  "Session export to CSV for WMS, finance, and post-flight review.",
  "Works beside ArduPilot, PX4, Betaflight, and ESP32 companions.",
] as const;

export function DeveloperHub() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(SNIPPET);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="developers" className="border-t border-white/8">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            Developer hub
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Drop a client in. Keep the diary local.
          </h2>
          <ul className="mt-6 space-y-3">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass-panel overflow-hidden rounded-xl">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
              <p className="font-mono text-[11px] text-muted">D2TelemetryClient.cs</p>
              <button
                type="button"
                onClick={() => void copy()}
                className="inline-flex items-center gap-1.5 text-[11px] text-muted hover:text-cyan"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto bg-[#10131c] p-4 font-mono text-[12px] leading-6">
              <code>
                {tokenizeCSharp(SNIPPET).map((token, index) => (
                  <span key={`${token.kind}-${index}`} className={tokenClass(token.kind)}>
                    {token.value}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type TokenKind = "keyword" | "type" | "string" | "number" | "plain";

interface Token {
  kind: TokenKind;
  value: string;
}

function tokenizeCSharp(source: string): Token[] {
  const tokens: Token[] = [];
  const pattern =
    /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:using|var|new|await|if)\b|\b(?:D2TelemetryClient|D2ClientOptions|D2Store|Console)\b|\b\d+(?:\.\d+)?m?\b)/g;
  let last = 0;
  let match: RegExpExecArray | null = pattern.exec(source);

  while (match) {
    if (match.index > last) {
      tokens.push({ kind: "plain", value: source.slice(last, match.index) });
    }
    const value = match[0];
    let kind: TokenKind = "plain";
    if (value.startsWith('"') || value.startsWith("'")) kind = "string";
    else if (/^(using|var|new|await|if)$/.test(value)) kind = "keyword";
    else if (/^(D2TelemetryClient|D2ClientOptions|D2Store|Console)$/.test(value)) kind = "type";
    else kind = "number";
    tokens.push({ kind, value });
    last = match.index + value.length;
    match = pattern.exec(source);
  }

  if (last < source.length) {
    tokens.push({ kind: "plain", value: source.slice(last) });
  }
  return tokens;
}

function tokenClass(kind: TokenKind): string {
  switch (kind) {
    case "keyword":
      return "text-muted";
    case "type":
      return "text-cyan";
    case "string":
      return "text-alert";
    case "number":
      return "text-white";
    default:
      return "text-[#c8f7ff]";
  }
}
