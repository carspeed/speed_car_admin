const BASEURL = 'https://api.inchyear.com/car';
// const BASEURL = 'http://127.0.0.1:8080';
//登录
const LOGIN = BASEURL + '/login/adminLogin';
//退出登录
const QUITLOGIN = BASEURL + '/login/quit';
//修改个人密码
const CHANGEPASSWORD = BASEURL +'/login/change/password'
//查询客户情况
const CHECKGUEST = BASEURL+'/sell/select/allguest';
//查询指定销售员客户情况
const SELLERGUEST = BASEURL +'/sell/select/guest';
//查询车型情况
const CHECKCARS = BASEURL+'/car/select/allcar';
//查询待上架车型情况
const PENDINGCARS = BASEURL+'/car/select/pending';

//上传图片
const UPLOADIMG = BASEURL + '/setting/uploadImg';

//新增车辆
const ADDCAR = BASEURL + '/car/add/car';
//批量新增车辆
const INSETCARS = BASEURL +'/car/insert/cars';
//更新车型信息
const UPDATECARMESSAGE = BASEURL +'/car/update/car';
//车型下架
const DOWNCAR = BASEURL +'/car/down/car';
//查询指定车型
const CHECKCAR = BASEURL +'/car/check/car';

//支付管理
//查询所有支付订单
const PAYORDER = BASEURL +'/point/all/expend';
//查询销售员的支付订单
const SELLERPAYORDER = BASEURL +'/point/seller/expend';
//确认支付
const CONFIRMPAY = BASEURL + "/point/pay/status";

//积分管理
const SELECTALLPOINT = BASEURL +"/point/select/all";

//订单管理
//查询所有订单
const SELLECTALLORDER = BASEURL +'/order/select/all';
//关闭单个订单
const CLOSEORDER = BASEURL + '/order/delete/order';
export default {
    LOGIN,QUITLOGIN,CHECKGUEST,CHECKCARS,UPLOADIMG,ADDCAR,UPDATECARMESSAGE,DOWNCAR,CHECKCAR,SELLERGUEST,PAYORDER,SELLERPAYORDER,CONFIRMPAY,CHANGEPASSWORD,SELECTALLPOINT,
    SELLECTALLORDER,CLOSEORDER,PENDINGCARS,INSETCARS
  }