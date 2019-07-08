// pages/usercenter/userbasic/currentinfo/currentinfo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday:'',
    sex:'',
    height:'',
    weight:'',
    disease:'',
    sports:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://zh123456eng.xyz/smartdiet/project/wechatlogin',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userid: app.globalData.uniqueid
      },
      success: function (v) {
        console.log(v.data)
        that.setData({
          birthday: v.data.birthday,
          sex: v.data.sex,
          height: v.data.height,
          weight: v.data.weight,
          disease: v.data.disease,
          sports: v.data.pal
        })
      },
    })
  },
  
  modifyuserinfo: function(e){
    wx.redirectTo({
      url: '../userbasic',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})