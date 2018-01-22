<template>
<span>
  <img v-for="(nn,ind) in num.number1" src="/static/img/star-on.png" :key=ind />
  <img v-if="num.number2==1" src="/static/img/star-half.png" />
  <img v-if="num.number2!=0" v-for="(nn,ind) in num.number3" src="/static/img/star-off.png" :key=ind />
</span>
</template>
<script>
  export default {
    name:'star-icon',
    data(){
      return{

      }
    },
    computed:{
      statNumber(){
        return this.rating;
      },
      num(){
        if(this.statNumber-0==parseInt(this.statNumber)){ //如果评分是整数
          return {
            number1:this.statNumber,   //实心星星
            number2:0,                 //半颗星星
            number3:5-this.statNumber  //控心的数量
          }
        }else {   //评分是小数
          return {
            number1:parseInt(this.statNumber),   //实心星星
            number2: 1,                 //半颗星星
            number3: 5-parseInt(this.statNumber)-1  //控心的数量
          }
        }
      }
//      console.log(this.statNumber);
    },
    props:{
      rating:Number
    }


  }
</script>

<style scoped>
  img{
    display: inline-block;
  }
</style>
