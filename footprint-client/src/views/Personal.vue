<template>
  <div class="persional">
    <myheader></myheader>
    <el-container class="persional-content">
      <el-header>
        <personalheader></personalheader>
      </el-header>
      <el-container>
        <el-aside width="200px" class="per-aside">
          <personalpage @getselect="getselect"></personalpage>
        </el-aside>
        <el-main class="footprint-user">
          <perdefault v-if="isRperdefault"></perdefault>
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <myfooter></myfooter>
  </div>
</template>

<script>
import Myheader from "../components/sfq/Myheader";
import PersonalHeader from "./zxm/PersonalHeader";
import PersonalPage from "../views/lww/PersonalPage";
import PerDefault from "../views/sxp/PerDefault";
// import PersonalBody from './sxp/PersonalBody'
import Myfooter from "./zxm/Myfooter";
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      selectM: 0,
      isRouterAlive: false,
      isRperdefault: true
    };
  },
  components: {
    myheader: Myheader,
    personalheader: PersonalHeader,
    myfooter: Myfooter,
    personalpage: PersonalPage,
    perdefault: PerDefault
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    // 用于接收子组件传来的值
    getselect(i) {
      console.log(`孩子给的:${i}`);
      this.selectM = i;
      // console.log(this.selectM);
    },
    // body页面内容路由跳转函数
    getHome() {
      var userinfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      var unum = userinfo.unum;
      console.log(unum);
      // if(unum){

      // }
      console.log(this.selectM);
      switch (this.selectM) {
        case 1.1:
          this.$router.push("/addfootprint");
          this.isRouterAlive = true;
          this.isRperdefault = false;
          break;
        case 1.2:
          this.$router.push("/showfootprint");
          this.isRouterAlive = true;
          this.isRperdefault = false;
          break;
        case 3.1:
          this.$router.push("/footprintTheme");
          this.isRouterAlive = true;
          this.isRperdefault = false;
          break;
        case 4.1:
          this.$router.push("/user");
          this.isRouterAlive = true;
          this.isRperdefault = false;
          break;
        case 4.2:
          this.$router.push("/userManagement");
          this.isRouterAlive = true;
          this.isRperdefault = false;
          break;
        case 5.1:
          this.$router.push("/userinfoupdate");
          this.isRouterAlive = true;
          this.isRperdefault = false;
          break;
        case 5.2:
          this.$router.push("/updatepwd");
          this.isRouterAlive = true;
          this.isRperdefault = false;
          break;
        // case 7.2:
        //   this.$router.push("/updatepwd");
        //   break;
        default:
          this.$router.push("/perdefault");
          this.isRouterAlive = false;
          this.isRperdefault = true;
          break;
      }
    }
  },
  watch: {
    selectM: function(newVal, oldVal) {
      // console.log(newVal, oldVal);
      this.selectM = newVal;
      // console.log(this.selectM);
      this.getHome();
    }
  },
  updated() {}
};
</script>

<style>
.persional .el-header {
  height: 160px !important;
  border-bottom: 1px solid rgb(211, 209, 209);
}
.persional .persional-content {
  margin: 30px 35px;
}
.persional .per-aside {
  border-right: 1px solid #e6e6e6;
}
.footprint-user {
  padding: 10px !important;
}
</style>