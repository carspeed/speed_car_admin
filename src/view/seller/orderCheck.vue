<template>
  <el-container direction="vertical" >
    <div class="title-setting">
      <span style="margin-right: 10px">销售员手机号：</span>
      <el-input v-model="sellerPhone" style="width: 300px" placeholder="请输入销售员手机号" clearable></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-left: 20px"
        @click="checkData"
      >查询</el-button>
    </div>
    </div>
    <el-main style="background: white">
      <el-table :data="tableData" border>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="sellerPhone" width="150" label="销售联系方式" align="center"></el-table-column>
        <el-table-column prop="brand" label="品牌" width="130" align="center"></el-table-column>
        <el-table-column prop="carType" label="车型" width="100" align="center"></el-table-column>
        <el-table-column prop="carImg" label="车子图片" width="60" align="center">
          <template slot-scope="scope">
              <el-image
                class="table-td-thumb"
                :src="scope.row.carImg"
                :preview-src-list="[scope.row.carImg]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="orderImg" label="合同图片" width="60" align="center">
          <template slot-scope="scope">
              <el-image
                class="table-td-thumb"
                :src="scope.row.orderImg"
                :preview-src-list="[scope.row.orderImg]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="carYear" label="年份" width="80" align="center"></el-table-column>
        <el-table-column prop="discountPrice" label="诸葛价" width="100" align="center"></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="110"
          align="center"
          :formatter="formatterType"
        ></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="170" align="center"></el-table-column>
        <el-table-column prop="carTime" label="预计提车时间" width="170" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.status != 2">交易处理中
          </el-button>
          <!-- <el-button
            size="medium"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.status == 4">交易关闭
          </el-button> -->
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
      sellerPhone:''
    };
  },
  created() {
      this.getOrders(1);
  },
  methods: {
    formatterType: function (row, column) {
      //1 未支付 status=2 已支付  status=3 交易处理中  status=4 交易完成  status=5 交易关闭
        if(row.status == 1 ){
          return '未支付定金';
        }else if(row.status == 2){
          return '已支付定金';
        }else if(row.status == 3){
          return '下单处理中';
        }else if(row.status == 4){
          return '交易完成';
        }else if(row.status == 5){
          return '交易关闭';
        }else{
          return '交易异常';
        }
      },
    handleEdit(index, row){
      const item = {
          "orderId":row.orderId,
          "sellerPhone":row.sellerPhone,
          "pointNumber":row.pointNumber,
          "openid":row.openid,
          "status":3
        }
      //交易处理
        this.$http.post(this.URL.CLOSEORDER,item).then((res) => {
          if (res.data.flag == "1") {
            this.$tips(res.data.msg);
            this.getOrders(1);
          } else {
            this.$tips(res.data.msg);
          }
        });
    },
    handleDelete(index, row){
        //交易关闭
        const item = {
          "orderId":row.orderId,
          "sellerPhone":row.sellerPhone,
          "pointNumber":row.pointNumber,
          "openid":row.openid,
          "status":5
        }
        this.$http.get(this.URL.CLOSEORDER ,item).then((res) => {
          if (res.data.flag == "1") {
            this.$tips(res.data.msg);
            this.getOrders(1);
          } else {
            this.$tips(res.data.msg);
          }
        });
    },
      getOrders(page){
        const item = {
          "page":page,
          "sellerPhone":this.sellerPhone
        }
        this.$http.post(this.URL.SELLECTALLORDER,item).then((res)=>{
              if(res.data.flag == "1"){
                this.tableData = res.data.data.data;
                this.totalNumbers = res.data.data.totalNumbers;
              }else{
                this.$tips(res.data.msg);
              }
            });
      },
      checkData(){
        this.getOrders(1);
      },
      changeSize(val) {
        console.log(`当前页: ${val}`);
        this.getOrders(val);
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
</style>