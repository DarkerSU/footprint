<template>
  <div class="addfptag-content">
    <div class="inputTag">
      <div class="intag">
        <p class="tagp">注意：请选择你的足迹标签（最多5个）</p>
        <el-input placeholder="请输入您想添加的标签" v-model="input3"></el-input>
      </div>
      <div class="addbutton">
        <el-button
          type="success"
          size="large"
          class="el-icon-circle-plus-outline"
          @click="addnewtag(input3)"
        >添加新标签</el-button>
      </div>
    </div>
    <p class="fptuijian">推荐标签：</p>
    <div class="tagContent">
      <p
        class="tagtitle"
        v-for="(item,index) of tagList"
        :key="index"
        @click="handleselect(item.ttitle)"
      >{{item.ttitle}}</p>
    </div>
    <div class="selectedTag">
      <span class="sectext">您选择的标签：</span>
      <ul class="selectedTag-val">
        <li v-for="tag in selectedTags" :key="tag">
          <el-tag type="success" closable @close="handleClose(tag)">{{tag}}</el-tag>
        </li>
      </ul>
    </div>
    <div class="perserveTag">
      <el-button type="success" size="large" @click="PerTag">保存</el-button>
      <el-button size="large" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input3: "",
      tagList: [] /* 展示默认的标签列表 */,
      selectedTags: [] /* 选择的标签列表 */,
      isTrue:false,
    };
  },
  methods: {
    // 保存选择的标签，提交给父组件
    PerTag() {
      // 将选中的标签传给父组件
      this.$emit("PerTag", JSON.stringify(this.selectedTags));
      this.selectedTags.splice(0)
    },
    cancel() {
      this.$emit("PerCancel", this.isTrue);
    },
    // 添加新的标签
    addnewtag(ttitle) {
      if (ttitle) {
        // console.log(222)
        this.handleselect(ttitle);
        this.tagList.push(ttitle);
      } else {
        this.$message.error("不能添加空标签");
      }
    },
    // 在推荐标签中选择
    handleselect(ttitle) {
      if (this.selectedTags.length <= 5) {
        if (this.selectedTags.indexOf(ttitle) == -1) {
          this.selectedTags.push(ttitle);
        } else {
          this.$message("重复添加会取消已添加的");
          setTimeout(() => {
            this.selectedTags.splice(this.selectedTags.indexOf(ttitle), 1);
          }, 500);
        }
      } else {
        this.$message.error("最多只能选择五个标签");
      }
    },
    // 删除已选择的标签
    handleClose(tag) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    },
    // 显示默认的标签
    getsqltag() {
      this.axios
        .get("/search/tag", {
          params: {
            tpid: 1
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log("查询标签成功");
            this.tagList = res.data.data;
          } else {
            // console.log("查询标签失败");
          }
        });
        var taginfo=this.$store.getters.getfpTag;
        // console.log(taginfo)
    }
  },
  created() {
    this.getsqltag();
  }
};
</script>

<style>
.inputTag {
  display: flex;
  justify-content: space-between;
  margin: 0px 0 20px 0;
}
.inputTag .tagp {
  margin: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: red;
  width: 80%;
}
.inputTag .intag {
  width: 85%;
  /* display: flex;
  justify-content: flex-start; */
}
.inputTag .intag .el-input__inner {
  width: 99% !important;
  height: 45px !important;
}
.inputTag .addbutton .el-button--success {
  margin-top: 27px;
  padding: 13px 25px;
  font-size: 18px;
}
.fptuijian {
  font-size: 18px;
}
.tagContent {
  height: 300px;
  padding: 10px 5px;
  border: 1px solid rgb(158, 158, 158);
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.993);
  box-shadow: 0px 0px 15px rgb(100, 99, 99) inset;
  overflow-y: auto;
}
.tagContent .tagtitle {
  display: inline-block;
  margin: 10px 10px;
  background-color: rgb(92, 158, 233);
  border: 1px solid #ccc;
  padding: 8px 25px;
  border-radius: 18px;
  color: #fff;
  font-size: 17px;
}
.tagContent .tagtitle:hover {
  color: rgb(21, 172, 231);
  background-color: #fff;
  cursor: pointer;
}
.addfptag-content .selectedTag {
  margin-top: 25px;
  margin-bottom: 15px;
  min-height: 35px;
  font: 20px "楷体";
}
.selectedTag .selectedTag-val {
  padding: 0;
  display: inline-block;
  margin: 0;
}
.selectedTag .selectedTag-val li {
  margin: 0 10px;
  display: inline-block;
}
.selectedTag .selectedTag-val li .el-tag.el-tag--success {
  font-size: 23px;
}
.selectedTag .sectext {
  padding: 5px 0;
}
.perserveTag {
  margin-top: 10px;
  text-align: center;
}
.perserveTag .el-button {
  margin: 0 20px;
}
.perserveTag .el-button span {
  font-size: 18px;
  padding: 6px 15px;
}
</style>