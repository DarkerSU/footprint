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
      <el-input v-model="ptitle" class="fptitle" placeholder="小主，为您的足迹起个名吧"></el-input>
    </div>
    <el-timeline>
      <el-timeline-item
        class="add-foot-stap"
        timestamp
        placement="top"
        v-for="count in fp"
        :key="count"
      >
        <el-tooltip class="item" effect="dark" content="点击地球可以对你的本条足迹定位哦" placement="top">
          <div class="add-footprint-img" @click="selectEarth(count)">
            <div class="toponymy">{{country[count-1]}}</div>
          </div>
        </el-tooltip>
        <div class="add-footprint-time">
          <!-- 用户添加作品时，显示时间选择框 -->
          <el-date-picker v-model="fpdate[count-1]" type="date" placeholder></el-date-picker>
        </div>
        <el-card class="add-footprint-body">
          <div class="foot-title">
            <div class="fpshow">
              <span>地点：{{site[count-1]}}</span>
              <span>
                时间：
                <span class="select-time">{{fpdate1[count-1]}}</span>
              </span>
            </div>
            <div class="fpclose">
              <el-tooltip class="item" effect="dark" content="删除本条足迹" placement="top">
                <span class="el-icon-error" @click="delfoot(count)"></span>
              </el-tooltip>
            </div>
          </div>
          <div class="foot-body">
            <div class="foot-tag">
              <ul class="Tag-val">
                <li v-for="(tag,index) of tagList[count-1]" :key="index">
                  <el-tag type="success" closable @close="handleCloseTag(tag)">{{tag}}</el-tag>
                </li>
              </ul>
              <el-tooltip class="item" effect="dark" content="小主、为你的本条足迹添加一个标签吧" placement="top">
                <el-button round class="el-icon-circle-plus-outline" @click="addTag(count)">添加标签</el-button>
              </el-tooltip>
            </div>
            <div class="foot-img" @click="updateImgnum(count)">
              <imgupload class="foot-imgup" :count="count-1" @getImgUplod="getImgUplod"></imgupload>
            </div>
            <div class="foot-text">
              <p class="foot-text-xd">寄语/心得:</p>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="textarea[count-1]"
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
      title="选择地图"
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

    <!-- 添加标签弹框 -->
    <el-dialog
      class="searchTag"
      title="添加标签"
      :visible.sync="SearchTagdialog"
      width="55%"
      :before-close="handleClose"
    >
      <addfptag @PerTag="PerTag" @PerCancel="PerCancel"></addfptag>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from "./ImgUpload1";
