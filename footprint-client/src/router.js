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
import UserManagement from './views/sfq/UserManagement'
import Showblockfootprint from './views/sxp/Showblockfootprint'
import Forgetupwd from './views/zxm/Forgetupwd'
import CollectFootprint from './views/sxp/CollectFootprint'
import CommentFootprint from './views/sxp/CommentFootprint'
import Fp70 from './views/Fp70'
import HomeShowFP from './views/sxp/HomeShowFP'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path:'/'
    // },
    {
      path: '/',
      name: 'home',
      component: Home,
      // meta:islogin,
    },
    {
      path: '/showfpTimeline',
      name: 'showfpTimeline',
      component: ShowFootprintTimeline,
    },
    {
      path: '/fp70',
      name: 'fp70',
      component: Fp70,
    },
    {
      path: '/forgetpwd',
      name: 'forgetpwd',
      component: Forgetupwd,
    },
    {
      path: '/homeshowfp',
      name: 'homeshowfp',
      component: HomeShowFP,
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
          path: '/showblockfootprint',
          name: 'showblockfootprint',
          component: Showblockfootprint,
        },
        {
          path: '/collectfootprint',
          name: 'collectfootprint',
          component: CollectFootprint,
        },
        {
          path: '/commentfootprint',
          name: 'commentfootprint',
          component: CommentFootprint,
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
          path: '/userManagement',
          name: 'userManagement',
          component: UserManagement,
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
