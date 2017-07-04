<template>
  <div>
    <shopHeader>确认订单</shopHeader>
    <div class="confirmOrder">
      <el-form :model="ruleForm"  ref="ruleForm">
        <div class="divBox300 bgf clearfix bBottomNone">
          <label class="none">收货人姓名：</label>
          <input v-model="ruleForm.username" class="inputbox w5 color0">
        </div>
        <div class="divBox300 bgf clearfix bBottomNone" >
          <label class="none">联系电话：</label>
          <input v-model="ruleForm.phone" class="inputbox w5 color0">
        </div>
        <div class="divBox300 bgf h16 clearfix bBottomNone">
          <div class="pl32">所在地区：</div>
          <div class="pl32 h08">
            <el-select v-model="ruleForm.province" @change="selectProvince()" placeholder="省份" style="font-size: 18px">
              <el-option
                v-for="item in purchase.areabox.province"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-select v-model="ruleForm.city" v-if="purchase.areabox.city.length>0" @change="selectCity()" placeholder="城市">
              <el-option
                v-for="item in purchase.areabox.city"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-select v-model="ruleForm.area" v-if="purchase.areabox.area.length>0" placeholder="地区">
              <el-option
                v-for="item in purchase.areabox.area"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="clear"></div>
        <div class="divBox300 bgf clearfix" style="margin-bottom: 0.1rem">
          <label class="none">详细地址：</label>
          <input v-model="ruleForm.address" class="inputbox w5 color0">
        </div>
        <div class="clear"></div>
        <div class="myShopCar pdNone clearfix">
          <dl v-for="(item,index) in purchase.confirmOrderList.shopping_cart_list">
            <dt><img :src="item.goods.data.goods_basic_info.goods_pic"></dt>
            <dd>
              <div class="addnum"><span @click="reduce(item.id,index)"><b>-</b></span><span><b>{{item.op_data.shopping_cart_number}}</b></span><span @click="addNum(item.id,index)"><b>+</b></span></div>
              <!--<span class="ljx"></span>-->
              <div class="goodsCarInfo">
                <p>{{item.goods.data.goods_basic_info.goods_brand}}({{item.goods.data.goods_basic_info.goods_name}})</p>
                <p><span v-if="item.goods.data.goods_sale_info.sale_type==1">整箱装</span><span v-if="item.goods.data.goods_sale_info.sale_type==2">按瓶卖</span>{{item.goods.data.goods_sale_info.sale_spec}}*{{item.goods.data.goods_sale_info.sale_number}}</p>
                <p class="price">￥{{item.goods.data.goods_sale_info.sale_price}}</p>
              </div>
            </dd>
          </dl>
        </div>
        <div class="divBox300 bgf ">
          <label class="none">留言：</label>
          <input type="textarea" v-model="ruleForm.message" class="inputbox w5 color0">
        </div>
      </el-form>
    </div>
    <div class="orderedbox"><span @click="ordersubmit()">确认下单</span>商品应付总额:{{totalPrice}}</div>
  </div>
