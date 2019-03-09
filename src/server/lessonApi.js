import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

// 获取课程列表
export const lessonList = getData => fetch('/course/get-course-list', getData)
// 获取课程详情
export const lessonMain = lessonId => fetch('/course/get-course-by-id', lessonId);
// 报名课程
export const signLesson = lessonId => fetch('/course/sign-up-by-id', lessonId, 'POST');
// 收藏课程
export const setCollect = lessonId => fetch('/course/add-collect-by-id', lessonId, 'POST');
// 取消收藏课程
export const removeCollect = lessonId => fetch('/course/del-collect-by-id', lessonId, 'POST');
