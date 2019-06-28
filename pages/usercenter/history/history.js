// pages/usercenter/history/history.js
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    date: '',
    datechange: 0,
    judgeprevious: false,
    judgenext: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      datechange: 0,
    })
    var DATE = util.getDateStr(null, this.data.datechange);
    this.setData({
      date: DATE,
    })
    //然后把date给后台，接收对应改日的营养数据
  },

  previousday: function(e) {
    this.setData({
      datechange: this.data.datechange - 1,
      judgenext: false
    })
    console.log('日期差：' + this.data.datechange)
    if (this.data.datechange == -6) {
      this.setData({
        judgeprevious: true,
      })
    }
    var DATE = util.getDateStr(null, this.data.datechange);
    this.setData({
      date: DATE,
    })
    //然后把date给后台，接收对应改日的营养数据
  },

  nextday: function(e) {
    this.setData({
      datechange: this.data.datechange + 1,
      judgeprevious: false,
    })
    console.log('日期差：' + this.data.datechange)
    if (this.data.datechange == 0) {
      this.setData({
        judgenext: true,
      })
    }
    var DATE = util.getDateStr(null, this.data.datechange);
    this.setData({
      date: DATE,
    })
    //然后把date给后台，接收对应改日的营养数据
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