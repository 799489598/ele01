
//用axios进行ajax请求
import axios from 'axios';
import Api from  '../api/index';
import {handleImage} from '../util/handleImages';


// axios.get('/restapi/shopping/v3/restaurants?latitude=22.54286&longitude=114.059563&offset=16&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=1049ebe36fb3410babb923a640135d22&terminal=h5')
//   .then((response)=>{
//     console.log(response);
//   })
//   .catch((error)=>{
//     console.log('请求失败了');
//   })




// https://h5.ele.me
//   /restapi/shopping/openapi/entries
//   ?latitude=22.54286&
// longitude=114.059563&
// templates[]=main_template&
// templates[]=favourable_template&
// templates[]=svip_template

//请求banner的函数：（并返回出去）
export function getBannerdata(lat,lon,tmp) {
  return new Promise((resolve, reject)=>{
    axios.get(Api.BANNER_URL, {
      params: {
        latitude:lat,
        longitude:lon,
        templates:tmp
      }
    })
      .then(result=>{
        //取出返回值中自己想要的部分
        let newDate=result.data[0].entries.map(item=>{
          return {
            name:item.name,
            img:handleImage(item.image_hash,90)
          };
        });
        //再把这个部分中数据每8个分一组，返回给banner页面组件
        let DataAll=[];
        while (newDate.length>0){
          DataAll.push(newDate.splice(0,8));
        }
        resolve(DataAll);
      })
      .catch();
  })
  
}



// 推荐商家列表
// https://h5.ele.me
// /restapi/shopping/v3/restaurants
//   ?latitude=22.54286&
//   longitude=114.059563&
//   offset=0&limit=8&
//   extras[]=activities&
//   extras[]=tags&
//   extra_filters=home&
//   rank_id=984553df2830414c9058eaff4b63bbaa&
//   terminal=h5
export function getHomeSeller(lat,lon,offset,limit) {
  return new Promise((resolve, reject)=>{
    axios.get(Api.LISTT_URL, {
      params: {
        latitude:lat,
        longitude:lon,
        offset,
        limit,
        extras:['activities', 'tags'],
        extra_filters:"home",
        rank_id:'984553df2830414c9058eaff4b63bbaa',
        terminal:"h5",
      }
    })
      .then(function (response) {
        let result=response.data.items.map(item=>{
          return {
            name:item.restaurant.name,      //名字
            rating:item.restaurant.rating,  //评分
            img:handleImage(item.restaurant.image_path,90),
            rules:item.restaurant.piecewise_agent_fee.rules,   //配送费和多少起送（是数组对象）
            activities: item.restaurant.activities.map(act=>{
              return {
                icon_name: act.icon_name,
                icon_color: act.icon_color,
                description: act.description
              }
            }),
            isShow:false
          }
        });
        return resolve(result);
      })
      .catch(function (error) {
    
      });
  })
}


//首页地址定位
export function getLoaction(lat,lon) {
  return new Promise((resolve,reject)=>{
    axios.get(Api.LOCATION_URL, {
      params: {
        latitude:lat,
        longitude:lon
      }
    }).then(function (response) {
      resolve(response.data.name);
      }).catch(function (error) {
      
      });
  })
}



// 搜索地址的请求
//    https://h5.ele.me
//   /restapi/bgs/poi/search_poi_nearby
//   ?keyword=%E6%B7%B1%E5%9C%B3&offset=0&limit=20&latitude=22.54286&longitude=114.059563

export function searchAddressList(keyword,offset,limit,lat,lon) {
  return new Promise((resolve,reject)=>{
    axios.get(Api.LOCATION_URL, {
      params: {
        keyword,
        offset,
        limit,
        latitude:lat,
        longitude:lon
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (error) {
    
    });
  })

}









