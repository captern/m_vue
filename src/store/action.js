import {getUser, getAddressList} from '../server/api'
import {GET_USERINFO} from './mutation-types.js'

export default {

  async getUserInfo({commit, state}) {
    let res = await getUser();
    if(res.status){
      commit(GET_USERINFO, res)
    }else{
      console.log('用户信息获取失败')
    }
  }
}
