<template>
  <div>

    <div v-if="num.number1!=0">
      <img v-for="(nn,ind) in num.number1" src="/static/img/star-on.png" :key="ind" />
    </div>
    <div v-if="num.number2==1">
      <img  src="/static/img/star-half.png" />
    </div>
    <div v-if="num.number3!=0">
      <img  v-for="(nn,ind) in num.number3" src="/static/img/star-off.png" :key="ind" />
    </div>
  </div>
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
        if(this.statNumber==Math.floor(this.statNumber)){ //如果评分是整数
          return {
            number1:this.statNumber,   //实心星星
            number2:0,                 //半颗星星
            number3:5-this.statNumber  //控心的数量
          }
        }else {   //评分是小数
          return {
            number1:Math.floor(this.statNumber),   //实心星星
            number2: 1,                 //半颗星星
            number3: 5-Math.floor(this.statNumber)-1  //控心的数量
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
  img,div{
    display: inline-block;
  }
</style>
