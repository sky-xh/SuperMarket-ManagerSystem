import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入重置样式表,公用样式表
import './assets/css/reset.css'
import './assets/css/common.css'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入封装好的axios
import request from '@/utils/request'
// 引入Echarts
import echarts from 'echarts'

// 挂载原型
Vue.prototype.$http = request;
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
