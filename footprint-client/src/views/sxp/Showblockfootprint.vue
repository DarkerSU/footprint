<template>
  <div class="blockshow">
    <div
      class="fpproduction"
      v-for="(item,index) of fpProduction"
      :key="index"
      @click="lookthisfp(item.ptitle,item.uname)"
    >
      <el-tooltip class="item" effect="dark" content="点击可以查看足迹的本条足迹的详情" placement="top">
        <div class="blockshow-img">
          <img v-for="(item2,index) of item.spimgUrl " :key="index" :src="imgURL+item2" alt />
        </div>
      </el-tooltip>
      <div class="blockshow-content">
        <div class="tag-content">
          <el-tag
            class="tag"
            type="success"
            v-for="(item3,index2) of item.sptagList"
            :key="index2"
          >{{item3}}</el-tag>
        </div>
        <div class="blockshow-title">
          <p class="fpfont1">
            主题：
            <span>{{item.ptitle}}</span>
          </p>
          <p class="fpfont2">
            作者：
            <span>{{item.uname}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fpProduction: [],
      Content: {
        ptitle: ""
      }
    };
  },
  methods: {
    // 查看对应主体的足迹
    lookthisfp(title, uname) {
      this.$router.push({
        name: "showfpTimeline",
        params: {
          ptitle: title,
          uname: uname
        }
      });
    },
    getfp() {
      var userinfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      // console.log(userinfo);
      this.axios
        .get("/fp/unumAllshow", {
          params: {
            unum: userinfo.unum
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            var result = res.data.data1;
            console.log(result);
            for (var i = 0; i < result.length; i++) {
              if (this.Content.ptitle != result[i].ptitle) {
                this.Content.ptitle = result[i].ptitle;
                this.fpProduction.push(result[i]);
              }
            }
            for (var i = 0; i < this.fpProduction.length; i++) {
              this.fpProduction[i].uname = userinfo.uname;
              this.fpProduction[i].spimgUrl = JSON.parse(this.fpProduction[i].spimgUrl);
              this.fpProduction[i].sptagList = JSON.parse(this.fpProduction[i].sptagList);
            }
            // console.log(this.fpProduction);
          } else {
            this.$message.error("信息获取失败");
          }
        });
    },
    getfpdetails(result) {
      // var userinfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      console.log(result);
      for (var i = 0; i < result.length; i++) {
        // result[i].uname = userinfo.uname;
        var spnum = result[i].pid;
        this.axios
          .get("/fp/pidshowfp", {
            params: {
              spnum: result[i].pid
            }
          })
          .then(res => {
            console.log(res.data.data2[0]);
            result[i].spimgUrl = JSON.parse(res.data.data2[0].spimgUrl);
            result[i].sptagList = JSON.parse(res.data.data2[0].sptagList);
            console.log(result);
            // this.fpProContent.push(res.data.data2[0]);
          });
      }
      console.log(result);
    }
  },
  created() {
    this.getfp();
  }
};
</script>

<style>
.fpproduction {
  width: 23%;
  height: 530px;
  position: relative;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  /* border: 1px solid rgb(141, 139, 139); */
  margin: 10px 20px;
  display: inline-block;
  box-shadow: 5px 8px 10px rgb(110, 110, 110);
}
.blockshow .fpproduction:hover {
  box-shadow: 5px 8px 10px rgb(110, 110, 110);
  transform: rotate(360deg);
  transition: All 1s ease-in-out;
  cursor: pointer;
}
.blockshow .blockshow-img {
  height: 70%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  /* border: 1px solid rgb(218, 48, 48); */
}
.blockshow .blockshow-img img {
  width: 100%;
  /* height: 49%; */
  /* border-radius: 8px; */
  /* margin-bottom: px; */
}
.blockshow-content {
  height: 15%;
}
.blockshow-content .tag-content {
  min-height: 70px;
}
.tag-content .tag {
  margin: 5px 8px;
}
.blockshow .fpproduction .blockshow-title {
  background-color: rgba(65, 62, 62, 0.685);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 100%;
  height: 100%;
  padding: 5px 0;
}
.blockshow .fpproduction .blockshow-title .fpfont1,
.blockshow .fpproduction .blockshow-title .fpfont2 {
  margin: 10px auto;
  text-align: center;
}
.fpfont1 {
  color: #fff;
  font: 25px "楷体";
}
.fpfont2 {
  font: 18px "楷体";
  color: rgb(164, 231, 55);
}
</style>