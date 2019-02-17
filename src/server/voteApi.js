import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

// 获取投票列表
export const voteList = () => fetch('/get-vote', {})
// 获取投票详情
export const voteMain = voteId => fetch('/get-vote-main?voteId=' + voteId);
// 获取投票选项
export const voteOptions = voteId => fetch('/get-vote-option?voteId=' + voteId);
// 获取投票选项详情
export const voteOptionsMain = voteId => fetch('/get-vote-option-main?voteId=' + voteId);

