require('dotenv').config();
const cors = require('cors')
const express = require('express');
const { PORT, MONGO_URI } = process.env;
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}
app.listen(PORT, () => {
    console.log(PORT)
  console.log('***************** ***************** *****************')
  console.log('********** 서버가 정상적으로 실행되고 있습니다 *********')
  console.log('***************** ***************** *****************')
})

// 시간 찍어서 살아잇는지 확인
app.get('/', (req, res) => {
  res.send({"현재 시간 : ":new Date().toLocaleString()})
})
// 로컬에서 넘어오는걸 승인을 한다 
app.get('/api/now', cors(corsOptions),(req, res) => {
  res.json({"now":new Date().toLocaleString()})
})