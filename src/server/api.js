import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

// 获取新闻列表
export const newsList = () => fetch('/news/get-news-list?type=1', {})

// 获取公告列表
export const newsNotice = () => fetch('/news/get-news-list?type=2', {})

// 获取新闻详情
export const newsDetail = newsId => fetch('/news/news-detail?newsId=' + newsId);

// 获取首页轮播图
export const getBanner = () => fetch('/news/get-banner', {})

// 地址拼接在连接里面的例子
export const currentcity = number => fetch('/v1/cities/' + number)

// 退出登录
export const logOut = newsId => fetch('/user/logout',{},"POST");

// 多个参数的get接口模式
export const searchplace = (cityid, value) => fetch('/v1/pois', {
  type: 'search',
  city_id: cityid,
  keyword: value
})

// 参数拼接的模式
export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
})

// 复杂模式的get
export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
  let supportStr = ''
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id
    }
  })
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  }
  return fetch('/shopping/restaurants', data)
}

// post格式获取短信验证码
export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
  mobile: phone,
  scene: 'login',
  type: 'sms'
}, 'POST')

// 获取搜索结果
export const searchRest = searchKeys => fetch('/v4/mobile/verify_code/send', {
  searchKeys: searchKeys
}, 'POST')

// 简便的post格式
export const getcaptchas = () => fetch('/v1/captchas', {}, 'POST')

// 检测帐号是否存在
export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {
  [type]: checkNumber,
  type
})

// 获取用户信息
// export const getUser = () => fetch('/user', {user_id: getStore('user_id')});

export const getUser = () => fetch('/user/get-user-info');
// 账号密码登录
// 手机号登录
// 登录
// export const accountLogin = (username, password) => fetch('/login', {username, password}, 'POST');
export const login = (mobile, password) => fetch('/user/login', {mobile, password}, 'POST');
// 注册
// export const accountLogin = (username, password) => fetch('/login', {username, password}, 'POST');
export const register = (mobile, password, sex) => fetch('/user/sign-up', {mobile, password, sex}, 'POST');
// 修改用户信息
// export const changeInfo = (user_id, userName, IdCard, workSpace) => fetch('/changeInfo', {
export const changeInfo = (name, idCard, sex, company) => fetch('/user/modify-stu', {
  name,
  idCard,
  sex,
  company
}, 'POST');
// 修改用户密码
export const changePas = (password, newpassword) => fetch('/user/reset-password', {
  password,
  newpassword
}, 'POST');

// 发送帐号
export const sendMobile = (sendData, captcha_code, type, password) => fetch('/v1/mobile/verify_code/send', {
  action: 'send',
  captcha_code,
  [type]: sendData,
  type: 'sms',
  way: type,
  password
}, 'POST')
