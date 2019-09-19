<template>
  <div class="update-userinfo">
    <div class="per">
      <div class="persional">
        <el-card class="box-card">
          <div slot="header" class="clearfix Perinfotitle">
            <span class="infoTitle">修改我的资料</span>
          </div>
          <div class="perinfo">
            <div class="infocol">
              <p class="col1">角色：</p>
              <el-input disabled class="roleinfo" placeholder="请输入内容"></el-input>
              <span class="tishi">当前角色不可更改为其它角色</span>
            </div>
            <div class="infocol">
              <p class="col1">账号：</p>
              <el-input class="roleinfo" placeholder="请输入内容"></el-input>
              <span class="tishi">不可修改。一般用于后台登入名</span>
            </div>
            <div class="infocol">
              <p class="col1">昵称：</p>
              <el-input class="roleinfo" placeholder="请输入内容"></el-input>
            </div>
            <div class="infocol">
              <p class="col1">性别：</p>
              <el-radio-group v-model="radio2">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </div>
            <div class="infocol">
              <p class="col1">头像：</p>
              <p class="imginfo">
                <!-- <el-upload
                  class="avatar-uploader"

                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                > -->
                  <img v-if="imageUrl" :src="imageUrl" accept="images/*"   @change="uploadAvatar" class="avatar" width="100%" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <!-- </el-upload> -->
              </p>
            </div>
            <div class="infocol">
              <p class="col1">手机：</p>
              <el-input class="roleinfo" placeholder="请输入内容"></el-input>
            </div>
            <div class="infocol">
              <p class="col1">邮箱：</p>
              <el-input class="roleinfo" placeholder="请输入内容"></el-input>
            </div>
            <div class="infocol">
              <p class="col1">备注：</p>
              <p class="col2">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="textarea2"
                ></el-input>
              </p>
            </div>
            <div class="infosub">
              <el-button type="info">重新填写</el-button>
              <el-button type="primary">信息提交</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio2: 1,
      fileList2: [
        {
          name: "food.jpeg",
          url: ""
        }
      ],
      textarea2: "",
      imageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
      uploadAvatar(avatar) {
      console.log(avatar.target.files[0]);
      let file = avatar.target.files[0];
      let data = new FormData();
      data.append("file", file, file.name); //很重要 data.append("file", file);不成功
      data.append("data", 112);  //向后台传递数据
      console.log(data.get("file"));
      this.axios.post("/img/file", data, {
        // headers: { "content-type": "multipart/form-data" }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
.update-userinfo .per {
  height: 100%;
  /* border: 1px solid rgb(202, 197, 197); */
  /* border-radius: 5px; */
  /* box-shadow: -6px -5px 8px rgb(196, 191, 191); */
}
.update-userinfo .per .Perinfotitle {
  text-align: left !important;
  padding: 8px 15px;
  color: rgba(51, 51, 51, 0.808) !important;
}
.update-userinfo .per .perinfo {
  text-align: left !important;
  margin-left: 30px;
}
.update-userinfo .per .perinfo .el-card{
border: 0;
}
.update-userinfo .per .perinfo .el-card.is-always-shadow:hover,.update-userinfo .per .perinfo .el-card.is-hover-shadow:focus,{
  box-shadow: none !important;
}
.update-userinfo .per .roleinfo {
  width: 250px !important;
  height: 40px !important;
}
.update-userinfo .per .roleinfo .el-textarea__inner {
  height: 40px !important;
}
.update-userinfo .per .infocol {
  margin-bottom: 15px;
}
.update-userinfo .per .infocol .col1 {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.update-userinfo .per .infocol .col2 {
  display: inline-block;
  width: 400px;
}
.update-userinfo .per .imginfo {
  height: 150px;
  display: inline-block;
  vertical-align: middle;
}
.update-userinfo .per .infosub {
  margin: 30px 0;
  width: 800px;
  text-align: center;
}
.update-userinfo .per .tishi {
  color: rgba(112, 101, 101, 0.911);
  padding-left: 10px;
}
.update-userinfo .per .persional .box-card .el-card__header {
  padding: 10px 10px !important;
  /* background-color: rgba(235, 219, 229, 0.733); */
  border-bottom: 1px solid rgba(184, 184, 184, 0.795) !important;
}

/* 图片上传框样式 */
.update-userinfo .per .imginfo .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.update-userinfo .per .imginfo .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.update-userinfo .per .imginfo .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  /* padding-top: -10px; */
}
.update-userinfo .per .imginfo .avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>