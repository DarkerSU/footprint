<template>
  <div>
    <input type="file" name="file" accept="images/*" @change="uploadAvatar" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: "",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    // 阻止upload的自己上传，进行再操作
    // beforeupload(file) {
    //   this.formData.append("file", file);
    //   return false;
    // },
    uploadAvatar(avatar) {
      console.log(avatar.target.files[0]);
      let file = avatar.target.files[0];
      let data = new FormData();
      data.append("file", file, file.name); //很重要 data.append("file", file);不成功
      data.append("data", 112); //向后台传递数据
      console.log(data.get("file"));
      this.axios.post("/img/file", data, {
        headers: { "content-type": "multipart/form-data" }
      });
    },
    beforeupload(file) {
      this.formData.append("file", file);
      return false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }

  //用axios.post方法传图片，需要注意的
  //直接将params作为参数传到post方法内
  //regis就是已经封装好的post方法
  //   var params = new FormData();
  // params.append('file',this.$refs.upload.files[0]);
  // userApi.regis(params).then(function(res){
  // console.log(res)
  // })
};
</script>

<style>
</style>