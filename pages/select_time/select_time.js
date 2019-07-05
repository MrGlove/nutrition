Page({
  data:{
   
  },
  breakfast: function (e) {//早餐传值time=0
    console.log(e)
    wx.navigateTo({
      url: '../basket/basket?time=0',
    })
  },
  lunch: function (e) {//午餐传值time=1
    console.log(e)
    wx.navigateTo({
      url: '../basket/basket?time=1',
    })
  },
  dinner: function (e) {//晚餐传值time=2
    console.log(e)
    wx.navigateTo({
      url: '../basket/basket?time=2',
    })
  },



})