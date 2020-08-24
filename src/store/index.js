import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  /*****
   * 用户信息
   **/
  loginInfo: JSON.parse(localStorage.getItem('loginInfo')) || {},
}
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
