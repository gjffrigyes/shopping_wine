/**
 * Created by guo on 2017/6/8.
 */
import { goodsCarAPI as goodsCarApi } from '../api'
import { sendPost } from '../index'

export default {
  getGoodsCarAsync (params, fn) {
    return sendPost(goodsCarApi.goodsCarListInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  getGoodsAddNumAsync (params, fn) {
    return sendPost(goodsCarApi.getGoodsAddNumInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  getGoodsReduceAsync (params, fn) {
    return sendPost(goodsCarApi.getGoodsReduceInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  getGoodsDeleteAsync (params, fn) {
    return sendPost(goodsCarApi.getGoodsDeleteInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  }
}
