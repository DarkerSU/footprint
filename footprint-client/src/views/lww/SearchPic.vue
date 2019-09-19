<template>
  <div class="searchpic-group">
    <div class="search-pic-cont">
      <div class="ih-item" v-for="(o, index) in 8" :key="index">
        <a href="#">
          <div class="img">
            <img src="../../assets/img/LuWeiWei/cat123.jpg" alt="img" />
          </div>
          <div class="info">
            <!-- 主题 -->
            <h3>小猫咪</h3>
            <div class="zuozhe-information">
              <!-- 作者头像 -->
              <div class="zuozhe-img">
                <img src="../../assets/img/LuWeiWei/233.jpg" alt />
              </div>
              <!-- 作者名称 -->
              <span>bilibilibilibili</span>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="butt-cnt">
      <el-button type="primary" round>加载更多......</el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.searchpic-group{
margin: 10px 60px;
}
.search-pic-cont {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.search-pic-cont .ih-item {
  position: relative;
  width: 22%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  margin: 15px 0px; 
}

.search-pic-cont .ih-item .img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.search-pic-cont .ih-item .img  img{
  width: 100%;
  height: 100%;
}
/* 遮罩层中图片的大小 */
.search-pic-cont .in-item .info img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 遮罩层样式 */
.search-pic-cont .ih-item .info {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  backface-visibility: hidden;
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: all 0.35s ease-in-out;
}

.search-pic-cont .ih-item a:hover .info {
  opacity: 1;
}

.butt-cnt {
  margin: 30px auto;
  text-align: center;
}

.butt-cnt .el-button.is-round {
  width: 48%;
  font-size: 16px;
}

/* 遮罩层作者信息 */
.search-pic-cont .ih-item .info .zuozhe-information {
  width: 100%;
  height: 50px;
  margin-top: 125px;
  line-height: 50px;
  text-align: center;
}

.search-pic-cont .ih-item .info .zuozhe-information .zuozhe-img {
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  margin-right: 15px;
}

.search-pic-cont .ih-item .info .zuozhe-information .zuozhe-img img {
  width: 45px;
  height: 45px;
  vertical-align: middle;
  border-radius: 25px;
}
</style>