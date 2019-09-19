<template>
  <div class="show-timeline">
    <div class="show-footprint-title">
      <span class="subtitle">来自"<span class="show-ftitle">{{ftitle}}</span>"的足迹</span>
    </div>
    <el-timeline>
      <el-timeline-item class="show-foot-stap" timestamp placement="top">
        <div class="show-footprint-img">
          <img src="../../assets/img/LuWeiWei/adorable-animal-blur-979003.jpg" alt />
        </div>
        <div class="show-footprint-time">
          <!-- 用户添加作品时，显示时间选择框 -->
          <!-- 查看页面显示时间即可，无需显示时间选择框 -->
          <span>2019-4-15</span>
        </div>
        <el-card class="show-footprint-body">
          <div>
            <span>地点：</span>
            <span>时间：</span>
          </div>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item class="show-foot-stap" timestamp placement="top">
        <div class="show-footprint-img">
          <img src="../../assets/img/LuWeiWei/adorable-animal-blur-979003.jpg" alt />
        </div>
        <div class="show-footprint-time">2018-4-12</div>
        <el-card class="show-footprint-body">
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item class="show-foot-stap" timestamp placement="top">
        <div class="show-footprint-img">
          <img src="../../assets/img/LuWeiWei/adorable-animal-blur-979003.jpg" alt />
        </div>
        <div class="show-footprint-time">2018-4-12</div>
        <el-card class="show-footprint-body">
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ftitle:"会飞的小猪",
      value1: ""
    };
  },
  methods: {}
};
</script>

<style>
.show-footprint-title {
  margin: 20px auto;
  font-size: 30px;
  text-align: center;
}
.subtitle{
  color: rgb(248, 63, 17)
}
.show-ftitle{
color: rgb(46, 165, 212);
}
.show-timeline .el-timeline-item__node--normal {
  width: 60px;
  height: 60px;
}
.show-timeline .el-timeline-item__tail {
  left: 29px;
}
.show-timeline .el-timeline-item.show-foot-stap {
  margin-right: 15px;
}
.show-timeline .show-footprint-time {
  width: 134px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  position: relative;
  left: -65px;
  top: 5px;
  padding: 3px 8px;
  font-size: 20px;
  color: rgb(89, 126, 126);
  border-radius: 3px;
}
.show-timeline .show-footprint-time .el-date-editor.el-input,
.show-timeline .show-footprint-time .el-date-editor.el-input__inner,
.show-timeline .show-footprint-time .el-input__inner {
  width: 130px !important;
}
.show-timeline .show-footprint-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  text-align: center;
}
.show-timeline .show-footprint-img img {
  /* padding:15px 16px 16px 16px;   */
  width: 97%;
  height: 97%;
  border-radius: 50%;
  position: relative;
  top: 0px;
  left: -29px;
}
.show-timeline .show-foot-stap .el-timeline-item__timestamp.is-top {
  /* display: none; */
  position: relative;
  top: 28px;
  left: 30px;
  width: 100px;
  margin-bottom: 0px;
  padding: 2px;
  /* border-bottom: 3px solid  */
  background: linear-gradient(to right, rgb(228, 231, 237), rgb(255, 255, 255));
  z-index: 1;
}
.show-timeline .show-foot-stap .el-card.is-always-shadow {
  margin-left: 120px;
  margin-top: -85px;
  /* padding-bottom: 20px; */
  position: relative;
  /* top: -74px; */
  /* left: 110px; */
  z-index: 10;
}
.show-timeline .show-foot-stap .show-footprint-body .el-card__body {
  padding: 5px 20px;
}
</style>