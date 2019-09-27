<template>
  <div class="per-page">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1" v-if="fpshow">
        <template slot="title">
          <span class="side-title">我的足迹</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="handleselect(1.1)">添加足迹</el-menu-item>
          <el-menu-item index="1-2" @click="handleselect(1.2)">查看足迹</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2" v-if="cellshow">
        <template slot="title">
          <span class="side-title">收藏足迹</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="handleselect(2.1)">已收藏足迹</el-menu-item>
          <el-menu-item index="2-2" @click="handleselect(2.2)">已评论足迹</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3" v-if="themeshow">
        <template slot="title">
          <span class="side-title">主题设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="handleselect(3.1)">选择主题</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4" v-if="usershow">
        <template slot="title">
          <span class="side-title">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" @click="handleselect(4.1)">用户列表</el-menu-item>
          <el-menu-item index="4-2" @click="handleselect(4.2)">角色授权</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="5" v-if="szshow">
        <template slot="title">
          <span class="side-title">设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1" @click="handleselect(5.1)">个人资料</el-menu-item>
          <el-menu-item index="5-2" @click="handleselect(5.2)">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fpshow: false,
      cellshow: false,
      themeshow: false,
      usershow: false,
      szshow: false
    };
  },
  methods: {
    roleShow() {
      var userinfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      var role = userinfo.urole;
      if (role == 3) {
        this.fpshow = true;
        this.cellshow = true;
        this.themeshow = true;
        this.usershow = true;
        this.szshow = true;
      } else if (role == 2) {
        this.fpshow = true;
        this.cellshow = true;
        this.themeshow = true;
        this.usershow = true;
        this.szshow = true;
      } else if (role == 1) {
        this.fpshow = true;
        this.cellshow = true;
        this.themeshow = true;
        this.usershow = false;
        this.szshow = true;
      } else if (role == 0) {
        this.fpshow = true;
        this.cellshow = true;
        this.themeshow = false;
        this.usershow = false;
        this.szshow = true;
      }
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 用于子组件给父组件传值
    handleselect(value) {
      // console.log(`要给home组件的值：${value}`);
      this.$emit("getselect", value);
    }
  },
  created(){
    this.roleShow();
  }
};
</script>

<style>
.per-page .el-menu-vertical-demo.el-menu {
  min-height: 585px;
  margin-top: 50px;
  border: none;
}
.per-page .el-menu-vertical-demo.el-menu .el-submenu .el-submenu__title:hover {
  /* font-size: 18px; */
  /* font-family: inherit; */
  border-left: 2px solid rgb(47, 167, 236);
}
.per-page .el-submenu {
  margin: 5px 0px;
}
.per-page .side-title {
  padding-left: 10px;
  font: 20px "楷体";
  font-weight: 600;
}
.per-page .el-submenu .el-menu-item {
  font: 15px "楷体";
  padding: 15px 0 15px 15px;
  vertical-align: middle;
  margin-left: 10px;
}
.per-page .el-submenu .el-menu-item:hover {
  border-left: 2px solid rgb(31, 218, 162);
}
</style>