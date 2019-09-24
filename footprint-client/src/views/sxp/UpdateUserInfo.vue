<template>
  <div class="update-userinfo">
    <div class="per">
      <div class="persional">
        <el-card class="box-card">
          <div slot="header" class="clearfix Perinfotitle">
            <span class="infoTitle">修改我的资料</span>
          </div>
          <div class="perinfo">
            <!-- 用户信息表 -->
            <!-- 角色 -->
            <div class="infocol">
              <el-row :gutter="10">
                <el-col :span="4">
                  <p class="infocol1">角色：</p>
                </el-col>
                <el-col :span="6" class="userinfo-input">
                  <el-input
                    disabled
                    class="userrole"
                    placeholder="请输入内容"
                    :value="sessionUseriInfo.urole"
                  ></el-input>
                </el-col>
                <el-col :span="14">
                  <div class="infocol3">
                    <span class="tishi">当前角色不可更改为其它角色</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 账号 -->
            <div class="infocol">
              <el-row :gutter="10">
                <el-col :span="4">
                  <p class="infocol1">账号：</p>
                </el-col>
                <el-col :span="6" class="userinfo-input">
                  <el-input disabled class="usernumber" placeholder :value="sessionUseriInfo.unum"></el-input>
                </el-col>
                <el-col :span="13">
                  <div class="infocol3">
                    <span class="tishi">不可修改。一般用于后台登入名</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 昵称 -->
            <div class="infocol">
              <el-row :gutter="10">
                <el-col :span="4">
                  <p class="infocol1">昵称：</p>
                </el-col>
                <el-col :span="6" class="userinfo-input">
                  <el-input class="username" placeholder v-model="userlist.uname" @blur="reguname"></el-input>
                </el-col>
                <el-col :span="14">
                  <div class="infocol3">
                    <span class="ts" :class="reg_userinfo.reg_uname==0?'active':''"></span>
                    <span
                      class="ts"
                      :class="reg_userinfo.reg_uname==1?'active el-icon-circle-close':''"
                    >该昵称已存在，请换个昵称</span>
                    <span
                      class="ts"
                      :class="reg_userinfo.reg_uname==2?'active el-icon-circle-check':''"
                    >昵称可用</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 性别 -->
            <div class="infocol">
              <el-row :gutter="10">
                <el-col :span="4">
                  <p class="infocol1">性别：</p>
                </el-col>
                <el-col :span="6" class="userinfo-input">
                  <el-radio-group v-model="userlist.ugender">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                  </el-radio-group>
                </el-col>
                <el-col :span="14">
                  <div class="infocol3"></div>
                </el-col>
              </el-row>
            </div>
            <!-- 上传头像 -->
            <div class="infocol">
              <el-row :gutter="10">
                <el-col :span="4">
                  <p class="infocol1-pic">上传头像：</p>
                </el-col>
                <el-col :span="6" class="userinfo-input">
                  <div class="picinfo">
                    <el-upload
                      class="pic-upload"
                      :action="imgUpload"
                      :show-file-list="false"
                      :before-upload="uploadbefore"
                      :on-remove="handleRemove"
                      :on-success="handlesuccess"
                      :on-error="handleerror"
                      :on-progress="handleprogress"
                    >
                      <img v-if="userlist.upic" :src="userlist.upic" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="infocol3"></div>
                </el-col>
              </el-row>
            </div>
            <!-- 手机号码 -->
            <div class="infocol">
              <el-row :gutter="10">
                <el-col :span="4">
                  <p class="infocol1">手机：</p>
                </el-col>
                <el-col :span="6" class="userinfo-input">
                  <el-input
                    class="userphone"
                    placeholder="请输入电话号码"
                    v-model="userlist.uphone"
                    @input="reguphone"
                  ></el-input>
                </el-col>
                <el-col :span="14">
                  <div class="infocol3">
                    <span class="ts" :class="reg_userinfo.reg_phone==0?'active':''">请输入您的手机号码</span>
                    <span
                      class="ts"
                      :class="reg_userinfo.reg_phone==1?'active el-icon-circle-close':''"
                    >请输入正确的手机号码</span>
                    <span
                      class="ts"
                      :class="reg_userinfo.reg_phone==2?'active el-icon-circle-check':''"
                    >手机号码格式正确</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 邮箱 -->
            <div class="infocol">
              <el-row :gutter="10">
                <el-col :span="4">
                  <p class="infocol1">邮箱：</p>
                </el-col>
                <el-col :span="6" class="userinfo-input">
                  <el-input
                    class="useremail"
                    placeholder="请输入邮箱"
                    v-model="userlist.uEmail"
                    @input="reguemail"
                  ></el-input>
                </el-col>
                <el-col :span="14">
                  <div class="infocol3">
                    <span class="ts" :class="reg_userinfo.reg_email==0?'active':''">请输入您的常用邮箱</span>
                    <span
                      class="ts"
                      :class="reg_userinfo.reg_email==1?'active el-icon-circle-close':''"
                    >请输入正确的邮箱号码</span>
                    <span
                      class="ts"
                      :class="reg_userinfo.reg_email==2?'active el-icon-circle-check':''"
                    >邮箱可用</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 备注 -->
            <div class="infocol">
              <el-row :gutter="10">
                <el-col :span="4">
                  <p class="infocol1">备注：</p>
                </el-col>
                <el-col :span="6" class="userinfo-input">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="userlist.utext"
                  ></el-input>
                </el-col>
                <el-col :span="14">
                  <div class></div>
                </el-col>
              </el-row>
            </div>
            <div class="infosub">
              <el-button type="info" @click="clearfrom">重新填写</el-button>
              <el-button type="primary" @click="upsubmit">信息提交</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
