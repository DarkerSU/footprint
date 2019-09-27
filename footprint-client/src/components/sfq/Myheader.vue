<template>
  <div>
    <!-- logo  导航栏 -->
    <div
      class="header"
      :style="$store.getters.getThemeColor==0?'background-color: #202024;'
      :$store.getters.getThemeColor==1?'background-color: #d60a16;'
      :$store.getters.getThemeColor==2?'background-color: rgb(25, 143, 240);':''"
    >
      <div class="headerC">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="headerL">
              <img src="../../assets/img/sunfuqi/logo.png" />
              <p>足迹</p>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="headerM">
              <ul>
                <li>
                  <a href>足迹旅行家</a>
                </li>
                <li>
                  <a href>行摄资讯</a>
                </li>
                <li>
                  <a href>行摄攻略</a>
                </li>
                <li @click="fp70">
                  <span>庆祝70华诞</span>
                </li>
                <li>
                  <a href>我的足迹</a>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="headerR">
              <!-- <div class="headerR-search">
                <input type="text" placeholder="请输入关键词" />
                <img
                  class="head-search"
                  src="../../assets/img/sunfuqi/b39d74a95caae4e8b27fc020bb89d72.png"
                  alt
                />
              </div> -->
              <div class="headerR-text" v-if="!showname">
                <el-button type="text" @click="dialogFormVisible = true">登录</el-button>
                <el-button type="text" @click="dialogFormVisibleregister = true">注册</el-button>
              </div>
              <div class="headerR-text" v-if="showname">
                <div>
                  <el-avatar class="head-img" :src="imgURL+userlist.upic"></el-avatar>
                  <el-dropdown :hide-on-click="false">
                    <div class="el-dropdown-link">
                      欢迎您!{{userlist.uname}}
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <span @click="persionalm">个人中心</span>
                      </el-dropdown-item>
                      <el-dropdown-item>足迹管理</el-dropdown-item>
                      <el-dropdown-item>修改资料</el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="quit">退出</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 登录弹框 -->
    <el-dialog class="sfqlogin" title="登录" :visible.sync="dialogFormVisible" :before-close="reset">
      <el-row :gutter="10">
        <el-col :span="6">
          <p class="infocol1">账号：</p>
        </el-col>
        <el-col :span="18" class="userinfo-input">
          <el-input
            class="bgimg1"
            v-model="form.unum"
            autocomplete="off"
            @blur="blur"
            @focus="focus"
            placeholder="请输入您的账号"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="tishi1">
        <el-col :span="6">
          <p class="infocol1"></p>
        </el-col>
        <el-col :span="18" class="userinfo-input">
          <div class="infocol3">
            <!-- <span class="ts" :class="login_unum==0?'active':''">用户名需为3~16为字母或数字的组合</span> -->
            <span class="ts" :class="login_unum==1?'active el-icon-circle-close':''">用户名不能为空</span>
            <span class="ts" :class="login_unum==2?'active el-icon-circle-check':''">用户名合法</span>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6">
          <p class="infocol1">密码：</p>
        </el-col>
        <el-col :span="18" class="userinfo-input">
          <el-input
            type="password"
            class="bgimg2"
            v-model="form.upwd"
            autocomplete="off"
            @blur="bull"
            @focus="focuu"
            placeholder="请输入您的密码"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="tishi1">
        <el-col :span="6">
          <p class="infocol1"></p>
        </el-col>
        <el-col :span="18" class="userinfo-input">
          <div class="infocol3">
            <!-- <span class="ts" :class="login_upwd==0?'active':''">长度在6-18，只能包含字符、数字和下划线</span> -->
            <span class="ts" :class="login_upwd==1?'active el-icon-circle-close':''">密码不能为空</span>
            <span class="ts" :class="login_upwd==2?'active el-icon-circle-check':''">密码格式正确</span>
          </div>
        </el-col>
      </el-row>
      <div class="icon-btn">
        <!-- 自动登录 -->
        <el-checkbox>自动登录</el-checkbox>
        <!-- 忘记密码 -->
        <div>
          <el-link :underline="false" @click="forgetpwd">忘记密码?</el-link>
        </div>
      </div>
      <!-- 登录注册按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisibleregister=true,dialogFormVisible=false,form2.unum1='',
        form2.upwd1='',
        form2.upwd2='',
        form2.phone='',login_unum=-1,
        login_upwd=-1,
        reg_unum1=-1,
        reg_upwd1=-1,
        reg_phone=-1"
        >去注册</el-button>
        <el-button type="primary" @click="login" :disabled="login_unum==2&login_upwd==2?false:''">登录</el-button>
      </div>
    </el-dialog>
    <!-- 注册弹框 -->
    <el-dialog
      title="注册"
      :visible.sync="dialogFormVisibleregister"
      :before-close="reset"
      class="zxmregister"
    >
      <el-form>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input placeholder="请输入您的手机号码" v-model="form2.phone" @blur="blurp" @focus="focusp"></el-input>
          <div class="infocol3">
            <span class="ts" :class="reg_phone==0?'active':''">账号为手机号码</span>
            <span class="ts" :class="reg_phone==1?'active el-icon-circle-close':''">请输入正确的手机号码</span>
            <span class="ts" :class="reg_phone==2?'active el-icon-circle-check':''">手机号码格式正确</span>
          </div>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input
            v-model="form2.unum1"
            autocomplete="off"
            @blur="blurn"
            @focus="focusn"
            placeholder="请添加昵称"
          ></el-input>
          <div class="infocol3">
            <span class="ts" :class="reg_unum1==0?'active':''">昵称可为3~16为汉字、字母、数字的组合</span>
            <span class="ts" :class="reg_unum1==1?'active el-icon-circle-close':''">用户名不能为空</span>
            <span class="ts" :class="reg_unum1==2?'active el-icon-circle-check':''">用户名合法</span>
          </div>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form2.upwd1" autocomplete="off" @blur="bullm" @focus="focuum"></el-input>
          <div class="infocol3">
            <span class="ts" :class="reg_upwd1==0?'active':''">密码必须为6-18之间字符串，只能包含字符、数字和下划线</span>
            <span class="ts" :class="reg_upwd1==1?'active el-icon-circle-close':''">密码不能为空</span>
            <span class="ts" :class="reg_upwd1==2?'active el-icon-circle-check':''">密码格式正确</span>
          </div>
        </el-form-item>
        <el-form-item label="密码确认" :label-width="formLabelWidth">
          <el-input v-model="form2.upwd2" autocomplete="off" @blur="bagain" @focus="fagain"></el-input>
          <div class="infocol3">
            <span class="ts" :class="reg_upwd2==0?'active':''">请再次输入密码</span>
            <span class="ts" :class="reg_upwd2==1?'active el-icon-circle-close':''">密码与第一次不符</span>
            <span class="ts" :class="reg_upwd2==2?'active el-icon-circle-check':''">密码正确</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisibleregister=false,dialogFormVisible=true,form.unum='',
        form.upwd='',
        login_unum=-1,
        login_upwd=-1,
        reg_unum1=-1,
        reg_upwd1=-1,
        reg_upwd2=-1,
        reg_phone=-1"
        >去登录</el-button>
        <el-button
          type="primary"
          @click="register"
          :disabled="reg_unum1==2&reg_upwd1==2&reg_phone==2&reg_upwd2==2?false:''"
        >注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
