import axios from 'axios';
import Api from  '../api/index';
import {handleImage} from '../util/handleImages';

// https://h5.ele.me
//   /restapi/member/v1/discover
//   ?platform=1&block_index=0&latitude=31.23037&longitude=121.473701

export function getDisHeaderdata(lat,lon) {
  return new Promise((resolve, reject)=>{
    axios.get(Api.DISCOVERHEADER_URL, {
      params: {
        latitude:lat,
        longitude:lon,
        platform:1,
        block_index:0
      }
    })
      .then(result=>{
        resolve(result);
      })
      .catch();
  })
  
}
//头部各种推荐
