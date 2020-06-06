import Vue from 'vue'
import Router from 'vue-router'
import Home from '../view/Home';
import Login from '../view/Login';
import Guest from '../view/order/guests';
import Car from '../view/seller/cars';
import EditCar from '../view/seller/editCar';
import NewCar from '../view/seller/newCar';
import PayMoney from '../view/cash/payMoney';
import ChangePassword from '../view/ChangePassword';
import PointMessage from '../view/cash/pointMessage';
import Orders from '../view/order/orders';
import OrderCheck from '../view/seller/orderCheck';
import MoreNewCar from '../view/seller/moreNewCar';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      iconCls: 'el-icon-message',//图标样式class
      children: [
        {path: '/guests', component: Guest, name: '客户管理'},
        {path: '/cars', component: Car, name: '车型资料'},
        {path: '/newcar', component: NewCar, name: '新增车型'},
        {path: '/editcar', component: EditCar, name: 'editCar'},
        {path: '/withdraw', component: PayMoney, name: '支付管理'},
        {path: '/point', component: PointMessage, name: '积分管理'},
        {path: '/order', component: Orders, name: '订单管理'},
        {path: '/orderCheck', component: OrderCheck, name: '订单处理'},
        {path: '/moreCars', component: MoreNewCar, name: '批量新增'},
        ]
    },
    {
      path: '/password',
      component: ChangePassword,
      name: '修改密码',
      iconCls: 'el-icon-message',//图标样式class
    },
    {
      path: '/login',
      component: Login,
      name: '登录',
      iconCls: 'el-icon-message',//图标样式class
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      iconCls: 'el-icon-message',//图标样式class
    }
  ]
})
