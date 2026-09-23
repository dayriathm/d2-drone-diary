
# Preface Design





### 소개 (introduction)

`.NET 10` 기반 최신 스택과 에지 컴퓨팅(Edge Computing) 아키텍처 명세를 정리한 프로젝트 전체 개요 문서입니다.

# D2 (Drone Diary) - Edge Computing Drone Telemetry System

> **D2**는 현장 오프라인 환경에서도 지연 없이 초고속 MAVLink 텔레메트리를 수집하고 분석하는 **Edge Computing 기반 드론 다이어리 시스템**입니다.






## 1. 문서 폴더 구조 (`/docs-d2/`)


# D2 (Drone Diary) - Edge Computing Drone Telemetry System

> **D2**는 현장 오프라인 환경에서도 지연 없이 초고속 MAVLink 텔레메트리를 수집하고 분석하는 **Edge Computing 기반 드론 다이어리 시스템**입니다.

---

## 🏗️ System Architecture

```text
[Edge Domain (Local PC)]                            [Cloud Domain]

┌────────────────────────────────────────┐       ┌──────────────────────────────────────┐
│ [Edge Node] d2-app                     │       │ d2-server (Central Cloud API)        │
│  ├── d2-mp (C# .NET 10 Native Engine)  │ ───>  │  - Node.js (Express) + PostgreSQL    │
│  ├── d2_flight.db (Edge SQLite WAL)    │ Sync  │  - 다수 사용자의 비행 로그 중앙 집계  │
│  └── Electron + React UI Dashboard     │       └──────────────────┬───────────────────┘
└────────────────────────────────────────┘                          │
                                                                    ▼
                                                 ┌──────────────────────────────────────┐
                                                 │ d2-web (Portal Web)                  │
                                                 │  - Next.js + Vercel (사전예약/포털)   │
                                                 └──────────────────────────────────────┘
                                                 
```




```
d2-drone-diary/                         <-- [Root] Cursor AI / VS Code 열기 위치
 ├── .cursorignore                      <-- Cursor AI 인덱싱 최적화 (AI 렉 방지)
 ├── .gitignore                         <-- 전체 모듈 통합 Git 버전 관리 제외 설정
 ├── README.md                          <-- 프로젝트 전체 아키텍처 및 개요 명세
 ├── d2.code-workspace                 <-- VS Code 전체 워크스페이스 통합 설정
 ├── d2_flight.db                        <-- Edge Data Store (공유 SQLite DB, WAL 모드)
 │
 ├── docs-d2/                           <-- [Obsidian / Docusaurus] 설계 문서 및 오프라인 도움말
 ├── d2-mp/                             <-- [Visual Studio 2022] C# .NET 10 Edge Engine (독립 모듈)
 │    ├── D2MP.slnx                     <-- .NET 10 XML 솔루션 포맷
 │    └── d2mp/                         <-- C# WPF + DevExpress WPF (System Tray 고속 수신기)
 │
 ├── d2-app/                            <-- [VS Code / Cursor AI] Edge Client UI (독립 모듈)
 │    ├── package.json                  <-- Electron + React (Vite) + DevExtreme React UI
 │    └── src/                          <-- Electron Main (d2-mp.exe child_process 자동 실행)
 │
 ├── d2-server/                         <-- [VS Code] Central Cloud API Server
 │    └── src/                          <-- Node.js (Express / TypeScript) + PostgreSQL
 │
 └── d2-web/                            <-- [VS Code] Portal & Marketing Web
      └── app/                          <-- Next.js (App Router) + Tailwind + Vercel 배포
```


----


# D2 (Drone Diary) - Edge Computing Drone Telemetry System

> **D2**는 현장 오프라인 환경에서도 지연 없이 초고속 MAVLink 텔레메트리를 수집하고 분석하는 **Edge Computing 기반 드론 다이어리 시스템**입니다.

## 🏗️ Architecture Matrix

| 모듈 명             | 기술 스택                                | 개발 도구              | 역할                                                     |
| :--------------- | :----------------------------------- | :----------------- | :----------------------------------------------------- |
| **`docs-d2/`**   | Markdown / Docusaurus                | Obsidian / VS Code | 아키텍처 설계 문서 및 오프라인 도움말                                  |
| **`d2-mp/`**     | **C# .NET 10** WPF + DevExpress      | Visual Studio      | **Edge Engine**: MAVLink/시리얼 수신 및 SQLite WAL 고속 INSERT |
| **`d2-app/`**    | Electron + React (Vite) + DevExtreme | VS Code            | **Edge Client UI**: 로컬 SQLite Read, 실시간 계기판/리포트        |
| **`d2-server/`** | Node.js (Express) + PostgreSQL       | VS Code            | **Central Cloud**: 다수 사용자 데이터 중앙 집계 및 REST API         |
| **`d2-web/`**    | Next.js + Tailwind + Vercel          | VS Code            | **Portal Web**: SEO 홍보 사이트 및 사전 예약 포털                  |

 
---

