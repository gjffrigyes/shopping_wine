<template>
  <div class="headTop">
    <span class="callback" @click="callback()"></span>
    <slot></slot>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        classnone:false
      }
    },
    computed: {
      ...mapGetters(['purchase'])
    },
    created () {
    },
    methods: {
      callback () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style>
  .headTop{
    float: left;
    position: relative;
    display: block;
    height:1.17rem;
    width: 100%;
    background: #5995d4;
    display:flex;
    justify-content:center;
    align-items: center;
    text-align: center;
    font-size:13px;
    color: #fff;
    position: fixed;
    left: 0;
    top:0;
    z-index:10;
  }
  [data-dpr="2"] .headTop{
    font-size: 30px;
  }
  [data-dpr="3"] .headTop{
    font-size: 30px;
  }
  .headTop span.callback{
    background: url("../../assets/images/angle.png") no-repeat center center;
    width: 0.82rem;
    height: 1.17rem;
    background-size: 0.3rem 0.4rem;
    position: absolute;
    left: 0px;
  }
  .headTop.none span.callback{
    display: none;
  }
</style>
