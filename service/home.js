import request from "./network"
export function getHomeMultidata(){
  return request({
    url:"http://123.207.32.32:8000/api/hy/home/multidata"
  })
}

export function getGoodsData(type,page){
  return request({
    url:"http://123.207.32.32:8000/api/hy/home/data",
    data:{
      page:page,
      type:type
    }
  })
}