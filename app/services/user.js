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
            console.log("userTable", user)
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
            User.findOne({
                userid: req.body.userid
            }, function (err, user) {
                if (err) throw err
                if (!user) {
                    console.log('1. error, no user')
                    res
                        .status(500)
                        .send({message: 500})
                        console.log('error', err)
                } else {
                    console.log('2. 진입은 성공')

                    console.log(' ### 로그인 정보 : ' + JSON.stringify(user))
                    user.comparePassword(req.body.password, function (_err, isMatch) {
                        if (!isMatch) {
                            console.log('3. 비밀번호 틀림')

                            res
                                .status(401)
                                .send({message: 401});
                        } else {
                            console.log('3. 비밀번호 맞음')
                            user.generateToken((err, user) => {
                                if (err) {
                                    console.log('4. 토큰 못얻어옴')

                                    res
                                        .status(400)
                                        .send(err)
                                } else {
                                    // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                                    console.log('4. 토큰 얻음')
                                    res
                                        .status(200)
                                        .json(user)
                                }
                            })
                        }
                    })
                }
            })

        },
    }


}