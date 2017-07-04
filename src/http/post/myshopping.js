/**
 * Created by guo on 2017/6/7.
 */
import { myShoppingAPI as myShoppingApi } from '../api'
import { sendPost } from '../index'
export default {
  // 订单列表
  getDeliveryAsync (params, fn) {
    return sendPost(myShoppingApi.myShoppingInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  getOrderSingleDetailAsync (params, fn) {
    return sendPost(myShoppingApi.orderDetailInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  },
  getConfirmReceptAsync (params, fn) {
    var postInterface
    if(params.state==2){
      postInterface = myShoppingApi.cancelOrderInterface
    }else if(params.state==3){
      postInterface = myShoppingApi.confirmReceptInterface
    }else if(params.state==4){
      postInterface = myShoppingApi.canceledAgainOrderInterface
    }else if(params.state==5){
      postInterface = myShoppingApi.deleteOrderInterface
    }
    return sendPost(postInterface, params)
      .then((res) => {
        fn(res)
        //console.log('成功')
      }).catch((err) => {
        fn(err)
        //console.log('失败')
      })
  }
}
