<template>
  <div class="container">
    <search v-bind:class="{ searchSmall: isTrue}" @selectbtnValue="selectListbtn" @selectValue="selectList"></search>
    <div class="noneResult" v-if="purchase.searchList.length==0">暂无结果，请更换其他关键词试试</div>
    <ul class="serachResultList" v-if="purchase.searchList.length > 0">
      <li v-for="item in purchase.searchList">
        <a :href="'shopping/goodsDetail?goodsid='+item.id">{{item.data.goods_basic_info.goods_brand}}<span>({{item.data.goods_basic_info.goods_name}})</span></a>
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
        isTrue: true
      }
    },
    mounted () {
      this.page=1
      /*this.$store.dispatch('getPurchaseSearchList',{
        goods_serach_keywords: this.$route.query.name,
        page:this.page
      })*/
      window.addEventListener('scroll', this.menu)
    },
    computed: {
      ...mapGetters(['purchase'])
    },
    created () {
      console.log('------------------')
      console.log(this.selectList())
      console.log('------------------')
      if(!this.$route.query.name){
        if(!this.selectList()){
          this.purchase.searchList.length=0
        }
      }else{
        this.$store.dispatch('getPurchaseSearchList',{
          goods_serach_keywords: this.$route.query.name
        })
      }

      /*console.log(this.purchase.searchList.length)*/
      /*this.isTree = this
      this.$store.dispatch('getPurchaseSearchList',{
        goods_serach_keywords: this.$route.query.name
      })*/
    },
    methods: {
      selectList (value) {
        if(this.$route.query.name){
          value = this.$route.query.name
        }
        this.$store.dispatch('getPurchaseSearchList', {
          goods_serach_keywords: value,
          page:this.page
        })
      },
      selectListbtn (value) {
        if(!value){
          return
        }else{
          this.$router.push({ path: '/searchPicList', query:{name: value}})
        }
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
<style>

.serachResultList{
  display: block;
  padding:0.08rem 0.08rem;
  margin-bottom: -1.46rem;
}
[data-dpr="2"] .serachResultList li{
  font-size: 34px;
}
[data-dpr="3"] .serachResultList li{
  font-size: 34px;
}
.serachResultList li{
  display: block;
  background: #fff;
  height:1rem;
  line-height: 1rem;
  padding-left: 0.70rem;
  color:#000;
  margin-bottom: 0.04rem;
}
.serachResultList li span{
  color: #a0a0a0;
}
</style>
