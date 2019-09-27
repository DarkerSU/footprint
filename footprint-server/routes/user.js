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
router.get("/userLimit", (req, res) => {
    console.log("获取用户信息列表.............")
    var sql = "SELECT unum,uname,urole FROM user ";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result)
        if (result.length > 0) {
            console.log("成功获取用户信息列表");
           
            res.send({ code: 1, msg: "获取成功", data: result })
        } else {
            res.send({ code: -1, msg: "获取失败" })
        }
    })
});
// 分页查询数据
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

    var sql = `select unum,uname,ugender,uphone,uEmail,uscore,urole,upic,utext FROM user limit ?,?`;
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
// 通过用户名查询
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
// 通过用户账号查询用户是否存在。用于忘记密码组件
router.get("/unumReg", (req, res) => {
    console.log("用户账号查询是否验证。。。。。。。。。。。。。");
    var unum = req.query.unum;
    var sql = `select uid,uname,uphone from user where unum=?`;
    pool.query(sql, unum, (err, result) => {
        if (result.length > 0) {
            console.log("账号存在");
            res.send({ code: 1, msg: "账号存在,可以修改密码" });
        } else {
            res.send({ code: -1, msg: "账号不存在" });
        }
    })
})
// 用户修改数据
router.post("/updateuserinfo", (req, res) => {
    console.log("用户修改数据请求。。。。。。。。。")
    var obj = req.body;
    console.log(obj)
    var sql = "UPDATE user set ?  where unum=?";
    pool.query(sql, [obj, obj.unum], (err, result) => {
        if (err) throw err;
        // console.log(result)
        if (result.affectedRows > 0) {
            var sql2 = 'update user set rnum=urole';
            pool.query(sql2, (err2,result2)=> {
                console.log("用户列表修改成功");
            })
            res.send({ code: 1, msg: "修改成功" })
        } else {
            res.send({ code: -1, msg: "修改失败" })
        }
    });

});
// 用户修改密码
router.put("/updateUserPwd", (req, res) => {
    console.log("用户修改密码请求。。。。。。。。。")
    var obj = req.body;
    var sql = "UPDATE user set upwd=md5(?)  where unum=?";
    pool.query(sql, [obj.newpwd1, obj.unum], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            console.log("用户密码修改成功");
            res.send({ code: 1, msg: "修改成功" })
        } else {
            res.send({ code: -1, msg: "修改失败" })
        }
    })
});
// 删除指定用户信息
router.delete("/deleteUser", (req, res) => {
    console.log("删除指定用户信息..............")
    var unum = req.query.unum;
    var sql = "DELETE FROM `user` WHERE unum=?";
    pool.query(sql, [unum], (err, result) => {
        if (result.affectedRows > 0) {
            console.log("指定用户删除成功");
            res.send({ code: 1, msg: "用户删除成功" })
        } else {
            res.send({ code: -1, msg: "用户删除失败" })
        }
    })
})
module.exports = router;