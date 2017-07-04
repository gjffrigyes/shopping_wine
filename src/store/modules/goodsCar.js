/**
 * Created by guo on 2017/6/8.
 */
import goodsCar from '../../http/post/goodsCar'
import * as types from '../mutations-type'
const state = {
  goodsCar: {
    items: {},
    num:[],
    priceSum:0
  }
}
const getters = {
  goodsCar: state => state.goodsCar
}
const actions = {
  getGoodsList ({ commit }, params = {}) {
    goodsCar.getGoodsCarAsync(params, data => {
      commit(types.GOODS_CAR_LIST, { result: data })
    })
  },
  getGoodsAddNum ({ dispatch, commit }, params = {}) {
    console.log(params)
    goodsCar.getGoodsAddNumAsync(params, data => {
      commit(types.GOODS_ADD_LIST, { result: data,params: params})
      /*dispatch('getGoodsList',{
        uid:window.localStorage.getItem('uid')
      })*/
    })
  },
  getGoodsReduceNum ({ dispatch, commit }, params = {}) {
    goodsCar.getGoodsReduceAsync(params, data => {
      commit(types.GOODS_REDUCE_LIST, { result: data,params: params })
      /*dispatch('getGoodsList',{
        uid:window.localStorage.getItem('uid')
      })*/
    })
  },
  getGoodsDeleteNum ({ commit }, params = {}) {
    goodsCar.getGoodsDeleteAsync(params, data => {
      commit(types.GOODS_DELETE_LIST, { result: data,params: params })
    })
  },

}
const mutations = {
  [types.GOODS_CAR_LIST] (state, mod) {
    /*var sum=0
    for(let i=0;i<mod.result.result.length;i++){
        let price = mod.result.result[i].goods.data.goods_sale_info.sale_price
        let num = mod.result.result[i].op_data.shopping_cart_number
        sum +=price*num
    }
    state.goodsCar.priceSum = sum*/
    state.goodsCar.items = mod.result.result
  },
  [types.GOODS_ADD_LIST] (state, mod) {
    state.goodsCar.items[mod.params.index].op_data.shopping_cart_number = mod.result.result[0].op_data.shopping_cart_number
  },
  [types.GOODS_REDUCE_LIST] (state, mod) {
    state.goodsCar.items[mod.params.index].op_data.shopping_cart_number = mod.result.result[0].op_data.shopping_cart_number
  },
  [types.GOODS_DELETE_LIST] (state, mod) {
    state.goodsCar.items.splice(mod.params.index, 1);
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
