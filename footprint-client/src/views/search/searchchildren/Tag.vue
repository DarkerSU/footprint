<template>
  <div class="tag">
    <div class="select-tag">
      <span>按标签查询：</span>
    </div>
    <div class="tag-item">
      <ul class="tag-val">
        <li v-for="(item,index) of tagList" :key="index" @click="handleselect(item.ttitle)">{{item.ttitle}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagList: []
    };
  },
  methods: {
      // 用于子组件给父组件传值
    handleselect(ttitle) {
      console.log(`要给home组件的值：${ttitle}`);
      this.$emit("getselect", ttitle);
    },
    getTag() {
      this.axios
        .get("/search/tag", {
          params: {
            tpid: 1
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log("查询标签成功");
            this.tagList = res.data.data;
          } else {
            console.log("查询标签失败");
          }
        });
    }
  },
  created() {
    this.getTag();
  }
};
</script>

<style>
.tag {
  display: flex;
  justify-content: flex-start;
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
}
.tag::after {
  content: "";
  display: block;
  clear: both;
}
.tag .select-tag {
  float: left;
  height: 24px;
  width: 100px;
  margin: 5px 0 3px 15px;
  font-size: 13px;
  text-align: right;
}
.tag .tag-item {
  width: 1100px;
  float: left;
}
.tag-item a {
  text-decoration: none;
}
.tag .tag-item .tag-val {
  margin: 0;
  list-style: none;
  padding-left: 0px;
  font-size: 13px;
}
.tag .tag-item .tag-val .el-tag {
  height: 25px;
  line-height: 25px;
}
.tag .tag-item .tag-val li {
  display: inline-block;
  margin: 2px 4px;
  padding: 3px 10px;
  color: rgb(41, 50, 170);
  cursor: pointer;
}
.tag .tag-item .tag-val li:hover {
  background-color: rgba(81, 175, 219, 0.829);
  border-radius: 5px;
  padding: 3px 10px;
  color: #fff;
}
</style>