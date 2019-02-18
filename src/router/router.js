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
const VoteItem = () => import('../pages/vote/voteItem')
const VoteOption = () => import('../pages/vote/voteOption')
const VoteOptionMain = () => import('../pages/vote/voteOptionMain')
const PostVote = () => import('../pages/vote/postVote')
const VoteResult = () => import('../pages/vote/voteResult')
const VoteSuccess = () => import('../pages/vote/voteSuccess')

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
    {
      path: '/voteItem/:voteId',
      component: VoteItem
    },
    {
      path: '/voteOption/:voteId',
      component: VoteOption
    },
    {
      path: '/voteOptionMain/:voteId',
      component: VoteOptionMain
    },
    {
      path: '/postVote/:voteId',
      component: PostVote
    },
    {
      path: '/voteResult/:voteId',
      component: VoteResult
    },
    {
      path: '/voteSuccess/:voteId',
      component: VoteSuccess
    },

  ]
})
