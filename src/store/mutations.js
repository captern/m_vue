import {RECORD_USERINFO, GET_USERINFO, RETSET_NAME} from './mutation-types.js'

import {setStore} from '../config/mUtils'

// import {localapi, proapi} from 'src/config/env'

export default {
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info
    state.login = true
    setStore('user_id', info.data.user_id)
  },
  // 获取用户信息存入vuex
  [GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...(info.userInfo)}
    } else {
      state.userInfo = null
    }
  },
  // 修改用户名
  [RETSET_NAME](state, username) {
    console.log('12121')
    console.log(state.userInfo)
    state.userInfo = Object.assign({}, state.userInfo, {username})
  }
}
