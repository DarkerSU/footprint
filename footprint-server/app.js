//使用express构建web服务器 --11:25
const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const login=require("./routes/login");
const user=require("./routes/user");
// const details=require("./routes/details");
// const products=require("./routes/products");
const img=require('./routes/img')
const search=require("./routes/search")
const cors=require("cors");
/*引入路由模块*/
var app = express();
app.listen(5000);
console.log("服务器正式启动.......")
// 配置session
app.use(session({
  secret:"128位字符串",  ///安全字符串
  resave:true,           //每次请求保存的数据
  saveUninitialized:true,    //保存初始化数据
}));

//添加cors中间件函数
//所有请求进入app.js时，先要经过cors函数
//统一为每个请求先修改响应头
app.use(cors({
  origin:["http://127.0.0.1:8080","http://localhost:8080","http://localhost:8081"],//不能用*
  credentials:true,
  
}));//从此所有响应，自动带Access-Control-Allow-Origin:http://127.0.0.1:5500
//万一客户端浏览器地址发生变化，只改这里origin一处即可！
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
//app.use(express.static('public'));


/*使用路由器来管理路由*/
app.use("/search",search);


app.use("/login",login);
app.use("/user",user);
app.use("/img",img);
// app.use("/details",details);
// app.use("/products",products);



