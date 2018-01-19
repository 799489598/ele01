<template>
  <div>
    <!--首页面-->
    <page pageId='home' :canLoadMore="true" ref=page @load-more-action="handleLoadMore"
    @page-scroll="handlePageScroll">
      <home-header></home-header>
      <home-banner></home-banner>
      <home-list ref="list" @list-change="handleListChange"></home-list>
    </page>
    <search-bar v-show="showSearchBar" @isActive="showSearchBar"></search-bar>
    <!--装载子页面-->
    <router-view></router-view>
  </div>
</template>

<script>
  import  Header from '../../components/home/index/Header.vue';
  import  Banner from '../../components/home/index/Banner.vue';
  import  List from '../../components/home/index/List.vue';
  import  Search from '../../components/home/index/Search.vue';
  import  Page from '../../common/Page.vue'
  export default {
    components:{
      [Page.name]:Page,
      [Header.name]:Header,
      [Banner.name]:Banner,
      [Search.name]:Search,
      [List.name]:List,
    },
    data(){
      return {
        showSearchBar:true,
      }
    },
    methods:{
      handleListChange(){
        //刷新页面
        this.$refs.page.pageRefresh();
      },

      handleLoadMore(){
        //告诉list组件去加载下一页的数据更多
        this.$refs.list.requestData(()=>{
          this.$refs.page.endLoadMoreAni()
        });
        //加载完成以后，还得刷新页面
      },

      //根据页面滚动的位置，控制是否展示search-bar
      handlePageScroll(y){
        if(y<-37){
          this.showSearchBar=true;
        }else {
          this.showSearchBar=false;
        }
        console.log(y);
      }
    }
  }
</script>
