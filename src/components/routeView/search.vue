<template>
  <div class="search">
    <span class="callback" @click="callback()"></span>
    <p>
      <span class="close" @click="close()"></span>
      <span @click="search()"></span>
      <input v-model="searchBox.value" @focus="setFocusIndex()" placeholder="请输入商品名称">
    </p>
    <span class="cancel" @click="cancel()">取消</span>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        isTrue: false,
        searchBox: {
          value: this.$route.query.name
        }
      }
    },
    computed: {
      ...mapGetters(['purchase'])
    },
    created () {
    },
    watch:{
      searchBox:{
        handler:function(val,oldval){
          this.$router.push({ path: '/searchList', query:{name: this.searchBox.value}})
          this.$emit ('selectValue',this.searchBox.value)
        },
        deep:true
      }
    },
    methods: {
      setFocusIndex () {
        this.$emit ('selectValue',this.searchBox.value)
      },
      search () {
        this.$emit ('selectbtnValue',this.searchBox.value)
        /*if(!this.searchBox.value){
          return false
        }else{
          this.$router.push({ path: '/searchList', query:{name: this.searchBox.value}})
        }*/
      },
      callback () {
        this.$router.go(-1)
      },
      close () {
        this.searchBox.value = ''
      },
      cancel () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style>
  .callback{
    background: url("../../assets/images/angle.png") no-repeat center center;
    width: 0.82rem;
    height: 0.82rem;
    background-size: 0.3rem 0.4rem;
  }
  .search{
    display: block;
    margin-bottom: 0.17rem;
    height:1.17rem;
    background: #5995d4;
    display:flex;
    justify-content:center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
  .search span.callback,.search span.close,.search span.cancel{
    display: none;
  }
  .search.searchSmall{
    justify-content:flex-start;
  }
  .search.searchSmall span.callback,.search.searchSmall span.cancel{
    display: block;
    white-space: nowrap;
  }
  .search span.cancel{
    color: #fff;
    font-size: 13px;
    background: none;
    width: 0.64rem;
    margin-left: 0.23rem;
  }
  [data-dpr="2"] .search span.cancel{
    font-size: 24px;
  }
  [data-dpr="3"] .search span.cancel{
    font-size: 24px;
  }
  .search.searchSmall p span.close{
    background: url("../../assets/images/close.png") no-repeat center center;
    background-size: 0.51rem 0.52rem;
    width: 0.51rem;
    height: 0.82rem;
    position:absolute;
    right:0.3rem;
    display: block;
  }
  .search p{
    width: 9.06rem;
    height:0.82rem;
    border-radius:0.12rem 0.12rem;
    background: #fff;
    overflow: hidden;
    display:flex;
    align-items: center;
    position: relative;
  }
  .search.searchSmall p{
    width: 8.06rem;
    height:0.82rem;
    border-radius:0.12rem 0.12rem;
    background: #fff;
    overflow: hidden;
    display:flex;
    align-items: center;
  }
  .search p span{
    float: left;
    display: inline;
    height:0.54rem;
    width: 1.74rem;
    background: url("../../assets/images/iconfdj.png")no-repeat center center;
    background-size: contain;
  }
  .search p input{
    width: 9.06rem;
    height:0.82rem;
    border:none;
    font-size: 13px;
  }
  [data-dpr="2"] .search p input{
    font-size: 30px;
  }
  [data-dpr="3"] .search p input{
    font-size: 30px;
  }
  .search.searchSmall p input{
    float: left;
    display: inline;
    width: 5.26rem;
    height:0.82rem;
    border:none;
    font-size: 13px;
  }
  [data-dpr="2"] .search.searchSmall p input{
    font-size: 30px;
  }
  [data-dpr="3"] .search.searchSmall p input{
    font-size: 30px;
  }
</style>
