import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

// 获取活动列表
export const getActivityLists = (getData) => fetch('/active/get-active-list', getData)
// 我的收藏详情
// 获取活动列表
export const getTestLists = (getData) => fetch('/test/get-list', getData)
// 获取活动详情
export const getActivityDes = (getData) => fetch('/active/get-active-by-id', getData)
// 报名活动
export const confirmActivity = postData => fetch('/active/sign-up',postData, 'POST');
