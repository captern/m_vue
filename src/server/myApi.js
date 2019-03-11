import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

// 获取我的收藏列表
export const myCollect = () => fetch('/course/get-my-collect')
// 我的收藏详情
export const myCollectMain = lessonId => fetch('/course/get-course-by-id', lessonId)
// 获取我的测试列表
export const myTest = () => fetch('/test/get-my-list');
// 获取我的投票列表
export const myVote = () => fetch('/vote/get-my-vote-list');
// 获取我的课程列表
export const myLesson = (postData) => fetch('/course/get-my-course', postData, 'POST');
// 我的课程入口
export const myLessonEnter = lessonId => fetch('/course/get-my-course-by-id', lessonId);
// 获取我的课程详情
export const myLessonMain = lessonId => fetch('/course/get-my-course-detail-by-id', lessonId);
// 取消我的报名
export const cancelSignIn = lessonId => fetch('/course/cancel-sign-up-by-id', lessonId, 'POST');
// 上课签到 下课签退
export const registerCheck = postData => fetch('/course/check-by-id', postData, 'POST');
// 获取评价信息
export const getEvaluate = getData => fetch('/course/get-appraise-by-cou-id', getData);
// 提交评价信息
export const postEvaluate = postData => fetch('/course/sub-appraise', postData, 'POST');
// 获取评价结果
export const getEvaluateResult = getData => fetch('/course/get-my-appraise-by-cou-id', getData);
// 获取我的活动列表
export const myActivity = (getData) => fetch('/active/get-my-active',getData);
// 获取我的活动详情
export const activityMain = (getData) => fetch('/active/get-my-active-detail-by-id', getData);
// 取消活动报名
export const cancelActivity = (getData) => fetch('/active/cancel-sign-up-by-id', getData);
// 活动签到签退
export const activityRegister = (postData) => fetch('/active/check-by-id', postData, 'POST');


// 获取非图片的 选项详情
// export const voteMain = voteId => fetch('/vote/get-vote-by-id', voteId);
// 获取投票选项
export const voteOptions = voteId => fetch('/get-vote-option?voteId=' + voteId);
// 获取投票选项详情
// export const voteOptionsMain = voteId => fetch('/get-vote-option-main?voteId=' + voteId);
// 发送投票
export const postVote = (id, result) => fetch('/vote/sub-vote-result', {id, result}, 'POST');


// 获取投票结果
export const voteResult = (id) => fetch('/vote/get-vote-result-by-id', id);

// 获取选项详情
export const voteOptionMain = (id) => fetch('/vote/get-vote-item-by-id', id);
