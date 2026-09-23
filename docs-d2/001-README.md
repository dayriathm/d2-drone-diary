# README

  
 ## 📦 Project Structure
 
| 폴더 명             | 기술 스택                                      | 설명 / 역할                                                    |
| ---------------- | ------------------------------------------ | ---------------------------------------------------------- |
| **`docs-d2/`**   | Markdown / Docusaurus                      | 시스템 설계 문서 및 오프라인 도움말 가이드                                   |
| **`d2-mp/`**     | **C# .NET 10** WPF + DevExpress WPF        | **Edge Engine**: MAVLink/시리얼 데이터 수신 및 SQLite WAL 고속 INSERT |
| **`d2-app/`**    | Electron + React (Vite) + DevExtreme React | **Edge Client UI**: 로컬 SQLite 조회, 실시간 계기판 및 비행 리포트         |
| **`d2-server/`** | Node.js (Express/TS) + PostgreSQL          | **Central Cloud**: 멀티 드론 통합 관리 및 중앙 데이터 백업 REST API        |
| **`d2-web/`**    | Next.js + Tailwind CSS + Vercel            | **Portal Web**: SEO 최적화 홍보 웹사이트, 사전 예약 및 웹 대시보드            |
|                  |                                            |                                                            |

# D2-Drone-Diary Project

체계적인 드론 관리 시스템
(Systematic drone management system)

# Design

## 1. Architecture and System Frameworks (Project Base)

