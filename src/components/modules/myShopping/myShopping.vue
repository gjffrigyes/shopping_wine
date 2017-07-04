<template>
  <div class="myShopping mtop127">
    <dl class="clearfix">
      <dt></dt>
      <dd>
        <p>{{uid}}</p>
        <p>{{num()}}</p>
      </dd>
    </dl>
    <div class="myOrder">
      <h4>我的订单</h4>
      <div class="clear"></div>
      <ul>
        <li @click="deliver(2)"><p></p>待发货</li>
        <li @click="deliver(3)"><p></p>待收货</li>
        <li @click="deliver(4)"><p></p>已取消</li>
        <li @click="deliver(5)"><p></p>已完成</li>
      </ul>
    </div>
    <div class="quitbox"><button class="quit" @click="quit()">退出</button></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        uid:window.localStorage.getItem('username'),
        num () {
          var num = window.localStorage.getItem('distributor_type')
          if(num == 1){
            return '一级经销商'
          }else if(num == 2){
            return '二级经销商'
          }else if(num == 3){
            return '三级经销商'
          }else if(num == 0){
            return '非经销商'
          }
        }
      }
    },
    created () {
      if(!window.localStorage.getItem('uid')){
        this.$router.push({ path: '/'})
      }
    },
    methods: {
      deliver (num) {
        this.$router.push({ path: '/delivery', query: {state: num}})
      },
      quit () {
        window.localStorage.removeItem('uid')
        this.$router.push({ path: '/'})
      }
    }
  }
</script>
<style>
  .myShopping{
    display: block;
  }
  .myShopping dl{
    display: block;
    height:3.17rem;
    display:flex;
    align-items: center;
  }
  .myShopping dl dt{
    float: left;
    display: inline;
    width: 1.55rem;
    height:1.55rem;
    border-radius: 50% 50%;
    background: url("../../../assets/images/phone01.png")no-repeat center center;
    border: 1px solid #858585;
    margin-left: 1.04rem;
  }
  .myShopping dl dd{
    margin-left: 0.56rem;
    font-size: 12px;
  }
  [data-dpr="2"] .myShopping dl dd{
    margin-left: 0.56rem;
    font-size: 24px;
  }
  [data-dpr="3"] .myShopping dl dd{
    margin-left: 0.56rem;
    font-size: 24px;
  }
  .myShopping dl dd p{
    margin-bottom: 0.10rem;
  }
  .myShopping .myOrder{
    display: block;
    background: #5995d4;
    height: 3.67rem;
  }
  .myShopping .myOrder h4{
    font-size: 13px;
    color: #fff;
    text-align: left;
    display: block;
    float: left;
    margin:0.36rem 0 0.47rem 0.57rem;
    font-weight: normal;
  }
  [data-dpr="2"] .myShopping .myOrder h4{
    font-size: 24px;
  }
  [data-dpr="3"] .myShopping .myOrder h4{
    font-size: 34px;
  }
  .myShopping .myOrder ul{
    display:-moz-box; /* Firefox */
    display:-webkit-box; /* Safari and Chrome */
    display:box;
    padding: 0 0.65rem;
  }
  .myShopping .myOrder ul li{
    -moz-box-flex:1.0; /* Firefox */
    -webkit-box-flex:1.0; /* Safari and Chrome */
    box-flex:1.0;
    color:#fff;
    text-align: center;
  }
  .myShopping .myOrder ul li p{
    display: block;
    margin:0 auto 0.47rem;
    padding:0px;
  }
  .myShopping .myOrder ul li:nth-child(1) p{
    width: 1.24rem;
    height:0.79rem;
    background: url("../../../assets/images/my-icon01.png")no-repeat center center;
    background-size: contain;
    overflow: hidden;
  }
  .myShopping .myOrder ul li:nth-child(2) p{
    width: 1.24rem;
    height:0.79rem;
    background: url("../../../assets/images/my-icon02.png")no-repeat center center;
    background-size: contain;
    overflow: hidden;
  }
  .myShopping .myOrder ul li:nth-child(3) p{
    width: 1.24rem;
    height:0.79rem;
    background: url("../../../assets/images/my-icon03.png")no-repeat center center;
    background-size: contain;
    overflow: hidden;
  }
  .myShopping .myOrder ul li:nth-child(4) p{
    width: 1.24rem;
    height:0.79rem;
    background: url("../../../assets/images/my-icon04.png")no-repeat center center;
    background-size: contain;
    overflow: hidden;
  }
  .quitbox{
    width: 100%;
    height:0.88rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom:1.60rem;
  }
  .quit{
    width: 8.77rem;
    height:0.88rem;
    text-align: center;
    line-height: 0.88rem;
    background: #5995d4;
    color: #fff;
    border:none;
    border-radius: 0.13rem 0.13rem;
    font-size: 14px;
  }
  [data-dpr="2"] .quit{
    font-size: 28px;
  }
  [data-dpr="3"] .quit{
    font-size: 28px;
  }
</style>
