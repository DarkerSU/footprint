<template>
  <div class="add-timeline">
    <div class="publish-footprint">
      <p class="publish-title">
        发表足迹
        <span class>（小提示：小主，至少两条足迹才可发表噢）</span>
      </p>
    </div>
    <div class="submit-footprint">
      <el-tooltip class="item" effect="dark" content="提示：小主，至少两条足迹才可发表噢" placement="bottom">
        <el-button type="success" @click="subfootprint">发表个人足迹</el-button>
      </el-tooltip>
    </div>
    <div class="footprint-title">
      <el-input v-model="input" class="fptitle" placeholder="小主，为您的足迹起个名吧"></el-input>
    </div>
    <el-timeline>
      <el-timeline-item
        class="add-foot-stap"
        timestamp
        placement="top"
        v-for="count in fp"
        :key="count"
      >
        <div class="add-footprint-img" @click="selectEarth(count)">
          <div class="toponymy">{{country[count-1]}}</div>
        </div>
        <div class="add-footprint-time">
          <!-- 用户添加作品时，显示时间选择框 -->
          <el-date-picker v-model="fpdate[count]" type="date" placeholder></el-date-picker>
        </div>
        <el-card class="add-footprint-body">
          <div class="foot-title">
            <div class="fpshow">
              <span>地点：{{site[count-1]}}</span>
              <span>
                时间：
                <span class="select-time">{{fpdate1[count]}}</span>
              </span>
            </div>
            <div class="fpclose">
              <el-tooltip class="item" effect="dark" content="删除本条足迹" placement="top">
                <span class="el-icon-error" @click="delfoot"></span>
              </el-tooltip>
            </div>
          </div>
          <div class="foot-body">
            <div class="foot-tag">
              <el-tooltip class="item" effect="dark" content="小主、为你的本条足迹添加一个标签吧" placement="top">
                <el-button round class="el-icon-circle-plus-outline">添加标签</el-button>
              </el-tooltip>
            </div>
            <div class="foot-img">
              <imgupload class="foot-imgup"></imgupload>
            </div>
            <div class="foot-text">
              <p class="foot-text-xd">寄语/心得:</p>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="textarea"
                maxlength="100"
                show-word-limit
              ></el-input>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
      <el-timeline-item class="add-foot-stap" placement="top">
        <el-tooltip class="item" effect="dark" content="继续添加足迹" placement="top">
          <div class="add-footprint-img">
            <img src="../../assets/img/sxp/add.png" alt @click="addfoot" />
          </div>
        </el-tooltip>
      </el-timeline-item>
    </el-timeline>

    <!-- 地图弹框 -->
    <el-dialog
      class="selectMap"
      title="提示"
      :visible.sync="Earthdialog"
      width="80%"
      height="80%"
      :before-close="handleClose"
    >
      <fpmap @getselectMap="getselectMap"></fpmap>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="Earthdialog = false">取 消</el-button>
        <el-button type="primary" @click="Earthdialog = false">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from "./ImgUpload1";
