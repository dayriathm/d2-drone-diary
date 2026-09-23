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