const express = require("express");
const session = require("express-session");
const router = express.Router();
const pool = require("../pool");

router.use(session({
    secret: "128位字符串",  ///安全字符串
    resave: true,           //每次请求保存的数据
    saveUninitialized: true,    //保存初始化数据
}));
// 获取用户列表
router.get("/", (req, res) => {
    console.log("获取角色信息列表.............")
    var sql = "SELECT rnum,rname FROM role ";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result)
        if (result.length > 0) {
            console.log("成功获取角色信息列表");
            res.send({ code: 1, msg: "获取成功", data: result })
        } else {
            res.send({ code: -1, msg: "获取失败" })
        }
    })
});
// 分页查询数据
// router.get("/page", (req, res) => {
//     console.log("执行分页查询获取用户................")
//     var $pno = parseInt(req.query.pno);
//     var count = parseInt(req.query.count);
    // console.log(typeof $pno,typeof count);
//     if ($pno <= 0) {
//         $pno = 1;
//     }
//     if (!count) {
//         count = 4;
//     }
//     // 查询表中数据总条数
//     var sql1 = `select uid from user`;
//     var sum = 0;
//     pool.query(sql1, (err, result) => {
//         if (err) throw err;
//         sum = result.length;
//     });

//     var sql = `select unum,uname,ugender,uphone,uEmail,uscore,urole,upic,utext FROM user limit ?,?`;
//     start = ($pno - 1) * count;
//     pool.query(sql, [start, count], (err, result) => {
//         if (err) throw err;
//         if (result.length > 0) {
//             res.send({ code: 1, msg: "分页获取成功", data: result, sum: sum })
//         } else {
//             res.send({ code: -1, msg: "分页获取失败" })
//         }
//     })
// });

module.exports = router;