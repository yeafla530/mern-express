import dotenv from 'dotenv'
import mongoose from 'mongoose'
// import 시에는 확장자(.js) 필수
import UserModel from './User.js'

// mongoose 5부터는 지원 중단
// 4에서는 전역모드
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dotenv.MONGO_URI
db.User = new UserModel(mongoose)

export default db