//获取应用实例
const app = getApp()

Page({
  data: {
    date: '2000-01-01',
    height: '',
    weight: '',
    genders: [{
        name: 'male',
        value: '男',
        checked: 'true'
      },
      {
        name: 'female',
        value: '女'
      },
    ],
    sexindex: 0,
    items: [{
        name: 'A',
        value: 'AAAAA'
      },
      {
        name: 'B',
        value: 'BBB',
        checked: 'true'
      },
      {
        name: 'C',
        value: 'CCC'
      },
      {
        name: 'D',
        value: 'DDD'
      },
      {
        name: 'E',
        value: 'EEE'
      },
      {
        name: 'F',
        value: 'FFF'
      }
    ],
    wxInfo: {},
    haswxInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数

  onLoad: function() {
    
    if (app.globalData.userInfo) {
      this.setData({
        wxInfo: app.globalData.userInfo,
        haswxInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          wxInfo: res.userInfo,
          haswxInfo: true
        })
      }
      console.log(app)
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            wxInfo: res.userInfo,
            haswxInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      wxInfo: e.detail.userInfo,
      haswxInfo: true
    })
  },
  bindDateChange: function(e) {
    console.log('change,value=', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  heightinput: function(e) {
    console.log('change,height=', e.detail.value)
    this.setData({
      height: e.detail.value
    })
  },
  weightinput: function(e) {
    console.log('change,weight=', e.detail.value)
    this.setData({
      weight: e.detail.value
    })
  },
  radioChange: function(e) {
    console.log('changegender', e.detail.value)
    this.setData({
      sexindex: 1 - this.data.sexindex
    })
    console.log(this.data.sexindex)
  },
  checkboxChange: function(e) {
    console.log('changecheckbox', e.detail.value)
  },
  gotofirstpage: function(e) {
    if(this.data.height){
      if(this.data.weight){
        /* wx.request({
          url: '',
        }) */
        wx.setStorage({
          key: 'uniqueid',
          data: app.globalData.uniqueid,
          success: function (res) {
            console.log('保存唯一id成功')
          }
        })
        wx.setStorage({
          key: 'currentinfo',
          data: app.globalData.userInfo,
          success: function (res) {
            console.log('保存用户信息成功')
          }
        })
        wx.switchTab({
          url: '../usercenter/login'
        })
      }
      else{
        wx.showModal({
          title: '提示',
          content: '请输入体重！',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定')
            }
          }
        })
      }
    }
    else{
      wx.showModal({
        title: '提示',
        content: '请输入身高！',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
          }
        }
      })
    }
  },
  gotofirstpage2: function (e){
    wx.switchTab({
      url: '../usercenter/login'
    })
  }

})