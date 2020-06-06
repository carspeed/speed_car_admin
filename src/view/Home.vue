<template>
  <el-container style="height: 100%" direction="vertical">
    <div class="title-header">
      <img
        src="../assets/logo.png"
        width="80px"
        height="80px"
        style="float: left;margin-left: 30px;margin-top:10px;border-radius:50%"
      />
      <span style="font-size: 25px;color:white;float: left;margin-left: 30px;">秒车宝·后台管理系统</span>
      <span
        style="color: white;margin-right: 50px;font-size: 14px"
      >每个优秀的人或公司，都有一段沉默的时光。那段时光，是付出了很多努力，却得不到结果的日子，我们把它叫做扎根!</span>

      <el-dropdown style="float: right;margin-right: 30px;">
        <span class="el-dropdown-link" style="color: white">
          个人信息
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span style="color: white;margin-right: 50px;font-size: 14px;float: right">Hello，{{userPhone}}</span>
    </div>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu unique-opened @select="chooseSelect" :default-active="getDefault">
          <el-submenu index="1" v-show="type > 1 || type == 99 ">
            <template slot="title">
              <i class="el-icon-truck"></i>车型管理
            </template>
            <el-menu-item index="1-1" opened>新增车辆</el-menu-item>
            <el-menu-item index="1-4">批量新增</el-menu-item>
            <el-menu-item index="1-2">车型列表</el-menu-item>
            <el-menu-item index="1-3">订单处理</el-menu-item>
          </el-submenu>
          <el-submenu index="2" v-show="type == 2 || type == 99 ">
            <template slot="title">
              <i class="el-icon-tickets"></i>订单管理
            </template>
            <el-menu-item index="2-1">客户管理</el-menu-item>
            <el-menu-item index="2-2">订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3" v-show="type == 2 || type == 99 ">
            <template slot="title">
              <i class="el-icon-money"></i>财务管理
            </template>
            <el-menu-item index="3-1">支付管理</el-menu-item>
            <el-menu-item index="3-2">积分管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      isShow: false,
      content: "",
      userPhone: "管理员",
      type: 3
    };
  },
  computed: {
    getDefault() {
      var index = sessionStorage.getItem("index");
      return index;
    }
  },
  methods: {
    logout() {
      this.$http.get(this.URL.QUITLOGIN).then(res => {
        if (res.data.flag == "1") {
          sessionStorage.clear();
          this.$router.push("/login");
        }
      });
    },
    changePassword() {
      this.$router.push("/password");
    },
    chooseSelect(index, keyPath) {
      if (index == "1-1") {
        this.$router.push("/newCar");
      } else if (index == "1-2") {
        this.$router.push("/cars");
      } else if (index == "1-3") {
        this.$router.push("/orderCheck");
      }  else if (index == "1-4") {
        this.$router.push("/moreCars");
      } else if (index == "2-1") {
        this.$router.push("/guests");
      } else if (index == "2-2") {
        this.$router.push("/order");
      } else if (index == "3-1") {
        this.$router.push("/withdraw");
      } else if (index == "3-2") {
        this.$router.push("/point");
      }
      console.log("chooseSelect选中的index = " + index);
      console.log("chooseSelect选中的keyPath = " + keyPath);
      sessionStorage.setItem("index", index);
    }
  },
  mounted() {
    this.userPhone = sessionStorage.getItem("userPhone");
    var sessionId = sessionStorage.getItem("sessionId");
    this.type = sessionStorage.getItem("type");
    if (!sessionId) {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.title-header {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #4d5c6e;
}
</style>
