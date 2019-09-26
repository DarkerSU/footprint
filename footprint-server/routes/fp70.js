const express = require("express");
const session = require("express-session");
const router = express.Router();
const pool = require("../pool");

router.use(session({
    secret: "128位字符串",  ///安全字符串
    resave: true,           //每次请求保存的数据
    saveUninitialized: true,    //保存初始化数据
}));
// 插入足迹
router.get("/", (req, res) => {
    console.log("查询70周年数据.............")
    var sql= `select chimg,chdate,chtext from footprint_70 order by chdate asc`;
    pool.query(sql, (err, result) => {
        console.log(result);
        if (result.length > 0) {
            console.log("查询70周年数据成功！！！！！！！！！！！")
            res.send({ code: 1, msg: "足迹插入成功", data: result })
        } else {
            res.send({ code: -1, msg: "足迹插入失败" })
        }
    })
});


module.exports = router;