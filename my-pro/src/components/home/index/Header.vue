<template>
  <header class="header">
      <div class="header-top" @click="addressAction()">{{address}}</div>
    <div class="header-center">
      搜索商家，商品名称
    </div>
    <div class="header-bottom">
      <li>雨</li>
      <li>毛巾</li>
      <li>奶茶</li>
      <li>5折美食汇</li>
      <li>冒菜</li>
      <li>黄茶</li>
      <li>口水鸡</li>
      <li>辣子鸡</li>
    </div>
  </header>
</template>

<script>
  import {getLoaction} from '../../../service/HomeService';
  import Vuex from 'vuex';
  export default {
    name:'home-header',
    data(){
      return {

      }
    },
    computed: {
      ...Vuex.mapState({
        lat: 'latitude',
        lon: 'longitude',
        address:'address'
      })
    },
    methods:{
      requestData(){
        //请求当前地址
        getLoaction(this.lat,this.lon).then((result)=>{

          this.$store.dispatch('modifyAddressAction',result);
        })
      },
      //跳转到搜索地址页面
      addressAction(){
        this.$router.push('/home/address')
      }
    },
    mounted(){
      //初始化定位：
      if(this.lat && this.lon){
        this.requestData();
      };
      //监听经纬度的变化，变化时，也要请求数据
      this.$watch('lat',()=>{
        if(this.lat && this.lon){
          this.requestData();
        };
      })
    }
  }
</script>

<style scoped>
  .header{
    width:100%;
    height: 125px;
    background: #009aff;
    padding: 0px 15px;
    box-sizing: border-box;
  }
  .header-top{
    width:100%;
    height: 44px;
    font-size: 16px;
    font-weight: 900;
    color: #fffef6;
    line-height: 44px;

  }
  .header-center{
    width:100%;
    height: 36px;
    color: #bbbbbb;
    background: #fff;
    font-size: 12px;
    line-height: 36px;
    text-align: center;
    border-radius: 3px;
  }
  .header-bottom{
    width:100%;
    height: 34px;
    color: #fff;
    font-size: 12px;
    line-height: 34px;
    display: flex;
    justify-content: space-around;
  }

</style>
