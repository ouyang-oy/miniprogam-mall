// pages/category/category.js
import {getCategory,getSubcategory,getCategoryDetail} from "../../service/category"
Page({
  data: {
    categories:[],
    subcategory:[],
    currentIndex:0,
    categoryDetail:[]
  },
  onLoad: function (options) {
    this._getCategory();
  },
  _getCategory(){
    getCategory().then(res=>{
      // 1.获取categories
      const categories = res.data.data.category.list

      // 3.修改data中的数据
      this.setData({
        categories:categories,
        // categoryData:categoryData
      })

      this._getSubcategory(0)

      this._getCategoryDetail(0,'pop')
    })
  },
  _getSubcategory(currentIndex){
    const maitKey=this.data.categories[currentIndex].maitKey
    getSubcategory(maitKey).then(res=>{
      const subcategory=res.data.data.list
      this.setData({
        subcategory:subcategory
      })
    })
  },
  _getCategoryDetail(currentIndex,type){
    const miniWallkey=this.data.categories[currentIndex].miniWallkey
    getCategoryDetail(miniWallkey, type).then(res=>{
      console.log(res)
      const categoryDetail=res.data
      this.setData({
        categoryDetail:categoryDetail
      })
    })
  },
  menuClick(event){
    // 1.获取当前点击的index
    const currentIndex=event.detail.index
    this.setData({
      currentIndex:currentIndex
    })
    // 获取当前点击的右边数据
    this._getSubcategory(currentIndex)

    // 获取详情数据
    this._getCategoryDetail(currentIndex,'pop')
  }
})