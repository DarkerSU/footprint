const express = require("express");
const session = require("express-session");
const router = express.Router();
const pool = require("../pool");

router.use(session({
    secret: "128位字符串",  ///安全字符串
    resave: true,           //每次请求保存的数据
    saveUninitialized: true,    //保存初始化数据
}));

router.get("/city", (req, res) => {
    console.log("查询市级列表。。。。。。。。")
    var $pid= req.query.pid;
    console.log($pid);
    console.log("111111")
    var sql = "SELECT cid,pid,cityname,type  FROM city where pid=?";
    pool.query(sql, [$pid], (err, result) => {
        if (err) throw err; 
        console.log(result);    
        if (result.length > 0) {
            res.send({ code: 1, msg: "登陆成功", data: result })
        } else {
            res.send({ code: -1, msg: "登陆失败" })
        }
    })
});
router.get("/capital", (req, res) => {
    console.log("查询地区列表。。。。。。。。")
    var $pid= req.query.pid;
    // console.log($pid)
    var sql = "SELECT cid,pid,cityname,type  FROM city where pid=?";
    pool.query(sql, [$pid], (err, result) => {
        if (err) throw err; 
        // console.log(result);    
        if (result.length > 0) {
            res.send({ code: 1, msg: "登陆成功", data: result })
        } else {
            res.send({ code: -1, msg: "登陆失败" })
        }
    })
});
router.get("/tag", (req, res) => {
    console.log("查询市级列表。。。。。。。。")
    var $pid= req.query.tpid;
    // console.log($pid)
    var sql = "SELECT tid,ttitle  FROM tag where tpid=?";
    pool.query(sql, [$pid], (err, result) => {
        if (err) throw err; 
        // console.log(result);    
        if (result.length > 0) {
            res.send({ code: 1, msg: "登陆成功", data: result })
        } else {
            res.send({ code: -1, msg: "登陆失败" })
        }
    })
});
module.exports = router;