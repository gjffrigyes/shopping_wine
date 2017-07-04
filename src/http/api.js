/**
 * Created by guo on 2017/6/2.
 */
export const loginAPI = {
  loginInterface: 'H5/user_login.json',                                                                 // 登陆
  verificationCodeInterface: 'H5/user_get_captcha.json',                                                // 验证码
  rePasswordInterface: 'H5/user_reset_password.json'                                                    // 重置
}
export const purChaseAPI = {
  purChaseInterface: 'H5/goods/list.json',                                                              // 采购搜索列表
  purChaseDetailInterface: 'H5/goods/detail.json',                                                      // 商品详细
  goodsCarNumInterface: 'H5/goods/detail_shopping_cart_number.json',                                    // 购物车数量
  goodsCarAddNumInterface: 'H5/goods/add_shopping_cart.json',                                           // 增加购物车数量
  confirmOrderInterface: 'H5/goods_detail_purchase_entry_confirmation_of_purchase_page_get_data.json',  // 进入下单确认购买页面
  proviceInterface: 'location/province_get_data.json',                                                  // 省
  cityInterface: 'location/city_get_data.json',                                                         // 市
  areaInterface: 'location/area_get_data.json',                                                         // 县
  generateOrderInterface: 'H5/goods/generate_order.json',                                               // 生成订单页
  generateSelectGoodsOrderInterface: 'H5/shopping_cart_settlement_entry_confirmation_of_purchase_page_get_data.json' // 购物车下单页
}
export const myShoppingAPI = {
  myShoppingInterface: 'H5/order/list.json',                                                            // 我的订单列表
  orderDetailInterface: 'H5/order/detail.json',                                                         // 订单详情
  confirmReceptInterface: 'H5/order/confirm_receipt.json',                                              // 确认收货
  cancelOrderInterface: 'H5/order/cancel_order.json',                                                   // 取消订单
  canceledAgainOrderInterface: 'H5/order/canceled_again_order.json',                                    // 在次下单
  deleteOrderInterface: 'H5/order/delete_order.json'                                                    // 删除订单
}
export const goodsCarAPI = {
  goodsCarListInterface: 'H5/goods/shopping_cart_list.json',                                            // 购物车列表
  getGoodsAddNumInterface: 'H5/goods/shopping_cart_number_incr.json',                                   // 增加购物车列表
  getGoodsReduceInterface: 'H5/goods/shopping_cart_number_decr.json',                                   // 减少购物车列表
  getGoodsDeleteInterface: 'H5/goods/shopping_cart_remove.json',                                        // 删除购物车列表
}
