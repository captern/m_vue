/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = 'http://ctc.netcchina.com'
let routerMode = 'hash'
let imgBaseUrl = ''

if (process.env.NODE_ENV === 'development') {
  imgBaseUrl = '/img/'
  // baseUrl = 'https://www.easy-mock.com/mock/5c07e3027f3a33135e52a461/exapmle'
  baseUrl = 'http://ctc.netcchina.com'
  // baseUrl = 'http://127.0.0.1'
  // baseUrl = 'http://ctc.netcchina.com'
} else if (process.env.NODE_ENV === 'production') {
  // baseUrl = 'https://www.easy-mock.com/mock/5c07e3027f3a33135e52a461/exapmle'
  // baseUrl = 'http://www.frontend.com'
  // baseUrl = 'http://127.0.0.1'
  baseUrl = 'http://ctc.netcchina.com'
  imgBaseUrl = '//elm.cangdu.org/img/'
}
export {
  baseUrl,
  routerMode,
  imgBaseUrl
}
