const express = require("express");
const session = require("express-session");
const router = express.Router();
const pool = require("../pool");

router.use(session({
    secret: "128位字符串",  ///安全字符串
    resave: true,           //每次请求保存的数据
    saveUninitialized: true,    //保存初始化数据
}));

router.get("/", (req, res) => {
    console.log("获取用户信息列表.............")
    var sql = "SELECT unum,uname,uphone,uEmail,uscore,urole FROM user ";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result)
        if (result.length > 0) {
            console.log("成功获取用户信息列表");
            for (var item of result) {
                if (item.urole == 0) {
                    item.urole = "普通用户"
                } else if (item.urole == 1) {
                    item.urole = "管理员"
                }
            }
            res.send({ code: 1, msg: "获取成功", data: result })
        } else {
            res.send({ code: -1, msg: "获取失败" })
        }
    })
});
router.get("/page", (req, res) => {
    console.log("执行分页查询获取用户................")
    var $pno = parseInt(req.query.pno);
    var count = parseInt(req.query.count);
    // console.log(typeof $pno,typeof count);
    if ($pno <= 0) {
        $pno = 1;
    }
    if (!count) {
        count = 4;
    }
    // 查询表中数据总条数
    var sql1 = `select uid from user`;
    var sum = 0;
    pool.query(sql1, (err, result) => {
        if (err) throw err;
        sum = result.length;
    });

    var sql = `select unum,uname,uphone,uEmail,uscore,urole FROM user limit ?,?`;
    start = ($pno - 1) * count;
    pool.query(sql, [start, count], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, msg: "分页获取成功", data: result, sum: sum })
        } else {
            res.send({ code: -1, msg: "分页获取失败" })
        }
    })
});
router.get("/unamReg", (req, res) => {
    console.log("用户昵称查重验证。。。。。。。。。。。。。");
    var uname = req.query.uname;
    var sql = `select uname,unum from user where uname=?`;
    pool.query(sql, uname, (err, result) => {
        if (result.length > 0) {
            console.log("昵称已存在");
            res.send({ code: 1, msg: "昵称存在,请换个昵称" });
        } else {
            res.send({ code: -1, msg: "昵称不存在" });
        }
    })
})
// 用户修改数据
router.post("/updateuserinfo", (req, res) => {
    console.log("用户修改数据请求。。。。。。。。。")
    var obj=req.body;
    var unum=obj.unum;
    var obj1={
        uname:obj.uname,
        ugender:obj.ugender,
        uphone:obj.uphone,
        uEmail:obj.uEmail,
        utext:obj.textarea
    }

    var sql = "UPDATE user set ?  where unum=?";
    pool.query(sql, [obj1, unum], (err, result) => {
        if (err) throw err;
        // console.log(result)
        if (result.affectedRows > 0) {
            console.log("用户列表修改成功");
            res.send({ code: 1, msg: "修改成功"})
        } else {
            res.send({ code: -1, msg: "修改失败" })
        }
    })
});
// 用户修改密码
router.put("/updateUserPwd", (req, res) => {
    console.log("用户修改密码请求。。。。。。。。。")
    var obj=req.body;
    var sql = "UPDATE user set upwd=?  where unum=?";
    pool.query(sql, [obj.newpwd1, obj.unum], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            console.log("用户密码修改成功");
            res.send({ code: 1, msg: "修改成功"})
        } else {
            res.send({ code: -1, msg: "修改失败" })
        }
    })
});

module.exports = router;