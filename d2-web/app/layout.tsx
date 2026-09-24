import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://d2-drone-diary.vercel.app"),
  title: {
    default: "d2 — Drone Flight Diary & MAVLink Analytics",
    template: "%s · d2",
  },
  description:
    "d2 is an enterprise drone flight diary, 120Hz MAVLink telemetry analytics, and hardware WMS platform for ArduPilot, PX4, and Betaflight fleets.",
  keywords: [
    "d2",
    "drone diary",
    "MAVLink",
    "telemetry analytics",
    "PX4",
    "ArduPilot",
    "Betaflight",
    "drone WMS",
    "battery lifespan",
  ],
  authors: [{ name: "d2 Software" }],
  creator: "d2 Software",
  openGraph: {
    title: "d2 — Drone Flight Diary & MAVLink Analytics",
    description:
      "Record, sync, and analyze 120Hz MAVLink telemetry with hardware WMS and predictive battery health.",
    type: "website",
    locale: "en_US",
    siteName: "d2",
  },
  twitter: {
    card: "summary_large_image",
    title: "d2 — Drone Flight Diary",
    description:
      "Enterprise drone flight diary, MAVLink analytics, and hardware WMS.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F111A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-obsidian font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
