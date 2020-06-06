<template>
  <el-container direction="vertical">
    <div class="title-setting">
      <span style="margin-right: 10px">申请人手机号：</span>
      <el-input v-model="userPhone" style="width: 300px" placeholder="请输入申请人手机号" clearable></el-input>
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
        <el-table-column prop="userName" label="申请人" width="100" align="center"></el-table-column>
        <el-table-column prop="userPhone" label="申请人手机号" width="120" align="center"></el-table-column>
        <el-table-column prop="bankNumber" label="银行卡号" width="250" align="center"></el-table-column>
        <el-table-column prop="openBankName" label="开户行" width="180" align="center"></el-table-column>
        <el-table-column prop="expendMoney" label="申请提现积分" width="105" align="center"></el-table-column>
        <el-table-column
          prop="status"
          label="支付状态"
          width="90"
          align="center"
          :formatter="formatterType"
        ></el-table-column>
        <el-table-column prop="apply_time" label="申请时间" width="160" align="center"></el-table-column>
        <el-table-column prop="pay_time" label="支付时间" width="160" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="medium" @click="handleEdit(scope.$index, scope.row)" v-bind:disabled="scope.row.status != 1">确认支付</el-button>
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
      userPhone: "",
      checkType: 1
    };
  },
  created() {
    this.getPays(1);
  },
  methods: {
    handleEdit(index,row){
      const item = {
        "pay_id": row.pay_id,
        "openid": row.openid,
        "pointNumber":row.expendMoney,
        "status":2,
        "sellerPhone":row.userPhone
      };
      this.$http.post(this.URL.CONFIRMPAY, item).then(res => {
        if (res.data.flag == "1") {
          this.getPays(1);
        } else {
          this.$tips(res.data.msg);
        }
      });
    },
    formatterType: function(row, column) {
      //1=接待中 2=已付款
      if (row.status == 1) {
        return "未支付";
      } else if (row.status == 2) {
        return "已支付";
      }  else {
        return "状态异常";
      }
    },
    getPays(page) {
      this.$http.get(this.URL.PAYORDER + "?page=" + page).then(res => {
        if (res.data.flag === "1") {
          console.log(res.data);
          this.tableData = res.data.data.data;
          this.totalNumbers = res.data.data.totalNumbers;
        } else {
          this.$tips(res.data.msg);
        }
      });
    },
    checkData() {
      if (this.userPhone) {
        this.checkType = 2;
        this.checkPays(1);
      } else {
        this.checkType = 1;
        this.getPays(1);
      }
    },

    checkPays(page) {
      const item = {
        "page": page,
        "userPhone": this.userPhone
      };
      this.$http.post(this.URL.SELLERPAYORDER, item).then(res => {
        if (res.data.flag == "1") {
          this.tableData = res.data.data.data;
          this.totalNumbers = res.data.data.totalNumbers;
        } else {
          this.$tips("查询支付订单失败");
        }
      });
    },
    changeSize(val) {
      console.log(`当前页: ${val}`);
      //根据页面请求接口获取数据
      if (this.checkType == 2) {
        this.checkPays(val);
      } else {
        this.getPays(val);
      }
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