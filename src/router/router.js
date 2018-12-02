import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('../pages/index/index')
const Login = () => import('../pages/login/login')
const Register = () => import('../pages/register/register')
const User = () => import('../pages/user/user')
const ChangeUserInfo = () => import('../pages/changeUserInfo/changeUserInfo')

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
    {
      path: '/register',
      component: Register
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/changeuserinfo',
      component: ChangeUserInfo
    },
    // {
    //   path: '/login',
    //   redirect: '/recommend'
    // },
  ]
})