- **WPF / WebView2 / React-based Hybrid UI**
  
    - C# Native 제어 알고리즘과 Web UI(React) 간의 로컬 웹소켓/IPC 양방향 통신.  
      (Local WebSocket/IPC bidirectional communication between C# Native control algorithms and Web UI (React). )
    - 렌더링 성능 최적화 및 크로스 플랫폼/웹 호환 UI 구성.
      Rendering performance optimization and cross-platform/web-compatible UI configuration.
        
- **SQLite / Local DB Data Layer**

    - 기체 스펙, 비행 로그, 정비 이력, 부품 BOM, 미션 데이터를 매니페스트 형태로 로컬에 영구 저장.
      (Permanently store airframe specifications, flight logs, maintenance history, parts BOM, and mission data locally in the form of a manifest.)
        
- **MAVLink / Serial Telemetry Communication engine**
  
    - ArduPilot, Betaflight, PX4의 패킷 파싱 및 하이퍼 파라미터 실시간 동기화.
      (Packet parsing and real-time hyperparameter synchronization in ArduPilot, Betaflight, and PX4.)



## 전체 프로젝트 아키텍처 및 디렉토리 구조 설명

`[D2-Drone-Diary]` 프로젝트는 자동차 생산 공정(Assembly Line)의 엄격함과 **항공 GCS/GIS 시스템**의 확장성을 통합할 수 있도록 **C# .NET 8 WPF Host + WebView2 React Core + Local SQLite DB** 기반의 하이브리드 아키텍처로 구성됩니다.




## 2. 드론 조립 및 빌드 이력 관리 ( Drone Assembly Line )

- **공정단계별 빌드 체크리스트 (Stage-by-Stage Build Checklist)**
    
    - **Stage 1 (프레임):** 카본 프레임, 암대(Arm) 강도, 섀시 조립 및 나사 록타이트(Threadlocker) 체결 여부 관리.
        
    - **Stage 2 (파워트레인):** 모터 KV값, ESC 전류 정격, 휠/프로펠러 마운팅 매핑.
        
    - **Stage 3 (전장/제어부):** Flight Controller(FC), PDB/PMU 배선, 납땜 상태 및 절연 검사.
        
    - **Stage 4 (통신/센서):** GPS/GNSS, IMU 센서, MAVLink Telemetry, Receiver/RC 링킹 및 핀맵 검증.
        
    - **Stage 5 (최종 QC/EOL Test):** 모터 회전 방향(Direction Test), 벤치 테스트 로그, 센서 보정(Calibration) 데이터 확정.
        
- **부품별 BOM (Bill of Materials) 및 이력(Serial Number) 추적 관리**
    
    - 부품 하나하나의 제조사, 구입일자, 소모 수명(단위: 비행 시간 또는 회전 수), 고장 이력 관리.
        
    - 차량 관리 시스템(VMS)의 '소모품 교체 주기 알림(엔진오일, 타이어 등)'을 드론 베어링, 프로펠러, 배터리로 확장 적용.
        

## 3. 드론 특성, 조립, 설계를 위한 세부 기록 기능

- **센서 및 파라미터 매핑 타임라인**
    
    - PID 튜닝 값, Filter(PT1, Biquard) 데이터 세팅 기록 및 과거 설정과 비교(Diff Checker) 기능.
        
- **3D/2D 와이어프레임 및 부품 구조 시각화 인터페이스**
    
    - 기체 설계 스펙(무게, Thrust-to-Weight Ratio, 휠베이스 mm 등)을 자동 계산.
        
- **비행 전/후 자동 점검 보고서 (Pre-flight / Post-flight Inspection Log)**
    
    - 센서 캘리브레이션(아셀/자이로/나침반) 상태 수동/자동 기록.
        

## 4. 해외 드론/차량 플릿 관리 소프트웨어 연동 및 고급 아이디어

- **배터리 관리 시스템 (BMS / Battery Fleet Management)**
    
    - 각 팩별 셀 전압 밸런스, Internal Resistance(내부 저항), 충방전 횟수, 잔존 수명(SoH) 진단.
        
- **차량/드론 진단 코드(DTC - Diagnostic Trouble Code) 시스템**
    
    - OBD-II 자동차 진단 스캐너 개념을 드론에 도입하여 MAVLink STATUSTEXT / Health Status 기반 고장 코드 자동 판별.
        
- **비행 로그 분석 엔진 (Log Telemetry Player)**
    
    - .bin / .tlog 파일의 3D 비행 궤적 재생, Vibration(진동수), EKF2/EKF3 상태 시각화.
        

## 5. 파워트레인 및 전기 시스템 정밀 관리 (Power Management)

- **모터 및 ESC 정밀 튜닝 이력 관리**
    
    - ESC 펌웨어 버전(BLHeli_32, AM32 등) 및 DShot 프로토콜 설정 기록.
        
    - 모터 폴(Pole) 수, KV rating, 아이들링 RPM, 템퍼레이처 스로틀링 기준값 설정 및 모니터링.
        
- **전력 분배 및 배선 토폴로지 기록**
    
    - PDB(Power Distribution Board) 배선 매핑 및 레귤레이터(5V/9V/12V BEC) 인가 전류 기록.
        
    - 와이어 게이지(AWG) 선택 규격 및 전류 피크치에 따른 용량 검증 기능.
        

## 6. MAVLink / GCS 통합 원격제어 및 지상국 관리

- **미션 플래닝 및 웨이포인트(Waypoint) 기록**
    
    - 비행 경로(RTL 고도, Auto Takeoff, Loiter 타임) 및 고도 프로필(AGL/MSL) 기록.
        
    - 웨이포인트별 카메라/센서 트레이스 및 드롭 액션(Payload Drop) 로그 관리.
        
- **텔레메트리 파라미터 패키징 및 스냅샷 (Parameter Snapshot)**
    
    - ArduPilot / PX4 전체 파라미터 백업, 비교(Diff) 및 복원 기능.
        
    - 비행 모드(Stabilize, AltHold, PosHold, Auto, Guided 등) 스위치 매핑 관리.
        

## 7. 부품 수명 및 유지보수 관리 (Fleet Maintenance & Service)

- **소모품 자동 차감 알고리즘 (Component Wear Analytics)**
    
    - 비행 시간 및 모터 진동 데이터 기반 베어링, 프로펠러, 프레임 구조 피로도 차감.
        
    - 프로펠러 크기(인치), 피치(Pitch), 재질(카본/플라스틱)에 따른 권장 교체 주기 알림.
        
- **정비 지침서 및 워크오더 (Digital Work Order System)**
    
    - 정비/수리 작업 내역 등록, 교체 부품 영수증 및 이미지 첨부 기능.
        
    -  '정비 명세서' 출력 및 PDF 백업 보고서 생성.
        

## 8. 안전 및 비상 조치 모듈 (Failsafe & Safety Matrix)

- **단계별 비상 조치 매트릭스 설정**
    
    - Low Battery, Telemetry Loss, RC Signal Loss, Geofence Violation 발생 시 단계별 대응 정책(RTL, Land, Disarm) 기록.
        
- **블랙박스 데이터 분석 (Crash Analytics)**
    
    - 추락/이상 비행 발생 직전 센서 데이터(Accel, Gyro, Battery Volt Drop) 타임라인 추적.
        


## 9. 품질 관리 및 최종 출하 검사 (Quality Control & EOL Test Line)

- **EOL(End of Line) 종합 검사 체크리스트**
    
    - **진동 및 밸런싱 검사:** 모터/프로펠러 회전 시 FFT(Fast Fourier Transform) 기반 진동 노이즈 수치화 및 기준치 초과 여부 판정.
        
    - **센서 오프셋/지자기 검사:** Mag(나침반) 센서 주변 자성 Interference 퍼센티지 및 센서 교정 상태 최종 승인.
        
    - **무선 통신 감도(RSSI/SNR) 마진 테스트:** Telemetry 및 RC 리시버 수신 감도 DB 값 자동 기록.
        
- **출하 승인 및 기체 출생 신원증명서 (Birth Certificate / Digital Passport)**
    
    - 조립 완공 시 섀시 번호(VIN), FC 고유 UUID, 최초 공정 담당자 및 최종 테스트 결과를 결합한 PDF 신원증명서 자동 발행.
        

## 10. 지상 제어 및 모빌리티 연동 모듈 (Telemetry & V2X Mobility Integration)

- **차량/지상 이동체(Rover) 제어 모듈 통합**
    
    - 드론과 지상 이동체(Car/Rover) 간 공통 MAVLink 메시지 구조(SPEED, GLOBAL_POSITION_INT, HEADING) 표준화 및 모니터링.
        
    - 주행/비행 모드별 텔레메트리 스위칭 및 멀티 노드(Multi-Vehicle) 동시 추적 시스템.
        
- **V2X(Vehicle-to-Everything) Telemetry Relay**
    
    - 드론/차량 간 좌표 실시간 공유 및 지상국(GCS)을 통한 동적 렌데뷰(Rendezvous) 및 자동 복귀(RTL to Moving Base) 위치 갱신.
        

## 11. 부품 재고 및 공급망 관리 (Inventory & Supply Chain Management)

- **바코드/QR 코드 기반 실시간 부품 수량 연동**
    
    - 부품 입고 시 QR 코드 등록 및 조립 공정(Stage) 투입 시 로컬 DB 재고 자동 차감.
        
    - 호환 가능 대체 부품(Substitute Part) 매핑 (예: 동일 Spec의 모터/ESC 대체 사용 시 알림).
        
- **부품 단가 및 총 소유 비용(TCO) 계산기**
    
    - 조립 기체 1대당 단가(BOM Cost) 산출 및 비행/수리 이력 누적에 따른 기체별 유지비 분석.
        

## 12. 개발자 및 엔지니어링 도구 (Developer Tools & Code Generation)

- **C# / React 간 IPC 데이터 바인더 도구**
    
    - MAVLink / Serial 수신 패킷을 React UI 컴포넌트로 실시간 파이프라인 전송하는 디버깅 모니터.
        
- **자동 문서화 (Docusaurus / Markdown Export)**
    
    - 특정 기체의 조립 이력, 파라미터 백업, 정비 일지를 Docusaurus 규격의 Markdown 문서로 자동 변환 및 백업.
        


    
--------------

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🛠️ Professional Services & Support

`d2-drone-diary` 기반의 **커스텀 모듈 개발, 기존 시스템 연동, 기술 컨설팅 및 외주 개발** 서비스 문의는 아래 채널을 이용해 주시기 바랍니다.

Please use the channels below for inquiries regarding **custom module development, integration with existing systems, technical consulting, and outsourced development** services.

- **Email**: dayriathm@gmail.com
- **Web**: https://dayriathm.vercel.app
- **Kmong**: [ - ]
- **Upwork / Freelancer**: [ - ]
