<template>
<div class="page" :id="pageId" ref='page'>
  <div class="wrapper">
    <slot></slot>
    <!--显示上拉加载跟多-->
    <div v-if="canLoadMore" class="load-more" :class="{down:isDown==1}">
      <img :src="imgPath">
      <span>{{downInfo}}...</span>
    </div>
  </div>
</div>
</template>

<script>
//  定义三个常量，来控制上拉图标的变化
const NO_TRIGGER = 0;
const TRIGGER = 1;
const ACTIVE = 2;


  export  default {
    name:'page',
    data(){
      return {
        isDown: NO_TRIGGER,//0 没有触发加载更多   1触发了加载更多  2 正在加载更多
        downInfo: '上拉可以加载更多11',
        imgPath:'/static/img/arrow.png',
        firstload2:false,
      }
    },
    props:{
      pageId:String,
      canLoadMore:Boolean,

      headerName:Object,   //头部发现，我的和订单导航栏
    },
    methods: {
      //需要让页面刷新滚动
      pageRefresh(){
        this.pageScroll.refresh();
      },
      //停止出现加载跟多的画面
      endLoadMoreAni(){
        this.isDown=NO_TRIGGER;
        this.downInfo='上拉可以加载更多11';
        this.imgPath='/static/img/arrow.png'
      },

    },
    created(){
      this.$on('first-load',(val)=>{
        this.firstload2=val;
      })
    },
    mounted(){
      //创建页面的滚动视图
      this.pageScroll=new IScroll(this.$refs.page,{
        click:true,
        probeType:3
      });
      //让页面可以滚动
      this.pageScroll.on('scrollStart', this.pageRefresh);

      //上拉加载更多
        if (this.canLoadMore) {
          //上拉dom结构的样式显示
          let that = this;
          this.pageScroll.on("scroll", function () {
            if (that.isDown != ACTIVE) {  //不在加载中的时候才可以有这个操作
              let maxY = this.maxScrollY;  //获取最大滚动值
              let y = this.y;   //获取当前的滚动值
              //显示上拉加载更多  maxY< y < maxY+40（如果在这之间放开了，回到maxy+40的位置）
              //显示释放立即加载  maxY>y （如果在这放开了，就显示加载更多）
              if (y > maxY) {
                that.downInfo = '上拉可以加载更多';
                that.isDown = NO_TRIGGER;
              } else if (maxY > y) {
                that.downInfo = '释放立即加载更多';
                that.isDown = TRIGGER;
              }
            }
          });
          //手指移开的时候
          this.pageScroll.on('scrollEnd', () => {
            if (that.isDown != ACTIVE) {  //正在加载的时候不用再次加载
              let maxY = that.pageScroll.maxScrollY;  //获取最大滚动值
              let y = that.pageScroll.y;   //获取当前的滚动值
              if (y > maxY && y < maxY + 40) {  //没有触发加载更多
                that.downInfo = '上拉可以加载更多';
                that.isDown = NO_TRIGGER;
                that.pageScroll.scrollTo(0, maxY + 40, 200);
              } else if (maxY >= y) {   //触发了加载更多
                that.isDown = ACTIVE;
                that.imgPath = '/static/img/ajax-loader.gif'
                that.downInfo = '正在加载';
                //告诉home组件去请求数据
                that.$emit('load-more-action');
              }
            }
          })
        }

      //home组件需要监听页面的滚动
      this.pageScroll.on("scroll",()=>{
        //把Y轴方向滚动的距离告诉home组件
        this.$emit('page-scroll',this.pageScroll.y);
      })

    }
  }
</script>

<style>
  .page{
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    bottom: 49px;
    overflow: hidden;
  }
  .page .load-more{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;

    background: #fff;

  }
  .page .load-more img{
    width: 18px;
    height: 18px;
    display: inline-block;
    transition: 200ms transform;
  }
  .page .load-more.down img{
    transform: rotate(180deg);
  }
  .page .load-more span{
    font-size: 12px;
    color: #666;
  }
</style>
