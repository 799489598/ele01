<template>
  <sub-page pageId='address'>
    <h1>页面详情</h1>
  </sub-page>

</template>

<script>
  import  SubPage from '../../common/SubPage.vue'
  export default {
    components:{
      [SubPage.name]:SubPage
    }
  }
</script>

<style scoped>
h1{
  background: red;
  width: 100%;
  height: 100%;
}
</style>
