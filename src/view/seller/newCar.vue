<template>
  <el-container direction="vertical" style="width: 100%;margin-top: 50px;margin-left: 100px">
    <el-form
      ref="ruleForm"
      :model="form"
      label-width="150px"
      label-position="left"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item label="车辆品牌:" prop="brand">
        <el-input v-model="form.brand" style="width: 300px;float: left" placeholder="请输入车辆品牌"></el-input>
      </el-form-item>
      <el-form-item label="车型:" prop="carType">
        <el-input v-model="form.carType" style="width: 300px;float: left"  placeholder="请输入车型"></el-input>
      </el-form-item>
      <el-form-item label="颜色:" prop="carColor">
        <el-input v-model="form.carColor" style="width: 200px;float: left" placeholder="请输入车型颜色"></el-input>
      </el-form-item>
      <el-form-item label="生产年份:" prop="carYear">
        <el-input v-model="form.carYear" style="width: 200px;float: left" placeholder="请输入车型生产年份"></el-input>
      </el-form-item>
      <el-form-item label="预计可提车日期:" prop="aboutApplyTime">
        <el-input v-model="form.aboutApplyTime" style="width: 200px;float: left" placeholder="请输入预计可提车日期"></el-input>
      </el-form-item>
      <el-form-item label="车型类别:" label-width="150px" prop="isSpecial">
        <el-select v-model="form.isSpecial" placeholder="请选择车型类别" style="float: left" @change="setProductStatus">
          <el-option label="普通车型" value="1"></el-option>
          <el-option label="特殊车型" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指导价（万元）:" prop="normalPrice">
        <template slot-scope="scope">
         <el-input
          v-model="form.normalPrice"
          style="width: 200px;float: left"
          placeholder="请输入指导价"
          type="number"
          maxlength="16"
        ></el-input>
        <span style="float: left;margin-left: 50px">当地成交价（万元）：</span>
        <el-input
          v-model="form.lowPrice"
          style="width: 200px;float: left;margin-left: 5px"
          placeholder="请输入当地成交价"
          type="number"
          maxlength="16"
        ></el-input>
        <span style="float: left;margin-left: 50px">诸葛成交价（万元）：</span>
        <el-input
          v-model="form.discountPrice"
          style="width: 200px;float: left;margin-left: 5px"
          placeholder="请输入诸葛成交价"
          type="number"
          maxlength="16"
        ></el-input>
        </template>
      </el-form-item>
      <el-form-item label="返现积分(元):" prop="pointNumber">
        <el-input v-model="form.pointNumber" style="width: 300px;float: left" type="number" @change="chekNumber()" placeholder="诸葛价的1%，不超过20000"></el-input>
      </el-form-item>
      <el-form-item label="车型描述:" prop="carDesc">
        <el-input
          type="textarea"
          v-model="form.carDesc"
          style="width: 70%;float: left;"
          maxlength="200"
          :rows="8"
          show-word-limit
          placeholder="车子简介"
        ></el-input>
      </el-form-item>
      <el-form-item label="车子图片上传:" prop="carImg">
        <el-upload
          class="avatar-uploader"
          action="string"
          :show-file-list="false"
          multiple
          :limit="1"
          :on-remove="handleRemove"
          :http-request="UploadImage"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label-width="10px">
        <el-button
          type="primary"
          style="width: 200px;margin-top: 30px;float: left;margin-left: 10%"
          @click="submitForm('ruleForm')"
        >上传</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        brand: [{ required: true, message: "请输入车辆品牌", trigger: "blur" }],
        carType: [
          { required: true, message: "请输入车辆型号", trigger: "blur" }
        ],
        carColor: [
          { required: true, message: "请输入车辆颜色", trigger: "blur" }
        ],
        carYear: [
          { required: true, message: "请输入车辆年份", trigger: "blur" }
        ],
        isSpecial:[
          { required: true, message: "请选择车型类别", trigger: "blur" }
        ],
        normalPrice: [
          { required: true, message: "请输入车辆指导价", trigger: "blur" }
        ],
        lowPrice: [
          { required: true, message: "请输入车辆折扣价", trigger: "blur" }
        ],
        discountPrice: [
          { required: true, message: "请输入车辆优惠额度", trigger: "blur" }
        ],
        carDesc: [
          { required: true, message: "请输入车辆简介", trigger: "blur" }
        ],
        pointNumber:[
          { required: true, message: "请确认返现的积分", trigger: "blur" }
        ],
        carImg: [
          { required: true, message: "请上传车型图片", trigger: "blur" }
        ],
        aboutApplyTime: [
          { required: true, message: "请输入预计可提车日期", trigger: "blur" }
        ]
      },
      form: {
        brand: "",
        carType: "",
        carColor: "",
        carYear: "",
        normalPrice: "",
        lowPrice: "",
        discountPrice: "",
        carDesc: "",
        carId: "",
        carImg:'',
        pointNumber:'',
        isSpecial:'',
        aboutApplyTime:''
      },
      imageUrl: ""
    };
  },
  methods: {
    chekNumber(){
      this.form.pointNumber = Number(this.form.pointNumber).toFixed(0);
      console.log(this.form.pointNumber);
    },
    setProductStatus(value) {
        this.isSpecial = value;
      },
    UploadImage(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      this.$http.post(this.URL.UPLOADIMG, formData).then(res => {
        if (res.data.flag == "1") {
          console.log("上传图片成功");
          this.form.carImg =
            "http://47.105.206.208:8082/logo_img/" + res.data.msg;
          this.imageUrl = "http://47.105.206.208:8082/logo_img/" + res.data.msg;
        } else {
          this.$alert("图片上传失败", "提示", {
            confirmButtonText: "确定"
          });
        }
      });
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$tips('上传车型图片只能是png或者jpg格式!');
        }
        if (!isLt2M) {
          this.$tips('上传车型图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post(this.URL.ADDCAR, this.form).then(res => {
            if (res.data.flag == "1") {
              this.form = {};
              this.imageUrl ='';
              this.$tips("新增车辆信息成功");
            } else {
              this.$tips("新增车辆信息失败");
            }
          });
        } else {
          this.$tips("请检查一下再进行提交");
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      this.form.carImg = "";
      this.imageUrl = "";
    }
  }
};
</script>

<style scoped>
.title {
  height: 100px;
  font: 2em sans-serif;
  float: left;
}
.btn {
  margin-top: 60px;
}
.avatar-uploader{
  width: 300px; 
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>
