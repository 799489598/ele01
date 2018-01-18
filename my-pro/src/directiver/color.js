//创建自定义vue指令的文件
import Vue from 'vue';
Vue.directive('color',function (...rest) {
  console.log(rest);
})
