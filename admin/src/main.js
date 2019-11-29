import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

//单独创建axios，并加到原型上
import http from './http'
Vue.prototype.$http = http


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
