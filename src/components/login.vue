<template>
  <div class="loginbg mtop127" id="loginbg">
    <div class="form">
      <el-form :model="ruleForm"  ref="ruleForm">
        <div class="divBox300 mb10 clearfix">
            <label class="username"></label>
            <input v-model="ruleForm.username" placeholder="请输入手机号" class="inputbox w5">
        </div>
        <div class="divBox300 clearfix">
            <label class="key"></label>
            <input v-model="ruleForm.password" type="password" placeholder="请输入密码" class="inputbox w5">
        </div>
      </el-form>
      <div class="remeber">
        <span v-model="rememberPassword" id="remember-password-checkbox" @click="doRememberPassword()" :class="{ 'right': rememberPassword}"></span>记住登录密码
      </div>
      <button type="primary" @click="loginsubmit('ruleForm')" class="loginbution">登录</button>
      <div class="forgetPassword"><span @click="forgetPassWord()">忘记密码?</span></div>
    </div>
  </div>
</template>
<script>
  import { setCookie, getCookie, deleteCookie,htmlDecodeByRegExp,htmlEncodeByRegExp } from '../assets/js/cookie'
  import { errorTips } from '../utils/TipUtil'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        heightScreen:'',
        rememberPassword: false,
        ruleForm: {
          username: '',
          password: ''
        }
      }
    },
    created () {

    },
    computed: {
      ...mapGetters(['loginMessage'])
    },
    mounted () {
      this.loadAccountInfo()
      this.heightAuto()
    },
    methods: {
      loginsubmit (formName) {
        let Base64 = require('js-base64').Base64
        var mySelf = this;
        var userName = mySelf.ruleForm.username
        var userPwd = Base64.encode(mySelf.ruleForm.password)
        //记住密码checkbox的勾选状态 和账号信息的字符串
        var rememberStatus = mySelf.rememberPassword
        var accountInfo = userName + "&" + userPwd
        var regx = /^(1[358]\d{9})$/
        var pasx = /^[0-9A-Za-z_]\w{5,15}$/
        if (userName == ""){
          errorTips('手机号不能为空!')
          return
        }else if(!regx.test(userName)){
          errorTips('手机格式不正确，请重新输入!')
          return
        }
        if (userPwd == ""){
          errorTips('密码不能为空');
          return;
        }else if(!pasx.test(userPwd)){
          errorTips('密码长度在8个字符到16个字符，由字母、数字和"_"组成')
          return
        }
        if (rememberStatus){
          //勾选了记住密码，现在开始写入cookie
          setCookie('accountInfo',accountInfo,1440*3);
        }
        else{
          //没有勾选记住密码，现在开始删除账号cookie
          deleteCookie('accountInfo');
        }
        this.$store.dispatch('logincheck', {
          phone: this.ruleForm.username,
          password: this.ruleForm.password
        })

      },
      forgetPassWord () {
        this.$router.push({ path: '/forgetPassword'})
      },
      getVerificationCode () {
        this.$store.dispatch('getVerificationCode', {
          phone: this.fruleForm.phone
        })
      },
      repasswordsubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('getRepassword', {
              phone: this.fruleForm.phone,
              captcha: this.fruleForm.verificationCode,
              password: this.fruleForm.repassword
            })
          } else {
            return false
          }
        })
      },
      doRememberPassword () {
        let mySelf = this;
        let rememberStatus = mySelf.rememberPassword;
        // event.preventDefault();
        mySelf.rememberPassword = !rememberStatus;
        //console.log(mySelf.rememberPassword)
        if(!rememberStatus){
          mySelf.rememberPassword= true
        }else{
          mySelf.rememberPassword= false
          deleteCookie('accountInfo')
        }
      },
      loadAccountInfo () {
        let mySelf = this

        let accountInfo = getCookie('accountInfo')
        //如果cookie里没有账号信息
        if(Boolean(accountInfo) == false){
          //console.log('cookie中没有检测到账号信息！')
          return false
        }
        else{
          //如果cookie里有账号信息
          //console.log('cookie中检测到账号信息！现在开始预填写！')
          let userName = ""
          let passWord = ""
          accountInfo = htmlDecodeByRegExp(accountInfo)
          let index = accountInfo.indexOf("&")
          let Base64 = require('js-base64').Base64
          userName = accountInfo.substring(0,index)
          passWord = Base64.decode(accountInfo.substring(index+1))
          mySelf.ruleForm.username = userName
          mySelf.ruleForm.password = passWord
          mySelf.rememberPassword = true
        }
      },
      heightAuto () {
        var id = document.getElementById('loginbg')
        var screenHeight = document.documentElement.clientHeight
        var offset = document.body.offsetHeight
        var avail = window.screen.availHeight+250
        var wscreen = window.screen.height
        id.style.height = avail+'px'

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginbg{
    background: url("../assets/images/loginbg.jpg")repeat-y center top;
    background-size: cover;
    height:100%;
    padding-top: 2.88rem;
  }
  .remeber{
    width: 1.89rem;
    height: 0.25rem;
    line-height: 0.25rem;
    display: block;
    margin: 0 auto;
    color: #fff;
    font-size: 12px;
    margin-top: 1.12rem;
    white-space: nowrap;
  }
  [data-dpr="2"] .remeber{
    font-size: 20px;
  }
  [data-dpr="3"] .remeber{
    font-size: 20px;
  }
  .remeber span{
    float: left;
    display: inline;
    width: 0.25rem;
    height: 0.25rem;
    background: url("../assets/images/icon_none.png")no-repeat center center;
    background-size: 0.25rem 0.25rem;
    margin-right: 0.13rem;
  }
  .remeber span.right{
    background: url("../assets/images/icon_right.png")no-repeat center center;
    background-size: 0.25rem 0.25rem;
  }
  .forgetPassword{
    display: block;
    width: 6.55rem;
    margin: 0 auto;
  }
  .forgetPassword span{
    float: right;
    display: inline-block;
    color: #fff;
    padding-bottom: 0.2rem;
    text-decoration: underline;
  }
</style>
