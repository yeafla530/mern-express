import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
// local client와 통신시 cors오류 나지 않도록 설정
const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}


const app = express()
// 미들웨어 사용
app.use(cors());
// 안쓰는 req가 있으면 오류가 나기때문에 
// 쓰지 않는 req는 _req로 처리한다
app.get('/now', cors(corsOptions), (_req, res) => {
    res.json({
        "now": new Date().toLocaleString()
    })
})

export default app 