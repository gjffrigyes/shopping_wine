<template>
    <div>
      <shopHeader>忘记密码</shopHeader>
      <div class="form">
        <el-form :model="fruleForm" :rules="frules" ref="fruleForm">
          <div class="divBox300 bgf mb3 clearfix">
            <label class="username01"></label>
            <input v-model="ruleForm.username" placeholder="请输入手机号" class="inputbox w5 color0">
          </div>
          <div class="divBox300 bgf mb3 none clearfix">
            <span @click="getVerificationCode(fruleForm)">获取验证码</span>
            <div class="yzm">
              <label></label>
              <input v-model="fruleForm.verificationCode" placeholder="获取验证码" class="inputbox w4 color0">
            </div>
          </div>
          <div class="divBox300 bgf clearfix">
            <label class="key01"></label>
            <input v-model="fruleForm.repassword" placeholder="请输入新密码" class="inputbox w5 color0">
          </div>
        </el-form>
        <div slot="footer">
          <button type="primary" @click="repasswordsubmit('fruleForm')" class="loginbution blue">确认</button>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import shopHeader from './routeView/Header'
  export default {
    data () {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '号码不能为空', trigger: 'red' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        },
        fruleForm: {
          phone: '',
          verificationCode:'',
          password: ''
        },
        frules: {
          phone: [
            { required: true, message: '号码不能为空', trigger: 'red' }
          ],
          verificationCode: [
            { required: true, message: '验证码不能为空', trigger: 'red' }
          ],
          repassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created () {},
    computed: {
      ...mapGetters(['loginuser'])
    },
    methods: {
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
            //console.log('error submit!!')
            return false
          }
        })
      }
    },
    components: {
      'shopHeader': shopHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
