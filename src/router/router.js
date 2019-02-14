import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 用户部分
const Login = () => import('../pages/user/login')
const Register = () => import('../pages/user/register')
const User = () => import('../pages/user/user')
const ChangeUserInfo = () => import('../pages/user/module/changeUserInfo')
const ChangePas = () => import('../pages/user/module/changePas')

// 首页及首页列表部分
const Index = () => import('../pages/index/index')
const NewsList = () => import('../pages/newsList/newsList')
const News = () => import('../pages/newsList/news')
const NoticeList = () => import('../pages/notice/noticeList')
const Notice = () => import('../pages/notice/notice')
const Vote = () => import('../pages/vote/vote')

export default new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
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
    {
      path: '/noticelist',
      component: NoticeList
    },
    {
      path: '/notice/:noticeId',
      component: Notice
    },

    {
      path: '/vote',
      component: Vote
    },

  ]
})
