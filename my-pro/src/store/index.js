import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

//创建全局管理库
const store=new Vuex.Store({
  //全局状态
  state:{
    //纬度
    latitude:null,
    // 经度
    longitude:null,
    //当前地址
    address:''
  },
  //全局计算状态
  getters:{
  
  },
  
  //修改全局状态的方法
  mutations:{
    //修改经纬的方法
    modifylatitude(state, param){
      console.log('经度modifylatitude触发了');
      state.latitude= param;
    },
    modifyLonitude(state, param){
      console.log('纬度modifyLonitude触发了');
      state.longitude=param;
    },
    //修改当前地址
    modifyAddress(state,addres){
      console.log('修改地址的modifyAddress触发了');
      state.address=addres;
    }
  },
  
  //一系列逻辑判断并调用mutations属性的方法去修改全局状态
  actions:{
    //修改经纬度
    getLocationAction(context, action){
      setTimeout(()=>{
        context.commit('modifylatitude', action.lat);
        context.commit('modifyLonitude', action.lon);
      },3000)
    },
    // 修改当前地址
    modifyAddressAction(context,address){
      context.commit('modifyAddress',address);
    }
  },
  
  //模块划分
  modules:{}
})

export default store;
