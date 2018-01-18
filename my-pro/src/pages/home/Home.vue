<template>
  <div>
    <!--首页面-->
    <page pageId='home' ref=page>
      <home-header></home-header>
      <home-banner></home-banner>
      <home-list @list-change="handleListChange"></home-list>
    </page>
    <!--装载子页面-->
    <router-view></router-view>
  </div>
</template>

<script>
  import  Header from '../../components/home/index/Header.vue';
  import  Banner from '../../components/home/index/Banner.vue';
  import  List from '../../components/home/index/List.vue';
  import  Page from '../../common/Page.vue'
  export default {
    components:{
      [Page.name]:Page,
      [Header.name]:Header,
      [Banner.name]:Banner,
      [List.name]:List,
    },
    methods:{
      handleListChange(){
        //刷新页面
        this.$refs.page.pageRefresh();
      }
    }
  }
</script>
