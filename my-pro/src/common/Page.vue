<template>
<div class="page" :id="pageId" ref='page'>
  <div class="wrapper">
    <slot></slot>
  </div>
</div>
</template>

<script>
  import  IScroll from 'iscroll';
  export  default {
    name:'page',
    props:{
      pageId:String
    },
    methods: {
      //需要让页面刷新滚动
      pageRefresh(){
        this.pageScroll.refresh();
      }
    },
    mounted(){
      //创建页面的滚动视图
      this.pageScroll=new IScroll(this.$refs.page,{
      });
      //让页面可以滚动
      this.pageScroll.on('scrollStart', this.pageRefresh);
    }
  }
</script>

<style>
  .page{
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    bottom: 49px;
    overflow: hidden;
  }
</style>
