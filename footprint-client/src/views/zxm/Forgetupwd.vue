<template>
  <div>
    <!-- 审核步骤 -->
    <div class="forget-step">
      <el-steps :active="show" finish-status="success">
        <el-step title="修改密码"></el-step>
        <el-step title="信息确认"></el-step>
        <el-step title="修改成功"></el-step>
      </el-steps>
    </div>
    <!-- 修改密码详情 -->
    <div class="forget-details">
      <!-- 账号 -->
      <el-row class="forget-detail1" :class="show==1?'':'forget-imfor'">
        <el-col :span="8">
          <div class="grid-content">账号(手机号码)</div>
        </el-col>
        <el-col :span="8">
          <el-input @input="blur" @focus="focus" placeholder="请输入您的手机号码" v-model="form.unum" class="details-input">
          </el-input>
        </el-col>
        <el-col :span="8">
          <span class="ts" :class="forget_unum==0?'active':''">请输入有效的11位手机号码</span>
          <span class="ts" :class="forget_unum==1?'active el-icon-circle-close':''">请输入正确的11位有效手机号码</span>
          <span class="ts" :class="forget_unum==2?'active el-icon-circle-check':''">手机号码格式正确</span>
        </el-col>
      </el-row>
      <span class="forget-imfor" :class="show==2?'active':''">账号(手机号码):{{form.unum}}</span>
      <!-- 邮箱 -->
      <el-row :class="show==1?'':'forget-imfor'">
        <el-col :span="8">
          <div class="grid-content">邮箱</div>
        </el-col>
        <el-col :span="8">
          <el-input @input="blure" @focus="focuse" class="details-input" v-model="form.email"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="ts" :class="forget_email==0?'active':''">请输入您的邮箱账号</span>
          <span class="ts" :class="forget_email==1?'active el-icon-circle-close':''">请输入正确的邮箱账号</span>
          <span class="ts" :class="forget_email==2?'active el-icon-circle-check':''">邮箱账号格式正确</span>
        </el-col>
      </el-row>
      <span class="forget-imfor" :class="show==2?'active':''">邮箱:{{form.email}}</span>
      <!-- 新密码 -->
      <el-row :class="show==1?'':'forget-imfor'">
        <el-col :span="8">
          <div class="grid-content">新密码</div>
        </el-col>
        <el-col :span="8">
          <el-input @input="bull" @focus="focuu" type="password" class="details-input" v-model="form.upwd"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="ts" :class="forget_upwd==0?'active':''">以字母开头，长度在6-18之间，只能包含字符、数字和下划线</span>
          <span class="ts"
            :class="forget_upwd==1?'active el-icon-circle-close':''">请输入正确的格式:以字母开头，长度在6-18之间，只能包含字符、数字和下划线</span>
          <span class="ts" :class="forget_upwd==2?'active el-icon-circle-check':''">密码格式正确</span>
        </el-col>
      </el-row>
      <span class="forget-imfor" :class="show==2?'active':''">新密码:{{form.upwd}}</span>
      <!-- 密码二次确认 -->
      <el-row :class="show==1?'':'forget-imfor'">
        <el-col :span="8">
          <div class="grid-content">密码确认</div>
        </el-col>
        <el-col :span="8">
          <el-input @input="bull2" @focus="focuu2" type="password" class="details-input" v-model="form.upwd2">
          </el-input>
        </el-col>
        <el-col :span="8">
          <span class="ts" :class="forget_upwd2==0?'active':''">请再次输入密码</span>
          <span class="ts" :class="forget_upwd2==1?'active el-icon-circle-close':''">密码与第一次不符</span>
          <span class="ts" :class="forget_upwd2==2?'active el-icon-circle-check':''">密码与第一次相符</span>
        </el-col>
      </el-row>
      <div>
        <span class="forget-imfor" :class="show==2?'active':''">密码确认:{{form.upwd2}}</span>
      </div>
      <!-- 手机验证码 -->
      <!-- <el-row>
        <el-col :span="8">
          <div class="grid-content">手机验证码</div>
        </el-col>
        <el-col :span="8">
          <el-input class="details-input1"></el-input>
          <el-button type="info" size="small" class="forget-sendinfor">获取验证码</el-button>
        </el-col>
        <el-col :span="8">

        </el-col>
      </el-row> -->

    </div>
    <!-- 提交审核按钮 -->
    <div class="forget-btn" :class="show==1?'':'forget-imfor'">
      <el-button type="primary" @click="present"
        :disabled="forget_unum==2&forget_upwd==2&forget_upwd2==2&forget_email==2?false:''">修改密码</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </div>
    <div class="forget-imfor" :class="show==2?'active':''">
      <el-button type="primary" plain @click="affirm">确认提交</el-button>
    </div>
    <div :class="show==3?'el-icon-success':'forget-imfor'" class="forget-success">

      恭喜您,修改成功啦!
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          unum: "",
          upwd: "",
          upwd2: "",
          email: "",
        },
        show: 1,
        forget_unum: -1,
        forget_upwd: -1,
        forget_upwd2: -1,
        forget_email: -1,
        ePattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, //邮箱正则表达式
        uPattern: /^1[3-8]\d{9}$/, // 手机号正则验证表达式
        pPattern: /^[a-zA-Z]\w{5,17}$/, //账号正则  以字母开头，长度在6-18之间，只能包含字符、数字和下划线
      }
    }, 
    methods: {
      affirm(){
             // 请求数据库,修改密码
            var formData={
              'unum':this.form.unum,
              'newpwd1':this.form.upwd
            }
             this.axios.put("/user/updateUserPwd",this.qs.stringify(formData)).then(res => {
              // 回调函数:接收服务器返回数据
              if (res.data.code == 1) {
                this.show = 3
              }else if(res.data.code == -1){
                this.$message.error("修改失败,请重新修改");
                this.show = 1
              }
            });
            
      },
      cancel() {
        this.$router.push('/')
      },
      present() {
        // this.show = 2;
        // 数据库查询账号是否存在
        this.axios.get("/user/unumReg", {
          params: {
            unum: this.form.unum
          }
        }).then(res => {
          // 回调函数:接收服务器返回数据
          if (res.data.code == 1) {
            // 用户名存在,可以修改密码  
            this.show = 2
            // return
          } else {
            // 否则用户名不存在,不能修改密码,要先注册
            this.$message.error("用户名不存在,不能修改密码,请先注册")
            this.show = 1
          }
        });

      },
      // 判断input输入框内的内容是否符合正则表达式的要求
      // 封装一个函数,用于重复的验证
      // 封装失去焦点时的函数,用于后期失去焦点时的调用
      Verification(content, Pattern) {
        // content用于验证,是一个需要等待验证的参数,来自于input
        // Pattern是一个正则表达式,用于验证a参数是否正确
        // 验证过后return出数值,用于赋值给状态控制的数值
        if (!content) {
          return 0;
        } else if (!Pattern.test(content)) {
          return 1;
        } else if (Pattern.test(content)) {
          return 2;
        }
      },
      // 封装获得焦点时的函数,用于后期获得焦点时的调用
      // testing(content, Pattern) {
      //   if (!content) {
      //     return 0;
      //   } else if (!Pattern.test(content)) {
      //     return 1;
      //   } else if (Pattern.test(content)) {
      //     return 2;
      //   }
      // },
      // 邮箱失去焦点时
      blure() {
        this.forget_email = this.Verification(this.form.email, this.ePattern);
      },
      focuse() {
        this.forget_email = this.Verification(this.form.email, this.ePattern);
      },
      // 账号失去焦点时
      blur() {
        this.forget_unum = this.Verification(this.form.unum, this.uPattern);
      },
      // 账号获得焦点时
      focus() {
        this.forget_unum = this.Verification(this.form.unum, this.uPattern);
      },
      //密码失去焦点时
      bull() {
        this.forget_upwd = this.Verification(this.form.upwd, this.pPattern);
      },
      // 密码获得焦点时
      focuu() {
        this.forget_upwd = this.Verification(this.form.upwd, this.pPattern);
      },
      // 二次确认密码失去焦点时
      bull2() {
        if (!this.form.upwd2) {
          this.forget_upwd2 = 0;
        } else if (this.form.upwd2 == this.form.upwd) {
          this.forget_upwd2 = 2;
        } else {
          this.forget_upwd2 = 1;
        }
      },
      // 二次确认密码获得焦点时
      focuu2() {
        if (!this.form.upwd2) {
          this.forget_upwd2 = 0;
        } else if (this.form.upwd2 == this.form.upwd) {
          this.forget_upwd2 = 2;
        } else {
          this.forget_upwd2 = 1;
        }
      },
    },
  };
