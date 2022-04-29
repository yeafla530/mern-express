// 보안과 관련됨
// mern stack의 핵심
import db from '../models/index.js'
import getDatabase from '../lambdas/getDatabase.js'


export default function TableService() {
    // 알고리즘 짜기
    // 복붙
    const Table = db.Table
    const dbo = getDatabase()
    // db에 접속
    const dbConnect = dbo.getDb()

    // 순수함수로 짜기 => return 사용
    return {
        // 클로저 짜기
        // 미들웨어 req,res
        // express 기본구조는 라우터와 미들웨어밖에 없다
        // req가 갖고있는 값을 res가 자동으로 인지

        create(req, res) {
            // payload는 body에 있다
            // 1. data 받기
            const table = new Table(req.body)
            // console.log(table)
            // 3. db연결 코드 짜기 (라우터 방식)
            table.save(function(err){
                if(err) {
                    res
                        .status(500)
                        .send({message: err})
                    console.log('작성 실패')
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
        // request는 안쓰니까 _req
        // 주는건 없고 가져온다
        getTables(_req, res){
            Table.find().exec(
                (err, table)=>{
                    console.log('table')
                    res.status(200).json(table)
                }
            )
        },

        delTable(req, res){
            console.log('------------', req.body, req.delid)
            Table.deleteOne({_id: req.body.delid}, function (err, table) {
                res.status(200).json(table)
            });
        },

        updateTable(req, _res){
            Table.update({_id: req.body.delid}, req.body);

        }

    }


}