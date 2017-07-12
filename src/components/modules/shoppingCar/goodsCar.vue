<template>
  <div class="myShopCarBox">
    <shopHeader v-bind:class="{ none: isTrue}">我的购物车</shopHeader>
    <div v-if="goodsCar.items.length==0" class="ct pt3">购物车没有物品</div>
    <div v-if="goodsCar.items.length>0">
      <div class="myShopCar">
        <dl v-for="(item,index) in goodsCar.items">
          <dt><div class="cart-item-check">
          <a href="javascript:void 0" class="item-check-btn"
             v-bind:class="{check:item.isChecked}"
             @click="selectGood(item)">
            <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
          </a>
        </div><img :src="item.goods.data.goods_basic_info.goods_pic"></dt>
          <dd>
            <div class="addnum"><span @click="reduce(item.id,index)"><b>-</b></span><span><b>{{item.op_data.shopping_cart_number}}</b></span><span @click="addNum(item.id,index)"><b>+</b></span></div>
            <div class="goodsCarInfo">
              <span class="ljx" @click="deleteNum(item.id,index)"></span>
              <p class="w2">{{item.goods.data.goods_basic_info.goods_brand}}({{item.goods.data.goods_basic_info.goods_name}})</p>
              <p><span v-if="item.goods.data.goods_sale_info.sale_type==1">整箱装</span><span v-if="item.goods.data.goods_sale_info.sale_type==2">按瓶卖</span>{{item.goods.data.goods_sale_info.sale_number}}</p>
              <p class="price">￥{{item.goods.data.goods_sale_info.sale_price}}</p>
            </div>
          </dd>
        </dl>
      </div>
      <div class="allselect">
        <p>
          <label @click="selectAll()" class="clearfix">
            <span class="item-check-btn" :class="{check:isSelectAll}">
              <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
            </span>
            <span>全选</span>
          </label>
          <span class="item-del-btn" @click="unSelectAll">取消全选</span>
          <span>合计:{{totalPrice}}</span></p>
        <p @click="order(1)">下单</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import shopHeader from '../../routeView/Header'
  import { errorTips } from '../../../utils/TipUtil'
  export default {
    data () {
      return{
        isTrue: true,
        totalMoney:0,
        list:new Array(),
        isSelectAll:false
      }
    },
    computed: {
      ...mapGetters(['goodsCar']),
      totalPrice () {
        var total = 0;
        this.goodsCar.items.forEach(function(good){
          if(good.isChecked){
            total += good.goods.data.goods_sale_info.sale_price * good.op_data.shopping_cart_number;
          }
        });
        return total;
      }
    },
    mounted () {
      this.$nextTick(function() {
        this.$store.dispatch('getGoodsList', {
          uid: window.localStorage.getItem('uid')
        })
      })
    },
    created () {
      if(!window.localStorage.getItem('uid')){
        this.$router.push({ path: '/'})
      }
    },
    methods: {
      addNum (num,index) {
        this.$store.dispatch('getGoodsAddNum',{
          id:num,
          index: index
        })
      },
      reduce (num,index) {
        this.$store.dispatch('getGoodsReduceNum',{
          id:num,
          index: index
        })
      },
      deleteNum (num,index) {
        this.$store.dispatch('getGoodsDeleteNum',{
          id:num,
          index: index
        })
      },
      selectGood (goodObj,index) {
        if(goodObj.isChecked == void 0){
          this.$set(goodObj,"isChecked",true)
        } else {
          goodObj.isChecked = !goodObj.isChecked;
        }
        this.isCheckAll();
      },
      selectAll () {
        this.isSelectAll = true;
        this.goodsCar.items.forEach((good)=>{
          /*good.isChecked = true;*/
          this.$set(good,"isChecked",true)
          this.isCheckAll();
        });
      },
      unSelectAll () {
        this.isSelectAll = false;
        this.goodsCar.items.forEach((good)=>{
          good.isChecked = false;
        })
      },
      isCheckAll () {
        var flag = true;
        this.goodsCar.items.forEach(function(good){
          if(!good.isChecked){
            flag = false;
          }
        });
        if(!flag){
          this.isSelectAll = false;
        } else {
          this.isSelectAll = true;
        }
      },
      order (num) {
        var carId=''
        this.goodsCar.items.forEach(function(good,index){
          console.log(index)
          if(good.isChecked){
            carId += good.id+','
          }
        });
        if(!carId){
          errorTips('请选择至少一个物品')
          return
        }else{
          carId=(carId.substring(carId.length-1)==',')?carId.substring(0,carId.length-1):carId
          this.$router.push({ path: '/shopping/order', query:{id:carId,selectId:num}})
        }

      }
    },
    components: {
      'shopHeader': shopHeader
    }
  }
</script>
<style>
  .item-check-btn {
    display: inline-block;
    width: 0.41rem;
    height: 0.41rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    vertical-align: middle;
    margin-right: 0.2rem;
    cursor: pointer; }
  .item-check-btn .icon-ok {
    display: none;
    width: 100%;
    height: 100%;
    fill: #fff;
    -ms-transform: scale(0.8);
    transform: scale(0.8); }
  .item-check-btn.check {
    background: #EE7A23;
    border-color: #EE7A23; }
  .item-check-btn.check .icon-ok {
    display: inline-block; }

</style>
