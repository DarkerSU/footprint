<template>
  <div class="content" :style="$store.getters.getThemeColor==0?'background-color: #202024;'
      :$store.getters.getThemeColor==1?'background-color: #d60a16;'
      :$store.getters.getThemeColor==2?'background-color: rgb(25, 143, 240);':''">
    <div class="details">
      <el-row :gutter="10">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="left">
              <p class="left-img">
                <img src="../../assets/img/zxm/logo.png" alt />
              </p>
              <p>足迹</p>
            </div>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple">
            <div class="middle">
              <ul>
                <li>足迹简介</li>
                <li>友情链接</li>
                <li>联系我们</li>
                <li>用户服务协议</li>
                <li>隐私权声明</li>
                <li>法律投诉声明</li>
              </ul>
              <p>违法和不良信息举报电话: 010-82728310 举报邮箱: zuji@zuji.com</p>
              <p>2019 zuji.com. All rights reserved . 版权所有</p>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="right">
              <p class="wx">微信公众号</p>
              <p class="wx-logo">
                <img src="../../assets/img/zxm/scan.jpg" alt />
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
/* .content {
  background: #202024;
} */

.details {
  margin: 0 100px;
}
.left-img {
  margin: 0;
}
.left p {
  margin: 0;
  text-align: center;
  color: #fff;
  font: 50px "楷体";
}

.left {
  margin: 36px;
}

.middle {
  /* height: 100px; */
  margin: 58px 0px;
}
.middle ul{
  margin: 45px 0;
}
.middle li {
  list-style: none;
  display: inline-block;
  color: #fff;
  font-size: 14px;
  margin: 11px 14px;
}

.middle li:hover {
  color: rgb(224, 171, 91);
}

.middle p {
  color: rgb(218, 218, 218);
  font-size: 13px;
  text-align: center;
  margin: 5px 0;
}

.right {
  /* width: 380px; */
  /* height: 100px; */
  /* margin: 35px 68px; */
  padding: 35px 2px;
}

.right img {
  width: 100px;
  height: 100px;
  margin: 9px 0;
}

.right .wx {
  margin: 0;
  color: #fff;
  font-size: 15px;
  padding: 0px 10px;
  padding-bottom: 5px;
}
.right .wx-logo{
  margin: 0;
}
.left img {
  height: 90px;
  width: 90px;
}
</style>