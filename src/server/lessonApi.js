import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

// 获取课程列表
export const lessonList = getData => fetch('/course/get-course-list', getData)
// 获取课程详情
export const lessonMain = lessonId => fetch('/course/get-course-by-id', lessonId);
// 报名课程
export const signLesson = lessonId => fetch('/course/sign-up-by-id', lessonId, 'POST');
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
