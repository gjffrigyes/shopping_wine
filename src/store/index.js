/**
 * Created by guo on 2017/6/2.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import login from './modules/logincheck'
import purchase from './modules/purchase'
import myShopping from './modules/myShopping'
import goodsCar from './modules/goodsCar'
Vue.use(Vuex)
const state = {}
const getters = {}
const mutations = {}
const actions = {}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    login,
    purchase,
    myShopping,
    goodsCar
  }
})