var uPattern = /^[a-zA-Z0-9_-]{1,16}$/;
// 密码强度正则，以字母开头，长度在6-18之间，只能包含字符、数字和下划线
var pPattern = /^[a-zA-Z]\w{5,17}$/;
// 手机号正则验证表达式
var nPattern = /1[3-8]\d{9}/;

export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisibleregister: false,
      form: {
        unum: "",
        upwd: ""
      },
      form2: {
        unum1: "",
        upwd1: "",
        upwd2: "",
        phone: ""
      },
      login_unum: -1,
      login_upwd: -1,
      reg_unum1: -1,
      reg_upwd1: -1,
      reg_phone: -1,
      reg_upwd2: -1,
      formLabelWidth: "120px",
      showname: false,
      userlist: {
        uname: "",
        upic: ""
      }
      // username: '',
    };
  },
  methods: {
    fp70(){
      this.$router.push("/fp70")
    },
    /* 忘记密码 */
    forgetpwd(){
      this.$router.push('/forgetpwd')
    },
    reset(done) {
      this.clear();
      done();
    },
    quit() {
      // location.reload();
      sessionStorage.clear();
      this.showname = false;
      this.$router.push("/");
    },
    clear() {
      this.login_unum = -1;
      this.login_upwd = -1;
      this.reg_unum1 = -1;
      this.reg_upwd1 = -1;
      this.reg_phone = -1;
      this.reg_upwd2 = -1;
      this.form2.unum1 = "";
      this.form2.upwd1 = "";
      this.form2.upwd2 = "";
      this.form2.phone = "";
      this.form.unum = "";
      this.form.upwd = "";
    },

    persionalm() {
      this.$router.push("/personal");
    },
    // 登录ajax请求数据
    login() {
      this.axios
        .get("/login", {
          params: {
            unum: this.form.unum,
            upwd: this.form.upwd
          }
        })
        .then(res => {
          // 回调函数:接收服务器返回数据
          if (res.data.code == 1) {
            // 成功
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.showname = true;
            this.dialogFormVisible = false;
            this.clear();
            // console.log(res.data.data);
            sessionStorage.setItem(
              "UserInfo",
              JSON.stringify(res.data.data[0])
            );
            var userinfo = JSON.parse(sessionStorage.getItem("UserInfo"));
            this.userlist.uname = userinfo.uname;
            this.userlist.upic = userinfo.upic;
          } else {
            //失败 提示
            this.$message.error("用户名或密码错误");
          }
        });
    },
    // 注册-查询要插入的账号在数据库中是否存在
    register() {
      this.axios
        .get("/login/register", {
          params: {
            uname: this.form2.unum1,
            upwd: this.form2.upwd1,
            unum: this.form2.phone
          }
        })
        .then(res => {
          // 回调函数:接收服务器返回数据
          if (res.data.code == -2) {
            // 成功
            this.$message({
              message: "请输入用户账号"
            });
          } else if (res.data.code == 0) {
            this.$message({
              message: "账号已存在"
            });
          } else if (res.data.code == 1) {
            this.$message({
              message: "注册成功"
            });
            this.dialogFormVisibleregister = false;
            this.clear();
          } else {
            this.$message({
              message: "注册失败"
            });
          }
        });
    },
    //登录时用户名失去焦点时
    blur() {
      var name = this.form.unum;
      if (!name) {
        this.login_unum = 1;
      } else if (!uPattern.test(name)) {
        this.login_unum = 0;
      } else if (uPattern.test(name)) {
        this.nameTxt = "用户名合法";
        this.login_unum = 2;
      }
    },
    focus() {
      var name = this.form.unum;
      if (!uPattern.test(name)) {
        this.login_unum = 0;
      } else if (uPattern.test(name)) {
        this.login_unum = 2;
      }
    },
    // 登录密码失去焦点时
    bull() {
      var upwd = this.form.upwd;
      if (!upwd) {
        this.login_upwd = 1;
      } else {
        this.login_upwd = 2;
      }
    },
    // 登录密码获得焦点时
    focuu() {
      var upwd = this.form.upwd;
      if (!pPattern.test(upwd)) {
        this.login_upwd = 0;
      } else {
        this.login_upwd = 2;
      }
    },
    blurp() {
      var phone = this.form2.phone;
      if (!phone) {
        this.reg_phone = 0;
      } else if (!nPattern.test(phone)) {
        this.reg_phone = 1;
      } else if (nPattern.test(phone)) {
        this.reg_phone = 2;
      }
    },
    // 注册时手机号获取焦点时
    focusp() {
      var phone = this.form2.phone;
      if (!phone) {
        this.reg_phone = 0;
      } else if (!nPattern.test(phone)) {
        this.reg_phone = 1;
      } else if (nPattern.test(phone)) {
        this.reg_phone = 2;
      }
    },
    // 注册时昵称获得焦点时
    focusn() {
      var name1 = this.form2.unum1;
      if (!uPattern.test(name1)) {
        this.reg_unum1 = 0;
      } else if (uPattern.test(name1)) {
        this.reg_unum1 = 2;
      }
    },
    // 注册时昵称失去焦点时
    blurn() {
      var name1 = this.form2.unum1;
      if (!name1) {
        this.reg_unum1 = 1;
      } else if (!uPattern.test(name1)) {
        this.reg_unum1 = 0;
      } else if (uPattern.test(name1)) {
        this.reg_unum1 = 2;
      }
    },
    // 注册时密码失去焦点时
    bullm() {
      var upwd1 = this.form2.upwd1;
      if (!upwd1) {
        this.reg_upwd1 = 1;
      } else if (!pPattern.test(upwd1)) {
        this.reg_upwd1 = 0;
      } else {
        this.reg_upwd1 = 2;
      }
    },
    // 注册时密码获得焦点时
    focuum() {
      var upwd1 = this.form2.upwd1;
      if (!pPattern.test(upwd1)) {
        this.reg_upwd1 = 0;
      } else {
        this.reg_upwd1 = 2;
      }
    },
    // 二次确认密码失去焦点时
    bagain() {
      var upwd2 = this.form2.upwd2;
      if (!upwd2) {
        this.reg_upwd2 = 1;
      } else if (this.form2.upwd2 == this.form2.upwd1) {
        this.reg_upwd2 = 2;
      } else {
        this.reg_upwd2 = 1;
      }
    },
    // 二次确认密码获得焦点时
    fagain() {
      var upwd1 = this.form2.upwd1;
      if (!pPattern.test(upwd1)) {
        this.reg_upwd1 = 0;
      } else {
        this.reg_upwd1 = 2;
      }
    }
  },
  created() {
    var userinfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    if (userinfo) {
      this.userlist.uname = userinfo.uname;
      if (this.userlist.uname) {
        this.showname = true;
      } else {
        this.showname = false;
      }
    }
  }
};
</script>

