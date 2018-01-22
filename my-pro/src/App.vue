<template>
  <div id="app">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <tabs></tabs>
  </div>
</template>

<script>
  import Tabs from './common/Tabs.vue';
  import Home from './pages/home/Home.vue';
  import Discover from './pages/discover/Discover.vue';
  import Mine from './pages/mine/Mine.vue';
  import Order from './pages/order/Order.vue';
export default {
  name: 'App',
  components:{
    [Tabs.name]:Tabs
  },
  created(){
    this.$store.dispatch('getLocationAction',{
      lat:22.54286,
      lon:114.059563
    })
  }
}
</script>

<style>

</style>
