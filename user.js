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
            for(var item of result){
                if(item.urole==0){
                    item.urole="普通用户"
                }else if(item.urole==1){
                    item.urole="管理员"
                }
            }          
            res.send({ code: 1, msg: "获取成功", data: result })
        } else {
            res.send({ code: -1, msg: "获取失败" })
        }
    })
});
module.exports = router;