<template>
  <div
    class="show-timeline"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
   
  >
    <myheaders></myheaders>
    <div class="showtime-content">
      <div class="show-footprint-title">
      <span class="subtitle">
        来自"
        <span class="show-ftitle">{{fpInfoTitle.unum}}</span>"的足迹
      </span>
    </div>
    <el-timeline>
      <div class="shouwfptitle">
        <span>
          本条足迹主题：
          <span class="showtitleColor">{{fpInfoTitle.ptitle}}</span>
        </span>
      </div>
      <div class="shouwfpevaluate">
        <div>
          <img src="../../assets/img/sxp/zan1.png" alt />
          <span>{{fpInfoTitle.praise}}</span>
        </div>
        <div>
          <img src="../../assets/img/sxp/comment.png" alt />
        </div>
      </div>
      <el-timeline-item
        class="show-foot-stap"
        timestamp
        placement="top"
        v-for="(item,index) of fpInfoContent "
        :key="index"
      >
        <div class="show-footprint-img">
          <div class="toponymy">{{item.spcountry}}</div>
          <!-- <img src="../../assets/img/LuWeiWei/adorable-animal-blur-979003.jpg" alt /> -->
        </div>
        <div class="show-footprint-time">
          <!-- 用户添加作品时，显示时间选择框 -->
          <!-- 查看页面显示时间即可，无需显示时间选择框 -->
          <span>{{item.spfpdate}}</span>
        </div>
        <el-card class="show-footprint-body">
          <div class="showfpheader">
            <span>地点：{{item.spsite}}</span>
            <span>时间：{{item.spfpdate}}</span>
          </div>
          <div class="showTaglist">
            <el-tag v-for="(item1,x) of item.sptagList" :key="x" type="success" >{{item1}}</el-tag>
          </div>

          <div class="showImg">
            <img v-for="(item2,i) of item.spimgUrl" :key="i" :src="imgURL+item2" alt />
          </div>
          <div class="showtext">
            <span class="showjiyu">寄语/心得：</span>
            <div class="textarea">{{item.sptextarea}}</div>
          </div>
        </el-card>
      </el-timeline-item>
      <!-- <el-timeline-item class="show-foot-stap" placement="top">
        
      </el-timeline-item>-->
    </el-timeline>
    </div>
    
    <myfooters></myfooters>
  </div>
</template>

<script>
// import Myheader from "../../components/sfq/Myheader";
// import Myfooter from "../zxm/Myfooter";
export default {
  data() {
    return {
      ftitle: "",
      value1: "",
      fpInfoTitle: {},
      fpInfoContent: [],
      loading: true
    };
  },
  // components: {
  //   myheader: Myheader,
  //   myfooter: Myfooter,
  // },
  methods: {
    // 获取路由传的参数
    getRouterParms() {
      // console.log(this.$route.params.ptitle);
      this.ftitle = this.$route.params.ptitle;
    },
    getfootprintContent() {
      var fptitle = this.ftitle;
      this.axios
        .get("/fp/showfootprint", {
          params: {
            fptitle: this.ftitle
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log(res.data.data1);
            for (var i = 0; i < res.data.data1.length; i++) {
              //  将图片路径字符串解析为数组
              res.data.data1[i].spimgUrl = JSON.parse(
                res.data.data1[i].spimgUrl
              );
              // 将标签字符串解析为数组
              res.data.data1[i].sptagList = JSON.parse(
                res.data.data1[i].sptagList
              );
              // 做日期解析
              res.data.data1[i].spfpdate = this.$moment(
                res.data.data1[i].spfpdate
              ).format("YYYY-MM-DD");
            }
            this.fpInfoTitle = res.data.data2[0];
            this.fpInfoContent = res.data.data1;
            // console.log(this.fpInfoTitle);
            // console.log(this.fpInfoContent);
          } else {
            this.$message.error("查询不到该足迹!");
          }
        });
    }
  },
  created() {
    this.getRouterParms();
    setTimeout(() => {
      this.getfootprintContent();
    }, 500);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>

<style>
/* .show-timeline {
  
} */
.showtime-content{
  margin: 40px 50px 40px 40px;
  min-height: 500px;
}
.show-footprint-title {
  margin: 20px auto;
  font-size: 20px;
  text-align: left;
}
.subtitle {
  padding-left: 50px;
  color: rgb(196, 75, 45);
}
.show-ftitle {
  color: rgb(46, 165, 212);
}
.show-timeline .el-timeline-item__node--normal {
  width: 80px;
  height: 80px;
}
.show-timeline .el-timeline-item__tail {
  left: 40px;
}
.show-timeline .el-timeline-item.show-foot-stap {
  margin-right: 15px;
}
.show-timeline .show-footprint-time {
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
.show-timeline .show-footprint-time .el-date-editor.el-input,
.show-timeline .show-footprint-time .el-date-editor.el-input__inner,
.show-timeline .show-footprint-time .el-input__inner {
  width: 140px !important;
  height: 40px !important;
}
.show-timeline .show-footprint-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  position: relative;
  top: 0px;
  left: -29px;
  background-image: url("../../assets/img/sxp/earth1.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.show-timeline .show-footprint-img .toponymy {
  /* padding:15px 16px 16px 16px;   */
  width: 97%;
  font-size: 25px;
  overflow: hidden;
  padding: 23px 0;
  vertical-align: middle;
}
.show-timeline .show-foot-stap .el-timeline-item__timestamp.is-top {
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
.show-timeline .show-foot-stap .el-card.is-always-shadow {
  margin-left: 120px;
  margin-top: -110px;
  /* padding-bottom: 20px; */
  position: relative;
  /* top: -74px; */
  /* left: 110px; */
  z-index: 10;
}
.show-timeline .show-foot-stap .show-footprint-body .el-card__body {
  padding: 5px 20px;
}
.shouwfptitle {
  text-align: center;
  font: 35px "楷体";
  font-weight: bold;
  margin: 15px 0;
  text-shadow: 11px 12px 7px #222;
  /* box-shadow: 10px 10px 10px #222; */
}
.shouwfptitle .showtitleColor {
  color: #ff0a0a;
  /* text-shadow: 10px 10px 10px #222; */
}
.shouwfpevaluate {
  /* text-align: right; */
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}
.shouwfpevaluate div {
  margin: 0 70px 0 0;
}
.shouwfpevaluate div span {
  font-size: 20px;
  /* margin-bottom: 10px; */
}
.shouwfpevaluate img {
  width: 30px;
  /* vertical-align: middle; */
  /* margin: 0px 90px 20px 0; */
}
.show-footprint-body .showfpheader {
  padding: 15px 0px;
  border-bottom: 1px solid #c9c7c7;
}
.show-footprint-body .showfpheader span {
  margin: 0 18px;
  font: 23px "楷体";
}
.show-footprint-body .showTaglist {
  margin: 10px 0;
}
.show-footprint-body .showTaglist .el-tag {
  /* padding:10px 10px; */
  height: 40px;
  font: 20px "楷体";
  line-height: 36px;
  margin: 0 20px;
}
.show-footprint-body .showImg img {
  border-radius: 8px;
  width: 100%;
  margin-bottom: 15px;
}
.show-footprint-body .showtext {
  margin: 10px 0 20px 0;
}
.show-footprint-body .showtext .showjiyu {
  font: 25px "楷体";
  font-weight: bold;
}
.show-footprint-body .showtext .textarea {
  font: 20px "楷体";
  line-height: 30px;
  margin: 5px;
}
</style>