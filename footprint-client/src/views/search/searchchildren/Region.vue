<template>
  <div class="region">
    <div class="select-region">
      <span>按地区查询：</span>
    </div>
    <div class="region-item">
      <ul class="region-val1">
        <li
          v-for="(item,index) of capitalList"
          :key="index"
          @click="searchCounty(item.cid),handleselect(item.cityname)"
        >{{item.cityname}}</li>
      </ul>
      <ul class="region-val2">
        <li
          v-for="(city,n) of citylist"
          :key="n"
          @click="handleselect(city.cityname)"
        >{{city.cityname}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      citylist: [],
      capitalList: []
    };
  },
  methods: {
    // 用于子组件给父组件传值
    handleselect(cityname) {
      console.log(`要给home组件的值：${cityname}`);
      this.$emit("getselect", cityname);
    },
    // 查询某个省份的市级单位
    searchCounty(cid) {
      console.log(cid);
      this.axios
        .get("/search/city", {
          params: {
            pid: cid
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            console.log("查询成功");
            this.citylist = res.data.data;
            console.log(this.citylist);
          } else {
            console.log("查询失败");
          }
        });
    },
    getcity() {
      this.axios
        .get("/search/capital", {
          params: {
            pid: 1
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log("查询成功");
            this.capitalList = res.data.data;
          } else {
            console.log("查询失败");
          }
        });
    }
  },
  created() {
    this.getcity();
  }
};
</script>

<style>
.region {
  /* display: flex;
  justify-content: flex-start; */
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
}
.region::after {
  content: "";
  display: block;
  clear: both;
}
.region .select-region {
  float: left;
  height: 24px;
  width: 100px;
  text-align: right;
  margin: 5px 0 3px 15px;
  font-size: 13px;
}

.region .region-item {
  width: 1000px;
  float: left;
}
.region-item a {
  text-decoration: none;
}
.region .region-item .region-val1,
.region .region-item .region-val2 {
  margin: 0;
  list-style: none;
  padding-left: 0px;
  font-size: 13px;
}
/* .region .region-item .region-val2 {
    border: 1px solid rgb(206, 206, 206);
    border-radius: 5px;
} */
.region .region-item .region-val1 .el-tag,
.region .region-item .region-val2 .el-tag {
  height: 25px;
  line-height: 25px;
}
.region .region-item .region-val1 li,
.region .region-item .region-val2 li {
  display: inline-block;
  margin: 2px 4px;
  padding: 3px 10px;
  color: rgb(41, 50, 170);
  cursor: pointer;
}
.region .region-item .region-val1 li:hover,
.region .region-item .region-val2 li:hover {
  background-color: rgba(81, 175, 219, 0.829);
  border-radius: 5px;
  padding: 3px 10px;
  color: #fff;
}
</style>