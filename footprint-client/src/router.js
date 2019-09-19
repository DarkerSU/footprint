import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Personal from './views/Personal.vue'
import AddFootprintTimeline from './views/sxp/AddFootprintTimeline.vue'
import ShowFootprintTimeline from './views/sxp/ShowFootprintTimeline.vue'
import Imgupload from './views/sxp/imgupload.vue'
// import ImgUp from './views/sxp/ImgUpload1.vue'
import UpdatePwd from './views/sxp/UpdatePwd.vue'
import UpdateUserInfo from './views/sxp/UpdateUserInfo.vue'
import FootprintTheme from './views/sxp/FootprintTheme'
import Tablee from './views/sfq/Tablee'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal,
      children: [
        {
          path: '/addfootprint',
          name: 'addfootprint',
          component: AddFootprintTimeline,
        },
        {
          path: '/showfootprint',
          name: 'showfootprint',
          component: ShowFootprintTimeline,
        },
        {
          path: '/footprintTheme',
          name: 'footprintTheme',
          component: FootprintTheme,
        },
        {
          path: '/user',
          name: 'user',
          component: Tablee,
        },

        {
          path: '/updatepwd',
          name: 'updatepwd',
          component: UpdatePwd,
        },
        {
          path: '/userinfoupdate',
          name: 'userinfoupdate',
          component: UpdateUserInfo,
        },
      ]
    },
  ]
})
