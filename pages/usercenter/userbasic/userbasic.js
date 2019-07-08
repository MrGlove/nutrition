// pages/usercenter/userbasic/userbasic.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2000-01-01',
    uniformdate: '20000101',
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
        name: '孕妇',
        value: '孕妇',
        checked: ''
      },
      {
        name: '高血压',
        value: '高血压',
        checked: ''
      },
      {
        name: '糖尿病',
        value: '糖尿病',
        checked: ''
      },
    ],
    disease: '',
    uniformsports: '中',
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

  checkboxChange: function (e) {
    console.log('changecheckbox', e.detail.value)
    this.setData({
      disease: e.detail.value
    })
  },
  sportsChange: function (e) {
    console.log('changesports', e.detail.value)
    this.setData({
      uniformsports: e.detail.value
    })
  },
  savechange: function(e) {
    if (this.data.height) {
      if (this.data.weight) {
        console.log(app.globalData.uniqueid)

        var date2 = this.data.date.split("-")
        var str = date2.join("")
        this.setData({
          uniformdate: str,
        })
        console.log(this.data.uniformdate)

        var uniformsex = this.data.genders[this.data.sexindex].value
        console.log(uniformsex)
        console.log(this.data.height)
        console.log(this.data.weight)
        if (this.data.disease) {
          var uniformdisease = this.data.disease.join("+")
        } else {
          var uniformdisease = ''
        }
        console.log(uniformdisease)
        console.log(this.data.uniformsports)

        wx.request({
          url: 'https://zh123456eng.xyz/smartdiet/project/newuser',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            userid: app.globalData.uniqueid,
            sex: uniformsex,
            birthday: this.data.uniformdate,
            height: this.data.height,
            weight: this.data.weight,
            disease: uniformdisease,
            PAL: this.data.uniformsports
          },
          success: function (v) {
            console.log(v.data)
          },
        })
        wx.switchTab({
          url: '../login',
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请输入体重！',
          success: function (res) {
            if (res.confirm) { //这里是点击了确定以后
              console.log('用户点击确定')
            }
          }
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入身高！',
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            console.log('用户点击确定')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.request({
      url: 'https://zh123456eng.xyz/smartdiet/project/wechatlogin',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userid: app.globalData.uniqueid
      },
      success: function(v) {
        console.log(v.data)
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})