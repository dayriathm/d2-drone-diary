import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 테스트용 헬스체크 API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'd2-ops 로컬 서버 통신 성공',
    time: new Date().toLocaleTimeString('ko-KR')
  });
});

app.listen(PORT, () => {
  console.log(`[d2-ops] Local Server running at http://localhost:${PORT}`);
});