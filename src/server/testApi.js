import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

// 获取投票列表
export const testList = () => fetch('/test/get-list?name=', {})
// 获取投票详情
export const testMain = voteId => fetch('/test/get-test-by-id?id=' + voteId);
// 获取投票选项
export const postTestResult = (id, result) => fetch('/test/submit-test', {
  id,
  result
}, 'POST');
// 获取投票选项详情
export const voteOptionsMain = voteId => fetch('/get-vote-option-main?voteId=' + voteId);

