<template>
  <el-container direction="vertical" >
    <div class="title-setting">
      <span style="margin-right: 10px">日期选择</span>
      <el-date-picker
        v-model="chooseDate"
        type="daterange"
        value-format="timestamp"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <span style="margin-right: 10px;margin-left: 20px">销售员手机号：</span>
      <el-input v-model="sellerPhone" style="width: 300px" placeholder="请输入销售员手机号" clearable></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left: 20px" @click="searchSeller(1)">查询</el-button>

      <el-button type="primary" style="float:right;margin-top: 10px;margin-right:20px" @click="outData" icon="el-icon-copy-document">一键导出</el-button>
    </div>
    <el-main style="background: white">
      <el-table :data="tableData" border>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="sellerPhone" label="客户归属销售" width="150" align="center"></el-table-column>
        <el-table-column prop="userName" label="客户姓名" width="150" align="center"></el-table-column>
        <el-table-column prop="userPhone" label="客户手机号" width="150" align="center"></el-table-column>
        <el-table-column prop="wantCarDes" label="意向车型" width="300" align="center"></el-table-column>
        <el-table-column prop="fromChannel" label="客户来源" width="80" align="center" :formatter="formatterChannel"></el-table-column>
        <el-table-column prop="status" label="客户状态" width="120" align="center" :formatter="formatterType">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="160" align="center"></el-table-column>
        <el-table-column prop="update_time" label="更新时间" width="160" align="center"></el-table-column>
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
      sellerPhone:'',
      chooseDate: ''
    };
  },
  created() {
      this.searchSeller(1);
  },
  methods: {
    formatterType: function (row, column) {
      //1=接待中 2=交易中 3=已付款 4=已成交
        if(row.status == 1 ){
          return '接待中';
        }else if(row.status == 2){
          return '交易中';
        }else if(row.status == 3){
          return '已付款';
        }else if(row.status == 4){
          return '已成交';
        }else{
          return '状态异常';
        }
      },
      formatterChannel: function (row, column) {
        if(row.fromChannel == 1 ){
          return '小程序';
        }else{
          return '未知';
        }
      },
      searchSeller(page){
        var start_time =0;
        var end_time=0;
        if(this.chooseDate){
            start_time=this.chooseDate[0]/1000;
            end_time = this.chooseDate[1]/1000;
        }
        const item = {
          "page":page,
          "sellerPhone":this.sellerPhone,
          "start_time":start_time,
          "end_time":end_time,
        }
        this.$http.post(this.URL.CHECKGUEST,item).then((res)=>{
              if(res.data.flag == "1"){
                this.tableData = res.data.data.data;
                this.totalNumbers = res.data.data.totalNumbers;
              }else{
                this.$tips("查询客户信息失败");
              }
            });
      },
      changeSize(val) {
        console.log(`当前页: ${val}`);
        //根据页面请求接口获取数据
        this.searchSeller(val);
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      outData() {
        console.log("chooseDate=" + this.chooseDate);
        if (this.chooseDate) {
          if(this.tableData){
            require.ensure([], () => {
              const {export_json_to_excel} = require('../../vendor/Export2Excel');
              //表头信息
              const tHeader = ['客户归属销售','客户姓名','客户手机号', '意向车型', '客户来源', '客户状态', '创建时间'];
              const filterVal = ['sellerPhone','userName','userPhone', 'wantCarDes', 'fromChannel', 'status', 'create_time'];
              const list = this.tableData;
              list.forEach((item,index)=>{
                  item.fromChannel='小程序';
                  if(item.status == 1){
                    item.status ='接待中'
                  }else if(item.status == 2){
                    item.status ='交易中'
                  }else if(item.status == 3){
                    item.status ='已付款'
                  }else if(item.status == 4){
                    item.status ='已成交'
                  }
              })
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, "客户管理表");
            })
          }else{
            var start_time =0;
            var end_time=0;
            if(this.chooseDate){
                start_time=this.chooseDate[0]/1000;
                end_time = this.chooseDate[1]/1000;
            }
            const item = {
              "page":page,
              "sellerPhone":this.sellerPhone,
              "start_time":start_time,
              "end_time":end_time,
            }
            this.$http.post(this.URL.CHECKGUEST,item).then((res)=>{
              if(res.data.flag == "1"){
                require.ensure([], () => {
                  const {export_json_to_excel} = require('../../vendor/Export2Excel');
                  //表头信息
                  const tHeader = ['客户归属销售','客户姓名','客户手机号', '意向车型', '客户来源', '客户状态', '创建时间'];
                  const filterVal = ['sellerPhone','userName','userPhone', 'wantCarDes', 'fromChannel', 'status', 'create_time'];
                  const list = this.tableData;
                  list.forEach((item,index)=>{
                      item.fromChannel='小程序';
                      if(item.status == 1){
                        item.status ='接待中'
                      }else if(item.status == 2){
                        item.status ='交易中'
                      }else if(item.status == 3){
                        item.status ='已付款'
                      }else if(item.status == 4){
                        item.status ='已成交'
                      }
                  })
                  const data = this.formatJson(filterVal, list);
                  export_json_to_excel(tHeader, data, "客户管理表");
                })
              }else{
                this.$tips("查询客户信息失败");
              }
            });
          }
        } else {
          this.$alert('您还没有选择要导出的日期', '提示', {
            confirmButtonText: '确定'
          });
        }
      }
  }
}
</script>
<style scoped>
  .title-setting {
    width: 100%;
    height: 60px;
    background: #F7FAFE;
    line-height: 60px;
  }
</style>