</script>

<style>
  .el-icon-success.forget-success {
    width: 250px;
    height: 200px;
    margin: 150px auto;
    font-size: 24px;
    color: rgb(64, 171, 233);
    display: block
  }

  .forget-imfor {
    display: none;
    margin: 80px 630px;
    font-size: 18px;
  }

  .forget-imfor.active {
    display: block;
  }

  .ts {
    display: none;
  }

  .ts.active {
    display: block;
    margin-top: 10px
  }

  /* #app,
  body {
    width: 90%;
    margin: 40px auto;
  } */

  .forget-step .el-steps {
    padding: 70px 200px;
  }

  .forget-step .el-step__title {
    font-size: 24px;
    margin: 0 -13px;
  }

  .forget-step .el-step__icon {
    width: 40px;
    height: 40px;
    font-size: 30px;
  }

  .forget-step .el-step__line {
    top: 20px !important;
  }

  .forget-details .el-row {
    margin: 20px auto;
    /* margin-top:80px; */
    width: 55%;
  }

  .forget-details .el-row .details-input1 {
    width: 70%
  }

  .forget-details .el-row .forget-sendinfor.el-button {
    padding: 9px 7px;
  }

  .forget-details .forget-detail1 {
    margin-top: 100px
  }

  .forget-details .grid-content {
    text-align: right;
    padding: 10px 20px;
    font-size: 18px
  }

  .forget-details .el-input__inner {
    width: 98% !important;
    height: 40px !important;
  }

  .forget-btn {
    text-align: center
  }
</style>