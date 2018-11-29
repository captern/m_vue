import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('../pages/index/index')
const Login = () => import('../pages/login/login')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    // {
    //   path: '/login',
    //   redirect: '/recommend'
    // },
  ]
})
