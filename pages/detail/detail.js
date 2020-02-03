// pages/detail/detail.js
import {getDetailData,getRecommendData} from '../../service/detail'
Page({
  data: {
    iid:'',
    topImgs:[],
    title:'',
    price:'',
    oldPrice:'',
    discountDesc:'',
    columns:[],
    service:[],
    shopInfo:{},
    detailInfo:{},
    itemParams:{},
    rate:{},
    recommendImg:[],
    isBackTop:false
  },
  onLoad: function (options) {
    this.setData({
      iid:options.iid
    }),
    // 请求商品详情数据
    this._getDetailData()
    this._getRecommendData()
  },

  // 发送网络请求，请求商品详情数据
  _getDetailData(){
    getDetailData(this.data.iid).then(res=>{
      console.log(res);
      // 取出轮播图图片
      const data=res.data.result;
      let rate={}
      if(data.rate && data.rate.cRate>0){
        rate=data.rate.list[0]
      }
      this.setData({
        topImgs:data.itemInfo.topImages,
        title:data.itemInfo.title,
        price:data.itemInfo.price,
        oldPrice:data.itemInfo.oldPrice,
        discountDesc:data.itemInfo.discountDesc,
        columns:data.columns,
        service:data.shopInfo.services,
        shopInfo:data.shopInfo,
        detailInfo:data.detailInfo,
        itemParams:data.itemParams,
        rate:rate
      })
    })
  },
  _getRecommendData(){
    getRecommendData().then(res=>{
      console.log(res)
      const recommendImg=res.data.data.list;
      this.setData({
        recommendImg:recommendImg
      })
    })
  },
  onPageScroll(options){
    const scrollTop=options.scrollTop
    this.setData({
      isBackTop:scrollTop>=1000
    })
  },
  handleBackTop(){
    wx.pageScrollTo({
      scrollTop: 0
    })
  }
})