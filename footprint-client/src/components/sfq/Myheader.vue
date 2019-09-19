<template>
  <div>
    <div class="header" :style="$store.getters.getThemeColor==0?'background-color: #202024;'
      :$store.getters.getThemeColor==1?'background-color: #d60a16;'
      :$store.getters.getThemeColor==2?'background-color: rgb(25, 143, 240);':''">
      <div class="headerC">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="headerL">
              <img src="../../assets/img/sunfuqi/zuji.png" />
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
                <li>
                  <a href>行摄最美中国</a>
                </li>
                <li>
                  <a href>我的足迹</a>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="headerR">
              <div class="headerR-search">
                <input type="text" placeholder="请输入关键词" />
                <img class="head-search" src="../../assets/img/sunfuqi/b39d74a95caae4e8b27fc020bb89d72.png" alt />
              </div>
              <div class="headerR-text" v-if="!showname">
                <el-button type="text" @click="dialogFormVisible = true">登录</el-button>
                <el-button type="text" @click="dialogFormVisibleregister = true">注册</el-button>
              </div>
              <div class="headerR-text" v-if="showname">
                <div>
                  <el-avatar class="head-img" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" >
                  </el-avatar>
                  <!-- <span class="head-unum">欢迎{{form.unum}}!</span> -->
                  <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link" >
                        欢迎{{form.unum}}!<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><span @click="persionalm">个人中心</span> </el-dropdown-item>
                      <el-dropdown-item>足迹管理</el-dropdown-item>
                      <el-dropdown-item>修改资料</el-dropdown-item>
                      <el-dropdown-item>退出</el-dropdown-item>
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
    <el-dialog title="登录" :visible.sync="dialogFormVisible">
      <el-form>
        <!-- 账号 -->
        <el-form-item label="账号" :label-width="formLabelWidth">
          <!-- 账号输入框 -->
          <el-input class="bgimg1" v-model="form.unum" autocomplete="off" @blur="blur" @focus="focus"
            placeholder="请输入您的账号"></el-input>
          <!-- 账号输入框下方内容 -->
          <span
            :class="unum_icon===0?'unull':unum_icon==1?'el-icon-circle-close':'el-icon-circle-check'">{{nameTxt}}</span>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" :label-width="formLabelWidth">
          <!-- 密码输入框 -->
          <el-input class="bgimg2" v-model="form.upwd" autocomplete="off" @blur="bull" @focus="focuu"
            placeholder="请输入您的密码">
            <!-- <div><img src="../../assets/img/zxm/upwd.png" alt=""></div> -->
          </el-input>
          <!-- 密码输入框下方内容 -->
          <span
            :class="upwd_icon===0?'unull':upwd_icon==1?'el-icon-circle-close':'el-icon-circle-check'">{{upwdTxt}}</span>
        </el-form-item>
      </el-form>
      <div class="icon-btn">
        <!-- 自动登录 -->
        <!-- `checked` 为 true 或 false -->
        <el-checkbox>自动登录</el-checkbox>
        <!-- 忘记密码 -->
        <div>
          <el-link :underline="false">忘记密码</el-link>
        </div>
      </div>
      <!-- 登录注册按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleregister=true,dialogFormVisible=false">去注册</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </el-dialog>
    <!-- 注册弹框 -->
    <el-dialog title="注册" :visible.sync="dialogFormVisibleregister">
      <el-form>
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.unum" autocomplete="off" @blur="blur" @focus="focus"></el-input>
          <span>{{nameTxt}}</span>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="form.upwd" autocomplete="off" @blur="bull" @focus="focuu"></el-input>
          <span>{{upwdTxt}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleregister=false,dialogFormVisible=true">去登录</el-button>
        <el-button type="primary" @click="login">注册</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  var uPattern = /^[a-zA-Z0-9_-]{3,16}$/;
  // 密码强度正则，以字母开头，长度在6-18之间，只能包含字符、数字和下划线
  var pPattern = /^[a-zA-Z]\w{5,17}$/;

  export default {
    data() {
      return {
        dialogFormVisible: false,
        dialogFormVisibleregister: false,
        form: {
          unum: "",
          upwd: ""
        },
        nameTxt: "",
        upwdTxt: "",
        formLabelWidth: "120px",
        showname: false,
        unum_icon: 0,
        upwd_icon: 0,
      };
    },
    methods: {
      persionalm(){
        console.log("11111111");
        // this.$router.push("/home");
        this.$router.push("/personal");
      },
      // ajax请求数据
      login() {
        this.axios.get("/login", {
          params: {
            unum: this.form.unum,
            upwd: this.form.upwd
          }
        }).then(res => {
          // 回调函数:接收服务器返回数据
          if (res.data.code == 1) {
            // 成功 
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.showname = true;
            this.dialogFormVisible = false;
          } else {
            //失败 提示
            this.$message.error("用户名或密码错误")
          }
        })
      },
      blur() {
        var name = this.form.unum;
        if (!name) {
          this.nameTxt = "用户名不能为空";
          this.unum_icon = 1;
        } else if (!uPattern.test(name)) {
          this.nameTxt = "用户名需为3~16为字母或数字的组合";
          this.unum_icon = 1;
        } else if (uPattern.test(name)) {
          this.nameTxt = "用户名合法";
          this.unum_icon = 2;
        } else {
          this.unum_icon = 1;
        }
      },
      focus() {
        var name = this.form.unum;
        if (!uPattern.test(name)) {
          this.nameTxt = "用户名需为3~16为字母或数字的组合";
          this.unum_icon = 1;
        } else if (uPattern.test(name)) {
          this.nameTxt = "用户名合法";
          this.unum_icon = 2;
        } else {
          this.unum_icon = 1;
        }
      },
      bull() {
        var upwd = this.form.upwd;
        if (!upwd) {
          this.upwdTxt = "密码不能为空";
          this.upwd_icon = 1;
        } else if (!pPattern.test(upwd)) {
          this.upwdTxt = "以字母开头，长度在6-18之间，只能包含字符、数字和下划线";
          this.upwd_icon = 1;
        } else {
          this.upwdTxt = "密码正确";
          this.upwd_icon = 2;
        }
      },
      focuu() {
        var upwd = this.form.upwd;
        if (!pPattern.test(upwd)) {
          this.upwdTxt = "以字母开头，长度在6-18之间，只能包含字符、数字和下划线";
          this.upwd_icon = 1;
        } else {
          this.upwdTxt = "密码正确";
          this.upwd_icon = 2;
        }
      },
    },
  }
</script>

<style>
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
    padding: 30px 10px;
  }

  .header .headerC .headerM ul {
    /* display: flex; */
    margin: 0;
    list-style: none;
  }

  .header .headerC .headerM ul li {
    margin: 0;
    padding: 0 20px;
    display: inline-block;
  }

  .header .headerC .headerM li a {
    color: #fff;
    text-decoration: none;
  }

  .header .headerC .headerR {
    display: flex;
    justify-content: space-between;
    padding: 20px 2px;
  }

  .header .headerC .headerR .headerR-text .el-dropdown-link {
    color: white;
    padding-left: 10px
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
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
    /* border-radius: 25px; */
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
    /* float: right; */
    /* margin: -60px 100px 0 0 !important; */
  }

  .el-input__inner {
    width: 70% !important;
    height: 35px !important;
  }

  .el-dialog {
    width: 27% !important;
  }

  .unull {
    color: red;
  }

  .el-icon-circle-close {
    color: red;
  }

  .el-icon-circle-check {
    color: #42da10;
  }

  .dialog-footer {
    margin: 0 auto;
    width: 164px;
  }

  .icon-btn {
    display: flex;
    padding: 0 80px;
  }

  .el-link--inner {
    margin-left: 150px
  }

  .bgimg1 .el-input__inner {
    background-image: url(../../assets/img/zxm/unum.png) !important;
    background-repeat: no-repeat;
    background-size: 22px;
    background-position: 220px 5px
  }

  .bgimg2 .el-input__inner {
    background-image: url(../../assets/img/zxm/upwd.png) !important;
    background-repeat: no-repeat;
    background-size: 37px;
    background-position: 213px -4px
  }
</style>