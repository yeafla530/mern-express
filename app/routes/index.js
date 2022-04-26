import express from "express"
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(_req, res, next) {
    res.json({"현재 시간 : ": new Date().toLocaleString()})
});

export default indexRouter