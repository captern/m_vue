import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('../pages/index/index')
const Login = () => import('../pages/login/login')
const Register = () => import('../pages/register/register')
const User = () => import('../pages/user/user')
const ChangeUserInfo = () => import('../pages/changeUserInfo/changeUserInfo')
const ChangePas = () => import('../pages/changePas/changePas')
const NewsList = () => import('../pages/newsList/newsList')
const News = () => import('../pages/news/news')

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
    {
      path: '/changepas',
      component: ChangePas
    },
    {
      path: '/newslist',
      component: NewsList
    },
    {
      path: '/news/:newsId',
      component: News
    },
    // {
    //   path: '/login',
    //   redirect: '/recommend'
    // },
  ]
})
