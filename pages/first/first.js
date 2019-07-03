//index.js
//获取应用实例
const app = getApp()
var OPENID=''

Page({
  data: {
    motto: 'Hello',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数

  onLoad: function() {
    /* wx.getStorage({
      key: 'uniqueid',
      success: function (res) {这里要实现再次登录的跳转
        console.log(res.data);
      },
    }) */

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      console.log(app)
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
     
    })
  },
  gotoinit: function(e) {
    console.log(e)
    console.log(app.globalData.userInfo)
    var that=this;
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
            data: {
              appid: 'wxaa337aceb4e4b080',
              secret: '00c1ab5de8fe9cfeb2f31d718f82a261',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success:function(v) {
              console.log(v.data)
              var topenid = v.data.openid
              wx.setStorage({
                key: 'uniqueid',
                data: topenid,
                success:function(res){
                  console.log('保存成功')
                }
              })
              wx.getStorage({
                key: 'uniqueid',
                success: function(res) {
                  console.log(res.data);
                },
              })
            },
          })
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

    wx.redirectTo({
      url: '../init/init'
    })
  }
})