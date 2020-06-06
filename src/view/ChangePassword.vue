<template>
  <el-form :model="loginParam" :rules="rules2" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">修改登录密码</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginParam.pass" auto-complete="off" placeholder="请输入新密码" maxlength="15"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginParam.confirmPass" auto-complete="off" placeholder="请输入确认密码"
                maxlength="20"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        logining: false,
        loginParam: {
          pass: '',
          confirmPass: ''
        },
        rules2: {
          pass: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
          ],
          confirmPass: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
          ]
        },
        checked: true
      };
    },
    methods: {
      // 获取短信验证码
      login() {
        if(this.loginParam.pass || this.loginParam.confirmPass){
          if(this.loginParam.pass == this.loginParam.confirmPass){
            this.$http.get(this.URL.CHANGEPASSWORD+"?password="+this.loginParam.pass).then((res)=>{
              if(res.data.flag === "1"){
                this.$tips("密码修改成功，请重新登录");
                sessionStorage.clear();
                this.$router.back();
              }else{
                this.$tips(res.body.msg);
              }
            });
          }else{
            this.$tips('密码不一致，请重新输入');
          }

        }else{
          this.$alert('账号或密码不能为空', '提示', {
            confirmButtonText: '确定'
          });
        }
      }
    }
  };
</script>

<style lang="scss" slot-scope>
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
</style>
