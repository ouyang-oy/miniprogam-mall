// pages/category/childCpns/menu/menu.js
Component({
  properties: {
    categories:{
      type:Array,
      value:[]
    }
  },
  data: {
    curIndex:0
  },
  methods: {
    itemClick(event){
      // console.log(event);
      const index = event.currentTarget.dataset.index;
      this.setData({
        curIndex:index
      })
      this.triggerEvent("menuClick",{index},{})
    }
  }
})
