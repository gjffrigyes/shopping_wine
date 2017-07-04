// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import axios from './http/index'
import filters from './filters'
import ElementUI from 'element-ui'
import './assets/css/common.css'
import 'element-ui/lib/theme-default/index.css'
import './assets/js/flexible.js'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.config.productionTip = false
// 注入路由
Vue.use(Vuex)
// 注入element-ui
Vue.use(ElementUI)
// filters注入
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: { App }
})