// 手机号正则表达式
var nPattern = /1[3-8]\d{9}/;
var regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
import ImgUpload from "./ImgUpload2Pic";
export default {
  data() {
    return {
      sessionUseriInfo: {
        unum: "",
        urole: "普通用户"
      },
      userlist: {
        uname: "",
        ugender: 2,
        uphone: "",
        uEmail: "",
        utext: "",
        upic: ""
      },
      reg_userinfo: {
        reg_uname: 0,
        reg_unamebool: false,
        reg_phone: 0,
        reg_phonebool: false,
        reg_email: 0,
        reg_emailbool: false
      }
    };
  },
  components: {
    imgupload: ImgUpload
  },
  methods: {
    // 清空填写的数据
    clearfrom() {
      this.userlist.uname = "";
      this.userlist.ugender = 2;
      this.userlist.uphone = "";
      this.userlist.uEmail = "";
      this.userlist.textarea = "";
    },
    // 提交用户修改数据
    upsubmit() {
      if (!this.reg_userinfo.reg_unamebool) {
        this.$alert("用户名已存在", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.reg_userinfo.reg_phonebool) {
        this.$alert("电话号码不合法", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.reg_userinfo.reg_emailbool) {
        this.$alert("邮箱账号不合法", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        var data1 = this.sessionUseriInfo.unum; //获取当前需要修改的账号
        var data = this.userlist; //获取修改的用户信息
        data.unum = data1;
        this.axios
          .post("/user/updateuserinfo", this.qs.stringify(data))
          .then(res => {
            // console.log(res);
            if (res.data.code === 1) {
              this.$message({
                message: "个人信息修改成功",
                type: "success"
              });
            } else {
              this.$message.error("个人信息修改失败");
            }
          });
      }
    },

    // 用户名查重验证
    reguname() {
      if (!this.userlist.uname) {
        this.reg_uname = 0;
      } else {
        this.axios
          .get("/user/unamReg", {
            params: {
              uname: this.userlist.uname
            }
          })
          .then(res => {
            // console.log(res.data);
            if (res.data.code == 1) {
              this.reg_userinfo.reg_uname = 1;
              this.reg_userinfo.reg_unamebool = false;
            } else if (res.data.code == -1) {
              this.reg_userinfo.reg_uname = 2;
              this.reg_userinfo.reg_unamebool = true;
            } else {
              this.reg_userinfo.reg_uname = 0;
              this.reg_userinfo.reg_unamebool = false;
            }
          });
      }
      // console.log(this.userlist.uname);
    },
    // 电话号码正则验证
    reguphone() {
      // console.log(nPattern.test(this.userlist.uphone));
      if (!this.userlist.uphone) {
        this.reg_userinfo.reg_phone = 0;
        this.reg_userinfo.reg_phonebool = false;
      } else if (!nPattern.test(this.userlist.uphone)) {
        this.reg_userinfo.reg_phone = 1;
        this.reg_userinfo.reg_phonebool = false;
      } else if (nPattern.test(this.userlist.uphone)) {
        this.reg_userinfo.reg_phone = 2;
        this.reg_userinfo.reg_phonebool = true;
      }
    },
    // 邮箱正则验证
    reguemail() {
      // console.log(nPattern.test(this.userlist.uphone));
      if (!this.userlist.uEmail) {
        this.reg_userinfo.reg_email = 0;
        this.reg_userinfo.reg_emailbool = false;
      } else if (!regEmail.test(this.userlist.uEmail)) {
        this.reg_userinfo.reg_email = 1;
        this.reg_userinfo.reg_emailbool = false;
      } else if (regEmail.test(this.userlist.uEmail)) {
        this.reg_userinfo.reg_email = 2;
        this.reg_userinfo.reg_emailbool = true;
      }
    },
    // 上传之前的函数，用于对文件做限制
    uploadbefore(file) {
      // 对文件大小格式等做限制
      if (file.size > 120400) {
        console.log("图片大小不得超过10M");
        this.$message.error("图片大小不得超过1M");
        return false;
      } else {
        this.$message({
          message: "上传成功",
          type: "success"
        });
      }
    },
    //删除函数
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    // 上传成功函数
    handlesuccess(response, file, fileList) {
      console.log(response);
      // console.log(file)
      this.userlist.upic = this.imgURL + response.data;
      console.log(this.userlist);
      // console.log(file);
      // console.log(fileList);
    },
    // 上传错误函数
    handleerror(err, file, fileList) {
      console.log(err);
    },
    // 文件上传时的钩子函数，
    handleprogress(event, file, fileList) {},
    // 获取用户登录的信息
    getUserInfo() {
      // sessionUseriInfo
      var userinfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      this.sessionUseriInfo.unum = userinfo.unum;
      if(userinfo.urole==0){
        this.sessionUseriInfo.urole="普通用户"
      }else if(userinfo.urole==1){
        this.sessionUseriInfo.urole="VIP用户"
      }else if(userinfo.urole==2){
        this.sessionUseriInfo.urole="管理员"
      }else if(userinfo.urole==3){
        this.sessionUseriInfo.urole="高级管理员"
      }
      this.userlist.uname=userinfo.uname
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style>
.update-userinfo .per {
  height: 100%;
}
.update-userinfo .per .Perinfotitle {
  text-align: left !important;
  padding: 8px 15px;
  color: rgba(51, 51, 51, 0.808) !important;
}
.update-userinfo .per .infocol .userinfo-input .el-input .el-input__inner {
  width: 100% !important;
}
.update-userinfo
  .per
  .infocol
  .userinfo-input
  .el-textarea
  .el-textarea__inner {
  width: 100% !important;
  height: 80px !important;
}
.update-userinfo .per .infocol .infocol1 {
  margin: 0;
  padding: 10px 0;
  text-align: right;
}
.update-userinfo .per .infocol .infocol1-pic {
  margin: 0;
  padding: 65px 0;
  text-align: right;
}
.update-userinfo .per .infocol .infocol3 {
  padding: 10px 0;
}
.update-userinfo .per .infosub {
  margin: 30px 0;
  text-align: center;
}
.update-userinfo .per .tishi {
  color: rgba(112, 101, 101, 0.911);
}
.update-userinfo .per .persional .box-card .el-card__header {
  padding: 10px 10px !important;
}
.update-userinfo .per .persional .box-card .el-card__body {
  padding: 10px;
}
/* 图片上传框样式 */
.picinfo .pic-upload {
  border: 1px solid rgba(182, 179, 179, 0.918);
  border-radius: 6px;
  width: 152px;
  height: 152px;
}
.picinfo .pic-upload .el-upload {
  width: 100% !important;
  height: 100% !important;
  border-radius: 6px;
}
.picinfo .pic-upload .el-upload .avatar {
  width: 100% !important;
  height: 100% !important;
  border-radius: 6px;
}
.update-userinfo .per .picinfo .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.persional .infocol {
  margin: 15px 0;
}

.infocol3 > .el-icon-circle-close {
  color: red;
}
.infocol3 > el-icon-circle-check {
  color: rgb(98, 252, 9);
}
</style>