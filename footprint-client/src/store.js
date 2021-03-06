import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 主体颜色更改参数
    themeColor: 0,
    lng_lat:[],
    fptag:[],
  },
  mutations: {
    updateTheme(state, value) {
      state.themeColor = value;
    },
    updatalng_lat(state, value) {
      state.lng_lat = value;
    },
    updatefpTag(state,value){
      state.fptag=value
    }
  },
  getters: {
    getThemeColor(state) {
      return state.themeColor;
    },
    getlng_lat(state) {
      return state.lng_lat;
    },
    getfpTag(state){
      return state.fptag;
    }
  },
  actions: {

  }
})
