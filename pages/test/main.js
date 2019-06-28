var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();


var pieChart1 = null;
var pieChart2 = null;

var already_num = 500; //已摄入能量总值（菜篮子界面传过来的参数）
var should_num = 2000; //推荐摄入能量总值
var need_num = should_num - already_num; //还需摄入能量总值

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

  data: {
    pass_num: {},



    text: [already_num, should_num, need_num], //已摄入，推荐摄入，还需摄入
    text1: [pieChart1_num1, pieChart1_num2, pieChart1_num3, pieChart1_num4], //四大营养素占比百分比
    text2: [nutrient_num1, nutrient_num2, nutrient_num3, nutrient_num4], //四大营养素具体值

    navbar: ['营养中心', '菜谱中心'], //最上方分类栏的名字
    currentTab: 0, //最开始是在第一个“营养中心”的界面上

  },
  onLoad: function(option) {
    var that = this;
    wx.getStorage({
      //获取本地缓存
      key: "pass_num",
      success: function(res) {
        that.setData({
          pass_num: res.data
        });
      },
    })



  },
  onShareAppMessage: function() {
    return {
      title: '自定义分享标题', //分享标题 
      desc: '自定义分享描述', //分享描述
      path: '/page/index?id=123' //通常是设置url，这里是设置在首页直接分享
    }
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  switchRightTab: function(e) { //对侧栏的点击事件
    let id = e.target.dataset.id;
    console.log(id);
    this.setData({
      curNav: id
    })
  },
  onReady: function(e) { //图表显示事件
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
      }, ],
      width: windowWidth,
      height: 200,
      dataLabel: false
    });

  },
})