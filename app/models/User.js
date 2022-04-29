import bcrypt from 'bcrypt' // 암호화
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import applyDotenv from '../lambdas/applyDotenv.js'

export default function UserModel(mongoose) {
    // 몽구스의 모든 것은 스키마로 시작
    // 스키마는 MonodoDB 컬렉션에 매핑됨
    const { jwtSecret } = applyDotenv(dotenv)
    const userSchema = mongoose.Schema({
        //client user > join.js의 데이터 받아오기
        userid: String,
        password: String,
        email: String,
        name: String,
        phone: String,
        birth: String,
        address: String
    })
    // 내장 메소드로 함수를 정의함
    // User model을 사용하는 곳에서 comparePassword를 사용할 수 있음

    // 비밀번호 비교
    userSchema.methods.comparePassword = function(plainPassword, cb) {
        // cb는 콜백, 출력값 (err, isMath)이다
        // console.log(' >> plainPassword >> ' + plainPassword)
        // console.log(' >> this.password >> ' + this.password)
        let isMatch = false
        if (plainPassword === this.password) {
            isMatch = true
        } else {
            isMatch = false
        }

        bcrypt.compare(plainPassword, this.password, function(err, _isMatch) {
            if (err) {
                return cb(err)
            } else {
                return cb(null, isMatch)
            }
        })
    }
    // 토큰생성
    userSchema.methods.generateToken = function(cb) {
        let user = this;
        // json web token
        // user id와 jwtSecret이용해서 token생성 > userId이찾아냄
        // sign(사용자 정보, 시크릿 키)
        let token = jwt.sign(user._id.toHexString(), jwtSecret)

        user.token = token
        user.save(function(err, user) {
            if (err) return cb(err)
            cb(null, user)
        })
    }
    // 토큰 검증
    userSchema.statics.findByToken = function(token, cb) {
        let user = this.user
        // 토큰 검증
        // verify(토큰, 시크릿키, 유효성검사 콜백함수)
        jwt.verify(token, process.env.JWT_SECRET, function(err, decode) {
            // 서버에서 찾음
            user.findOne({
                "_id": decode,
                "token": token
            }, function(err, user) {
                if (err) return cb(err)
                cb(null, user);
            }
            )
        })
    }   
    return mongoose.model('User', userSchema)
}
