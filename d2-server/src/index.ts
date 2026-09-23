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
