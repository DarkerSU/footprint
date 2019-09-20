<template>
  <div class="pic-up">
    <el-upload
      class="pic-upload"
      action="http://127.0.0.1:5000/img/file"
      :show-file-list="false"
      :before-upload="uploadbefore"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handlesuccess"
      :on-error="handleerror"
      :on-progress="handleprogress"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- <el-upload
    class="pic-upload"
      action="http://127.0.0.1:5000/img/file"
      list-type="picture-card"
      :show-file-list="true"
      :before-upload="uploadbefore"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handlesuccess"
      :on-error="handleerror"
      :on-progress="handleprogress"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog class="bigpicshow" :visible.sync="dialogVisible" size="tiny">
      <img width="100%" height="100%" :src="dialogImageUrl" alt />
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ""
      // dialogImageUrl: "",
      // dialogVisible: false
    };
  },
  methods: {
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
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogImageUrl = file.url;
      // console.log(this.dialogImageUrl);
      this.dialogVisible = true;
    },
    // 上传成功函数
    handlesuccess(response, file, fileList) {
      console.log(response);
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(file);
      console.log(fileList[0]);
    },
    // 上传错误函数
    handleerror(err, file, fileList) {
      console.log(err);
    },
    // 文件上传时的钩子函数，
    handleprogress(event, file, fileList) {
      // console.log(event.target);
      // console.log(file);
      // console.log(fileList[0]);
    }
  },
  created() {
    this.imgurl = this.imgURL;
  }
};
</script>

<style>
/* .pic-upload {
  width: 100%;
  height: 100%;
}
.pic-up .bigpicshow .el-dialog {
  margin-top: 70px;
  width: 80% !important;
  height: 70%;
} */
.pic-up .pic-upload {
  border:1px solid rgba(182, 179, 179, 0.918);
  border-radius: 6px;
}
.pic-up .pic-upload .avatar-uploader .el-upload {
  border: 1px dashed #afacac;
  border-radius: 6px;
  cursor: pointer;
  height: 100%;
  position: relative;
  overflow: hidden;
  width: 100%;
}
.pic-up .pic-upload .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.pic-up .pic-upload .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.pic-up .pic-upload .avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
