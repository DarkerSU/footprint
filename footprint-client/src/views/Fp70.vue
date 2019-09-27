<template>
  <div class="china-70">
    <!-- 头部 -->
    <div class="c-header"></div>
    <!-- 第一楼 -->
    <div class="c-first-floor"></div>
    <!-- 主要内容容器 -->
    <div class="c-main">
      <!-- 时间线容器 -->
      <div class="time-line" v-for="item in 6" :key="item">
        <div class="time-line-div">
          <div data--20-bottom-top="opacity:0;transform: scale(0.5); transition: all 0.5s;"
            data--50-bottom-bottom="opacity:1;transform: scale(1);">1991.2.2</div>
          <div ref="circular"></div>
          <div>1668.9.9</div>
        </div>
        <div class="img-dotted" ref="dotted"></div>

        <div class="time-line-div-right">
          <div data--20-bottom-top="opacity:0;transform: scale(0.5); transition: all 0.5s;"
            data--50-bottom-bottom="opacity:1;transform: scale(1);">1991.2.2</div>
          <div ref="circular"></div>
          <div>1668.9.9</div>
        </div>
        <div class="img-dotted-right" ref="dotted"></div>
      </div>
    </div>
    <!-- 尾部 -->
    <div class="c-footer"></div>
  </div>
</template>

<script>
  import {
    skrollrminjs
  } from "../../public/js/js/skrollr.min.js"
  export default {
    data() {
      return {
      }
    },
    methods: {},
    computed: {},
    created() {},
    mounted() {
      // window.addEventListener('load', function () { //bug 第一次进入页面不执行skrollr.init() 需要刷新后才执行skrollr.init() 控制台报错
      //   console.log('window load')
      //   skrollr.init({
      //     smoothScrolling: false
      //   });
      // })
      // console.log("mounted")
      this.$nextTick(()=>{
        skrollr.init({
           smoothScrolling: false
         });
      })
    },
    beforeDestroy() {
      let instance = skrollr.get()
      instance.destroy()
    }
  };
</script>

<style>
  /* 头部 */
  .china-70 .c-header {
    width: 100%;
    height: 425px;
    background-image: url("../../src/assets/img/LuWeiWei/c1.png");
    background-repeat: no-repeat;
    background-position: center center;
    min-width: 1366px;
  }

  /* 第一楼 */
  .china-70 .c-first-floor {
    width: 100%;
    height: 436px;
    background-image: url("../../src/assets/img/LuWeiWei/c2.png");
    background-repeat: no-repeat;
    background-position: center center;
    min-width: 1366px;
  }

  /* 主要内容容器 */
  .china-70 .c-main {
    width: 100%;
    height: auto;
    min-width: 1366px;
    background-color: #d60a16;
  }

  /* 左侧内容区 */
  .time-line {
    position: relative;
    width: 1366px;
    height: 700px;
    margin: 0 auto;
    background-color: #d60a16;
  }

  .time-line-div {
    position: relative;
    min-height: 300px;
  }

  .time-line-div>div:nth-child(1) {
    position: absolute;
    top: 50px;
    left: 25px;
    width: 450px;
    height: 300px;
    border: 3px solid #fdf47d;
    border-radius: 6px;
    transition: all 2s;
  }

  .time-line-div>div:nth-child(1):hover {
    transform: scale(1.1);
  }

  .time-line-div>div:nth-child(1)::before {
    content: "";
    position: absolute;
    right: -10px;
    top: 20px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #fdf47d;
  }

  .time-line-div>div:nth-child(2) {
    position: absolute;
    left: 677px;
    width: 15px;
    height: 15px;
    top: 75px;
    background: #fdf47d;
    border-radius: 50%;
    z-index: 10;
  }

  .time-line-div>div:nth-child(3) {
    position: absolute;
    left: 720px;
    top: 65px;
    padding: 10px;
    background: #f1bd67;
    font-size: 0.8rem;
    color: #2f0300;
    border-radius: 10px;
  }

  .img-dotted {
    position: absolute;
    width: 2px;
    height: 100%;
    top: 65px;
    left: 684px;
    z-index: 1;
    background-color: #fff481;
  }

  /* 右侧 */
  .time-line-div-right {
    position: relative;
    min-height: 300px;
  }

  .time-line-div-right>div:nth-child(1) {
    position: absolute;
    top: 50px;
    left: 880px;
    width: 450px;
    height: 300px;
    border: 3px solid #fdf47d;
    border-radius: 6px;
    transition: all 2s;
  }

  .time-line-div-right>div:nth-child(1):hover {
    transform: scale(1.1);
  }

  .time-line-div-right>div:nth-child(1)::before {
    content: "";
    position: absolute;
    top: 20px;
    left: -10px;
    border-bottom: 10px solid transparent;
    border-top: 10px solid transparent;
    border-right: 10px solid #fdf47d;
  }

  .time-line-div-right>div:nth-child(2) {
    position: absolute;
    left: 677px;
    width: 15px;
    height: 15px;
    top: 75px;
    background: #fdf47d;
    border-radius: 50%;
    z-index: 10;
  }

  .time-line-div-right>div:nth-child(3) {
    position: absolute;
    left: 580px;
    top: 65px;
    padding: 10px;
    background: #f1bd67;
    font-size: 0.8rem;
    color: #2f0300;
    border-radius: 10px;
  }

  /* .img-dotted-right {
  position: absolute;
  width: 2px;
  height: 220px;
  top: 365px;
  left: 684px;
  z-index: 1;
  background-color: #fff481;
} */

  /* 尾部 */
  .china-70 .c-footer {
    width: 100%;
    height: 594px;
    background-image: url("../../src/assets/img/LuWeiWei/c3.jpg");
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>