## 🏗️ System Architecture


[Edge Domain (Local PC)]                            [Cloud Domain]


```
┌────────────────────────────────────────┐       ┌──────────────────────────────────────┐
│ [Edge Node] d2-app                     │       │ d2-server (Central Cloud API)        │
│  ├── d2-mp (C# .NET 10 Native Engine)  │ ───>  │  - Node.js (Express) + PostgreSQL    │
│  ├── d2_flight.db (Edge SQLite WAL)    │ Sync  │  - 다수 사용자의 비행 로그 중앙 집계  │
│  └── Electron + React UI Dashboard     │       └──────────────────┬───────────────────┘
└────────────────────────────────────────┘                          │
                                                                    ▼
                                                 ┌──────────────────────────────────────┐
                                                 │ d2-web (Portal Web)                  │
                                                 │  - Next.js + Vercel (사전예약/포털)   │
                                                 └──────────────────────────────────────┘
 

```


## 프로젝트 생성


## 1. `d2-server`와 `d2-web`의 역할 명확화 및 'Edge Computing' 개념 도입

`d2-server`와 `d2-web`이 헷갈리셨던 이유는 "사용자가 접속하는 웹사이트(UI)"와 "데이터가 모이는 백엔드(API/DB)"가 나뉘어 있기 때문입니다.

### 두 서비스의 명확한 역할 분담

- **`d2-web` (홍보/포털 웹사이트)**:
    
    - 랜딩 페이지, 서비스 소개, 사전 예약, 사용자 로그인/마이페이지 화면, 통합 비행 리포트 웹 대시보드 (**사용자가 브라우저로 접속하는 웹 UI**).
        
- **`d2-server` (메인 서버 / 중앙 API)**:
    
    - 각 현장(`d2-app`)에서 수집된 비행 로그 데이터를 수신하고 중앙 DB(PostgreSQL)에 저장/분석하는 **중앙 백엔드 API 서버**.




## 📦 Project Structure


### Dependency
- Visual Studio MSVC v143 - VS 2022 C++ x64/x86 빌드 도구


### Create Projects

```bash
# 1. 최상위 루트 디렉토리 생성 및 이동
mkdir d2-drone-diary
cd d2-drone-diary

# 2. 문서 및 모듈 폴더 생성
mkdir docs-d2

# 3. [d2-mp] C# .NET 10 프로젝트 초기화 (Visual Studio 2022 기준)
mkdir d2-mp
cd d2-mp
dotnet new sln -n D2MP
dotnet new wpf -n D2MP -o d2mp
dotnet sln D2MP.slnx add d2mp/D2MP.csproj
cd d2mp
dotnet add package System.Data.SQLite.Core
dotnet add package Dapper
cd ../..

# 4. [d2-app] Electron + React (Vite) + TypeScript 프로젝트 생성
npm create @quick-start/electron d2-app -- --template react-ts
cd d2-app
npm install better-sqlite3 devextreme devextreme-react
npm install -D @types/better-sqlite3 electron-rebuild

# 4.1. -- 에러라면
	npx electron-rebuild -f -w better-sqlite3
# 4.1. -- 대안
	# 구형 패키지 제거 및 최신 패키지 설치 
	npm uninstall electron-rebuild 
	npm install -D @types/better-sqlite3 @electron/rebuild
	# 최신 @electron/rebuild 명령어로 네이티브 모듈 컴파일 실행 
	npx @electron/rebuild -f -w better-sqlite3


cd ..

# 5. [d2-server] Node.js Express 백엔드 초기화
mkdir d2-server
cd d2-server
npm init -y
npm install express pg dotenv
npm install -D typescript @types/express @types/node ts-node
npx tsc --init
cd ..

# 6. [d2-web] Next.js 홍보 포털 초기화
npx create-next-app@latest d2-web --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```


#### 4.2. npm install 시 자동으로 Electron 컴파일

d2-app/package.json:
"scripts": { 
	"postinstall": "electron-rebuild", 
	"dev": "electron-vite dev", 
	"build": "electron-vite build" 
}

## Test Code

### D2-mp 테스트 코드 작성

