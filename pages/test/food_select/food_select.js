//helloworld.js  
//获取应用实例 （可填也可不填） 
var app = getApp()
Page({
  data: {
     userInfo: {} ,
    curNav: 1


  },
  onLoad: function () {
    console.log('onLoad test');
  },
  onUnload: function () {
    wx.reLaunch({
      url: 'pages/logs/logs'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题', //分享标题 
      desc: '自定义分享描述', //分享描述
      path: '/page/index?id=123' //通常是设置url，这里是设置在首页直接分享
    }
  },
  /* 把点击到的某一项 设为当前curNav   */
  switchRightTab: function (e) {
    let id = e.target.dataset.id;
    console.log(id);
    this.setData({
      curNav: id
    })
  },
  onPullDownRefresh: function () { 
    setTimeout(() => { wx.showToast({ title: '成功加载数据',
     icon: 'success',
      duration: 500
       });
     wx.stopPullDownRefresh()
      }, 500); 
  },

}) 