// 람다식은 일회성으로 작용
// 람다식은 순수함수로 작성되어야한다 (함수안의 함수)
// get : 파라미터x, return o
import { MongoClient } from 'mongodb'

const getDatabase = () => {
    const client = new MongoClient(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    let dbConnect = null
    return {
        acceptDb(callback) {
            client.connect((err, db) => {
                if(err || !db){
                    return callback(err)
                }
                dbConnect = db.db('soccerdb');
                console.log('DB 구성에서 몽고DB에 접속하다')
                return callback()
            })
        },
        getDb(){ return dbConnect}
    }
}

export default getDatabase