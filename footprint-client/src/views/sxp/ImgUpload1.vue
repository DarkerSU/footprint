<template>
  <div class="img-up">
    <el-upload
    class="img-upload"
      action="http://127.0.0.1:5000/img/file"
      list-type="picture-card"
      :before-upload="uploadbefore"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handlesuccess"
      :on-error="handleerror"
      :on-progress="handleprogress"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog class="bigimgshow" :visible.sync="dialogVisible" size="tiny">
      <img width="100%" height="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
    imgurl:'',
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    // 上传之前的函数，用于对文件做限制
    uploadbefore(file){
      // 对文件大小格式等做限制
      if(file.size>120400){
        console.log("图片大小不得超过10M")
        this.$message.error("图片大小不得超过1M")
        return false;
      }else{
        this.$message({
          message: '上传成功',
          type: 'success'
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
    handlesuccess(response, file, fileList){
        console.log(response);
        // console.log(file);
        console.log(fileList[0]); 
    },
    // 上传错误函数
    handleerror(err, file, fileList){
        console.log(err)
    },
    // 文件上传时的钩子函数，
    handleprogress(event, file, fileList){
        // console.log(event.target);
        // console.log(file);
        // console.log(fileList[0]);
    },
    
  },
  created(){
      this.imgurl=this.imgURL;
  }
};
</script>

<style>
.img-upload{
  width: 100%;
  height: 100%;
}
.img-up .bigimgshow .el-dialog{
  margin-top: 70px;
  width: 80% !important;
  height: 70%;
}
</style>
