<template>
  <div class="header-content">
    <div class="Image">
      <img :src="imgURL+userlist.upic" alt />
    </div>
    <div class="des">
      <p class="user-uname">
        <span class="id">
          ID：
          <span>{{userlist.uname}}</span>
          <el-tooltip
            class="item"
            effect="dark"
            :content="userlist.urole==3?'您是高级管理员':userlist.urole==2?'您是管理员':userlist.urole==1?'您是VIP会员':'现在升级成为VIP'"
            placement="top"
          >
            <img
              :src="userlist.urole==3?require('../../assets/img/sxp/admin.png'):userlist.urole==2?require('../../assets/img/sxp/admin1.png'):userlist.urole==1?require('../../assets/img/sxp/VIP.png'):require('../../assets/img/sxp/noVIP.png')"
              alt
            />
          </el-tooltip>
        </span>
      </p>
      <ul class="header-des-ul">
        <li>
          <el-tooltip class="item" effect="dark" content="关注量" placement="top">
            <img class="header-des-icon" src="../../assets/img/zxm/gz.png" alt />
          </el-tooltip>关注量：
          <span>112</span>
        </li>
        <li>
          <el-tooltip class="item" effect="dark" content="粉丝量" placement="top">
            <img class="header-des-icon" src="../../assets/img/zxm/fs.png" alt />粉丝量：
          </el-tooltip>粉丝量：
          <span>122</span>
        </li>
        <li>
          <el-tooltip class="item" effect="dark" content="作品集" placement="top">
            <img class="header-des-icon" src="../../assets/img/zxm/zp.png" alt />
          </el-tooltip>作品集：
          <span>87</span>
        </li>
        <li>
          <el-tooltip class="item" effect="dark" content="收藏作品量" placement="top">
            <img class="header-des-icon" src="../../assets/img/zxm/sc.png" alt />
          </el-tooltip>收藏作品量：
          <span>67</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userlist: {
        uname: "",
        upic: "",
        urole: 0
      }
    };
  },
  created() {
    var userinfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    console.log(userinfo.uname);
    this.userlist.uname = userinfo.uname;
    this.userlist.upic = userinfo.upic;
    this.userlist.urole = userinfo.urole;
  }
};
</script>

<style>
.header-content {
  display: flex;
  justify-content: flex-start;
}
.header-content .Image {
  border-radius: 10px;
  /* border: 1px solid #000; */
  background-image: url("../../assets/img/sxp/bgpic.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* background-color: brown; */
  height: 120px;
  width: 120px;
  margin: 8px 10px 3px 35px;
  padding: 5px 5px;
}
.header-content .Image img {
  height: 100%;
  width: 100%;
  border-radius: 8px;
}
.header-content .des {
  /* margin-top:50px; */
  vertical-align: bottom;
  /* text-align: center; */
}
.header-content .des .user-uname {
  margin: 20px 20px;
  padding-left: 30px;
}
.header-content .des .user-uname img {
  width: 40px;
  height: 40px;
  vertical-align: -10px;
  margin-left: 15px;
}
.header-content .des ul li {
  list-style: none;
  display: inline-block;
  font-size: 18px;
  margin: 10px 45px;
}
.header-content .des ul li:first-child {
  margin-left: 10px;
}
.header-content .des .header-des-ul {
  margin: 0;
  margin-top: 50px;
  /* display: flex; */
  /* justify-content: space-between; */
  vertical-align: bottom;
}
.user-uname .id {
  font-size: 30px;
  font-weight: bolder;
}
.user-uname .id span {
  color: -webkit-linear-gradient(left, rgb(236, 51, 51), rgb(9, 236, 160));
  font: 30px "楷体";
  font-weight: bold;
  padding: 5px 0;
}
.header-content .des .header-des-ul .header-des-icon {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>