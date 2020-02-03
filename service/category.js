import request from "./network"
export function getCategory(){
  return request({
    url:'http://123.207.32.32:8000/api/hy/category'
  })
}

export function getSubcategory(maitKey){
  return request({
    url:"http://123.207.32.32:8000/api/hy/subcategory",
    data:{
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type){
  return request({
    url:"http://123.207.32.32:8000/api/hy/subcategory/detail",
    data:{
      miniWallkey:miniWallkey,
      type:type
    }
  })
} 