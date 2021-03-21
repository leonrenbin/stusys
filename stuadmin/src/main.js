import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import cookies from 'js-cookie'

Vue.config.productionTip = false
Vue.use(cookies)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
