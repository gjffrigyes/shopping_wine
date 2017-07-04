<template>
  <div class="container">
    <search @selectValue="searchValue"></search>
    <ul class="purchase">
        <li v-for = 'item in purchase.items'>
          <div class="pic"><a :href="'goodsDetail?goodsid='+item.id"><img :src="item.data.goods_basic_info.goods_pic" width="100%"></a></div>
          <div class="info">
            <p>{{item.data.goods_basic_info.goods_name}}
            <p><span v-if="item.data.goods_sale_info.sale_type==1">整箱装</span><span v-if="item.data.goods_sale_info.sale_type==2">按瓶卖</span> {{item.data.goods_sale_info.sale_spec}}*{{item.data.goods_sale_info.sale_number}}</p>
            <p class="price"><span @click="order(item.id)"><b>立即下单</b></span>￥{{item.data.goods_sale_info.sale_price}}</p>
          </div>
        </li>
    </ul>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import search from '../../routeView/search'
  export default {
    data () {
      return {
        items: []
      }
    },
    computed: {
      ...mapGetters(['purchase'])
    },
    mounted () {
      this.page=1
      this.$store.dispatch('getPurchaseList',{
        page:this.page
      })
      window.addEventListener('scroll', this.menu)
    },
    created () {
      if(!window.localStorage.getItem('uid')){
        this.$router.push({ path: '/'})
      }
      //this.$store.dispatch('getPurchaseList')
    },
    methods: {
      searchValue (value) {
        this.$router.push({ path: '/searchList', query:{name: value}})
      },
      order (id) {
        this.$router.push({ path: '/shopping/order', query:{id: id,selectId:2}})
      },
      menu() {
        this.scroll = document.body.scrollTop;
        /*
          获取滚动位置的信息
         */
        this.scrollTop = document.documentElement.scrollTop
        /*
        获取滚动区域高度信息
         */
        this.scrollHeight = document.body.scrollHeight
        var disabled = this.purchase.disabled
        if(disabled){
          return
        }
        if(this.scrollHeight-this.scroll < 1600) {
          this.page = this.page + 1
          if (this.page <= this.purchase.allpage) {
            this.$store.dispatch('getPurchaseList', {
              page: this.page
            })
          }else{
            this.page = this.purchase.allpage
            return
          }
        }
      }
    },
    components: {
      'search': search
    }
  }
</script>
<style>
  .purchase{
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-flow: row wrap;
    text-align: center;
    align-content: center;
    display: flex;
    align-items: center;
  }
  .purchase li{
    width: 4.78rem;
    margin: 0 0.11rem 0.2rem;
    overflow: hidden;
  }
  .purchase li div.pic{
    width:4.78rem;
    height:4.53rem;
    overflow: hidden;
  }
  .purchase li div.info{
    background: #cddff2;
    padding:0.38rem 0.28rem 0.05rem;
  }
  .purchase li p{
    text-align: left;
    font-size: 13px;
    color: #000000;
    margin-bottom: 0.25rem;
  }
  [data-dpr="2"] .purchase li p{
    font-size: 20px;
  }
  [data-dpr="3"] .purchase li p{
    font-size: 33px;
  }
  .purchase li p.price{
    color:#ff0101
  }
  .purchase li p.price span{
    float: right;
    background: #5995d4;
    color:#ffffff;
    width: 1.4rem;
    height:0.38rem;
    font-size: 10px;
    line-height: 0.38rem;
    text-align: center;
    display:-moz-box; /* Firefox */
    display:-webkit-box; /* Safari and Chrome */
    display:box;
  }
  .purchase li p.price span b{
    display:flex;
    justify-content:center;
    align-items: center;
    width:1.4rem;
    font-weight: normal;
  }
  [data-dpr="2"] .purchase li p.price span{
    font-size: 20px;
  }
  [data-dpr="3"] .purchase li p.price span{
    font-size: 20px;
  }

</style>
