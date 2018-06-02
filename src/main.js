import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './utils/http'
import store from './vuex/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import api from './api/index'

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.axios = axios;

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
