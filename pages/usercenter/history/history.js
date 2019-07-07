// pages/usercenter/history/history.js
var util = require('../../../utils/util.js');
var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();


var pieChart1 = null;
var pieChart2 = null;

var already_num = 500; //已摄入能量总值（菜篮子界面传过来的参数）
var should_num = 2000; //推荐摄入能量总值
var need_num = should_num - already_num; //还需摄入能量总值
var percent = 100 * already_num / should_num;

var nutrient_num1 = 1200; //图表中蛋白质总量
var nutrient_num2 = 300; //图表中脂肪总量
var nutrient_num3 = 400; //图表中碳水化合物总量
var nutrient_num4 = 100; //图表中膳食纤维总量

var pieChart1_num1 = 100 * nutrient_num1 / (nutrient_num1 + nutrient_num2 + nutrient_num3 + nutrient_num4); //图表中蛋白质占比
var pieChart1_num2 = 100 * nutrient_num2 / (nutrient_num1 + nutrient_num2 + nutrient_num3 + nutrient_num4); //图表中脂肪占比
var pieChart1_num3 = 100 * nutrient_num3 / (nutrient_num1 + nutrient_num2 + nutrient_num3 + nutrient_num4); //图表中碳水化合物占比
var pieChart1_num4 = 100 * nutrient_num4 / (nutrient_num1 + nutrient_num2 + nutrient_num3 + nutrient_num4); //图表中膳食纤维占比

var pieChart2_breakfast = 25; //图表中早餐热量值
var pieChart2_lunch = 45; //图表中午餐热量值
var pieChart2_dinner = 30; //图表中晚餐热量值

var pieChart2_num1 = 100 * pieChart2_breakfast / (pieChart2_breakfast + pieChart2_lunch + pieChart2_dinner); //图表中早餐热量占比
var pieChart2_num2 = 100 * pieChart2_lunch / (pieChart2_breakfast + pieChart2_lunch + pieChart2_dinner); //图表中午餐热量占比
var pieChart2_num3 = 100 * pieChart2_dinner / (pieChart2_breakfast + pieChart2_lunch + pieChart2_dinner); //图表中晚餐热量占比


Page({

  /**
   * 页面的初始数据
   */
  data: {


    foods:[0,1,2,3,4,5],
    food_name: ['acsd', 'ucabud', 'dshcsv','acsd', 'ucabud', 'dshcsv'],
    food_count:[1,2,3,1,1,2],
    

    text: [already_num, should_num, need_num], //已摄入，推荐摄入，还需摄入
    text1: [pieChart1_num1, pieChart1_num2, pieChart1_num3, pieChart1_num4], //四大营养素占比百分比
    text2: [nutrient_num1, nutrient_num2, nutrient_num3, nutrient_num4], //四大营养素具体值
    
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
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    pieChart1 = new wxCharts({ //四大营养素图
      canvasId: 'pieCanvas1',
      type: 'pie',
      animation: true,
      series: [{
        name: '蛋白质',
        data: pieChart1_num1,
      }, {
        name: '脂肪',
        data: pieChart1_num2,
      }, {
        name: '碳水化合物',
        data: pieChart1_num3,
      }, {
        name: '膳食纤维',
        data: pieChart1_num4,
      }],
      width: windowWidth,
      height: 200,
      dataLabel: false
    });
    pieChart2 = new wxCharts({ //三餐热量比扇形图
      canvasId: 'pieCanvas2',
      type: 'pie',
      animation: true,
      series: [{
        name: '早餐',
        data: pieChart2_num1,
      }, {
        name: '午餐',
        data: pieChart2_num2,
      }, {
        name: '晚餐',
        data: pieChart2_num3,
      },],
      width: windowWidth,
      height: 200,
      dataLabel: false
    });

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