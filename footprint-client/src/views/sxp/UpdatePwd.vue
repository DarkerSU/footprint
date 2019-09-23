<template>
  <div class="up">
    <div class="updatepwd">
      <el-card class="box-card">
        <div slot="header" class="clearfix updatePwd">
          <span class="UPinfoTitle">修改密码</span>
        </div>
        <div class="UPinfo">
          <div class="pwdinfocol">
            <el-row :gutter="10">
              <el-col :span="6">
                <p class="pwd-t">当前密码：</p>
              </el-col>
              <el-col :span="6" class="pwd-input">
                <el-input
                  type="password"
                  class="oldpwd"
                  placeholder="请输入旧密码"
                  v-model="userpwd.oldpwd"
                ></el-input>
              </el-col>
              <el-col :span="12">
                <div class="updatePwd-tishi">
                   <span
                    class="ts"
                    :class="reg_userpwd.reg_oldpwd==1?'active el-icon-circle-close':''"
                  >密码不能为空</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="pwdinfocol">
            <el-row :gutter="10">
              <el-col :span="6">
                <p class="pwd-t">新密码：</p>
              </el-col>
              <el-col :span="6" class="pwd-input">
                <el-input
                  type="password"
                  class="newpwd1"
                  placeholder="请输入新密码"
                  v-model="userpwd.newpwd1"
                  @blur="updateNewpwd1"
                ></el-input>
              </el-col>
              <el-col :span="12">
                <div class="updatePwd-tishi">
                  <span class="ts" :class="reg_userpwd.reg_newpwd1==0?'active':''">长度为6-18位的字符串</span>
                  <span
                    class="ts"
                    :class="reg_userpwd.reg_newpwd1==1?'active el-icon-circle-close':''"
                  >密码不能为空</span>
                  <span
                    class="ts"
                    :class="reg_userpwd.reg_newpwd1==2?'active el-icon-circle-close':''"
                  >密码必须为6-18位的字符串</span>
                  <span
                    class="ts"
                    :class="reg_userpwd.reg_newpwd1==3?'active el-icon-circle-close':''"
                  >新密码必须与旧密码不能一致</span>
                  <span
                    class="ts"
                    :class="reg_userpwd.reg_newpwd1==4?'active el-icon-circle-check':''"
                  >密码格式正确</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="pwdinfocol">
            <el-row :gutter="10">
              <el-col :span="6">
                <p class="pwd-t">确认新密码：</p>
              </el-col>
              <el-col :span="6" class="pwd-input">
                <el-input
                  type="password"
                  class="newpwd1"
                  placeholder="再次确认新密码"
                  v-model="userpwd.newpwd2"
                  @blur="updateNewpwd2"
                ></el-input>
              </el-col>
              <el-col :span="12">
                <div class="updatePwd-tishi">
                  <span class="ts" :class="reg_userpwd.reg_newpwd2==0?'active':''">两次输入的密码必须保持一致</span>
                  <span
                    class="ts"
                    :class="reg_userpwd.reg_newpwd2==1?' el-icon-circle-close':''"
                  >密码不能为空</span>
                  <span
                    class="ts"
                    :class="reg_userpwd.reg_newpwd2==2?' el-icon-circle-close':''"
                  >两次输入的密码不一致</span>
                  <span class="ts" :class="reg_userpwd.reg_newpwd2==3?' el-icon-circle-check':''"></span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="pwdinfocol">
            <div class="UPinfosub">
              <el-button type="primary" @click="subPwd">提交修改</el-button>
              <el-button type="info">重新填写</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
var newpwdReg = /^[a-zA-Z0-9_-]{3,16}$/;
// 密码强度正则，以字母开头，长度在6-18之间，只能包含字符、数字和下划线
export default {
  data() {
    return {
      userpwd: {
        unum: "ss",
        oldpwd: "",
        newpwd1: "",
        newpwd2: ""
      },
      reg_userpwd: {
        reg_newpwd1: 0,
        reg_newpwd2: 0
      },
      BoolRegnewPwd:false,
    };
  },
  methods: {
    // 新密码正则验证
    updateNewpwd1() {
      if (this.userpwd.newpwd1 == "") {
        this.reg_userpwd.reg_newpwd1 = 1;
        this.BoolRegnewPwd=false;
      } else if (!newpwdReg.test(this.userpwd.newpwd1)) {
        this.reg_userpwd.reg_newpwd1 = 2;
        this.BoolRegnewPwd=false;
      } else if (this.userpwd.newpwd1 == this.userpwd.oldpwd) {
        this.reg_userpwd.reg_newpwd1 = 3;
        this.BoolRegnewPwd=false;
      } else {
        this.reg_userpwd.reg_newpwd1 = 4;
        this.BoolRegnewPwd=true;
      }
    },
    //再次确认密码正则验证
    updateNewpwd2() {
      if (this.userpwd.newpwd2 == "") {
        this.reg_userpwd.reg_newpwd2 = 1;
      } else if (this.userpwd.newpwd1 != this.userpwd.newpwd2) {
        this.reg_userpwd.reg_newpwd2 = 2;
      } else {
        this.reg_userpwd.reg_newpwd2 = 3;
      }
    },
    // 提交密码
    subPwd() {
      if (this.BoolRegnewPwd) {
        this.$confirm("此操作将永久修改密码，是否继续修改密码？", "提示", {
          confirmButtonText: "确定修改",
          cancelButtonText: "取消修改"
        })
          .then(() => {
            var data = this.userpwd;
            this.axios
              .put("/user/updateUserPwd", this.qs.stringify(data))
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({
                    message: "密码修改成功",
                    type: "success"
                  });
                } else {
                  this.$message.error("密码修改失败");
                }
              });
          })
          .catch(() => {
            this.$message("已取消修改");
          });
      }else{
        this.$alert("新密码与旧密码一致，请重新填写新密码", "提示", {
          confirmButtonText: "确定"
        });
      }
    }
  }
};
</script>

<style>
.up {
  height: 100%;
}
.updatePwd {
  text-align: left !important;
  padding: 8px 15px;
  color: rgba(51, 51, 51, 0.808) !important;
}
.updatePwd .el-card {
  border: none;
}

.updatepwd .box-card .el-card__header {
  padding: 10px 10px !important;
}
.UPinfoTitle {
  font-size: 18px;
}
.UPinfo {
  text-align: left !important;
}
.UPinfosub {
  margin: 30px 0;
  text-align: center;
}
.pwdinfocol {
  width: 100%;
  padding: 8px 0px;
}
.pwdinfocol .pwd-t {
  text-align: right;
  margin: 10px 0 5px 2px;
}
.pwdinfocol .pwd-input .el-input__inner {
  width: 100% !important;
}
.updatePwd-tishi {
  padding: 10px 0;
  color: #aaa;
  font-size:14px 

}
</style>