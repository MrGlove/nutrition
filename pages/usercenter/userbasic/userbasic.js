// pages/usercenter/userbasic/userbasic.js
Page({

  /**
   * 页面的初始数据
   */
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
    array: ['无', '高血压', '糖尿病'],
    sexindex: 0,
    items: [{
        name: 'A',
        value: 'AAA'
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
      },
    ]
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

  savechange: function(e) {
    console.log(e)
    wx.navigateBack({

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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