<template>
  <div class="search" :class="{active:isActive}">
    <div class="text">搜索商家、商品名称</div>
  </div>
</template>

<script>
  export default {
    name: 'search-bar',
    props: {
      isActive: Boolean
    }
  }
</script>

<style scoped>
  .search{
    width:100%;
    background: #009aff;
    box-sizing: border-box;
    background: linear-gradient(90deg,#0af,#0085ff);
    padding: 5px 15px;
    height: 46px;
  }
  .search.active{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .search .text{
    width:100%;
    height: 36px;
    color: #bbbbbb;
    background: #fff;
    font-size: 12px;
    line-height: 36px;
    text-align: center;
    border-radius: 3px;
  }
</style>
