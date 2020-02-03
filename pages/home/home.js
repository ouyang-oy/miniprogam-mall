// pages/home/home.js
import {getHomeMultidata,getGoodsData} from "../../service/home"
Page({
	data: {
		banners:[],
		recommends:[],
		titles:["流行","新款","精选"],
		goods:{
			'pop':{page:0,list:[]},
			'new':{page:0,list:[]},
			'sell':{page:0,list:[]}
		},
		currentType:'pop',
		types:['pop','new','sell'],
		showBackTop:false,
		isTabFixed:false,
		tabScrollTop:0
	},
	onLoad: function (options) {
		//1.请求轮播图及推荐数据
		this._getHomeMultidata();
		// 2.请求商品数据
		this._getGoodsData("pop");
		this._getGoodsData("new");
		this._getGoodsData("sell");
	},

	_getHomeMultidata(){
		getHomeMultidata().then(res=>{
			this.setData({
				banners:res.data.data.banner.list,
				recommends:res.data.data.recommend.list
			})
		})
	},
	_getGoodsData(type){
		//获取页码
		const page=this.data.goods[type].page+1;
		// 2.发送网络请求
		getGoodsData(type,page).then(res=>{
			// console.log(res)
			// 2.1 取出数据
			const list=res.data.data.list;
			// 2.2将数据放到对应list类型里面
			const oldList=this.data.goods[type].list;
			oldList.push(...list);
			// 2.3将数据设置到data中的goods中
			const typeKey=`goods.${type}.list`;
			const pageKey=`goods.${type}.page`;
			this.setData({
				[typeKey]:oldList,
				[pageKey]:page
			})

		})
	},

	handleTabClick(event){
		// 取出index
		const index=event.detail.index;
		// console.log(index);
		this.setData({
			currentType:this.data.types[index]
		})
	},

	// 图片加载完成后，获取导航栏到页面顶部的距离。显示tab-control
	handleImageLoad(){
		wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect=>{
			this.data.tabScrollTop=rect.top
		}).exec()
	},

	// 上拉加载更多
	onReachBottom(){
		this._getGoodsData(this.data.currentType);
	},
	// 回到顶部
	handleBackTop(){
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	// 一定距离隐藏按钮
	onPageScroll(options){  //监听页面滚动函数
		// 取出scrollTop,滚动的距离
		const scrollTop=options.scrollTop;
		this.setData({
			showBackTop:scrollTop>=800,
			isTabFixed:scrollTop>=this.data.tabScrollTop
		})

	},
	//分享小程序
	onShareAppMessage(options){
		return{
			title:"购物街"
		}
	}
	
})