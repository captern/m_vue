import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 用户部分
const Login = () => import('../pages/user/login')
const Register = () => import('../pages/user/register')
const User = () => import('../pages/user/user')
const ChangeUserInfo = () => import('../pages/user/module/changeUserInfo')
const ChangePas = () => import('../pages/user/module/changePas')
const ChangePasCheck = () => import('../pages/user/module/changePasCheck')

// 首页及首页列表部分
const Index = () => import('../pages/index/index')
const TalentedIndex = () => import('../pages/talented/talentedIndex')
const ActivityIndex = () => import('../pages/activity/activityIndex')
const NewsList = () => import('../pages/new/newsList')
const News = () => import('../pages/new/news')
const NoticeList = () => import('../pages/notice/noticeList')
const Notice = () => import('../pages/notice/notice')
const Vote = () => import('../pages/vote/vote')
const VoteItem = () => import('../pages/vote/voteItem')
const VoteOption = () => import('../pages/vote/voteOption')
const VoteOptionMain = () => import('../pages/vote/voteOptionMain')
const PostVote = () => import('../pages/vote/postVote')
const VoteResult = () => import('../pages/vote/voteResult')
const VoteSuccess = () => import('../pages/vote/voteSuccess')
// 测试部分
const Test = () => import('../pages/test/test')
const TestDes = () => import('../pages/test/testDes')
const TestMain = () => import('../pages/test/testMain')
const TestResult = () => import('../pages/test/testResult')
const TestFail = () => import('../pages/test/testFail')
// 课程部分
const LessonList = () => import('../pages/lesson/lessonList')
const LessonMain = () => import('../pages/lesson/lessonMain')

export default new Router({
  mode: 'history',
  // mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
    },
    // 人才基地首页
    {
      path: '/talentedIndex',
      component: TalentedIndex,
    },
    // 活动首页
    {
      path: '/activityIndex',
      component: ActivityIndex,
    },
    {
      path: '/login',
      component: Login
    }, {
      path: '/register',
      component: Register
    }, {
      path: '/user',
      component: User
    }, {
      path: '/changeuserinfo',
      component: ChangeUserInfo
    }, {
      path: '/changepas',
      component: ChangePas
    }, {
      path: '/changepascheck',
      component: ChangePasCheck
    }, {
      path: '/newslist',
      component: NewsList
    }, {
      path: '/news/:newsId',
      component: News
    }, {
      path: '/noticelist',
      component: NoticeList
    }, {
      path: '/notice/:noticeId',
      component: Notice
    }, {
      path: '/vote',
      component: Vote
    }, {
      path: '/voteItem/:voteId',
      component: VoteItem
    }, {
      path: '/voteOption/:voteId',
      component: VoteOption
    }, {
      path: '/voteOptionMain/:voteId',
      component: VoteOptionMain
    }, {
      path: '/postVote/:voteId',
      component: PostVote
    }, {
      path: '/voteResult/:voteId',
      component: VoteResult
    }, {
      path: '/voteSuccess/:voteId',
      component: VoteSuccess
    },
    // 测试部分
    {
      path: '/test',
      component: Test
    }, {
      path: '/testDes/:testId',
      component: TestDes
    }, {
      path: '/testMain/:testId',
      component: TestMain
    }, {
      path: '/testResult/:testId',
      component: TestResult
    }, {
      path: '/testFail/:testId',
      component: TestFail
    },
    // 课程部分
    {
      path: '/lessonList',
      component: LessonList
    }, {
      path: '/lessonMain/:testId',
      component: LessonMain
    },
  ]
})
