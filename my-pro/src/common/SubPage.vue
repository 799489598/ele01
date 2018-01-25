<template>
<div class="page subpage" :id="pageId">
  <slot></slot>
</div>
</template>

<script>
  export  default {
    name:'sub-page',
    props:{
      pageId:String
    }
  }
</script>

<style>
  .subpage{
    background: #f2f2f2;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    bottom: 0px;
    z-index: 5;
  }

</style>