import MAP from "../lww/map";
export default {
  data() {
    return {
      input: "",
      fpdate: [],
      fpdate1: [],
      // value1: "",
      value: ``,
      fp: 2,
      textarea: "",
      Earthdialog: false /* 地图弹框 */,
      site: [] /* 地点位置 */,
      lng_lat: [] /* 经纬度数组 */,
      country: [] /* 地区数组 */,
      selectMap: [{ site: "" }]
    };
  },
  components: {
    imgupload: ImgUpload,
    fpmap: MAP
  },
  methods: {
    // 用于接收地图组件传来的值
    getselectMap(i) {
      console.log(`孩子给的:${i}`);
      // console.log(JSON.parse(i));
      // if (i) {
      //   return JSON.parse(i);
      // } else {
      //   return 0;
      // }
      var Mapsite =JSON.parse(i)
      this.site.push(Mapsite.site); /* 将地点写进数组 */
      this.country.push(Mapsite.area); /* 将地区写进数组 */
      delete Mapsite.site; /* 删除地点信息 */
      delete Mapsite.area; /* 删除地区信息 */
      this.lng_lat.push(Mapsite); /*将经纬度写进数组，生成坐标数组 */
      console.log(this.site);
      console.log(this.country);
      console.log(this.lng_lat);
        this.Earthdialog = false;
    },
    // 点击地图
    selectEarth(count) {
      this.Earthdialog = true;
      var Mapsite = this.getselectMap(); /* 得到地图传过来的参数 */
      console.log(this.site);
      if (this.site[count - 1]) {
        this.site.splice(count - 1, 1, Mapsite.site);
        this.country.splice(count - 1, 1, Mapsite.area);
        delete Mapsite.site; /* 删除地点信息 */
        delete Mapsite.area; /* 删除地区信息 */
        this.lng_lat.splice(count - 1, 1, Mapsite);
      } else {
        console.log("222");
      //   this.site.push(Mapsite.site); /* 将地点写进数组 */
      // this.country.push(Mapsite.area); /* 将地区写进数组 */
      // delete Mapsite.site; /* 删除地点信息 */
      // delete Mapsite.area; /* 删除地区信息 */
      // this.lng_lat.push(Mapsite); /*将经纬度写进数组，生成坐标数组 */
      // 
      }
      console.log(this.site);
      console.log(this.country)
      console.log(this.lng_lat)
      // this.Earthdialog = false;
      
    },
    /* 弹框关闭提示 */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //接收子组件emit的事件
    getImgUrl(data) {
      //data  得到的就是返回的图片路径的相关参数
    },
    //  添加足迹
    addfoot() {
      this.fp++;
    },
    delfoot() {
      this.fp--;
    },
    subfootprint() {
      this.$confirm("提交成功后将不能修改, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    }
  },
  watch: {
    fpdate: function(newVal, oldVal) {
      for (var i = 0; i < this.fpdate.length; i++) {
        const d = new Date(this.fpdate[i]);
        const resDate =
          d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        this.fpdate1[i] = resDate;
      }
    }
  }
};
</script>
<style>
.publish-footprint {
  border-bottom: 1px solid rgb(136, 135, 135);
  margin: 0 18px;
  /* padding: 10px 20px */
}
.publish-footprint .publish-title {
  color: rgb(117, 117, 117);
  padding: 0 10px;
  font: 20px "楷体";
  margin: 12px 0;
}
.publish-footprint .publish-title span {
  color: rgb(236, 62, 62);
  font: 14px "楷体";
}
.submit-footprint {
  margin-top: 15px;
  margin-right: 30px;
  text-align: right;
}
.footprint-title {
  margin: 10px 0 20px 0;
  text-align: center;
}

.footprint-title .fptitle {
  font-size: 26px;
}
.footprint-title .el-input input::-webkit-input-placeholder {
  color: rgb(145, 145, 145);
  font-size: 16px;
}
.add-timeline .footprint-title .el-input {
  width: 450px;
  height: 35px;
}
.add-timeline .footprint-title .el-input .el-input__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid rgb(199, 199, 201);
  height: 45px !important;
  text-align: center;
}
.add-timeline .el-timeline-item__node--normal {
  width: 80px;
  height: 80px;
}
.add-timeline .el-timeline-item__tail {
  left: 40px;
}
.add-timeline .el-timeline-item.add-foot-stap {
  margin-right: 15px;
}
.add-timeline .add-footprint-time {
  width: 134px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  position: relative;
  left: -55px;
  top: 5px;
  padding: 3px 8px;
  font-size: 20px;
  color: rgb(89, 126, 126);
  border-radius: 3px;
}
.add-timeline .add-footprint-time .el-date-editor.el-input,
.add-timeline .add-footprint-time .el-date-editor.el-input__inner,
.add-timeline .add-footprint-time .el-input__inner {
  width: 140px !important;
  height: 40px !important;
}
.add-timeline .add-footprint-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  /* background-color: tomato; */
  position: relative;
  top: 0px;
  left: -29px;
  background-image: url("../../assets/img/sxp/earth1.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.add-timeline .add-footprint-img .toponymy {
  /* padding:15px 16px 16px 16px;   */
  width: 97%;
  /* height: 97%; */
  font-size: 25px;
  overflow: hidden;
  padding: 23px 0;
  vertical-align: middle;
}
.add-timeline .add-footprint-img img {
  width: 100%;
}
.add-timeline .add-foot-stap .el-timeline-item__timestamp.is-top {
  /* display: none; */
  position: relative;
  top: 28px;
  left: 48px;
  width: 100px;
  margin-bottom: 0px;
  padding: 2px;
  /* border-bottom: 3px solid  */
  background: linear-gradient(to right, rgb(228, 231, 237), rgb(255, 255, 255));
  z-index: 1;
}
.add-timeline .add-foot-stap .el-card.is-always-shadow {
  margin-left: 120px;
  margin-top: -115px;
  /* padding-bottom: 20px; */
  position: relative;
  /* top: -74px; */
  /* left: 110px; */
  z-index: 10;
}
.add-timeline .add-foot-stap .add-footprint-body .el-card__body {
  padding: 5px 20px;
}
.add-timeline .add-footprint-body .foot-title {
  padding: 10px 0px;
  border-bottom: 1px solid rgb(201, 200, 200);
  margin: 5px 2px;
}
.foot-title {
  display: flex;
  justify-content: space-between;
}
.foot-title .fpshow span {
  margin: 0px 15px;
  font-size: 16px;
  color: rgb(149, 153, 153);
}
.foot-title .fpclose {
  font-size: 22px;
  vertical-align: middle;
}
.foot-title .fpclose .el-icon-error:hover {
  color: red;
}
.add-timeline .add-footprint-body .foot-title .select-time {
  margin: 0;
}
.foot-img {
  width: 100%;
  height: 100%;
}
.add-timeline .add-footprint-body .foot-img .foot-imgup {
  width: 100%;
  height: 70%;
}

.foot-img .foot-imgup .el-upload--picture-card {
  width: 100%;
  height: 100%;
}
.foot-img .foot-imgup .el-upload-list--picture-card .el-upload-list__item {
  width: 100%;
  height: 100%;
}
.foot-body {
  margin: 10px 10px 35px 10px;
}
.foot-body .foot-tag {
  margin-bottom: 10px;
}
.foot-body .foot-tag .el-button.is-round {
  padding: 8px 18px;
}
.foot-body .foot-text {
  margin-top: 20px;
  width: 100%;
  height: 100%;
}
.foot-body .foot-text .foot-text-xd {
  margin: 5px 0;
  font: 17px "楷体";
}
.foot-body .foot-text .el-textarea {
  min-height: 120px;
}
.foot-body .foot-text .el-textarea .el-textarea__inner {
  min-height: 120px !important;
}
.selectMap .el-dialog__header {
  border-bottom: 1px solid #ccc;
}
.selectMap .el-dialog__body {
  padding-top: 20px;
}
</style>