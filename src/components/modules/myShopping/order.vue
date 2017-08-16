<template>
  <div>
    <shopHeader >订单详情</shopHeader>
    <div class="personOrderInfo">
      <p>收货人信息:</p>
      <p class="pd108"><span>{{deliver.orderItems.data.contact_info.name}}</span>{{deliver.orderItems.data.contact_info.phone}}</p>
      <p class="pd108">{{deliver.orderItems.data.contact_info.city}}{{deliver.orderItems.data.contact_info.area}}{{deliver.orderItems.data.contact_info.address}}</p>
    </div>
    <div class="delverybox mb1">
      <dl v-for="item in deliver.orderItems.goods">
        <dt><img :src="item.data.goods_basic_info.goods_pic"></dt>
        <dd>
          <div>
            <p>{{item.data.goods_basic_info.goods_name}}</p>
            <p><span v-if="item.data.goods_sale_info.sale_type==1">整箱装</span><span v-if="item.data.goods_sale_info.sale_type==2">按瓶卖</span>{{item.data.goods_sale_info.sale_spec}}*{{item.data.goods_sale_info.sale_number}}</p>
            <p class="price"><span>x {{item.data.buy_num}}</span>￥{{item.data.goods_sale_info.sale_price}}</p>
          </div>
        </dd>
      </dl>
    </div>
    <div class="pr personOrderInfo">
      <div class="stateSpan">
        <span v-if="num==5">已完成</span><span v-if="num==4">已取消</span><span v-if="num==3">待收货</span><span v-if="num==2">待发货</span><span v-if="num==1">待付款</span>
      </div>
      <p>订单号：{{deliver.orderItems.id}}</p>
      <p>下单时间：{{deliver.orderItems.created_at | dateFormat}}</p>
      <p>收货时间：{{deliver.orderItems.updated_at | dateFormat}}</p>
      <p>总计金额： ￥{{deliver.detailAllPrice}}</p>
    </div>
    <div class="stateButton">
        <button v-if="num>=4" @click="changeState(4)">再次下单</button>
        <button v-if="num==5" @click="changeState(5)">删除订单</button>
        <button v-if="num==3" @click="changeState(3)">确认收货</button>
        <button v-if="num==2" @click="changeState(2)">取消订单</button>
        <button v-if="num==1" @click="changeState(2)">取消订单</button>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import shopHeader from '../../routeView/Header'
  export default {
    data () {
      return {
        num:this.$route.query.state
      }
    },
    computed: {
      ...mapGetters(['deliver'])
    },
    created () {
      this.orderDetail()
    },
    methods:{
      orderDetail () {
        this.$store.dispatch('getOrderSingleDetail',{
          order_id: this.$route.query.id,
          state: this.$route.query.state
        })
      },
      changeState (num) {
        this.$store.dispatch('confirmRecept',{
          order_id:this.$route.query.id,
          state: num
        })
      }
    },
    components: {
      'shopHeader': shopHeader
    }
  }
</script>
<style>
.personOrderInfo {
  display: block;
  background: #fff;
  border: 1px solid #bababa;
  margin: 0 0.24rem 0.17rem;
  background: #fff;
  padding: 0.25rem 0.25rem 0;
  font-size: 12px;
}
[data-dpr="2"] .personOrderInfo{
  font-size: 24px;
}
[data-dpr="3"] .personOrderInfo{
  font-size: 24px;
}
.personOrderInfo p{
  margin-bottom: 0.36rem;
}
.personOrderInfo p.pd108{
  padding-left: 1.08rem;
}
.personOrderInfo p span{
  margin-right: 0.8rem;
}
.stateSpan {
  float: left;
  display: inline;
  position: absolute;
  right: 0.76rem;
  top:0.93rem;
}
.stateSpan span{
  float: left;
  display: inline;
  width:1.83rem;
  height: 0.73rem;
  border: 1px solid #5995d4;
  color: #5995d4;
  line-height: 0.73rem;
  text-align: center;
}
.stateButton{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9.53rem;
  margin: 0 auto;
}
.stateButton button{
  width: 9.53rem;
  height: 0.8rem;
  background: #5995d4;
  line-height: 0.8rem;
  border-radius: 0.12rem 0.12rem;
  color: #fff;
  border:none;
  font-size: 12px;
}
[data-dpr="2"] .stateButton button{
  font-size: 24px;
}
[data-dpr="3"] .stateButton button{
  font-size: 24px;
}
</style>
