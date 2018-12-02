import {getUser, getAddressList} from '../server/api'
import {GET_USERINFO} from './mutation-types.js'

export default {

  async getUserInfo({commit, state}) {
    let res = await getUser();
    commit(GET_USERINFO, res)
  }
}
