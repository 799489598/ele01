import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '../pages/home/Home.vue';
import Address from '../pages/home/Address.vue';
import Discover from '../pages/discover/Discover.vue';
import Mine from '../pages/mine/Mine.vue';
import Order from '../pages/order/Order.vue';

export default new Router({
  routes: [
    {
      path: '/home',
      alias: '/',
      component: Home,
      children:[
        {
          path: 'address',
          component: Address,
        }
      ]
    },
    {
      path: '/discover',
      component: Discover
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/order',
      component: Order
    },
    //这个是重定向
    {
      path:'**',
      redirect:'/home'
    }
  ]
})
