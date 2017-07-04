<template>
  <div class="footerbox">
    <ul class="footer">
      <li><router-link to="./purchase"><p></p>采购</router-link></li>
      <li class="shoppingCart"><router-link to="./shoppingCar"><p></p>购物车</router-link></li>
      <li><router-link to="./myShopping"><p></p>我的</router-link></li>
    </ul>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        purchase:'',
        goodsCar:'',
        myshopping:''
      }
    },
    methods: {
      purchase(){
        this.$router.push({ path: '/shopping/purchase', query:{id: this.$route.query.id}})
      }
    }
  }
</script>
<style>
  .router-link-active{
    background: #488bd1;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
</style>
