import 'babel-polyfill'
import 'common/js/hack'
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router/router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import {checkLogin} from './server/api'


import {getStore} from './config/mUtils'
import {getUser} from './server/api'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);

Vue.config.productionTip = false

import 'lib-flexible'




// import 'common/stylus/index.styl'
// import 'common/stylus/index.scss'
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)
// 引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
// 动态修改 title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)


router.beforeEach((to, from, next) => {
  // console.log(from.path)
  // console.log(to.path)
  if(from.path.indexOf('login') > -1 || to.path.indexOf('newslist') > -1 || to.path.indexOf('news') > -1 || to.path.indexOf('notice') > -1 || to.path.indexOf('noticelist') > -1 || to.path.indexOf('activityIndex') > -1 || to.path.indexOf('talentedIndex') > -1 || to.path == '/' || to.path == '/index' ){
  // if( to.path.indexOf('newslist') > -1 || to.path.indexOf('noticelist') > -1 || to.path.indexOf('activityIndex') > -1 || to.path.indexOf('talentedIndex') > -1 || to.path == '/' || to.path == '/index' ){
    console.log('从登陆过来的,不校验是否登录')
    next();
  }else {
    checkLogin().then(res =>{
      if(res.status){
        console.log('用户已经登录')
        next();
      }else{
        console.log('asdasdasdsssssss')
        // router.push('/login');
        next()
        next({path: "/login"});
        // router.push('/login');
      }
    })
    // next()
  }
  // console.log(to)
  // console.log(from)
  // console.log(next)
  // console.log('在这之前，验证是否登录')
  // if (getStore('user_id')) {
  //   getUser().then(res => {
  //     if (res.status) {
  //       console.log('用户登录')
  //     } else {
  //       console.log('用户未登录')
  //       router.push('/index');
  //     }
  //   })
  // }else{
  //   console.log('用户未登录')
  //   router.push('/index');
  // }
});


router.afterEach((to,from,next) => {
  // console.log(to)
  // console.log(from)
  window.scrollTo(0,0);
})

// const historySongs = loadPlay()
// processSongsUrl(historySongs).then((songs) => {
//   console.log(store)
//   console.log(store)
//   store.commit(SET_PLAY_HISTORY, songs)
// })

// const favoriteSongs = loadFavorite()
// processSongsUrl(favoriteSongs).then((songs) => {
//   store.commit(SET_FAVORITE_LIST, songs)
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
