import {Strategy, ExtractJwt} from "passport-jwt";
import db from '../models/index.js'
// 람다식은 일회성으로 작용
// 람다식은 순수함수로 작성되어야한다 (함수안의 함수)
// apply : 파라미터 o, 리턴 o

// passPort는 node.js의 미들웨어로서 사용자 인증을 구현해준다
const applyPassport = (passport, _secretOrKey) => {
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header에 bearer스키마에 담겨온 토큰 해석할 것
        secretOrKey: _secretOrKey
    };
    const verifyUser = async (jwt_payload, done) =>{
        const User = db.User
        User.findOne({
            userid: jwt_payload.id
        }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }
    passport.use(new Strategy(jwtOptions,verifyUser));
    return passport
}

// apply인 경우 export해준다
export default applyPassport