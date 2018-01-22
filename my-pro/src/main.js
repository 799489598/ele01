import Vue from 'vue'
import App from './App'
import router from './router';
import store from './store/index';

new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})


