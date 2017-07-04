/**
 * Created by guo on 2017/6/2.
 */
import { loginAPI as loginApi } from '../api'
import { sendPost } from '../index'

export default {
  getLoginAsync (params, fn) {
    return sendPost(loginApi.loginInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  getVerificationCodeAsync (params, fn) {
    return sendPost(loginApi.verificationCodeInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  getRepasswordAsync (params, fn) {
    return sendPost(loginApi.rePasswordInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  }
}
