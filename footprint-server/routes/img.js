const express = require("express");
const session = require("express-session");
const multer = require('multer')
const fs = require('fs')
const router = express.Router();
const pool = require("../pool");

router.use(session({
    secret: "128位字符串",  ///安全字符串
    resave: true,           //每次请求保存的数据
    saveUninitialized: true,    //保存初始化数据
}));
// var upload = multer({ dest: '/public/img' }).any();
// router.post("/", upload, (req, res, next) => {
//     console.log("上传图片发送请求..........");
//     console.log(req.files);
//     var newname = req.files[0].path;

//     var obj = {
//         img: req.body.files,
//     };
//     console.log(obj);
// });

//multer文件的硬盘存储模式
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //先创建路径在保存
        // createFileDirectory(uploadPath);
        //指定文件保存路径
        cb(null, 'public/img/');
    },
    filename: function (req, file, cb) {
        console.log(file)
        // 将保存文件名设置为 时间戳 + 四位随机数，比如 151342376785-1223.jpg
        cb(null, Date.now() +'-'+ Math.floor(Math.random() * 9999) + '.' + file.originalname.split('.')[1]);
    }
})
var upload = multer({
    storage: storage
});

//文件上传测试
router.post('/file', upload.single('file'), function (req, res) {
    console.log("######################################")
    console.log("接收文件........")
    let avatar = req.file
    console.log(avatar)
    // console.log(avatar.path);
    var path=avatar.path.split('\\').splice(1).join('/');
    // console.log(path);
    // console.log(req.body)
    if (!avatar) {
        fs.unlink(avatar.path, (e) => {
            if (e) {
                console.log('文件操作失败')
                throw e;
            } else
                console.log('文件:' + avatar.path + '删除成功！');
        });
    }
    res.status(200).send({msg:'上传成功',data:path});
})

module.exports = router;