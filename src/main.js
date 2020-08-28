import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/*import ElementUI from 'element-ui';*/
import '@/utils/element-components-plugin'
import echarts from 'echarts'
import ChartTile from './utils/chartTitle'
import filters from './filters'
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
