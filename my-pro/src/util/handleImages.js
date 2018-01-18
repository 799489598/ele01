//fuss10.elemecdn.com/
// c/db/d20d49e5029281b9b73db1c5ec6f9jpeg
//   .jpeg
//   ?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/



//处理图片路径
import Api from '../api/index';

export function handleImage(path,size) {
  if(path){
    let pathAttr=path.split('');
    pathAttr.splice(3,0,'/');
    pathAttr.splice(1,0,'/');
    let pathatt=pathAttr.join('');
    let jpmg=pathatt.endsWith('png')?'.png':'.jpeg';
    return Api.IMAGE_HOST+pathatt+jpmg+`?imageMogr/format/webp/thumbnail/!${size}x${size}r/gravity/Center/crop/${size}x${size}/`
  }else {
    return null;
  }
}
