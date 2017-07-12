<template>
  <div>
    <shopHeader></shopHeader>
    <dl class="shopDetail">
      <dt>
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <div class="swiper-slide" v-if = "typeof purchase.goodsDetail.goods_basic_info.goods_pic=='string'"><img :src="purchase.goodsDetail.goods_basic_info.goods_pic" width="100%"></div>
          <div class="swiper-slide" v-if = "typeof purchase.goodsDetail.goods_basic_info.goods_pic=='object'" v-for ="(item,index) in purchase.goodsDetail.goods_basic_info.goods_pic"><img :src="purchase.goodsDetail.goods_basic_info.goods_pic[index]" width="100%"></div>
        </swiper>
      </dt>
      <dd>
        <p>{{purchase.goodsDetail.goods_basic_info.goods_name}} <span v-if="purchase.goodsDetail.goods_sale_info.sale_type==1">整箱装</span><span v-if="purchase.goodsDetail.goods_sale_info.sale_type==2">按瓶卖</span> x {{purchase.goodsDetail.goods_sale_info.sale_number}}</p>
        <p>商品编号：{{purchase.goodsDetail.goods_basic_info.goods_number}}</p>
        <p class="price">￥{{purchase.goodsDetail.goods_sale_info.sale_price}}</p>
      </dd>
    </dl>
    <div class="goodsInfobox">
      <h3>商品介绍</h3>
      <div class="goodsInfo" v-html="purchase.goodsDetail.goods_desc">{{purchase.goodsDetail.goods_desc}}</div>
    </div>
    <shopFooterCar></shopFooterCar>
  </div>
</template>
<script>
  import shopFooterCar from '../../routeView/FooterCar'
  import shopHeader from '../../routeView/Header'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          direction: 'horizontal',
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: 654,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          // prevButton: '.swiper-button-prev',
          // nextButton: '.swiper-button-next',
          // scrollbar: '.swiper-scrollbar',
          mousewheelControl: true,
          observeParents: true,
          debugger: true
        }
      }
    },
    computed: {
      ...mapGetters(['purchase'])
    },
    created () {
      this.$store.dispatch('getGoodsDetail',{
        id: this.$route.query.goodsid
      })
    },
    components: {
      'shopFooterCar': shopFooterCar,
      'shopHeader': shopHeader,
      swiper,
      swiperSlide
    }
  }
</script>
<style>
  .shopDetail{
    display: block;
    margin-bottom: 0.39rem;
    background: #fff;
  }
  .shopDetail dt{
    width: 10rem;
    /*height:4.8rem;*/
    background: #858585;
    /*//overflow: hidden;*/
  }
  .shopDetail dd{
    padding: 0.47rem 0 0.47rem 0.47rem;
  }
  .shopDetail dd p {
    text-align: left;
    color: #a0a0a0;
    margin-bottom: 0.23rem;
  }
  [data-dpr="2"] .shopDetail dd p {
    font-size: 24px
  }
  [data-dpr="3"] .shopDetail dd p {
    font-size: 24px;
  }
  .shopDetail dd p.price {
    color: #ff0000;
  }
  .goodsInfobox{display: block;background: #fff;overflow: hidden}
  .goodsInfobox h3{
    display: inline-block;
    padding: 0 0 0 0.47rem;
    font-weight: normal;
    font-size:13px;
    margin-bottom: 0.23rem;
  }
  .goodsInfo {
    padding: 0 0.47rem 0.47rem 0.47rem;
  }
</style>
