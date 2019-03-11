import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

// 获取活动列表
export const getActivityLists = (getData) => fetch('/active/get-active-list', getData)
// 我的收藏详情
export const myActivity = (getData) => fetch('/active/get-my-active',getData);