```csharp
using System;
using System.Data.SQLite;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using Dapper;

namespace D2MP
{
    public partial class App : Application
    {
        // 최상위 공유 SQLite DB 연결
        private const string DbConnectionString = @"Data Source=../d2_flight.db;Version=3;Cache=Shared;";
        private readonly CancellationTokenSource _cts = new();

        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            InitDatabase();

            // CS4014 경고 제거 및 안전한 백그라운드 수신 가동
            _ = Task.Run(() => StartTelemetryReceiverAsync(_cts.Token));
        }

        protected override void OnExit(ExitEventArgs e)
        {
            _cts.Cancel();
            base.OnExit(e);
        }

        private void InitDatabase()
        {
            using var conn = new SQLiteConnection(DbConnectionString);
            conn.Open();
            // WAL 모드 활성화 (Electron 읽기 작업과 동시 실행 보장)
            conn.Execute("PRAGMA journal_mode = WAL;");
            conn.Execute(@"
                CREATE TABLE IF NOT EXISTS flight_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    altitude REAL,
                    speed REAL,
                    battery INTEGER,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );");
        }

        private async Task StartTelemetryReceiverAsync(CancellationToken ct)
        {
            while (!ct.IsCancellationRequested)
            {
                try
                {
                    using var conn = new SQLiteConnection(DbConnectionString);
                    await conn.ExecuteAsync(
                        "INSERT INTO flight_logs (altitude, speed, battery) VALUES (@Alt, @Speed, @Bat)",
                        new { Alt = 125.4, Speed = 18.2, Bat = 95 }
                    );
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine($"DB Insert Error: {ex.Message}");
                }

                await Task.Delay(100, ct); // 10Hz 데이터 수신
            }
        }
    }
}
```





### Electron 테스트 코드 작성


1. d2-app/src/main/index.ts : SQLite 데이터베이스 연동 테스트

```typescript
import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import Database from 'better-sqlite3'

// 1. 공유 SQLite DB 경로 설정 (루트 디렉토리의 d2_flight.db)
const dbPath = join(__dirname, '../../../d2_flight.db')
const db = new Database(dbPath, { timeout: 5000 })

// 2. WAL(Write-Ahead Logging) 모드 활성화 (C# d2-mp와의 파일 잠금 방지)
db.pragma('journal_mode = WAL')

// 3. 테스트용 초기 테이블 생성
db.exec(`
  CREATE TABLE IF NOT EXISTS flight_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    altitude REAL,
    speed REAL,
    battery INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

console.log('SQLite WAL mode enabled & Database initialized successfully at:', dbPath)

// React UI(Renderer)에서 DB 조회 요청 시 호출될 IPC 핸들러
ipcMain.handle('get-flight-logs', () => {
  const stmt = db.prepare('SELECT * FROM flight_logs ORDER BY id DESC LIMIT 10')
  return stmt.all()
})
```




2. d2-app 개발 서버 가동
   터미널에서 명령어를 실행하여 Electron + React UI를 띄워봅니다:
```bash
npm run dev
```








#### 실행

### ① `d2-server` (Node.js Express + TypeScript 백엔드) 실행

`d2-server`는 Express와 TypeScript 기반으로 구성되었으므로, 개발 모드 실행기를 통해 구동합니다.



```PowerShell
# 1. d2-server 폴더로 이동
cd d2-server

# 2. 최초 1회 패키지 설치 (설치 안 한 경우)
npm install

# 3. 개발 서버 가동 (ts-node-dev / nodemon 구동)
npm run dev
```

> **서버 동작 확인**: 보통 `http://localhost:4000` 또는 `http://localhost:5000` 포트로 Express API 서버가 가동됩니다.

### ② `d2-web` (Next.js 홍보/포털 웹) 실행

`d2-web`은 Next.js(App Router) 기반이므로 Next.js 개발 서버를 띄웁니다.



```PowerShell
# 1. d2-web 폴더로 이동 (루트 기준)
cd d2-web

# 2. 최초 1회 패키지 설치 (설치 안 한 경우)
npm install

# 3. Next.js 개발 서버 가동
npm run dev
```

> **웹 사이트 확인**: 브라우저를 열고 `http://localhost:3000`으로 접속하시면 Next.js 랜딩 페이지 및 포털 웹이 즉시 렌더링됩니다.



## 🚀 Quick Start (Development)

### 1. Edge Engine (`d2-mp`) - C# .NET 10


# Visual Studio 2026 / .NET 10 SDK 필요

```bash
cd d2-mp
dotnet build D2MP.slnx
```

### 2. Edge Client UI (`d2-app`) - Electron + React

```bash
cd d2-app
npm install
npm run dev
```


### 3. Central Cloud API (`d2-server`)
```Bash
cd d2-server
npm install
npm run dev
```


