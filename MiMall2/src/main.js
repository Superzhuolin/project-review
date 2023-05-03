import Vue from 'vue'
import router from './router'
import axios from "axios"
import VueAxios from "vue-axios"  //把axios对象挂载到vue实例中，方便我们使用this调用
import VueLazyLoad from 'vue-lazyload'  //懒加载
import VueCookie from 'vue-cookie'
import store from './store/index'  //默认读取里面的index.js
import App from './App.vue'  //主键

import {Message} from 'element-ui'   // 引入element-ui中的Message
import 'element-ui/lib/theme-chalk/index.css' //element-ui样式，只需引入一次
//import env from "./env"  //  ./表示当前目录 若没有会被当成插件


// mock开关
const mock = false;
if(mock){
  require("./mock/api");
}
// 设置请求基础值，根据前端的跨域方式做调整  
axios.defaults.baseURL = "/api";
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL=env.baseURL;

//接口错误拦截    所以接口的返回值一定会经过response
axios.interceptors.response.use(function (response) {
  let res = response.data;//取到的接口值
  let path = location.hash;//获取哈希路由地址

  if (res.status == 0) { //状态码为0代表成功
    return res.data;//接口返回值
  } else if (res.status == 10) {  //状态码为10代表未登录
    //main.js中无法用路由跳转页面,因为路由挂载在vue实例中，this没有指向vue
    if (path != "#/index") {//浏览非主页 会跳转到登录页面
      window.location.href = "/#/login"
    }
    return Promise.reject(res);     //返回promise错误状态
  } else{ // 真正报错
    this.$message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
})

Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
  error:"/public/imgs/错误图片.png",
  loading: '/imgs/loading-svg/loading-bars.svg'
});  //加载懒加载插件

//激活Message插件到vue原型上，方便我们使用this调用
Vue.prototype.$message = Message;  
Vue.config.productionTip = false; //生产环境提示

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
