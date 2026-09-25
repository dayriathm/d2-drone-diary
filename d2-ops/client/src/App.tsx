import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import axios from 'axios';
import './App.css'


// test button code
interface ServerResponse {
  status: string;
  message: string;
  time: string;
}

function App() {
  const [count, setCount] = useState(0)

  // ----------------------------------
  // test button code
  const [data, setData] = useState<ServerResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 서버 API 호출 함수
  const handleCallServer = async () => {
    setLoading(true);
    setError(null);
    try {
      // Node.js Express 서버(3000 포트)의 API 호출
      const response = await axios.get<ServerResponse>('http://localhost:3000/api/health');
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError('서버 연결 실패');
    } finally {
      setLoading(false);
    }
  };
  // test button code
  //-------------------------------

  return (
    <>

    {/* test button code */}
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h1>d2-ops Local Web Test</h1>
      
      <button
        onClick={handleCallServer}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '15px',
          cursor: 'pointer',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px'
        }}
      >
        {loading ? '서버 호출 중...' : '서버 API 호출하기'}
      </button>

      {error && (
        <p style={{ color: '#dc2626', marginTop: '15px' }}>{error}</p>
      )}

      {data && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f3f4f6',
            borderRadius: '6px',
            border: '1px solid #e5e7eb'
          }}
        >
          <h3>서버 응답 결과:</h3>
          <p><strong>상태:</strong> {data.status}</p>
          <p><strong>메시지:</strong> {data.message}</p>
          <p><strong>응답 시간:</strong> {data.time}</p>
        </div>
      )}
    </div>
    {/* ------------------------------------ */}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          margin: '24px 0',
          textAlign: 'center',
          color: '#1f2937',
        }}
      >
        <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>Hello world</p>
        <p style={{ margin: 0, fontSize: '1rem', color: '#4b5563' }}>
          간단한 테스트 문장입니다.
        </p>
      </div>

      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
