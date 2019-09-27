<template>
  <div class="dates">
    <div class="select-dates">
      <span>按时间查询：</span>
    </div>
    <div class="dates-item">
      <ul class="dates-val">
        <li v-for="(item,index) of dates" :key="index"  @click="handleselect(item)">{{item}}</li>
        
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            dates:['2016','2017','2018','2019','2020']
        }
    },
    methods:{
        // 用于子组件给父组件传值
    handleselect(cityname) {
      // console.log(`要给home组件的值：${cityname}`);
      this.$emit("getselect", cityname);
    },
    }
};
</script>

<style>
.dates {
  /* display: flex;
  justify-content: flex-start; */
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
}
.dates::after {
  content: "";
  display: block;
  clear: both;
}
.dates .select-dates {
  float: left;
  height: 24px;
  width: 100px;
  text-align: right;
  margin: 5px 0 3px 15px;
  font-size: 13px;
}

.dates .dates-item {
  /* width: 1100px; */
  float: left;
}
.dates-item a {
  text-decoration: none;
}
.dates .dates-item .dates-val {
  margin: 0;
  list-style: none;
  padding-left: 0px;
  font-size: 13px;
}
.dates .dates-item .dates-val .el-tag {
  height: 25px;
  line-height: 26px;
}
.dates .dates-item .dates-val li {
  display: inline-block;
  margin: 2px 4px;
  padding: 3px 10px;
  line-height: 20px;
  color: rgb(41, 50, 170);
  cursor: pointer;
}
.dates .dates-item .dates-val li:hover {
  background-color: rgba(81, 175, 219, 0.829);
  border-radius: 5px;
  padding: 3px 10px;
  color: #fff;
}
</style>