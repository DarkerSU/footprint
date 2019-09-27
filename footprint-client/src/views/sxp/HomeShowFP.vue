<template>
  <div class="homeshow">
    <div
      class="fpproduction"
      v-for="(item,index) of fpProduction"
      :key="index"
      @click="lookthisfp(item.ptitle,item.uname)"
    >
      <!-- <el-tooltip class="item" effect="dark" content="点击可以查看足迹的本条足迹的详情" placement="top"> -->
        <div class="blockshow-img">
          <img v-for="(item2,index) of item.firstfpimgurl " :key="index" :src="imgURL+item2" alt />
        </div>
      <!-- </el-tooltip> -->
      <div class="blockshow-content">
        <div class="tag-content">
          <el-tag
            class="tag"
            type="success"
            v-for="(item3,index2) of item.firstfptagList"
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
    <div class="butt-cnt">
      <el-button type="primary" round @click="loadmore">加载更多......</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pno:0,
      count:8,
      fpProduction: [],
      Content: {
        ptitle: ""
      }
    };
  },
  methods: {
    // 加载更多
    loadmore(){
      this.count+=4;
      this.getfp(this.count)
    },
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
    // 分页查询
    getfp(count) {
     
     if(this.pno){
       this.pno=1
     }
     if(!count){
       count=8
     }
     console.log(count)
      this.axios
        .get("/fp/pageAllshow", {
          params: {
            pno: this.pno,
            count:count,
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            var result = res.data.data1;  
            for(var i=0;i<result.length;i++){
              result[i].firstfpimgurl=JSON.parse(result[i].firstfpimgurl);
              result[i].firstfptagList=JSON.parse(result[i].firstfptagList)
            }
            this.fpProduction=result;
            // console.log(this.fpProduction)
          } else {
            this.$message.error("信息获取失败");
          }
        });
    }
  },
  created() {
    this.getfp();
  }
};
</script>

<style>
.homeshow {
  margin: 10px 40px;
}
.homeshow .fpproduction {
  width: 22%;
  height: 530px;
  position: relative;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  /* border: 1px solid rgb(141, 139, 139); */
  margin: 20px 20px;
  display: inline-block;
  box-shadow: 5px 8px 10px rgb(110, 110, 110);
}
.homeshow .fpproduction:hover {
  box-shadow: 5px 8px 10px rgb(110, 110, 110);
  transform: rotate(360deg);
  transition: All 1s ease-in-out;
  cursor: pointer;
}
.homeshow .blockshow-img {
  height: 70%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  /* border: 1px solid rgb(218, 48, 48); */
}
.homeshow .blockshow-img img {
  width: 100%;
  /* height: 49%; */
  /* border-radius: 8px; */
  /* margin-bottom: px; */
}
.homeshow .blockshow-content {
  height: 15%;
}
.homeshow .blockshow-content .tag-content {
  min-height: 70px;
}
.homeshow .tag-content .tag {
  margin: 5px 8px;
}
.homeshow .fpproduction .blockshow-title {
  background-color: rgba(65, 62, 62, 0.685);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 100%;
  height: 100%;
  padding: 5px 0;
}
.homeshow .fpproduction .blockshow-title .fpfont1,
.homeshow .fpproduction .blockshow-title .fpfont2 {
  margin: 10px auto;
  text-align: center;
}
.homeshow .fpfont1 {
  color: #fff;
  font: 25px "楷体";
}
.homeshow .fpfont2 {
  font: 18px "楷体";
  color: rgb(164, 231, 55);
}
.homeshow .butt-cnt {
  margin: 50px auto;
  text-align: center;
}

.homeshow .butt-cnt .el-button.is-round {
  width: 48%;
  font-size: 16px;
}
</style>