import components from '../components'
import Vue from 'vue'
import VueRouter from 'vue-router'

// 注入路由
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: components.login,
  },
  {
    path: '/forgetPassword',
    component: components.forgetPassword,
  },
  {
    path: '/shopping',
    component: components.shopping,
    children: [
      {
        path: '',
        redirect: to => {
          return 'purchase'
        }
      },
      {
        path: 'purchase',
        component: components.Modules.Purchase.Purchase
      },
      {
        path: 'myShopping',
        component: components.Modules.myShopping.myShopping
      },
      {
        path: 'shoppingCar',
        component: components.Modules.shoppingCar.goodsCar
      }
    ]
  },
  {
    path: '/searchList',
    component: components.Modules.Purchase.searchList,
  },
  {
    path: '/searchPicList',
    component: components.Modules.Purchase.searchPicList,
  },
  {
    path: '/shopping/goodsDetail',
    component: components.Modules.Purchase.goodsDetail,
  },
  {
    path: '/shopping/order',
    component: components.Modules.Purchase.order,
  },
  {
    path: '/delivery',
    component: components.Modules.myShopping.delivery,
  },
  {
    path: '/order',
    component: components.Modules.myShopping.order,
  }
]
export default new VueRouter({
  mode: 'history',
  routes
})
