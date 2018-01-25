<template>
  <sub-page pageId='address'>
    <app-header :title="title"></app-header>
    <div class="address-top">
      <div class="address-inp"><input type="text" placeholder="请输入地址" v-model="keyadd"/></div>
      <p v-if="!isShow">当前地址</p>
      <div v-if="!isShow" class="listaddress">{{this.$store.state.address}}</div>
      <ul v-if="isShow">
        <li class="one-bottom-px" v-for="(item,index) in addressList" :key="index" @click="selectAction(index)">
          <h4>{{item.name}}</h4>
          <p>{{item.addres}}</p>
        </li>
      </ul>
    </div>
  </sub-page>

</template>

<script>
  import  SubPage from '../../common/SubPage.vue';
  import AppHeader from '../../common/AppHeader.vue';
  import {searchAddressList} from '../../service/HomeService';
  import Vuex from 'vuex';
  export default {
    data(){
      return {
        //头部关键字
        title:'选择收货地址',
        //地址搜索的关键字
        keyadd:'',
        //请求多少条
        limit:20,
        //接收搜索到的数据
        addressList:[],
        //当前地址和搜索的地址切换
        isShow:false
      }
    },
    components:{
      [SubPage.name]:SubPage,
      [AppHeader.name]:AppHeader
    },
    computed:{
      //全局状态的经纬度变成自己的属性
      ...Vuex.mapState({
        lat: 'latitude',
        lon: 'longitude'
      })
    },
    watch:{
      keyadd(){
        clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
          if(this.keyadd){
            this.isShow=true;
            this.requestData();
          }else {
            this.isShow=false;
          }
        },500)
      }
    },
    methods:{
      //搜索地址的请求事件
      requestData(){
        searchAddressList(
          this.keyadd,
          0,
          this.limit,
          this.lat,
          this.lon
        ).then(result=>{
          this.addressList=result;
          console.log(result);
        })
      },
      //点击这个地址的时候，返回上一页，并且把经纬度给全局状态，重新渲染数据
      selectAction(ind){
        this.$store.dispatch('getLocationAction',
          {
            lat:this.addressList[ind].lat,
            lon:this.addressList[ind].lon,
          }
        );
        this.$store.dispatch('modifyAddressAction',
          this.addressList[ind].name
        );
        this.$router.back();
      }
    }

  }
</script>

<style scoped>
.address-top{
  margin-top: 44px;
}
.address-inp{
  width: 100%;
  height: 50px;
  padding:10px 15px;
  background: #fff;
  box-sizing: border-box;
}
  .address-top input{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 3px 5px;
    background: #f2f2f2;
    border: none;
  }
  .address-top>p{
    width: 100%;
    height: 36px;
    padding-left: 10px;
    box-sizing: border-box;
    line-height: 36px;
    text-align: left;
    color:#666;
    font-size: 12px;
  }
  .listaddress{
    background: #fff;
    width: 100%;
    height: 40px;
    font-weight: 900;
    color:#000;
    box-sizing: border-box;
    line-height: 40px;
    padding-left: 10px;
    font-size: 13px;

  }
  ul{
    width: 96%;
    background: #fff;
    padding: 0 2%;
  }
  li{
    width: 100%;
    box-sizing: border-box;
    padding: 5px 20px;
  }
  li h4{
    line-height: 20px;
    font-size:13px;
  }
  li p{
    line-height: 20px;
    font-size: 12px;
  }
</style>
