<template>

  <ul class="seller">
    <p>推荐商家</p>
    <li class="one-top-px seller-list" v-for="(lists,index) in sellerList" :key="index">
      <div class="logo">
        <img :src="lists.img"/>
      </div>
      <div class="seller-left">
        <div class="info">
          <h2>{{lists.name}}</h2>
          <p><star-icon :rating="lists.rating" ref="star"></star-icon>{{lists.rating}}</p>
          <p>￥{{lists.rules[0].price}}起送 | 配送费{{lists.rules[0].fee}}</p>
        </div>
        <div class="activities" v-if="lists.activities">
          <ul class=act-list v-if="lists.activities">
            <li v-for="(act,ind) in lists.activities" :key="ind" v-if="ind<2 ||lists.isShow">
              <chart-icon  :color="act.icon_color" :name="act.icon_name"></chart-icon>
              {{act.description}}
            </li>
          </ul>
        </div>
        <span @click="showActAction(index)" class='btn'>{{lists.activities.length}}个活动</span>
      </div>


    </li>
  </ul>
</template>

<script scoped>
  import {getHomeSeller} from '../../../service/HomeService';
  import ChartIcon from '../../../common/ChartIcon.vue';
  import Star from '../../../common/Star.vue';
  import Vuex from 'vuex';
  export default {
    name:'home-list',
    data(){
      return {
        sellerList:[],
        limit: 12,  //一次请求的数据总长度
      }
    },
    computed:{
      //把全局状态数据变成自己的数据，并且随着去阿奴状态的改变而改变
      ...Vuex.mapState({
        lat: 'latitude',
        lon: 'longitude'
      }),
      offset(){
        //告诉后台一次请求数据的长度
        return this.sellerList.length;
      }
    },
    mounted(){
      //初始化定位：
      if(this.lat && this.lon){
        //并且把数据列表清空
        this.sellerList=[];
        this.requestData();
      };
      //监听太全局状态中经纬度的值发生改变的时候，去请求数据
      this.$watch('lat',()=>{
        if(this.lat && this.lon){
          //并且把数据列表清空
          this.sellerList=[];

          this.requestData();
        };
      })
    },
    methods:{
      //请求数据的方法
      requestData(collbakc){
        getHomeSeller(this.lat, this.lon, this.offset,this.limit)
          .then(result=>{
            //第一次进入的时候面试加载第一次的数据，
            //第二次加载的数据需要和第一次加载的数据合并起来
            this.sellerList=this.sellerList.concat(result);

            //把数据让评分有值
            //请求完成以后，需要停止加载更多的画面
            this.$nextTick(()=>{
              if(collbakc){
                collbakc();
              }
            })
          });
      },
      //列表展开查看活动的事件
      showActAction(index){
        this.sellerList[index].isShow=!this.sellerList[index].isShow;
        //更新滚动视图
        this.$nextTick(()=>{
          //告诉home组件更新滚动
          this.$emit('list-change');
        })
      }
    },
    components:{
      [ChartIcon.name]:ChartIcon,
      [Star.name]:Star
    }
  }
</script>

<style>
  .seller{
    width: 100%;
    box-sizing: border-box;
  }
  ul>p{
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    font-weight: 900;
  }

  .seller-list{
    width: 100%;
    padding: 15px 9px;
    box-sizing: border-box;
    display: flex;
    position: relative;
  }
  .logo{
    width: 65px;
    height: 65px;
  }
  .logo img{
    width: 100%;
    height: 100%;
  }
  .seller-left{
    margin-left: 10px;
  }
  .info h2{
    font-size:14px;
  }
  .info p{
    color: #666;
    font-size: 11px;
  }
  .act-list li{
    font-size: 12px;
    color: #808080;
  }
  .btn{
    position: absolute;
    top: 66px;
    right: 10px;
    font-size: 12px;
    color: #999;
    padding-right: 10px;
  }
  .btn::after{
    position: absolute;
    top: 4px;
    right: 0;
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 5px solid #999;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }



</style>
