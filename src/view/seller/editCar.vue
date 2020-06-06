<template>
  <el-container direction="vertical" style="width: 100%;margin-top: 50px;margin-left: 100px">
    <span class="title">车型列表/修改车型信息</span>
    <el-form ref="ruleForm" :model="form" label-width="150px" label-position="left" status-icon :rules="rules" class="demo-ruleForm">
      <el-form-item label="车辆品牌:" prop="brand">
        <el-input v-model="form.brand" style="width: 300px;float: left" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="车型:" prop="carType">
        <el-input v-model="form.carType" style="width: 300px;float: left"></el-input>
      </el-form-item>
      <el-form-item label="颜色:" prop="carColor">
        <el-input v-model="form.carColor" style="width: 200px;float: left"></el-input>
      </el-form-item>
      <el-form-item label="年份:" prop="carYear">
        <el-input v-model="form.carYear" style="width: 200px;float: left"></el-input>
      </el-form-item>
      <el-form-item label="预计可提车日期:" prop="aboutApplyTime">
        <el-input v-model="form.aboutApplyTime" style="width: 200px;float: left" placeholder="请输入预计可提车日期"></el-input>
      </el-form-item>
      <el-form-item label="车型类别:" label-width="150px" prop="isSpecial">
        <el-select v-model="form.isSpecial" placeholder="车型类别" style="float: left" @change="setProductStatus">
          <el-option label="普通车型" value="1"></el-option>
          <el-option label="特殊车型" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指导价（万元）:" prop="normalPrice">
        <el-input v-model="form.normalPrice" style="width: 150px;float: left"
                  placeholder="请输入指导价"
                  type="number"
                  maxlength="16"
        ></el-input>
        <span style="float: left;margin-left: 50px" prop="lowPrice">当地成交价（万元）：</span>
        <el-input v-model="form.lowPrice" style="width: 150px;float: left;margin-left: 5px"
                  placeholder="请输入当地成交价"
                  type="number"
                  maxlength="16"
        ></el-input>
        <span style="float: left;margin-left: 50px" prop="discountPrice">诸葛价（万元）：</span>
        <el-input v-model="form.discountPrice" style="width: 150px;float: left;margin-left: 5px"
                  placeholder="请输入诸葛最优价格"
                  type="number"
                  maxlength="16"
        ></el-input>
      </el-form-item>
      <el-form-item label="车型描述:" prop="carDesc" maxlength="200" show-word-limit placeholder="车子简介">
        <el-input type="textarea" v-model="form.carDesc" style="width: 50%;float: left"></el-input>
      </el-form-item>
      <el-form-item label="车子图片上传:">
        <el-upload
          class="upload-demo"
          action="string"
          multiple
          :limit="1"
          :on-remove="handleRemove"
          :http-request="UploadImage">
          <div style="float:left;width:200px">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
          </div>
          <div style="float:left;width:200px">
            <el-button size="small" type="primary" class="btn">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </div>
          
        </el-upload>
      </el-form-item>
      <el-form-item label-width="10px">
        <el-button type="primary" style="width: 200px;margin-top: 30px;float: left;margin-left: 10%" @click="submitForm('ruleForm')" >确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>

  export default {
    data() {
      var checkEmpty = (rule,value,callback)=>{
        if(value === ''){
          return callback(new Error('不能为空'));
        }else{
          callback();
        };
      };
      var checkNumber = (rule,value,callback)=>{
        if(value === ''){
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (isNaN(value)) {
            callback(new Error('请输入数字值,越大越靠前'));
          } else {
            callback();
          }
        }, 200);
      };

      return {
        rules:{
          brand:[{ validator: checkEmpty, trigger: 'blur' }],
          carType:[{ validator: checkEmpty, trigger: 'blur' }],
          carColor:[{ validator: checkEmpty, trigger: 'blur' }],
          carYear:[{ validator: checkEmpty, trigger: 'blur' }],
          normalPrice:[{ validator: checkEmpty, trigger: 'blur' }],
          lowPrice:[{ validator: checkEmpty, trigger: 'blur' }],
          discountPrice:[{ validator: checkEmpty, trigger: 'blur' }],
          carDesc:[{ validator: checkEmpty, trigger: 'blur' }],
          isSpecial:[{ validator: checkEmpty, trigger: 'blur' }],
          aboutApplyTime:[{ validator: checkEmpty, trigger: 'blur' }]
        },
        form:{},
        imageUrl:''
      }
    },
    created(){
      console.log('params:',this.$route.params);
        this.form =this.$route.params;
        this.imageUrl = this.$route.params.carImg;
    },
    methods: {
      UploadImage(param){
        const formData = new FormData();
        formData.append('file', param.file);
        this.$http.post(this.URL.UPLOADIMG,formData).then((res)=>{
          if(res.data.flag == "1"){
            console.log('上传图片成功');
            this.form.carImg = "http://47.105.206.208:8082/logo_img/"+res.data.msg;
            this.imageUrl = "http://47.105.206.208:8082/logo_img/"+res.data.msg;
          }else{
            this.$alert('图片上传失败', '提示', {
              confirmButtonText: '确定'
            });
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.URL.UPDATECARMESSAGE,this.form).then((res)=>{
              if(res.data.flag == "1"){
                this.$router.back();
                this.$tips("更新车型信息成功");
              }else{
                this.$tips("更新车型信息失败");
              }
            });
          } else {
            this.$tips("请检查一下再进行提交");
            return false;
          }
        });
      },
      setProductStatus(value) {
        this.isSpecial = value;
      },
      handleRemove(file, fileList) {
          this.form.carImg = '';
          this.imageUrl = '';
      }
    }
  }
</script>

<style scoped>
.title{
  height: 100px;
  font: 2em sans-serif;
  float: left;
}
.btn{
  margin-top: 60px;
}
.upload-demo{
  width: 500px;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
