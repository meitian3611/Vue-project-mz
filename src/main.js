import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import moment from "moment";
import Vant from 'vant'
import { Lazyload } from 'vant'

import '../base.scss'
import 'vant/lib/index.css'

Vue.prototype.$moment = moment;

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true
});
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
