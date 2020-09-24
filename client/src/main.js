// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { routes } from './router/index'
import { store } from './store/store';

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode : 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
