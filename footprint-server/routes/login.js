const express = require("express");
const session = require("express-session");
const router = express.Router();
const pool = require("../pool");

router.use(session({
    secret: "128位字符串",  ///安全字符串
    resave: true,           //每次请求保存的数据
    saveUninitialized: true,    //保存初始化数据
}));
// 功能：用户登录
router.get("/", (req, res) => {
    console.log("发送登陆请求........")
    var unum = req.query.unum;
    var upwd = req.query.upwd;
    // console.log(unum, upwd);
    var sql = "select unum,uname,urole,uscore,ugender,uEmail,uphone,upic,utext from user where unum=? and upwd=md5(?)";
    pool.query(sql, [unum, upwd], (err, result) => {
        if (err) throw err;
        // console.log(result);
        if (result.length > 0) {
            console.log("登陆成功")
            res.send({ code: 1, msg: "登陆成功", data: result });
        } else {
            console.log("登陆失败。请检查账号密码");
            res.send({ code: -1, msg: "登陆失败" });
        }
    })
})
// 查询要插入的账号在数据库中是否存在
router.get("/register", (req, res) => {
    console.log("##################################");
    console.log("注册时查询用户账号是否存在..............")
    var unum = req.query.unum;
    if (!unum) {
        console.log("用户账号已存在，请换账号注册")
        res.send({ code: -2, msg: "请输入用户账号" });
    } else {
        var sql = `select uname,unum from user where unum=?`;
        pool.query(sql, unum, (err, result) => {
            if (result.length > 0) {
                console.log("用户用户账号已存在");
                res.send({ code: 0, msg: "用户存在,请换个账号" });
            } else {
                console.log("用户账号不存在,可以插入")
                console.log("##################################");
                console.log("开始用户数据注册................");
                var obj = req.query;
                var sql = `insert into user (unum,uname,upwd) values (?,?,?)`;
                pool.query(sql, [obj.unum,obj.uname,obj.upwd,], (err, result) => {
                    if (err) throw err;
                    if (result.affectedRows > 0) {
                        console.log("用户注册数据成功")
                        res.send({ code: 1, msg: "注册成功" })
                    } else {
                        res.send({ code: -1, msg: "注册失败" })
                    }
                })
            }
        })
    }
})
module.exports = router;