<style>
.ts {
  display: none;
}

.ts.active {
  display: block;
}

.header .headerC .headerL img {
  width: 60px;
  height: 60px;
  vertical-align: top;
}

.header {
  width: 100%;
  height: 80px;
  background-color: #202024;
}

.header .headerC {
  margin: 0 60px;
}

.header .headerC .headerL {
  width: 200px;
  height: 60px;
  padding: 10px;
  float: left;
  clear: both;
}

.header .headerC .headerL p {
  font: 50px "楷体";
  margin: 0 0 0 15px;
  padding: 3px 0;
  display: inline-block;
  color: #fff;
}

.header .headerC .headerM {
  text-align: center;
  padding: 30px 10px;
}

.header .headerC .headerM ul {
  margin: 0;
  list-style: none;
}

.header .headerC .headerM ul li {
  margin: 0;
  padding: 0 20px;
  display: inline-block;
  color: rgb(255, 0, 0);
}
.header .headerC .headerM ul li:hover{
  transform: rotate(360deg);
  transition: All 0.5s ease-in-out;
}

.header .headerC .headerM li a {
  color: #fff;
  text-decoration: none;
}
.header .headerC .headerM li span{
  font-size:20px; 
}

.header .headerC .headerR {
  /* display: flex;
  justify-content: space-between; */
  text-align: right;
  padding: 20px 2px;
}

