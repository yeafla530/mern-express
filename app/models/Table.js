import bcrypt from 'bcrypt' // 암호화
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import applyDotenv from '../lambdas/applyDotenv.js'

export default function TableModel(mongoose) {
    // 몽구스의 모든 것은 스키마로 시작
    // 스키마는 MonodoDB 컬렉션에 매핑됨
    const { jwtSecret } = applyDotenv(dotenv)
    const tableSchema = mongoose.Schema({
        //client user > join.js의 데이터 받아오기
        title: String,
        content: String,
        created_at: Date,
    })
    // 내장 메소드로 함수를 정의함
    // User model을 사용하는 곳에서 comparePassword를 사용할 수 있음

     
    return mongoose.model('Table', tableSchema)
}
