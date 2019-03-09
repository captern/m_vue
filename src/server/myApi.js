import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

// 获取我的收藏列表
export const myCollect = () => fetch('/course/get-my-collect')
// 获取投票详情
export const myTest = () => fetch('/test/get-my-list');
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
