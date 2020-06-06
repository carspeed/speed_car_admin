<template>
  <el-container direction="vertical" >
    <div class="title-setting">
      <span style="margin-right: 10px">汽车型号：</span>
      <el-input v-model="carType" style="width: 300px" placeholder="请输入汽车型号" clearable></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left: 20px" @click="checkData">查询</el-button>
      <!-- <el-button type="primary" style="float: right;margin-top: 10px;margin-right: 30px;" @click="addCar">新增车型</el-button> -->
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
        <el-table-column prop="discountPrice" label="诸葛价(万元)" width="80" align="center"></el-table-column>
        <el-table-column prop="pointNumber" label="返现积分(元)" width="80" align="center"></el-table-column>
        <el-table-column prop="carDesc" label="车型信息" width="300" align="center"></el-table-column>
        <el-table-column prop="aboutApplyTime" label="预计提车时间" width="120" align="center"></el-table-column>
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
    };
  },
  created() {
      this.getCars(1);
  },
  methods: {
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
            this.getCars(1);
          } else {
            this.$tips(res.data.msg);
          }
        });
    },
    formatterType: function (row, column) {
        if(row.isSpecial == 1 ){
          return '普通车型';
        }else if(row.isSpecial == 2){
          return '特殊车型';
        }else{
          return '车型异常';
        }
      },
      getCars(page){
        this.$http.get(this.URL.CHECKCARS+"?page="+page).then((res)=>{
                    if(res.data.flag === "1"){
                      console.log(res.data);
                      this.tableData = res.data.data.data;
                      this.totalNumbers = res.data.data.totalNumbers;
                    }else{
                      this.$tips(res.data.msg);
                    }
              });
      },
      checkData(){
        if(this.carType){
          this.checkType = 2;
          this.checkCar(1);
        }else{
          this.checkType = 1;
          this.getCars(1);
        }
        
      },
      checkCar(page){
        const item = {
          "page":page,
          "carType":this.carType
        }
        this.$http.post(this.URL.CHECKCAR,item).then((res)=>{
              if(res.data.flag == "1"){
                this.tableData = res.data.data.data;
                this.totalNumbers = res.data.data.totalNumbers;
              }else{
                this.$tips("查询车型信息失败");
              }
            });
      },
      changeSize(val) {
        console.log(`当前页: ${val}`);
        //根据页面请求接口获取数据
        if(this.checkType == 2){
          this.checkCar(val);
        }else{
          this.getCars(val);
        }
      },
      addCar(){
        this.$router.push('/newcar');
      }
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
    .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>