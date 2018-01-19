<template>
  <div class="divBanner">
    <div ref="disBannerTop" class="swiper-container divBanner-top">
      <div class="swiper-wrapper">
        <ul class="swiper-slide banner" v-for="(item,index) in bannerData" :key="index">
          <li class="bannerlist" v-for="(bannerlist,ind) in item" :key="ind">
            <img :src="bannerlist.img"/>
            <h3>{{bannerlist.name}}</h3>
          </li>
        </ul>
      </div>
      <!-- 如果需要分页器 -->
      <div class="fen swiper-pagination"></div>
    </div>

    <div class="divBanner-bottom">
      <img src="https://fuss10.elemecdn.com/3/c8/45b2ec2855ed55d90c45bf9b07abbpng.png?imageMogr/format/webp/thumbnail/!710x178r/gravity/Center/crop/710x178/" />
    </div>
    <div class="divBanner-b"></div>
  </div>
</template>

<script>
  import {getBannerdata} from '../../../service/HomeService';
  export default {
    name:'home-banner',
    data(){
      return {
        bannerData:''
      }
    },
    methods:{
      infited(){
        getBannerdata('22.54286','114.059563',['main_template','favourable_template','svip_template'])
          .then(res=>{
            //把请求的数据放到this.bannerData中，在dom结构中显示
            this.bannerData=res;
            //更新数据以后，需要更新swiper
            this.$nextTick(()=>{
              this.bannerSwiper.update();
            })
          });
      }

    },
    mounted(){
      // 创建swiper对象,挂靠在组件对象上
      this.bannerSwiper = new Swiper(this.$refs.disBannerTop, {
        pagination: '.swiper-pagination'
      });
      //去请求数据
      this.infited();
    }
  }
</script>

<style scoped>
  .divBanner{
    width: 100%;
    height: 283px;
  }
  .divBanner-top{
    width: 100%;

  }

  .banner{
    width: 100%;
    height: 160px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content:flex-start;
  }
  .bannerlist{
    width: 25%;
    height: 77px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .bannerlist img{
    width: 45px;
    height: 45px;
  }
  .bannerlist h3{
    font-weight: 100;
    font-size: 11px;
    color: #666;
  }
  .divBanner .divBanner-bottom{
    padding:0 10px;
    box-sizing: border-box;
    height: 109px;
    width: 100%;
  }
  .divBanner-bottom img{
    width: 100%;
    height: 100%;
  }
  .divBanner-top .swiper-pagination-bullet{
    width: 5px;
    height: 5px;
  }
  .divBanner-b{
    width: 100%;
    height: 7px;
    margin-top: 7px;
    background: #f5f5f5;
  }
</style>
