<template>
  <el-container direction="vertical">
    <div class="title-setting">
      <span style="margin-right: 10px">积分人手机号：</span>
      <el-input v-model="sellerPhone" style="width: 300px" placeholder="请输入积分人手机号" clearable></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-left: 20px"
        @click="checkData"
      >查询</el-button>
    </div>
    <el-main style="background: white">
      <el-table :data="tableData" border>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="sellerPhone" label="积分人手机号" width="180" align="center"></el-table-column>
        <el-table-column
          prop="pointNumber"
          label="积分数"
          width="130"
          align="center"
          :formatter="formatterType"
        ></el-table-column>
        <el-table-column
          prop="typePoint"
          label="积分类型"
          width="150"
          align="center"
          :formatter="formatterPoint"
        ></el-table-column>
        <el-table-column
          prop="brand"
          label="具体描述"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column prop="create_time" label="产生时间" width="170" align="center"></el-table-column>
        <el-table-column
          prop="status"
          label="来源"
          width="180"
          align="center"
          :formatter="formatterStatus"
        ></el-table-column>
        <el-table-column prop="end_time" label="提现时间" width="170" align="center"></el-table-column>
      </el-table>
      <div style="float: right">
        <el-pagination
          style="margin-top: 20px;margin-right: 20px"
          background
          @current-change="changeSize"
          v-bind:page-size="15"
          layout="total,prev, pager, next"
          :total="totalNumbers"
        ></el-pagination>
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
      sellerPhone: ""
    };
  },
  created() {
    this.getPoints(1);
  },
  methods: {
    formatterPoint: function(row, column) {
      if (row.typePoint == 1) {
        return "收入";
      } else if (row.typePoint == 2) {
        return "支出";
      } else {
        return "";
      }
    },
    formatterStatus: function(row, column) {
      if (row.status == 1) {
        return "小程序";
      } else if(row.status == 2){
        return '提现';
      }else {
        return "卖车";
      }
    },
    formatterType: function(row, column) {
      if (row.typePoint == 1) {
        return "+" + row.pointNumber;
      } else if (row.typePoint == 2) {
        return "-" + row.pointNumber;
      } else {
        return "积分异常";
      }
    },
    getPoints(page) {
      const item = {
        page: page,
        sellerPhone: this.sellerPhone
      };
      this.$http.post(this.URL.SELECTALLPOINT, item).then(res => {
        if (res.data.flag == "1") {
          this.tableData = res.data.data.data;
          this.totalNumbers = res.data.data.totalNumbers;
        } else {
          this.$tips(res.data.msg);
        }
      });
    },
    checkData() {
      this.getPoints(1);
    },
    changeSize(val) {
      console.log(`当前页: ${val}`);
      //根据页面请求接口获取数据
      this.getPoints(val);
    }
  }
};
</script>
<style scoped>
.title-setting {
  width: 100%;
  height: 60px;
  background: #f7fafe;
  line-height: 60px;
}
</style>