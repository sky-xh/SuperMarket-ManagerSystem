import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'                   // 引入重置样式表,公用样式表
import './assets/css/common.css'
import ElementUI from 'element-ui'                // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import request from '@/utils/request'             // 引入封装好的axios
import echarts from 'echarts'                     // 引入Echarts
import moment from 'moment'                       // 引入moment

// 挂载原型
Vue.prototype.$http = request;
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;

// 汉化moment
moment.locale('zh-cn');

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
