  
<template>
  <div class="login_bg">
    <el-form :model="loginParam" :rules="rules2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">秒车宝·后台管理系统</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginParam.account" auto-complete="off" placeholder="请输入手机号" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="loginParam.checkPass" auto-complete="off" placeholder="请输入密码"
                  maxlength="20"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">确认</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        logining: false,
        loginParam: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: true,
        content:'',
        isShow:false
      };
    },
    methods: {
      // 获取短信验证码
      login() {
        if(this.loginParam.account || this.loginParam.checkPass){
          this.$http.post(this.URL.LOGIN, {'userPhone': this.loginParam.account,'password':this.loginParam.checkPass}).then((res)=>{
            if(res.data.flag === "1"){
              sessionStorage.setItem('sessionId',res.data.data.sessionId);
              sessionStorage.setItem('type',res.data.data.type);
              sessionStorage.setItem('userCode',res.data.data.userCode);
              sessionStorage.setItem('userPhone',res.data.data.userPhone);
              this.$router.push({name:'home',params:res.data.data});
            }else{
              this.$tips(res.data.msg);
            }
          });
        }else{
          this.$alert('账号或密码不能为空', '提示', {
            confirmButtonText: '确定'
          });
        }
      }
    }
  };
</script>

<style lang="scss" scope>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
  }

  .login_bg {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position:absolute;
  }
</style>