//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var openid = ''
    var nowinfo = {}
    var that = this
    /* wx.clearStorage() */
    wx.getStorage({
      key: 'uniqueid',
      success: function (res) {
        openid = res.data
        /* console.log(openid) */
        that.globalData.uniqueid = res.data
        console.log(that.globalData.uniqueid)
      }
    }) 
    wx.getStorage({
      key: 'currentinfo',
      success: function (res) {
        nowinfo = res.data
        /* console.log(nowinfo) */
        that.globalData.userInfo = res.data
        console.log(that.globalData.userInfo)
      }
    }) 
    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    uniqueid:'',
    diettime:'',
    uniformtime:["早","中","晚"]
  }
})