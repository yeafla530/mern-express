// 보안과 관련됨
// mern stack의 핵심
import db from '../models/index.js'
import getDatabase from '../lambdas/getDatabase.js'


export default function UserService() {
    // 알고리즘 짜기
    // 복붙
    const User = db.User
    const dbo = getDatabase()
    // db에 접속
    const dbConnect = dbo.getDb()

    // 순수함수로 짜기 => return 사용
    return {
        // 클로저 짜기
        // 미들웨어 req,res
        // express 기본구조는 라우터와 미들웨어밖에 없다
        // req가 갖고있는 값을 res가 자동으로 인지

        join(req, res) {
            // payload는 body에 있다
            // 1. data 받기
            const user = new User(req.body)
            // console.log(user)
            // 3. db연결 코드 짜기 (라우터 방식)
            user.save(function(err){
                if(err) {
                    res
                        .status(500)
                        .send({message: err})
                    console.log('회원가입 실패')
                    // return이 있어야함
                    // return 없으면 다음 코드 실행
                    return;
                } else {
                    res
                        .status(200)
                        .json({ok: 'ok'})
                }
            })
        },

        login(req, res) {
            const data = req.body
            res.status(200).json({})
        }
    }


}