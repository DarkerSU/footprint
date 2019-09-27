<template>
  <div class="fptheme">
    <div class="fptheme-color fptheme1" @click="selected(0)">
      <div>
        <p class="theme-txt">炫酷黑</p>
      </div>
      <div class="fpselected">
        <img :src="select1==1?selectedurl:''" alt />
      </div>
    </div>
    <div class="fptheme-color fptheme2" @click="selected(1)">
      <div>
        <p class="theme-txt">中国红</p>
      </div>
      <div class="fpselected">
        <img :src="select2==1?selectedurl:''" alt />
      </div>
    </div>
    <div class="fptheme-color fptheme3" @click="selected(2)">
      <div>
        <p class="theme-txt">忧郁蓝</p>
      </div>
      <div class="fpselected">
        <img :src="select3==1?selectedurl:''" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select1: 1,
      select2: 0,
      select3: 0,
      selectedurl: require("../../assets/img/sxp/selected.png")
    };
  },
  methods: {
    selected(i) {
      // console.log(i);
      switch (i) {
        case 0:
          this.select1 = 1;
          this.select2 = 0;
          this.select3 = 0;
          this.updateTheme(0);
          break;
        case 1:
          this.select1 = 0;
          this.select2 = 1;
          this.select3 = 0;
          this.updateTheme(1);
          break;
        case 2:
          this.select1 = 0;
          this.select2 = 0;
          this.select3 = 1;
          this.updateTheme(2);
          break;
      }
    },
    updateTheme(value){
        // console.log("value:"+value)
        this.$store.commit("updateTheme",value)
    }
  }
};
</script>

<style>
.fptheme .fptheme-color {
  width: 200px;
  height: 140px;
  margin: 10px 20px;
  border-radius: 8px;
  position: relative;
}
.fptheme .fptheme1 {
  float: left;
  background-color: rgb(43, 41, 41);
}
.fptheme .fptheme2 {
  float: left;
  background: -webkit-linear-gradient(bottom,rgb(155, 52, 52),rgb(218, 28, 22))
}
.fptheme .fptheme3 {
  float: left;
  background-color: rgb(25, 143, 240);
}
.theme-txt {
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin: 58px auto;
}
.fptheme .fptheme-color .fpselected {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 0;
  right: 0;
}
.fptheme .fptheme-color .fpselected img {
  width: 100%;
  height: 100%;
}
</style>