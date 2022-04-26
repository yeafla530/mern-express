// 람다식은 일회성으로 작용
// 람다식은 순수함수로 작성되어야한다 (함수안의 함수)
// apply : 파라미터 o, 리턴 o
const applyDotenv = dotenv => {
    dotenv.config()
    return {
        mongoUri: process.env.MONGO_URI,
        port: process.env.PORT,
        jwtSecret: process.env.JWT_SECRET,
        origin: process.env.ORIGIN
    }
}

// apply인 경우 export해준다
export default applyDotenv