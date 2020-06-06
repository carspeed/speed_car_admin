<template>
  <el-container direction="vertical" >
   <div class="title-setting">
      <el-upload
         class="upload-demo"
         ref="upload"
         action="string"
        accept=".xls,.xlsx"
        :on-remove="handleRemove"
         :limit="1"
        :http-request="UploadImage"
         :before-upload="beforeUpload">
        <el-button slot="trigger" type="primary" style="margin-right: 20px">上传excel,一次上传的数据不要超过100条</el-button>
        <el-button type="primary" style="float:right;margin-top: 10px;margin-right: 50px" @click="outData">下载模板</el-button>
       <el-popover
          placement="bottom"
          title="帮助文档"
          width="200"
          trigger="click"
          :content="help_content">
        <el-button slot="reference" type="danger">帮助文档</el-button>
       </el-popover>
        

        
      </el-upload>
    </div>
    <el-main style="background: white">
      <el-table :data="tableData" border>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="brand" label="品牌" width="100" align="center"></el-table-column>
        <el-table-column prop="carType" label="车型" width="100" align="center"></el-table-column>
        <el-table-column prop="carColor" label="颜色" width="100" align="center"></el-table-column>
        <el-table-column prop="carImg" label="车子图片" width="60" align="center">
          <template slot-scope="scope">
              <el-image
                class="table-td-thumb"
                :src="scope.row.carImg"
                :preview-src-list="[scope.row.carImg]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="carYear" label="年份" width="60" align="center"></el-table-column>
        <el-table-column prop="isSpecial" label="车型类别" width="80" align="center" :formatter="formatterType"></el-table-column>
        <el-table-column prop="normalPrice" label="指导价(万元)" width="80" align="center"></el-table-column>
        <el-table-column prop="lowPrice" label="当地成交价(万元)" width="80" align="center"></el-table-column>
        <el-table-column prop="discountPrice" label="诸葛成交价(万元)" width="80" align="center"></el-table-column>
         <el-table-column prop="pointNumber" label="返现积分(元)" width="80" align="center"></el-table-column>
        <el-table-column prop="carDesc" label="车型信息" width="300" align="center"></el-table-column>
        <el-table-column prop="aboutApplyTime" label="预计提车时间" width="150" align="center"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="160" align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
      </el-table>
      <div style="float: right">
      <el-pagination
        style="margin-top: 20px;margin-right: 20px"
        background
        @current-change="changeSize"
        v-bind:page-size="15"
        layout="total,prev, pager, next"
        :total="totalNumbers">
      </el-pagination>
    </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      totalNumbers: 0,
      carType:'',
      checkType:1,
      help_content:'年份：代表生产年份，如2019，2020等；车型类别：填写1代表普通车型，2代表特殊车型；三个价格都以万元为单元，保留两位小数；返现积分为整数'
    };
  },
  created() {
      this.getPendingCars(1);
  },
  methods: {
    formatterType: function (row, column) {
        if(row.isSpecial == 1 ){
          return '普通车型';
        }else if(row.isSpecial == 2){
          return '特殊车型';
        }else{
          return '车型异常';
        }
      },
    UploadImage(param) {
        console.log('param', param.size);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.files = '';
        this.tableData = [];
      },
    handleEdit(index, row){
      console.log(index, row);
        this.$router.push({name: 'editCar', params: row});
    },
    handleDelete(index, row){
      console.log(index, row);
        //产品删除
        this.$http.get(this.URL.DOWNCAR + "?carId=" + row.carId).then((res) => {
          if (res.data.flag == "1") {
            this.$tips(res.data.msg);
            this.getPendingCars(1);
          } else {
            this.$tips(res.data.msg);
          }
        });
    },
      getPendingCars(page){
        this.$http.get(this.URL.PENDINGCARS+"?page="+page).then((res)=>{
                    if(res.data.flag === "1"){
                      console.log(res.data);
                      this.tableData = res.data.data.data;
                      this.totalNumbers = res.data.data.totalNumbers;
                    }else{
                      this.$tips(res.data.msg);
                    }
              });
      },
    
      beforeUpload(file) {
        console.log(file, '文件');
        this.files = file;
        const extension = file.name.split('.')[1] === 'xls';
        const extension2 = file.name.split('.')[1] === 'xlsx';
        const isLt5M = file.size / 1024 / 1024 < 2;
        if (!extension && !extension2) {
          this.$message.warning('上传模板只能是 xls、xlsx格式!');
          return false
        }
        if (!isLt5M) {
          this.$message.warning('上传模板大小不能超过 5MB!');
          return false
        }
        if(this.tableData.size >0){
          this.$message.warning('还有未上架的车型，咱不能继续上传');
          return false
        }
        this.fileName = file.name;
        setTimeout(() => {
          this.importfile();
        }, 500);
        return true; // 返回false不会自动上传
      },
      insertCars(list){
        this.$http.post(this.URL.INSETCARS,list).then((res)=>{
              if(res.data.flag == "1"){
                this.getPendingCars(1);
              }else{
                this.$tips("批量新增车型信息失败");
              }
            });
      },
      changeSize(val) {
        console.log(`当前页: ${val}`);
        //根据页面请求接口获取数据
        this.getPendingCars(val);
      },
      addCar(){
        this.$router.push('/newcar');
      },
      importfile() {
        let _this = this;
        // this.file = event.currentTarget.files[0];
        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.files;
        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function (f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require('xlsx');
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                type: 'base64'
              });
            } else {
              wb = XLSX.read(binary, {
                type: 'binary'
              });
            }
            // outdata就是你想要的东西 excel导入的数据
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            // excel 数据再处理
            let arr = [];
            outdata.map(v => {
              let obj = {};
              obj.brand = v.品牌;
              obj.carType = v.车型;
              obj.carColor = v.颜色;
              obj.carYear = v.年份;
              obj.isSpecial = v.车型类别;
              obj.normalPrice = v.指导价;
              obj.lowPrice = v.当地成交价;
              obj.discountPrice = v.诸葛价;
              obj.carDesc = v.车型信息;
              obj.aboutApplyTime = v.预计可提车日期;
              obj.pointNumber = Number(v.返现积分).toFixed(0);
              arr.push(obj)
            });
            _this.accountList = [...arr];
            console.log(_this.accountList);
            _this.tableData = _this.accountList;
            _this.insertCars(_this.accountList);
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
        
      },
      outData() {
         require.ensure([], () => {
                const {export_json_to_excel} = require('../../vendor/Export2Excel');
                //表头信息
                const tHeader = ['品牌', '车型', '颜色', '年份', '车型类别','指导价', '当地成交价', '诸葛价','车型信息','返现积分','预计可提车日期'];
                //const filterVal = ['app_label', 'app_regist', 'user_total', 'user_percent', 'user_old_total', 'user_old_percent', 'app_uv','average_click'];
                //const list = res.data.data;
                const data = this.formatJson([], []);
                export_json_to_excel(tHeader, data, "批量新增车型模板");

              })
      },
      formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
  }
};
</script>
<style scoped>
  .title-setting {
    width: 100%;
    height: 60px;
    background: #F7FAFE;
    line-height: 60px;
  }
</style>