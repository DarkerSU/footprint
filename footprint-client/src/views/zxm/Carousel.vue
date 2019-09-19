<template>
  <div class="carousel-view">
    <el-carousel :interval="5000" type="card" height="400px" width="100%">
      <el-carousel-item v-for="item in list" :key="item.idView">
        <img class="carosel" :src="item.idView" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { id: 0, idView: require("../../assets/img/zxm/1.jpg") },
        { id: 1, idView: require("../../assets/img/zxm/2.jpg") },
        { id: 2, idView: require("../../assets/img/zxm/3.jpg") },
        { id: 3, idView: require("../../assets/img/zxm/4.jpg") }
      ]
    };
  }
};
</script>
<style>
.carousel-view{
margin: 10px 60px;
}
/* 轮播图图片居中 */
.el-carousel__item {
  text-align: center;
}
/* 轮播按钮样式 */
.el-carousel__button {
  background-color: darkgrey !important;
  width: 30px !important;
  height: 4px !important;
}
.carosel {
  width: 100%;
  height: 100%;
  border-radius:10px; 
}
</style>