.header .headerC .headerR .headerR-text .el-dropdown-link {
  color: white;
  padding-left: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.header .headerC .headerR .headerR-text .head-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
}

.headerR-search {
  width: 50%;
  border-bottom: 1px solid #fff;
  padding: 0 10px;
}

.headerR-text button {
  font-size: 15px;
  border: 1px solid #fff;
  margin-top: 5px;
  padding: 6px 10px;
  vertical-align: bottom;
}

.header .headerC .headerR input {
  width: 80%;
  height: 30px;
  border: 0;
  outline: 0;
  background-color: transparent;
  color: #fff;
}

.header .headerC .headerR input::-webkit-input-placeholder {
  color: #fff;
  font-size: 12px;
}

.header .headerC .headerR .head-search {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.header .headerC .headerR .el-button--text {
  color: #fff !important;
}

.el-input__inner {
  width: 70% !important;
  height: 35px !important;
}

/* .el-dialog {
  width: 27% !important;
} */

.unull {
  color: red;
}

.el-icon-circle-close {
  color: red;
}

.el-icon-circle-check {
  color: #42da10;
}

.sfqlogin .icon-btn {
  display: flex;
  justify-content: space-between;
  padding: 0 110px 0 117px;
}

.bgimg1 .el-input__inner {
  /* width: 100% !important; */
  background-image: url(../../assets/img/zxm/unum.png) !important;
  background-repeat: no-repeat;
  background-size: 22px;
  background-position: 207px 5px;
}

.bgimg2 .el-input__inner {
  /* width: 100% !important; */
  background-image: url(../../assets/img/zxm/upwd.png) !important;
  background-repeat: no-repeat;
  background-size: 37px;
  background-position: 201px -4px;
}
.sfqlogin .el-dialog {
  width: 500px !important;
}
.sfqlogin .el-dialog__header {
  border-bottom: 1px solid #e5e5e5;
}
.sfqlogin .infocol1 {
  margin: 0;
  padding: 9px 0;
  text-align: right;
}
.sfqlogin .infocol3 {
  min-height: 17px;
  margin-bottom: 5px;
}
.sfqlogin .el-row {
  margin: 5px;
}
.sfqlogin .el-dialog__footer {
  text-align: center;
}
.sfqlogin .dialog-footer .el-button {
  margin: 0 35px;
}
.zxmregister .el-dialog__header {
  border-bottom: 1px solid #e5e5e5;
}
.zxmregister .infocol3 {
  min-height: 17px;
  margin: 5px;
}
.zxmregister .el-form-item {
  margin-bottom: 8px;
}
.zxmregister .el-form-item__content {
  line-height: 17px;
}
.zxmregister .el-dialog__footer {
  text-align: center;
}
.zxmregister .el-button {
  margin: 0 40px;
}
</style>