### `README.md`




````Markdown
# 🚁 D2 (Drone Diary)
**Edge Computing-Based Drone Telemetry & Flight Diary Ecosystem**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![.NET 10](https://img.shields.io/badge/.NET-10.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![Electron](https://img.shields.io/badge/Electron-39.2-47848F?logo=electron)](https://www.electronjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)](https://nextjs.org/)
[![DevExpress](https://img.shields.io/badge/UI-DevExpress-FF7200)](https://www.devexpress.com/)

## 📖 Preface: The Vision
**D2 (Drone Diary)** is a professional-grade, multi-module software ecosystem designed for drone pilots, hardware engineers, and researchers. Traditional cloud-dependent ground control stations (GCS) suffer from latency and data loss in offline field environments. 

D2 solves this by introducing an **Edge Computing Architecture**. It captures ultra-high-speed telemetry (MAVLink, Serial, UDP) at the edge (local PC), visualizes it with zero latency, and seamlessly synchronizes with a central cloud only when the network permits. It is not just a flight logger; it is a comprehensive diary and analytics platform for your aerial operations.

---

## 🏗️ System Architecture & Data Pipeline

The core engineering philosophy of D2 is **Process Decoupling via Edge Data Store**. We strictly separate the hardware communication layer from the UI rendering layer to guarantee absolute stability, even during telemetry spikes.

```text
[ EDGE DOMAIN (Local Field PC) ]                                 [ CLOUD DOMAIN ]

 ┌──────────────────────────────────────────┐             ┌───────────────────────────────────┐
 │ D2 Client Ecosystem (d2-app)             │             │ D2 Central Cloud (d2-server)      │
 │                                          │             │  - Node.js Express / TS           │
 │  ┌────────────────────────────────────┐  │             │  - PostgreSQL Database            │
 │  │ d2-mp (C# .NET 10 Native Engine)   │  │             │  - Multi-tenant Analytics         │
 │  │ - Background System Tray Process   │  │             └─────────────────┬─────────────────┘
 │  │ - MAVLink / Serial / UDP Parsing   │  │                               │
 │  └─────────────────┬──────────────────┘  │                               │ Sync (REST API)
 │                    │ (Write-Only)        │                               │
 │                    ▼                     │                               ▼
 │  ┌────────────────────────────────────┐  │             ┌───────────────────────────────────┐
 │  │ d2_flight.db (Edge Data Store)     │──│────────────>│ D2 Portal Web (d2-web)            │
 │  │ - SQLite with WAL Mode enabled     │  │             │  - Next.js (App Router)           │
 │  └─────────────────┬──────────────────┘  │             │  - Marketing & Cloud Dashboard    │
 │                    │ (Read-Only)         │             │  - Tailwind CSS + Vercel          │
 │                    ▼                     │             └───────────────────────────────────┘
 │  ┌────────────────────────────────────┐  │
 │  │ Electron + React UI (DevExtreme)   │  │
 │  │ - Real-time DataGrid & Charts      │  │
 │  │ - Process Lifecycle Manager        │  │
 │  └────────────────────────────────────┘  │
 └──────────────────────────────────────────┘
````






### ⚡ The SQLite WAL Mode Advantage

By enabling `PRAGMA journal_mode = WAL;`, the C# `.NET 10` engine (`d2-mp`) can blast thousands of INSERTs per second into the database without locking it. Simultaneously, the `better-sqlite3` native C++ module inside the Electron app (`d2-app`) can instantly SELECT and render the data onto the DevExtreme DataGrid without any IPC socket bottlenecks or threading collisions.

## 📦 Project Structure & Module Breakdown

D2 is organized into four distinct modules, sharing a flat, easily navigable monorepo structure.

|**Module**|**Tech Stack**|**Role & Responsibilities**|
|---|---|---|
|**`d2-mp`**|C# `.NET 10`, WPF, DevExpress|**The Hardware Engine.** Runs headless in the system tray. Directly interfaces with COM ports and network interfaces to decode MAVLink packets. Handles raw hardware I/O and writes to the local SQLite DB.|
|**`d2-app`**|Electron, React (Vite), DevExtreme|**The Edge Client.** A cross-platform desktop application. Manages the lifecycle of `d2-mp.exe` (`child_process.spawn`). Renders professional-grade dashboards, flight grids, and charts using DevExtreme React.|
|**`d2-server`**|Node.js, Express, TypeScript, pg|**The Central API.** A high-performance RESTful API server. Receives offline-synced flight logs from edge clients and securely aggregates them into a centralized PostgreSQL database.|
|**`d2-web`**|Next.js, Tailwind CSS, Vercel|**The Global Portal.** An SEO-optimized landing page for the D2 service. Allows users to pre-register, manage accounts, and view global aggregated flight statistics via a modern web interface.|
|**`docs-d2`**|Markdown|Comprehensive architecture blueprints, API specifications, and developer guides.|

## 🚀 Getting Started (Development Guide)

### Prerequisites

- **.NET 10 SDK** and **Visual Studio 2022** (with C++ Desktop Development workload)
    
- **Node.js v20+** and **npm**
    

### 1. Clone the Repository



```Bash
git clone [https://github.com/dayriathm/d2-drone-diary.git](https://github.com/dayriathm/d2-drone-diary.git)
cd d2-drone-diary
```

### 2. Edge Engine (`d2-mp`) Setup

The C# engine compiles into a standalone executable.



```PowerShell
cd d2-mp
# Open D2MP.slnx in Visual Studio 2022 and build the solution
# Or build via CLI:
dotnet build D2MP.slnx -c Debug
```

### 3. Edge Client UI (`d2-app`) Setup

Requires compiling the native `better-sqlite3` module via `@electron/rebuild`.



```PowerShell
cd d2-app
npm install
# The postinstall script will automatically run electron-rebuild.
# Run the development server (Spawns Electron and React Hot-Reloading)
npm run dev
```

### 4. Central Server (`d2-server`) Setup

Powered by `tsx` for lightning-fast backend hot-reloading.



```PowerShell
cd d2-server
npm install
# Ensure you have a .env file with your DATABASE_URL for PostgreSQL
npm run dev
```

### 5. Portal Web (`d2-web`) Setup



```PowerShell
cd d2-web
npm install
npm run dev
# Access the web portal at http://localhost:3000
```

## 🛠️ Development Workflow & Guidelines

- **Process Management:** When you launch `d2-app` (`npm run dev`), the Electron `main/index.ts` automatically spawns the compiled `d2-mp.exe`. You do not need to run the C# engine separately during UI development.
    
- **Web-Only UI Testing:** If you want to design DevExtreme components without launching the full Electron environment, run `npm run dev:web` inside `d2-app`. Ensure you mock the SQLite data, as standard browsers cannot access native filesystem APIs.
    
- **IDE Setup:** We strongly recommend using **Cursor AI** or **VS Code** at the root `d2-drone-diary` directory utilizing the provided `d2.code-workspace` file. The `.cursorignore` file is highly optimized to prevent AI indexing lag.
    

## 🗺️ Roadmap

- [ ] Architect multi-module edge infrastructure.
    
- [ ] Implement `.NET 10` MAVLink local SQLite WAL ingestion.
    
- [ ] Build Electron + DevExtreme React dashboard.
    
- [ ] Integrate 3D flight path visualization mapping.
    
- [ ] Implement AI-assisted flight log analytics and drone maintenance predictions.
    

## 📜 License

This project is licensed under the **MIT License**.

Copyright (c) 2026 D2 Team

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


