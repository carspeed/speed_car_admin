// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import {Loading} from 'element-ui';
import url from './http/url';
import {Tips} from "./components";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Loading);
Vue.use(Tips);
Vue.prototype.URL = url;
Vue.prototype.$http = axios;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.timeout = 1000 * 60;

let loadingInstance;
axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      lock: true,
      text: '拼命加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    config.headers.sessionId = sessionStorage.getItem('sessionId');
    console.log("request->", config.url, config.params,config.data);
    return config;
  },
  error => {
    loadingInstance.close();
    instance.$tips('请求出现异常,请重试');
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  res => {
    loadingInstance.close();
    console.log('response->', res.data);
    if (res.data) {
      if (res.data.flag === "ok" || res.data.flag === "1") {

      } else if (res.data.flag === -1) {
        //登陆过期,跳转到登录页面
        sessionStorage.clear();
        instance.$router.push('/login')
      } else {
        //异常
        instance.$tips(res.data.msg);
      }
    } else {
      instance.$tips('网络出现异常');
      sessionStorage.clear();
      instance.$router.push('/login');
    }
    return res;
  },
  error => {
    loadingInstance.close();
    instance.$tips('response is error');
    sessionStorage.clear();
    instance.$router.push('/login');
    return Promise.reject(error);
  }
);
/* eslint-disable no-new */
const instance = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
