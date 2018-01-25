<template>
<div class="app-header">
<span @click="headergoback()"><</span>
  <h3>{{title}}</h3>
</div>
</template>

<script>
  export default {
    name:'app-header',
    props:{
      title:String
    },
    methods:{
      headergoback(){
        this.$router.back();
      }
    }
  }

</script>

<style scoped>
.app-header{
  width: 100%;
  height: 44px;
  background-image: linear-gradient(90deg,#0af,#0085ff);
  text-align: center;
  line-height: 44px;
  font-size: 16px;
  color:#fff;
  position: absolute;
  top: 0px;
  left: 0;
}
span{
  height: 44px;
  display: block;
  position: absolute;
  top: 0px;
  left: 0;
  line-height: 44px;
  width: 44px;
  text-align: center;
  color: #fff;
  font-size: 30px;
}
</style>
