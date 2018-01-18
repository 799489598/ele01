<template>
<span class="icon" :style="'background:#'+color">{{name}}</span>
</template>

<script>
  export default {
    name:'chart-icon',
    props:{
      name:String,
      color:String
    }
  }

</script>

<style scoped>
  .icon{
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    margin-top: 2px;
    padding: 0px 1px 0px;
    line-height: 12px;
  }
</style>
