import Vue from 'vue'
import App from './App'
import router from './router'



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


//用axios进行ajax请求
import axios from 'axios';
console.log(axios);
axios.get('/restapi/shopping/v3/restaurants?latitude=22.54286&longitude=114.059563&offset=16&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=1049ebe36fb3410babb923a640135d22&terminal=h5')
  .then((response)=>{
    console.log(response);
  })
  .catch((error)=>{
    console.log('请求失败了');
  })

