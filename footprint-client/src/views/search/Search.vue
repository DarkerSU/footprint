<template>
  <div class="search-group">
    <div class="search-content">
      <nation></nation>
      <region @getselect="getselect"></region>
      <dates @getselect="getselect"></dates>
      <tag1 @getselect="getselect"></tag1>
      <div class="select-condit">
        <div class="condit-name">
          <span>已选条件：</span>
        </div>
        <div class="condit-tag">
          <ul class="condit-val">
            <li v-for="tag in selectedTags" :key="tag">
              <el-tag type="success" closable @close="handleClose(tag)">{{tag}}</el-tag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nation from "./searchchildren/Nation";
import Region from "./searchchildren/Region";
import Tag from "./searchchildren/Tag";
import Dates from "./searchchildren/Date";
export default {
  data() {
    return {
      selectedTags: []
    };
  },
  components: {
    nation: Nation,
    region: Region,
    tag1: Tag,
    dates: Dates
  },
  methods: {
    handleClose(tag) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    },
    // 用于接收子组件传来的值
    getselect(cityname) {
      //   console.log(this.selectedTags.indexOf(cityname));
      //   console.log(`孩子给的:${cityname}`);
      if (this.selectedTags.indexOf(cityname) == -1) {
        this.selectedTags.push(cityname);
      } else {
        this.$message("重复点击可以取消选择");
        setTimeout(() => {
          this.selectedTags.splice(this.selectedTags.indexOf(cityname), 1);
        }, 500);
      }
      //   console.log(this.selectedTags);
    }
  }
};
</script>

<style>
.search-group {
  border: 1px solid rgb(196, 195, 195);
  border-radius: 5px;
  margin: 20px 60px;
}
.search-content{
    margin: 15px auto;
}
.select-condit {
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
}

.select-condit::after {
  content: "";
  display: block;
  clear: both;
}
.select-condit .condit-name {
  height: 24px;
  width: 100px;
  margin: 5px 0 3px 15px;
  font-size: 14px;
  text-align: right;
}
.condit-tag {
  border-radius: 3px;
  line-height: 30px;
}
.select-condit .condit-name,
.condit-tag {
  height: 35px;
  float: left;
}
.select-condit .condit-tag .condit-val {
  margin: 0;
  list-style: none;
  padding-left: 0px;
  font-size: 13px;
}
.select-condit .condit-tag .condit-val li {
  display: inline-block;
  margin: 3px 5px;
  font-size: 14px;
}
.select-condit .condit-tag .condit-val .el-tag {
  font-size: 13px;
  height: 25px;
  line-height: 24px;
  padding: 0 3px;
}
</style>