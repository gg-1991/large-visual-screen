import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/*import ElementUI from 'element-ui';*/
import '@/utils/element-components-plugin'
import echarts from 'echarts'
import ChartTile from './utils/chartTitle'
import filters from './filters'

// 前端监控fundbug
import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";
fundebug.apikey = "9aa97556326108bb66c41d59c6d91138cf917c29583d17214b38a3a918bcd30e"
fundebugVue(fundebug, Vue);



 //将echarts引入到vue的原型中
 Vue.prototype.$echarts = echarts

/*Vue.use(ElementUI);*/
Vue.use(ChartTile);

//注册全局过滤器
for (let key in filters) {
  if (Object.prototype.hasOwnProperty.call(filters,key)) {
      Vue.filter(key, filters[key])
  }
}
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
