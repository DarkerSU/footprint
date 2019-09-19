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
              <el-col :span="4">
                <p class="pwd-t">当前密码：</p>
              </el-col>
              <el-col :span="8" class="pwd-input">
                <el-input class="oldpwd" placeholder="请输入内容"></el-input>
              </el-col>
              <el-col :span="12">
                <div class></div>
              </el-col>
            </el-row>
          </div>
          <div class="pwdinfocol">
            <el-row :gutter="10">
              <el-col :span="4">
                <p class="pwd-t">新密码：</p>
              </el-col>
              <el-col :span="8" class="pwd-input">
                <el-input class="newpwd1" placeholder="请输入内容"></el-input>
              </el-col>
              <el-col :span="12">
                <div class>
                  <p class="pwdtishi">6-16位字符</p>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="pwdinfocol">
            <el-row :gutter="10">
              <el-col :span="4">
                <p class="pwd-t">确认密码：</p>
              </el-col>
              <el-col :span="8" class="pwd-input">
                <el-input class placeholder="请输入内容"></el-input>
              </el-col>
              <el-col :span="12">
                <div class></div>
              </el-col>
            </el-row>
          </div>
          <div class="UPinfosub">
            <el-button type="primary">信息提交</el-button>
            <el-button type="info">重新填写</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.up {
  height: 100%;
  /* border: 1px solid rgb(202, 197, 197);
    border-radius:5px; 
    box-shadow: -6px -5px 8px rgb(196, 191, 191); */
}
.updatePwd {
  text-align: left !important;
  padding: 8px 15px;
  color: rgba(51, 51, 51, 0.808) !important;
}
.updatePwd .el-card{
  border: none;
}
/* .up .updatePwd .el-card.is-always-shadow:hover{
  box-shadow: none; 
} */
.updatepwd .box-card .el-card__header {
  padding: 10px 10px !important;
  /* background-color: rgba(162, 201, 130, 0.527); */
  /* border-bottom: 1px solid rgba(69, 208, 233, 0.795) !important; */
}
.UPinfoTitle {
  /* color: rgb(255, 13, 13); */
  font-size: 18px;
}
.UPinfo {
  text-align: left !important;
  /* margin-left: 50px; */
}
.UPinfosub {
  margin: 30px 0;
  width: 520px;
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
.pwdinfocol .pwdtishi {
  margin: 10px 0 5px 2px;
  font-size: 14px;
}
</style>