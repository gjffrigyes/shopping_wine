<template>
  <div class="container">
    <search v-bind:class="{ searchSmall: isTrue}" @selectValue="selectList" style="z-index:1111111"></search>
    <div class="myShopCar">
      <a :href="'shopping/goodsDetail?goodsid='+item.id" v-for="item in purchase.searchList">
        <dl>
          <dt><img :src="item.data.goods_basic_info.goods_pic"></dt>
          <dd>
            <div class="goodsCarInfo">
              <p>{{item.data.goods_basic_info.goods_brand}}({{item.data.goods_basic_info.goods_name}})</p>
              <p><span v-if="item.data.goods_sale_info.sale_type==1">整箱装</span><span v-if="item.data.goods_sale_info.sale_type==2">按瓶卖</span>{{item.data.goods_sale_info.sale_spec}}*{{item.data.goods_sale_info.sale_number}}</p>
              <p class="price">￥{{item.data.goods_sale_info.sale_price}}</p>
            </div>
          </dd>
        </dl>
      </a>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import search from '../../routeView/search'
  export default {
    data () {
      return {
        isTrue: true
      }
    },
    mounted () {
      this.page=1
      this.$store.dispatch('getPurchaseSearchList',{
       goods_serach_keywords: this.$route.query.name,
       page:this.page
       })
      window.addEventListener('scroll', this.menu)
    },
    computed: {
      ...mapGetters(['purchase'])
    },
    created () {
    },
    methods: {
      selectList (value) {
        this.$store.dispatch('getPurchaseSearchList', {
          goods_serach_keywords: value,
          page:this.page
        })
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
            this.$store.dispatch('getPurchaseSearchList', {
              goods_serach_keywords: this.$route.query.name,
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

