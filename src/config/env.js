/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = 'https://www.easy-mock.com/mock/5b23592f70839c5abe06ec0f/wdemo'
let routerMode = 'hash'
let imgBaseUrl = ''

if (process.env.NODE_ENV === 'development') {
  imgBaseUrl = '/img/'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://www.easy-mock.com/mock/5b23592f70839c5abe06ec0f/wdemo'
  imgBaseUrl = '//elm.cangdu.org/img/'
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl
}
