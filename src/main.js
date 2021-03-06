/*
 * @Author: fengbozhang
 * @Date: 2019-10-09 10:37:31
 * @LastEditors: fengbozhang
 * @LastEditTime: 2019-10-30 09:43:05
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
// import VConsole from 'vconsole'
import GlobalVariable from '@comment/global_variable'
Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.prototype.GlobalVariable = GlobalVariable

// Vue.prototype.$vConsole = new VConsole()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
