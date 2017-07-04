/**
 * Created by guo on 2017/6/5.
 */
import { purChaseAPI as purChaseApi,goodsCarAPI as goodsCarApi } from '../api'
import { sendPost } from '../index'

export default {
  getPurchaseAsync (params, fn) {
    return sendPost(purChaseApi.purChaseInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  //搜索列表
  getPurchaseSearchAsync (params, fn) {
    return sendPost(purChaseApi.purChaseInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  //商品详细
  getPurchaseDetailAsync (params, fn) {
    return sendPost(purChaseApi.purChaseDetailInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  //购物车数量
  getGoodsNumAsync (params, fn) {
    return sendPost(purChaseApi.goodsCarNumInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  //增加购物车数量
  getGoodsAddNumAsync (params, fn) {
    return sendPost(purChaseApi.goodsCarAddNumInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  //确认订单页面
  getConfirmOrderAsync (params, fn) {
    return sendPost(purChaseApi.confirmOrderInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  //省
  getProvinceAsync (params, fn) {
    return sendPost(purChaseApi.proviceInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  //市
  getCityAsync (params, fn) {
    return sendPost(purChaseApi.cityInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  //县
  getAreaAsync (params, fn) {
    return sendPost(purChaseApi.areaInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  //生成订单页
  generateOrderAsync (params, fn) {
    return sendPost(purChaseApi.generateOrderInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  // 购物车下单页
  generateSelectGoodsOrderAsync (params, fn) {
    return sendPost(purChaseApi.generateSelectGoodsOrderInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  getPurchaseAddNumAsync (params, fn) {
    return sendPost(goodsCarApi.getGoodsAddNumInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  getPurchaseReduceAsync (params, fn) {
    return sendPost(goodsCarApi.getGoodsReduceInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
}
