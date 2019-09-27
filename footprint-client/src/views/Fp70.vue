<template>
  <div class="china-70">
    <!-- 头部 -->
    <div class="c-header"></div>
    <!-- 第一楼 -->
    <div class="c-first-floor"></div>
    <!-- 主要内容容器 -->
    <div class="c-main">
      <!-- 时间线容器 -->
      <!--获取偶数下标数据加载-->
      <div class="time-line" v-for="(item,index) of sevendata" :key="index" v-if="index%2 === 0">
        <div class="time-line">
          <!-- 左侧内容 -->
          <div class="time-line-div">
            <div data--20-bottom-top="opacity:0;transform: scale(0.5); transition: all 0.5s;"
              data--50-bottom-bottom="opacity:1;transform: scale(1);">
              <div class="time-line-pic">
                <img :src="imgURL+item.chimg">
              </div>
              <div class="time-content">
                {{item.chtext}}
              </div>
            </div>
            <div ref="circular"></div>
            <div>{{item.chdate}}</div>
          </div>
          <div class="img-dotted" ref="dotted"></div>

          <!-- 右侧内容 获取奇数下标数据加载-->
          <div class="time-line-div-right" v-if="sevendata[index + 1] != undefined">
            <div data--20-bottom-top="opacity:0;transform: scale(0.5); transition: all 0.5s;"
              data--50-bottom-bottom="opacity:1;transform: scale(1);">
              <div class="time-line-pic">
                <img :src="imgURL+sevendata[index+1].chimg">
              </div>
              <div class="time-content">
                {{sevendata[index+1].chtext}}
              </div>
            </div>
            <div ref="circular"></div>
            <div>{{sevendata[index+1].chdate}}</div>
          </div>
        </div>
      </div>
      <!-- 尾部 -->
      <div class="c-footer"></div>
    </div>
  </div>
</template>

<script>
  import {
    skrollrminjs
  } from "../../public/js/js/skrollr.min.js"
  export default {
    data() {
      return {
        sevendata: [],
      }
    },
    methods: {
      getsevendata() {
        this.axios.get("/fp70").then(res => {
          // this.sevendata = res.data.data
          // console.log(res.data)
          // console.log(res.data.data)
          // console.log(this.sevendata)
          // 日期解析
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].chdate =  this.$moment(res.data.data[i].chdate).format("YYYY-MM-DD");
            // console.log(res.data.data[i].chdate);
            // this.sevendata.push(res.data.data[i].chdate)
            // console.log(this.sevendata)
          }
          this.sevendata = res.data.data
        })
      },
    },
    computed: {},
    created() {
      this.getsevendata()
    },

    //事件监听
    mounted() {
      // this.$nextTick(() => {
      //   skrollr.init({
      //     smoothScrolling: false
      //   });
      // })
      // Load事件在所有文件从所有资源(包括ADS和图像)加载完毕时触发。
      window.addEventListener('load', function () {
        console.log('window load')
        skrollr.init({
          smoothScrolling: false
        });
      })
      console.log('mountend')
    },

    //销毁
    // beforeDestroy() {
    //   let instance = skrollr.get()
    //   instance.destroy()
    // }
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
    background-size: 100% 100%;
    min-width: 1366px;
  }

  /* 第一楼 */
  .china-70 .c-first-floor {
    width: 100%;
    height: 436px;
    background-image: url("../../src/assets/img/LuWeiWei/c2.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 101%;
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
    right: -60px;
    top: 13px;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 57px solid #fdf47d;
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
    left: 698px;
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

  .time-line-pic {
    width: 100%;
    height: 80%;
    overflow: hidden;
    border-radius: 6px;
    /* margin-bottom: 10px; */
  }

  .time-line-pic img {
    width: 100%;
    height: 100%;
  }

  .time-content {
    width: 100%;
    height: 20%;
    font-size: 15px;
    font-weight: 900;
    color: aliceblue;
    text-indent: 0.8cm;
    padding: 5px;
    box-sizing: border-box;
    text-overflow: ellipsis;
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
    top: 13px;
    left: -60px;
    border-bottom: 15px solid transparent;
    border-top: 15px solid transparent;
    border-right: 57px solid #fdf47d;
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
    left: 572px;
    top: 65px;
    padding: 10px;
    background: #f1bd67;
    font-size: 0.8rem;
    color: #2f0300;
    border-radius: 10px;
  }

  /* 尾部 */
  .china-70 .c-footer {
    width: 100%;
    height: 594px;
    background-image: url("../../src/assets/img/LuWeiWei/c3.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
</style>