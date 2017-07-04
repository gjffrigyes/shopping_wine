/**
 * Created by guo on 2017/6/5.
 */
import purchase from '../../http/post/purchase'
import * as types from '../mutations-type'
import router from '../../router'
import { errorTips,sueecssTips } from '../../utils/TipUtil'
const state = {
  purchase: {
    total_count:[],
    items: [],
    disabled:false,
    searchList: [],
    goodsDetail: {
      goods_basic_info:[],
      goods_sale_info:[],
      goods_desc:[]
    },
    num:0,
    confirmOrderList: {
      shopping_car_list:{}
    },
    areabox: {
      province:{},
      city:{},
      area:{}
    },
    car_id:[],
    order_amount:0,
    allpage:0
  }
}
const getters = {
  purchase: state => state.purchase
}
const actions = {
  getPurchaseList ({ commit }, params = {}) {
    state.purchase.disabled = true
    purchase.getPurchaseAsync(params, data => {
      commit(types.PURCHASE_LIST, { result: data,params:params })
      state.purchase.disabled = false
    })
  },
  getPurchaseSearchList ({ commit }, params = {}) {
    state.purchase.disabled = true
    purchase.getPurchaseSearchAsync(params, data => {
      commit(types.PURCHASE_SEARCH_LIST, { result: data,params:params })
      state.purchase.disabled = false
    })
  },
  getGoodsDetail ({ commit }, params = {}) {
    purchase.getPurchaseDetailAsync(params, data => {
      commit(types.PURCHASE_DETAIL, { result: data })
    })
  },
  getGoodsNum ({ commit }, params = {}) {
    purchase.getGoodsNumAsync(params, data => {
      commit(types.GOODS_NUM, { result: data })
    })
  },
  getAddCarNum ({ commit }, params = {}) {
    purchase.getGoodsAddNumAsync(params, data => {
      commit(types.ADD_NUM, { result: data })
    })
  },
  getConfirmOrder ({ commit }, params = {}) {
    purchase.getConfirmOrderAsync(params, data => {
      commit(types.CONFIEM_ORDER, { result: data })
    })
  },
  //省
  getProvince ({ commit }, params = {}) {
    purchase.getProvinceAsync(params, data => {
      commit(types.PROVINCE_LIST, { result: data })
    })
  },
  //市
  getCity ({ commit }, params = {}) {
    console.log(params)
    purchase.getCityAsync(params, data => {
      commit(types.CITY_LIST, { result: data })
    })
  },
  //县
  getArea ({ commit }, params = {}) {
    purchase.getAreaAsync(params, data => {
      commit(types.AREA_LIST, { result: data })
    })
  },
  //生成订单页
  generateOrder ({ commit }, params = {}) {
    purchase.generateOrderAsync(params, data => {
      commit(types.GENERATE_ORDER, { result: data })
    })
  },
  //单个物品选择购物车
  getSelectGoodsOrder ({ commit }, params = {}) {
    purchase.generateSelectGoodsOrderAsync(params, data => {
      commit(types.SELECT_GOODS_ORDER, { result: data })
    })
  },
  //加
  getConfirmGoodsAddNum ({ commit }, params = {}) {
    //console.log(params)
    purchase.getPurchaseAddNumAsync(params, data => {
      commit(types.PURCHASE_ADD_LIST, { result: data,params: params})
    })
  },
  //减
  getConfirmGoodsReduceNum ({ commit }, params = {}) {
    purchase.getPurchaseReduceAsync(params, data => {
      commit(types.PURCHASE_REDUCE_LIST, { result: data,params: params })
    })
  }
}
const mutations = {
  [types.PURCHASE_LIST] (state, mod) {
    state.purchase.allpage = Math.ceil(mod.result.total_count/20)
    let page = mod.params.page
    if (page > 1 && page < state.purchase.allpage + 1) {
      mod.result.result.forEach(function (good) {
        state.purchase.items.push(good)
        return
      })
    } else if (page == 1) {
      state.purchase.items = mod.result.result
    }
  },
  [types.PURCHASE_SEARCH_LIST] (state, mod) {
    /*console.log('-----------------------')
    console.log(mod)
    console.log('-----------------------')*/
    if(!mod.params.goods_serach_keywords){
      state.purchase.searchList = []
    }else{
      state.purchase.allpage = Math.ceil(mod.result.total_count/20)
      let page = mod.params.page
      if (page > 1 && page < state.purchase.allpage + 1) {
        mod.result.result.forEach(function (good) {
          state.purchase.searchList.push(good)
          return
        })
      } else if (page == 1) {
        /*console.log('==============================')
         console.log(state.purchase.searchList)
         console.log('==============================')*/
        state.purchase.searchList = mod.result.result
        /*console.log('==============================')
         console.log(state.purchase.searchList)
         console.log('==============================')*/
      }
    }
  },
  //物品详情
  [types.PURCHASE_DETAIL] (state, mod) {
    console.log('-------------detail----------')
    console.log(typeof mod.result.result[0].data.goods_basic_info.goods_pic)
    console.log('-------------detail----------')
    state.purchase.goodsDetail.goods_desc = mod.result.result[0].data.goods_desc
    state.purchase.goodsDetail.goods_basic_info = mod.result.result[0].data.goods_basic_info
    state.purchase.goodsDetail.goods_sale_info = mod.result.result[0].data.goods_sale_info
  },
  [types.GOODS_NUM] (state, mod) {
    if(!mod.result.result[0]){
      state.purchase.num = '0'
    }else{
      state.purchase.num = mod.result.result[0].op_data.shopping_cart_number
    }
  },
  [types.ADD_NUM] (state, mod) {
    if(mod.result.error_code == '0'){
      sueecssTips('加入购物车成功')
    }
    if(!mod.result.result[0]){
      state.purchase.num = mod.result.result.op_data.shopping_cart_number
    }else{
      state.purchase.num = mod.result.result[0].op_data.shopping_cart_number
    }
  },
  [types.CONFIEM_ORDER] (state, mod) {
    state.purchase.confirmOrderList = mod.result.result
    var car_id=''
    for(var i=0; i<mod.result.result.shopping_cart_list.length;i++){
      var singId = mod.result.result.shopping_cart_list[i].id
      var cart_number = mod.result.result.shopping_cart_list[i].op_data.shopping_cart_number
      var salePrice = mod.result.result.shopping_cart_list[i].goods.data.goods_sale_info.sale_price
      car_id = car_id?car_id+','+singId:singId
      state.purchase.car_id = car_id
      state.purchase.order_amount += cart_number * salePrice

    }
  },
  [types.PROVINCE_LIST] (state, mod) {
    state.purchase.areabox.province = mod.result.result
  },
  [types.CITY_LIST] (state, mod) {
    let num = mod.result.error_code
    if(num == 0){
      state.purchase.disabled = true
      state.purchase.areabox.city = mod.result.result
    }

  },
  [types.AREA_LIST] (state, mod) {
    state.purchase.areabox.area = mod.result.result
  },
  [types.GENERATE_ORDER] (state, mod) {
    if(mod.result.error_code=='0'){
      router.push({ path: '/order',query: {id:mod.result.result[0].id,state: 2}})
    }
  },
  [types.SELECT_GOODS_ORDER] (state, mod) {
    if(!mod.result.result.shopping_cart_list.length){
      router.push({ path: '/shopping/shoppingCar' })
    }else{
      state.purchase.confirmOrderList = mod.result.result
    }
    /*var car_id=''
    state.purchase.order_amount=0
    for(var i=0; i<mod.result.result.shopping_cart_list.length;i++){
      var singId = mod.result.result.shopping_cart_list[i].id
      var cart_number = mod.result.result.shopping_cart_list[i].op_data.shopping_cart_number
      var salePrice = mod.result.result.shopping_cart_list[i].goods.data.goods_sale_info.sale_price
      car_id = car_id?car_id+','+singId:singId
      state.purchase.car_id = car_id
      state.purchase.order_amount += cart_number * salePrice
    }*/
  },
  [types.PURCHASE_ADD_LIST] (state, mod) {
    state.purchase.confirmOrderList.shopping_cart_list[mod.params.index].op_data.shopping_cart_number = mod.result.result[0].op_data.shopping_cart_number
  },
  [types.PURCHASE_REDUCE_LIST] (state, mod) {
    state.purchase.confirmOrderList.shopping_cart_list[mod.params.index].op_data.shopping_cart_number = mod.result.result[0].op_data.shopping_cart_number
  },
}
export default {
  state,
  getters,
  actions,
  mutations
}
