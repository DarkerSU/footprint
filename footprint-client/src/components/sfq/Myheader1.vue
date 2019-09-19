<template>
  <div>
    <div
      class="header"
      :style="$store.getters.getThemeColor==0?'background-color: #202024;'
      :$store.getters.getThemeColor==1?'background-color: rgb(255, 3, 5);'
      :$store.getters.getThemeColor==2?'background-color: rgb(25, 143, 240);':''"
    >
      <div class="headerC">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="headerL">
              <img src="../../assets/img/sunfuqi/logo.png" />
              <p>足迹</p>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="headerM">
              <ul>
                <li>
                  <a href>足迹旅行家</a>
                </li>
                <li>
                  <a href>行摄资讯</a>
                </li>
                <li>
                  <a href>行摄攻略</a>
                </li>
                <li>
                  <a href>行摄最美中国</a>
                </li>
                <li>
                  <a href>我的足迹</a>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="headerR">
              <div class="headerR-search">
                <input type="text" placeholder="请输入关键词" />
                <img src="../../assets/img/sunfuqi/b39d74a95caae4e8b27fc020bb89d72.png" alt />
              </div>
              <div class="headerR-text">
                <el-button type="text" @click="dialogFormVisible = true">登录/注册</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="登录/注册" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" @blur="blur" @focus="focus"></el-input>
          <span>{{nameTxt}}</span>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="form.upwd" autocomplete="off" @blur="bull" @focus="focuu"></el-input>
          <span>{{upwdTxt}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        upwd: ""
      },
      nameTxt: "",
      upwdTxt: "",
      formLabelWidth: "120px"
    };
  },
  methods: {
    submit() {
      console.log(this.form);
      // this.dialogFormVisible = false
    },
    blur() {
      var name = this.form.name;
      //   console.log(uPattern.test(name));
      if (!name) {
        this.nameTxt = "用户名不能为空";
      } else if (!uPattern.test(name)) {
        this.nameTxt = "用户名需为4~16为字母或数字的组合";
      }
    },
    focus() {
      this.nameTxt = "用户名需为4~16为字母或数字的组合";
    },
    bull() {
      var upwd = this.form.upwd;
      // console.log(pPattern.test(upwd));
      if (!upwd) {
        this.upwdTxt = "用户名不能为空";
      } else if (!pPattern.test(upwd)) {
        this.upwdTxt = "最少6位，包括大写字母，小写字母，数字，特殊字符";
      }
    },
    focuu() {
      this.upwdTxt = "最少6位，包括大写字母，小写字母，数字，特殊字符";
    }
  }
};
</script>

<style>
.header .headerC .headerL img {
  width: 60px;
  height: 60px;
  vertical-align: top;
}

.header {
  width: 100%;
  height: 80px;
}

.header .headerC {
  margin: 0 60px;
}

.header .headerC .headerL {
  width: 200px;
  height: 60px;
  padding: 10px;
  float: left;
  clear: both;
}

.header .headerC .headerL p {
  font: 50px "楷体";
  margin: 0 0 0 15px;
  padding: 3px 0;
  display: inline-block;
  color: #fff;
}

.header .headerC .headerM {
  padding: 30px 10px;
}

.header .headerC .headerM ul {
  /* display: flex; */
  margin: 0;
  list-style: none;
}

.header .headerC .headerM ul li {
  margin: 0;
  padding: 0 20px;
  display: inline-block;
}

.header .headerC .headerM li a {
  color: #fff;
  text-decoration: none;
}

.header .headerC .headerR {
  display: flex;
  justify-content: space-between;
  padding: 20px 2px;
}
.headerR-search {
  width: 50%;
  border-bottom: 1px solid #fff;
  padding: 0 10px;
}
.headerR-text button {
  font-size: 15px;
  border: 1px solid #fff;
  margin-top: 5px;
  padding: 6px 10px;
  vertical-align: bottom;
}
.header .headerC .headerR input {
  width: 80%;
  height: 30px;
  /* border-radius: 25px; */
  border: 0;
  outline: 0;
  background-color: transparent;
  color: #fff;
}

.header .headerC .headerR input::-webkit-input-placeholder {
  color: #fff;
  font-size: 12px;
}

.header .headerC .headerR img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.header .headerC .headerR .el-button--text {
  color: #fff !important;
  /* float: right; */
  /* margin: -60px 100px 0 0 !important; */
}
.el-input__inner {
  width: 70% !important;
  height: 35px !important;
}
.el-dialog {
  width: 27% !important;
}
</style>