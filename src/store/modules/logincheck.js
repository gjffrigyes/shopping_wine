/**
 * Created by guo on 2017/6/2.
 */
import login from '../../http/post/login'
import * as types from '../mutations-type'
import router from '../../router'
import { errorTips } from '../../utils/TipUtil'
const state = {
  loginMessage: {
    errorMessage:[]
  }
}
const getters = {
  loginMessage: state => state.loginMessage
}
const actions = {
  logincheck ({ commit }, params = {}) {
    login.getLoginAsync(params, data => {
      commit(types.LOGIN_CHECK, { result: data })
    })
  },
  getVerificationCode ({ commit }, params = {}) {
    login.getVerificationCodeAsync(params, data => {
      commit(types.VERIFICATIONCODE_CHECK, { result: data })
    })
  },
  getRepassword ({ commit }, params = {}) {
    console.log(params)
    login.getRepasswordAsync(params, data => {
      commit(types.REPASSWORD_CHECK, { result: data })
    })
  }
}
const mutations = {
  [types.LOGIN_CHECK] (state, mod) {
    var distributor_type = mod.result.result.user_data.distributor_type
    if(!distributor_type){
      distributor_type = 0
    }
    if(mod.result.error_code == 0){
      window.localStorage.setItem("uid",mod.result.result.id)
      window.localStorage.setItem("distributor_type",distributor_type)
      window.localStorage.setItem("username",mod.result.result.user_data.username)
      router.push({ path: '/shopping/myShopping',query: {id: mod.result.result.id}})
    }else{
      errorTips('手机号密码错误')
    }
  },
  [types.VERIFICATIONCODE_CHECK] (state, mod) {
    //console.log('------asdf-----------------')
    //console.log(mod)
    //console.log('------asdf----------------')
  },
  [types.REPASSWORD_CHECK] (state, mod) {
    //console.log('------repassword-----------------')
    //console.log(mod)
    //console.log('------repassword----------------')
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
