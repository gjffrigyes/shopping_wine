<template>
  <div class="delvery">
    <shopHeader>{{state}}</shopHeader>
    <div class="delverybox" v-for="item in deliver.items">
      <p class="orderNum">订单号:{{item.id}}</p>
      <dl v-for="goods in item.goods">
        <dt><img :src="goods.data.goods_basic_info.goods_pic"></dt>
        <dd>
          <div>
            <p>{{goods.data.goods_basic_info.goods_name}}</p>
            <p><span v-if="goods.data.goods_sale_info.sale_type==1">整箱装</span><span v-if="goods.data.goods_sale_info.sale_type==2">按瓶卖</span> {{goods.data.goods_sale_info.sale_spec}}ml * {{goods.data.goods_sale_info.sale_number}}</p>
            <p class="price"><span>x {{goods.data.buy_num}}</span>￥{{goods.data.goods_sale_info.sale_price}}</p>
          </div>
        </dd>
      </dl>
      <p class="buttondelvery"><button v-if="num == 1" @click="confirms(item.id,1)">取消订单</button><button v-if="num >= 4" @click="confirms(item.id,4)">再次下单</button><button v-if="num == 5" @click="confirms(item.id,5)">删除订单</button><button v-if="num == 2" @click="confirms(item.id,2)">取消订单</button><button v-if="num == 3" @click="confirms(item.id,3)">确认收货</button><span>共{{item.goods.length}}件商品</span>
        总计￥{{item.data.allPrice}}</p>
    </div>

  </div>
</template>
<script>
  import shopHeader from '../../routeView/Header'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
          num:this.$route.query.state
      }
    },
    computed: {
      ...mapGetters(['deliver']),
      state () {
        var state
        if(this.$route.query.state==1) {
          state ='待付款'
        }else if(this.$route.query.state==2) {
          state ='待发货'
        }else if(this.$route.query.state==3) {
          state ='待收货'
        }else if(this.$route.query.state==4) {
          state ='已取消'
        }else if(this.$route.query.state==5) {
          state ='已完成'
        }
        return state
      }
    },
    created () {
      this.$store.dispatch('getDeliveryList',{
        uid: window.localStorage.getItem('uid'),
        state: this.$route.query.state
      })
    },
    methods: {
      confirms (id,num) {
        this.$router.push({ path: '/order', query:{id: id, state: num}})
      }
    },
    components: {
      'shopHeader': shopHeader
    }
  }
</script>
<style>
  .delverybox{
    display: block;
    border:1px solid #bababa;
    margin:0 0.24rem 0.17rem;
    background: #fff;
  }
  .delverybox p.orderNum{
    height:0.79rem;
    line-height: 0.79rem;
    border-bottom: 1px solid #7d7d7d;
    text-align: left;
    padding-left: 0.4rem;
  }
  .delverybox p.buttondelvery{
    height:0.79rem;
    text-align: left;
    padding-left: 0.4rem;
    font-size: 12px;
    margin-bottom: 0.2rem;
  }
  [data-dpr="2"] .delverybox p.buttondelvery{
    font-size: 24px;
  }
  [data-dpr="3"] .delverybox p.buttondelvery{
    font-size: 30px;
  }
  .delverybox p.buttondelvery span{
    display: block;
    margin: 0.2rem 0;
  }
  .delverybox p.buttondelvery button{
    float: right;
    width: 1.71rem;
    height: 0.69rem;
    background: #5995d4;
    text-align: center;
    line-height: 0.69rem;
    border-radius: 0.1rem;
    border: none;
    color: #fff;
    font-size: 12px;
    margin-right: 0.4rem;
  }
  [data-dpr="2"] .delverybox p.buttondelvery button{
    font-size: 24px;
  }
  [data-dpr="3"] .delverybox p.buttondelvery button{
    font-size: 24px;
  }
  .delverybox dl{
    display:block;
    height:2.19rem;
    border-bottom: 1px solid #7d7d7d;
  }
  .delverybox dl dt{
    float: left;
    display: inline;
    width: 2.47rem;
    height:2.19rem;
    display:flex;
    justify-content:center;
    align-items: center;
  }
  .delverybox dl dt img{
    width: 1.55rem;
    height:1.55rem;
  }
  .delverybox dl dd{
    float: left;
    text-align: left;
    height:2.19rem;
    display:flex;
    justify-content:center;
    align-items: center;
    width: 6.24rem;
  }
  .delverybox dl dd div{
    height:1.55rem;
    float: left;
    width: 100%;
  }
  .delverybox dl dd p{
    display: block;
    margin-bottom:0.27rem;
  }
  [data-dpr="2"] .delverybox dl dd p {
    font-size: 24px;
    text-align: left;
    color: #a0a0a0;
  }
  [data-dpr="3"] .delverybox dl dd p {
    font-size: 34px;
  }
  .delverybox dl dd p.price {
    color: #ff0000;
  }
  .delverybox dl dd p.price span{
    float: right;
  }
  .delverybox.mb1{
    margin-bottom: 0px;
    border-bottom: 0px;
  }
</style>