import MAP from "../lww/map";
import AddFpTag from "./AddfpTag";
export default {
  data() {
    return {
      ptitle: "",
      fpdate: [],
      fpdate1: [],
      // value1: "",
      value: ``,
      fp: 2,
      textarea: [],
      Earthdialog: false /* 地图弹框 */,
      site: [] /* 地点位置 */,
      lng_lat: [] /* 经纬度数组 */,
      country: [] /* 地区数组 */,
      // selectMap: [{ site: "" }],
      // Mapsite: {},
      num: 0,

      /* 标签弹框参数 */
      SearchTagdialog: false /* 添加标签弹框 */,
      tagList: [] /* 子组件获取的标签 */,
      tagobj: {
        tag1: []
      },
      tagisTrue: false,
      tagnum: 0 /* 用来暂存选中点的数值*/,

      /* 图片子组件参数 */
      fpImgUpload: [],
      imgnum: 0,
    };
  },
  components: {
    imgupload: ImgUpload,
    fpmap: MAP,
    addfptag: AddFpTag
  },
  methods: {
    /* 接收图片子组件的传的参数 */
    getImgUplod(i) {
      console.log(`图片子组件传的参数为${i}`);
      var obj = JSON.parse(i);
      // console.log(obj[this.imgnum]);
      if (this.fpImgUpload[this.imgnum]) {
        console.log("图片数组中已有主，进行修改");
        this.fpImgUpload.splice(this.imgnum, 1, obj[this.imgnum]);
        // this.SearchTagdialog = false;
      } else {
        console.log("图片数组没有图片");
        this.fpImgUpload.push(obj[this.imgnum]);
      }
      console.log(this.fpImgUpload);
    },
    // 修改图片标识
    updateImgnum(count) {
      this.imgnum = count - 1;
      // console.log(this.imgnum);
    },
    // 给您的足迹添加标签
    addTag(count) {
      this.SearchTagdialog = true;
      // console.log(this.tagList[count - 1]);
      if (this.tagList[count - 1]) {
        if (this.tagList[count - 1].length > 0) {
          this.$store.commit(
            "updatefpTag",
            this.tagList[count - 1]
          ); /* 修改vuex参数 */
        }
      }
      this.tagnum = count - 1; /* 获取最新足迹点的标号 */
      var taginfo = this.$store.getters.getfpTag; /* 通过vuex传参 */
    },
    // 接收标签组件的参数
    PerTag(i) {
      console.log(`标签组件孩子给的:${i}`);
      // console.log(JSON.parse(i));
      this.tagobj.tag1 = JSON.parse(i);
      var list = this.tagobj;
      // 如果点击的点已经有标签内容，则修改标签，如果没有则新增标签内容
      if (this.tagList[this.tagnum]) {
        console.log("次足迹已经添加标签，进行修改");
        this.tagList.splice(this.tagnum, 1, list.tag1);
        this.SearchTagdialog = false;
      } else {
        console.log("此足迹点无标签");
        this.tagList.push(list.tag1);
        this.SearchTagdialog = false;
      }
    },
    /* 接收子组件参数函数 */
    PerCancel(i) {
      console.log(`标签组件孩子给的:${i}`);
      this.SearchTagdialog = i;
      // console.log(this.tagisTrue);
    },
    handleCloseTag(tag) {
      this.tagList.splice(this.tagList.indexOf(tag), 1);
    },
    // 用于接收地图组件传来的值
    getselectMap(i) {
      console.log(`地图组件孩子给的:${i}`);
      // console.log(JSON.parse(i));
      var info = JSON.parse(i);
      // this.Mapsite = info;

      if (this.site[this.num]) {
        console.log("点击的足迹点有数据，进行修改");
        this.site.splice(this.num, 1, info.site);
        this.country.splice(this.num, 1, info.area);
        delete info.site; /* 删除地点信息 */
        delete info.area; /* 删除地区信息 */
        this.lng_lat.splice(this.num, 1, info);
      } else {
        console.log("点击的足迹点是新点，没有数据，获取新数据进行插入");
        this.site.push(info.site); /* 将地点写进数组 */
        this.country.push(info.area); /* 将地区写进数组 */
        delete info.site; /* 删除地点信息 */
        delete info.area; /* 删除地区信息 */
        this.lng_lat.push(info); /*将经纬度写进数组，生成坐标数组 */
      }
      this.Earthdialog = false;
    },
    // 点击地图
    selectEarth(count) {
      this.Earthdialog = true;
      this.num = count - 1;
      // console.log(this.site);
      // console.log(this.country);
      // console.log(this.lng_lat);
      this.$store.commit("updatalng_lat", this.lng_lat);
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
    delfoot(count) {
      this.fp--;
      this.site.splice(count - 1, 1);
      this.country.splice(count - 1, 1);
      this.lng_lat.splice(count - 1, 1);
      this.tagList.splice(count - 1, 1);
      // console.log(this.tagList);
    },
    subfootprint() {
      var userinfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      // console.log(userinfo.unum);
      // console.log(this.ptitle);
      // console.log(this.country);
      // console.log(this.site);
      // console.log(this.fpdate);
      // console.log(this.tagList);
      // console.log(this.textarea);
      var data = {
        spcountry: this.country,
        spsite: this.site,
        spfpdate: this.fpdate,
        sptagList: this.tagList,
        sptextarea: this.textarea,
        spimgUrl:this.fpImgUpload,
      };
      var datainfo = {
        unum: userinfo.unum,
        ptitle: this.ptitle
      };
      this.$confirm("提交成功后将不能修改, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.axios
            .post("/fp/addfp", this.qs.stringify(datainfo))
            .then(res => {
              console.log(res.data.data);
              data.spnum = res.data.data;
              console.log(data);
              for (var i = 0; i < data.spsite.length; i++) {
                this.axios
                  .get("/fp/addContent", {
                    params: {
                      spnum: data.spnum,
                      spsite: data.spsite[i],
                      spcountry: data.spcountry[i],
                      spfpdate: data.spfpdate[i],
                      sptagList: JSON.stringify(data.sptagList[i]),
                      sptextarea: data.sptextarea[i],
                      spimgUrl:JSON.stringify(data.spimgUrl[i]),
                    }
                  })
                  .then(res1 => {
                    if (res1.data.code == 1) {
                      console.log("足迹内容插入成功");
        
                      this.$message({
                        type: "success",
                        message: "新增足迹成功!"
                      });
                      return ;
                    }
                  });
              }
            })
            .catch(err => {
              this.$message.error("新增足迹失败!");
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
.selectMap .el-dialog__header,
.searchTag .el-dialog__header {
  border-bottom: 1px solid #ccc;
}
.selectMap .el-dialog__body {
  padding-top: 20px;
}
.searchTag .el-dialog__header {
  background-color: rgb(92, 158, 233);
}
.searchTag .el-dialog__header .el-dialog__title {
  color: #fff;
  font-size: 20px;
}
.searchTag .el-dialog__header .el-dialog__close.el-icon.el-icon-close {
  color: #fff;
}
.searchTag .el-dialog__body {
  padding: 15px 20px;
}
.foot-tag .Tag-val {
  padding: 0;
  display: inline-block;
  margin: 0;
}
.foot-tag .Tag-val li {
  margin: 0 10px;
  display: inline-block;
}
.foot-tag .Tag-val li .el-tag.el-tag--success.el-tag--light {
  font-size: 17px;
}
.foot-tag .el-button.el-tooltip span {
  font-size: 17px;
}
</style>