// components/tab-control/tab-control.js
Component({
  properties: {
    title:{
      type:Array,
      value:[]
    }
  },
  data: {
    curIndex:0
  },
  methods: {
    tabClick(event){
      // console.log(event);
      const index=event.currentTarget.dataset.index;
      this.setData({
        curIndex:index
      })
      this.triggerEvent("tabClick",{index})
    }
  }
})
