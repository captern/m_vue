import 'babel-polyfill'
import 'common/js/hack'
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router/router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

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

router.afterEach((to,from,next) => {
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
