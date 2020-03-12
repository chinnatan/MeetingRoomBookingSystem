// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import 'animate.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import Print from 'vue-print-nb'
 
Vue.use(Print);
Vue.config.productionTip = false
Vue.use(VueSweetalert2);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
