/**
 * Created by guo on 2017/6/7.
 */
import myshopping from '../../http/post/myshopping'
import * as types from '../mutations-type'
import router from '../../router'
const state = {
  deliver:{
    items: {},
    orderItems: {
      data:{
        contact_info:{}
      }
    },
    allPrice:0,
    detailAllPrice:0
  }
}
const getters = {
  deliver: state => state.deliver
}
const actions = {
  getDeliveryList ({ commit }, params = {}) {
    myshopping.getDeliveryAsync(params, data => {
      commit(types.DELIVERY_LIST, { result: data })
    })
  },
  getOrderSingleDetail ({ commit }, params = {}) {
    myshopping.getOrderSingleDetailAsync(params, data => {
      commit(types.ORDER_SINGLE_DETAIL, { result: data })
    })
  },
  //确认收货
  confirmRecept ({ commit }, params = {}) {
    myshopping.getConfirmReceptAsync(params, data => {
      commit(types.CONFIRM_RECPT, { result: data,params:params.state })
    })
  }
}
const mutations = {
  [types.DELIVERY_LIST] (state, mod) {
    var allgoods = mod.result.result
    for(var i=0;i<allgoods.length;i++){
      state.deliver.allPrice = 0
      for(var j=0; j<allgoods[i].goods.length;j++){
        state.deliver.allPrice += allgoods[i].goods[j].data.buy_num * allgoods[i].goods[j].data.goods_sale_info.sale_price
      }
      mod.result.result[i].data={'allPrice':state.deliver.allPrice}
    }
    state.deliver.items = mod.result.result
  },
  [types.CONFIRM_RECPT] (state, mod) {
    let id = mod.result.result[0].id
    if(mod.params == 4){
      router.push({ path: '/shopping/purchase' })
    }else{
      router.push({ path: '/shopping/myShopping' })
    }
  },
  [types.ORDER_SINGLE_DETAIL] (state, mod) {
    var allgoods = mod.result.result[0]
    state.deliver.detailAllPrice = 0
    for(var j=0; j<allgoods.goods.length;j++){
      state.deliver.detailAllPrice += allgoods.goods[j].data.buy_num * allgoods.goods[j].data.goods_sale_info.sale_price
    }
    mod.result.result[0].allPrice=state.deliver.detailAllPrice
    state.deliver.orderItems = mod.result.result[0]
    state.deliver.orderItems.data.contact_info = mod.result.result[0].data.contact_info
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