### 4. Portal Web (`d2-web`)
```Bash
cd d2-web
npm install
npm run dev
```


## d2-server/package.json "scripts" "dev" 등록
d2-server/package.json
`npm error Missing script: "dev"` 에러는 `d2-server/package.json` 파일 안에 `"scripts"` 항목으로 `"dev"` 실행 명령어가 등록되어 있지 않아서 발생하는 전형적인 메시지입니다.

`d2-server`는 TypeScript와 Express 기반 백엔드이므로, 코드를 수정할 때마다 서버가 자동으로 재부팅되는 **`ts-node-dev`** 패키지를 등록하여 정돈해 주면 됩니다.

### 해결 방법 (2단계)

#### Step 1. 개발용 자동 재부팅 패키지 설치 (`ts-node-dev`)

`d2-server` 폴더 위치에서 아래 명령어를 실행하여 개발용 패키지를 추가합니다.

PowerShell

```
npm install -D ts-node-dev
```

#### Step 2. `d2-server/package.json` 수정

`d2-server/package.json` 파일을 열어 `"scripts"` 부분에 `"dev"` 명령어를 추가합니다.

JSON

```
{
  "name": "d2-server",
  "version": "1.0.0",
  "description": "D2 Central Cloud API Server",
  "main": "src/index.ts",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "pg": "^8.11.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.12.7",
    "@types/pg": "^8.11.5",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.4.5"
  }
}
```

### Step 3. src 폴더 및 index.ts 파일 생성
#### 1. `src` 폴더 및 `index.ts` 파일 생성

`d2-server` 위치의 터미널에서 다음 명령어를 실행하여 폴더와 엔트리포인트 파일을 생성합니다.



```PowerShell
# d2-server 위치인지 확인 후 src 폴더 생성
mkdir src

# src/index.ts 기본 파일 생성 (PowerShell 전용 명령)
New-Item -Path src/index.ts -ItemType File -Force
```

#### 2. `d2-server/src/index.ts` 기본 백엔드 코드 작성

생성된 `d2-server/src/index.ts` 파일을 열고 아래 기본 Express 백엔드 코드를 붙여넣습니다.

#### 1. `tsx` 패키지 설치

PowerShell

```
npm install -D tsx
```

#### 2. `d2-server/package.json` 스크립트 수정

`d2-server/package.json` 파일의 `"scripts"` 부분을 아래와 같이 수정합니다:

JSON

```
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
```



```TypeScript
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

// 헬스체크용 기본 API 엔드포인트
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'D2 Central Cloud Server is running!',
    timestamp: new Date().toISOString()
  })
})

app.listen(PORT, () => {
  console.log(`=================================`)
  console.log(`🚀 D2 Server running on port ${PORT}`)
  console.log(`👉 Health Check: http://localhost:${PORT}/api/health`)
  console.log(`=================================`)
})
```

#### 3. 서버 다시 실행

### Step 3. 서버 가동 및 테스트

수정 완료 후 다시 아래 명령어를 실행합니다.

PowerShell

```
npm run dev
```

> **출력 예시**: `[INFO] 07:31:52 ts-node-dev ready.` 메시지와 함께 Express 서버가 4000번 포트에서 가동됩니다.

이제 `src/index.ts` 코드를 수정할 때마다 서버가 0.1초 만에 번개처럼 자동 재부팅되어 백엔드 API 개발을 편하게 진행하실 수 있습니다!


#### 가동 포트 테이블

[D2 System Multi-Module Ports]

```

┌──────────────┬─────────────────────────────┬───────────────────────────┐
│ 모듈 명      │ 기술 스택                    │ 실행 명령어 & 주소        │
├──────────────┼─────────────────────────────┼───────────────────────────┤
│ d2-mp        │ C# .NET 10 WPF              │ Visual Studio (F5) 실행   │
│ d2-app       │ Electron + React (Vite)     │ http://localhost:5173     │
│ d2-web       │ Next.js                    │ http://localhost:3000     │
│ d2-server    │ Node.js (Express)           │ http://localhost:4000     │
└──────────────┴─────────────────────────────┴───────────────────────────┘

```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🛠️ Professional Services & Support

`d2-drone-diary` 기반의 **커스텀 모듈 개발, 기존 시스템 연동, 기술 컨설팅 및 외주 개발** 서비스 문의는 아래 채널을 이용해 주시기 바랍니다.

Please use the channels below for inquiries regarding **custom module development, integration with existing systems, technical consulting, and outsourced development** services.


- **Email**: dayriathm@gmail.com
- **Web**: https://dayriathm.vercel.app
- **Kmong (크몽)**: [ - ]
- **Upwork / Freelancer**: [ - ]