</template>
<script>
  import shopHeader from '../../routeView/Header'
  import { errorTips } from '../../../utils/TipUtil'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        disabled: false,
        ruleForm: {
          username:'',
          phone:'',
          province: '',
          city: '',
          area: '',
          address: '',
          message: ''
        }
      }
    },
    computed: {
      ...mapGetters(['purchase']),
      totalPrice () {
        var total = 0;
        if(this.purchase.confirmOrderList.shopping_cart_list){
          this.purchase.confirmOrderList.shopping_cart_list.forEach(function(good){
            console.log(good)
            total += good.goods.data.goods_sale_info.sale_price * good.op_data.shopping_cart_number;
          });
        }
        return total;
      }
    },
    mounted () {
      if(this.$route.query.selectId == 1){
        this.$store.dispatch('getSelectGoodsOrder',{
          cart_id:this.$route.query.id
        })
      }else if(this.$route.query.selectId == 2){
        this.$store.dispatch('getConfirmOrder',{
          goods_id:this.$route.query.id,
          uid:window.localStorage.getItem('uid')
        })
      }
    },
    created () {
      if(!this.$route.query.id){
        this.$router.push({ path: '/shopping/shoppingCar' })
      }
      this.$store.dispatch('getProvince')
      this.$store.dispatch('getCity')
    },
    methods: {
      selectProvince () {
        this.disabled = true
        this.$store.dispatch('getCity',{
          parent: this.ruleForm.province
        })
      },
      selectCity () {
        this.$store.dispatch('getArea',{
          parent: this.ruleForm.city
        })
      },
      ordersubmit () {
        var telPhone = this.ruleForm.phone
        var cart_list = this.purchase.confirmOrderList.shopping_cart_list.length
        var goods_id=''
        for(var i=0; i<cart_list; i++){
          goods_id += this.purchase.confirmOrderList.shopping_cart_list[i].id+','
        }
        goods_id=(goods_id.substring(goods_id.length-1)==',')?goods_id.substring(0,goods_id.length-1):goods_id
        //var goods_id = this.purchase.confirmOrderList.shopping_cart_list[0].id
        var regx = /^(1[358]\d{9})$/
        if (this.ruleForm.username == ""){
          errorTips('用户名不能为空!')
          return
        }else if (telPhone == ""){
          errorTips('手机号不能为空');
          return
        }else if(!regx.test(telPhone)){
          errorTips('手机格式不正确，请重新输入!')
          return
        }else if(!this.ruleForm.province){
          errorTips('省份不能为空!')
          return
        }else if (!this.ruleForm.city){
          errorTips('城市不能为空');
          return
        }else if (!this.ruleForm.area){
          errorTips('区域不能为空');
          return
        }else if (this.ruleForm.address == ""){
          errorTips('地址不能为空');
          return
        }else if (this.ruleForm.message == ""){
          this.ruleForm.message = '留言为空'
        }
        this.$store.dispatch('generateOrder', {
          name: this.ruleForm.username,
          phone: this.ruleForm.phone,
          province: this.ruleForm.province,
          city: this.ruleForm.city,
          area: this.ruleForm.area,
          address: this.ruleForm.address,
          uid: window.localStorage.getItem('uid'),
          leave_message: this.ruleForm.message,
          cart_id: goods_id,
          order_amount: this.totalPrice
        })
      },
      addNum (num,index) {
        this.$store.dispatch('getConfirmGoodsAddNum',{
          id:num,
          index: index
        })
      },
      reduce (num,index) {
        this.$store.dispatch('getConfirmGoodsReduceNum',{
          id:num,
          index: index
        })
      }
    },
    components: {
      'shopHeader': shopHeader
    }
  }
</script>
<style>
  .orderDetail{
    display: block;
    border:1px solid #bababa;
    margin-bottom: 0.35rem;
  }
  .orderDetail p{
    border-bottom:1px solid #000;
    height:1.13rem;
    line-height: 1.13rem;
  }
  .ljx{
    float: right;
    display: inline;
    position: absolute;
    right:0.47rem;
    top:0.21rem;
    width: 0.55rem;
    height:0.55rem;
    background: url("../../../assets/images/garbage.png")no-repeat;
    background-size: contain;
  }
  .confirmOrder{
    width: 9.47rem;
    margin: 0 auto;
  }
  .orderedbox{
    position: fixed;
    bottom:0px;
    display: block;
    height: 1.28rem;
    line-height: 1.28rem;
    width: 100%;
    text-align: center;
    background: #fff;
  }
  .orderedbox span{
    float:right;
    width: 2.75rem;
    background: #5995d4;
    height: 1.28rem;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
  [data-dpr="2"] .orderedbox span{
    font-size: 30px;
  }
  [data-dpr="3"] .orderedbox span{
    font-size: 30px;
  }
  .pl32{
    padding-left: 0.32rem;
  }
</style>
