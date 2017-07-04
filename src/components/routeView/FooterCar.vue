<template>
  <div class="footerbox">
    <ul class="footer">
      <li class="shoppingCart"><router-link to="./shoppingCar"><p><span><b>{{purchase.num}}</b></span></p>购物车</router-link></li>
      <li class="li-height56" @click="addCar()">加入购物车</li>
      <li class="li-height56" @click="order(2)">立即下单</li>
    </ul>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        count:0
      }
    },
    computed: {
      ...mapGetters(['purchase'])
    },
    created () {
      this.$store.dispatch('getGoodsNum',{
        id: this.$route.query.goodsid,
        uid:window.localStorage.getItem('uid')
      })
    },
    methods: {
      addCar () {
        this.$store.dispatch('getAddCarNum',{
          id: this.$route.query.goodsid,
          uid:window.localStorage.getItem('uid')
        })
      },
      order (num) {
        this.$router.push({ path: '/shopping/order', query:{id: this.$route.query.goodsid,selectId:num}})
      }
    }
  }
</script>
