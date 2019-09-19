import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 主体颜色更改参数
    themeColor:0,
  },
  mutations: {
    updateTheme(state,value){
      state.themeColor=value;
    }
  },
  getters:{
    getThemeColor(state){
      return  state.themeColor;
    }
  },
  actions: {

  }
})
