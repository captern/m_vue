import fetch from '../config/fetch'
import Vue from 'vue'
import {getStore} from '../config/mUtils'

// 获取测试列表
export const testList = getData => fetch('/test/get-list', getData)
// export const testList = () => Vue.axios.get('/test/get-list?name=')
// 获取测试详情
export const testMain = testId => fetch('/test/get-test-by-id?id=' + testId);
// 获取测试描述
export const testDes = testId => fetch('/test/get-test-detail-by-id?id=' + testId);
// export const testMain = voteId => fetch('/test/get-test-by-id?id=' + voteId);
// 获取测试选项
export const postTestResult = (id, result) => fetch('/test/submit-test', {
  id,
  result
}, 'POST');
//
export const getResult = testId => fetch('/test/get-result?id=' + testId);

//
export const getFail = testId => fetch('/test/get-wrong-by-id?id=' + testId);

