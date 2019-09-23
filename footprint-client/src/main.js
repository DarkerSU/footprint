import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Echarts from 'echarts'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import Vuex from 'vuex'
import BaiduMap from 'vue-baidu-map'

import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.prototype.axios=axios;
Vue.prototype.qs=qs;/* 用于post请求 */
Vue.prototype.$moment=moment;/* 用于时间转换 */
Vue.prototype.imgURL="http://127.0.0.1:5000/"  /* 配置图片访问路径 */
Vue.prototype.imgUpload="http://127.0.0.1:5000/img/file"   /* 配置全局图片上传请求 */

// 配置请求时保存基础信息
axios.defaults.withCredentials=true;
// 配置axios请求基础路径
axios.defaults.baseURL = "http://127.0.0.1:5000";
// axios.defaults.imgURL="http://127.0.0.1:5000/img/file"


Vue.use(ElementUI);
Vue.use(Echarts);
Vue.use(BaiduMap, {
  ak: '6CVV3SueRX6heAZakGOrIV7A0MzDHfNo' //官方提供的ak秘钥
});

const storeVuex=new Vuex.Store({
  state:{

  },
  mutations:{

  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  storeVuex
}).$mount('#app')
