import request from "./network"
export function getDetailData(iid){
  return request({
    url:"http://123.207.32.32:8000/api/hy/detail",
    data:{
      iid:iid
    }
  })
}

export function getRecommendData(){
  return request({
    url:"http://123.207.32.32:8000/api/hy/recommend"
  })
}