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
router.post("/addfp", (req, res) => {
    console.log("插入足迹一条.............")
    var obj = req.body;
    // console.log(obj)
    var ptitle = obj.ptitle;
    var unum = obj.unum;
    var uname = obj.uname;
    var sql1 = `insert into publish_footprint set ?;`;
    pool.query(sql1, [obj], (err, result) => {
        // console.log(result.insertId);
        if (result.affectedRows > 0) {
            console.log("足迹标题插入成功！！！！！！！！！！！")
            res.send({ code: 1, msg: "足迹插入成功", data: result.insertId })
        } else {
            res.send({ code: -1, msg: "足迹插入失败" })
        }
    })
});
/* 循环插入某一条足迹的内容 */
router.get("/addContent", (req, res) => {
    console.log("插入足迹一条.............")
    var obj = req.query;
    // console.log(obj)
    var sql1 = `insert into footprint_sign set ?`;
    pool.query(sql1, [obj], (err, result) => {
        // console.log(result.insertId);
        if (result.affectedRows > 0) {
            console.log(`足迹内容插入成功！！！！！！！！`)
        } else {
            console.log(`足迹内容插入失败！！！！！！！！`)
        }
    })
});
// 根据标题查询
router.get("/showfootprint", (req, res) => {
    console.log("查询足迹........");
    var ptitle = req.query.fptitle;
    // console.log(ptitle)
    var sql = `select pid,ptitle,praise,unum from publish_footprint where ptitle=?`
    pool.query(sql, [ptitle], (err, result1) => {
        // console.log(result1[0].pid)
        if (result1.length > 0) {
            var spnum = result1[0].pid;
            var sql2 = `select spsite,spcountry,spimgUrl,spfpdate,sptextarea,sptagList from footprint_sign where spnum=?`;
            pool.query(sql2, [spnum], (err, result2) => {
                // if(err)
                // console.log(result2)
                if (result2.length > 0) {
                    console.log('足迹查询成功')
                    res.send({ code: 1, mag: '足迹查询成功', data1: result2, data2: result1 });
                } else {
                    console.log('足迹查询失败');
                    res.send({ code: -1, mag: '足迹查询失败' });
                }
            })
        } else {
            console.log('足迹查询失败');
            res.send({ code: -1, mag: '足迹查询失败' });
        }

    })
})

router.get("/unumAllshow", (req, res) => {
    console.log("查询足迹........");
    var unum = req.query.unum;
    console.log(unum)
    var sql = `select ptitle,praise,spimgUrl,sptagList,spnum from footprint_sign left outer join publish_footprint on spnum=pid where unum=?`
    pool.query(sql, [unum], (err, result1) => {
        // console.log(result1);
        if (result1.length > 0) {
            console.log('足迹查询成功')
            res.send({ code: 1, mag: '足迹查询成功', data1: result1 });
        } else {
            console.log('足迹查询失败');
            res.send({ code: -1, mag: '足迹查询失败' });
        }
        // })
    })
})

router.get("/pageAllshow", (req, res) => {
    var pno = parseInt(req.query.pno);
    var count = parseInt(req.query.count);
    console.log(count)
    if (pno <= 0) {
        pno = 1;
    }
    
    var sql = `select pid,unum,uname,ptitle,firstfpimgurl,firstfptagList from publish_footprint limit ?,?`;
    start = (pno - 1) * count;
    pool.query(sql, [start, count], (err, result1) => {
        // console.log(result1);
        if (result1.length > 0) {
            res.send({ code: 1, mag: '足迹查询成功',data1:result1})
        } else {
            res.send({ code: -1, mag: '足迹查询失败' });
        }  
    })
})

 // for (var i = 0; i < result1.length; i++) {
            //     var spnum = result1[i].pid;
            //     var sql1 = "select spimgUrl,sptagList from footprint_sign where spnum=? "
            //     pool.query(sql1, [spnum], (err, result2) => {
            //         console.log(result2);
            //         if (result2.length > 0) {
            //             console.log('足迹查询成功')
            //             res.send({ code: 1, mag: '足迹查询成功',data1:result1,data2:result2});
            //         } else {
            //             console.log('足迹查询失败');
            //             res.send({ code: -1, mag: '足迹查询失败' });
            //         }
            //     })
            // }

// router.get("/pidshowfp",(req,res)=>{
//     var spnum=req.query.spnum;
//     var sql1 = `select spimgUrl,sptagList from footprint_sign where spnum=?`
//     pool.query(sql1, [spnum], (err, result2) => {
//         // console.log(result2)
//         if (result2.length > 0) {
//             console.log('足迹查询成功')
//             res.send({ code: 1, mag: '足迹查询成功', data2: result2 });
//         } else {
//             res.send({ code: -1, mag: '足迹查询失败' });
//         }
//     })
// })
// 分页查询数据
// router.get("/page", (req, res) => {
//     console.log("执行分页查询获取用户................")
//     var $pno = parseInt(req.query.pno);
//     var count = parseInt(req.query.count);
//     // console.log(typeof $pno,typeof count);
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
// router.get("/unamReg", (req, res) => {
//     console.log("用户昵称查重验证。。。。。。。。。。。。。");
//     var uname = req.query.uname;
//     var sql = `select uname,unum from user where uname=?`;
//     pool.query(sql, uname, (err, result) => {
//         if (result.length > 0) {
//             console.log("昵称已存在");
//             res.send({ code: 1, msg: "昵称存在,请换个昵称" });
//         } else {
//             res.send({ code: -1, msg: "昵称不存在" });
//         }
//     })
// })
// // 用户修改数据
// router.post("/updateuserinfo", (req, res) => {
//     console.log("用户修改数据请求。。。。。。。。。")
//     var obj = req.body;
//     console.log(obj)
//     var sql = "UPDATE user set ?  where unum=?";
//     pool.query(sql, [obj, obj.unum], (err, result) => {
//         if (err) throw err;
//         // console.log(result)
//         if (result.affectedRows > 0) {
//             var sql2 = 'update user set rnum=urole';
//             pool.query(sql2, (err2,result2)=> {
//                 console.log("用户列表修改成功");
//             })
//             res.send({ code: 1, msg: "修改成功" })
//         } else {
//             res.send({ code: -1, msg: "修改失败" })
//         }
//     });

// });
// // 用户修改密码
// router.put("/updateUserPwd", (req, res) => {
//     console.log("用户修改密码请求。。。。。。。。。")
//     var obj = req.body;
//     var sql = "UPDATE user set upwd=md(?)  where unum=?";
//     pool.query(sql, [obj.newpwd1, obj.unum], (err, result) => {
//         if (err) throw err;
//         if (result.affectedRows > 0) {
//             console.log("用户密码修改成功");
//             res.send({ code: 1, msg: "修改成功" })
//         } else {
//             res.send({ code: -1, msg: "修改失败" })
//         }
//     })
// });
// // 删除指定用户信息
// router.delete("/deleteUser", (req, res) => {
//     console.log("删除指定用户信息..............")
//     var unum = req.query.unum;
//     var sql = "DELETE FROM `user` WHERE unum=?";
//     pool.query(sql, [unum], (err, result) => {
//         if (result.affectedRows > 0) {
//             console.log("指定用户删除成功");
//             res.send({ code: 1, msg: "用户删除成功" })
//         } else {
//             res.send({ code: -1, msg: "用户删除失败" })
//         }
//     })
// })
module.exports = router;