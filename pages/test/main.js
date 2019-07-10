var wxCharts = require('../../utils/wxcharts.js');
const util = require('../../utils/util.js');
var app = getApp();
var pieChart1 = null;
var pieChart2 = null;

Page({

  data: {

    imgUrls: [
      'https://s2.ax1x.com/2019/07/08/ZrwFmT.jpg',
      'https://s2.ax1x.com/2019/07/08/ZrUsAJ.jpg',

    ],
    indicatorDots: true, //Boolean是否显示面板指示点 
    autoplay: true, //Boolean是否自动切换 
    interval: 3000, //Number自动切换时间间隔 
    duration: 500, //Number滑动动画时长 


    shouldnum: '',
    alreadynum: '',
    neednum: '',


    num1: '',
    num2: '',
    num3: '',
    num4: '',


    num01: '',
    num02: '',
    num03: '',
    num04: '',

    num11: '',
    num12: '',
    num13: '',

    num21: '',
    num22: '',
    num23: '',

    pctg: '',

  },
  onLoad: function(option) {},
  onShareAppMessage: function() {
    return {
      title: '自定义分享标题', //分享标题 
      desc: '自定义分享描述', //分享描述
      path: '/page/index?id=123' //通常是设置url，这里是设置在首页直接分享
    }
  },

  onShow: function() {
    //console.log(app.globalData.uniqueid)
    var currenTime = util.formatTime(new Date());
    console.log(currenTime)
    console.log(app.globalData.uniqueid)
    var that = this;
    wx.request({
      url: 'https://zh123456eng.xyz/smartdiet/project/analysis',
      method: 'POST',
      data: {
        userid: app.globalData.uniqueid,
        date: currenTime.toString()
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function(e) {
        console.log(app.globalData.uniqueid)
        console.log(e.data)
        wx.setStorage({
          key: 'foodnum',
          data: e.data,
        })

      },
    })


    var chart_num = wx.getStorageSync('foodnum');
    console.log(chart_num);
    //蛋白质含量占比
    var proteinAll1 = 100 * parseInt(chart_num.proteinAll) / (parseInt(chart_num.fiberAll) + parseInt(chart_num.proteinAll) + parseInt(chart_num.fatAll) + parseInt(chart_num.carbohydrateAll));
    console.log(parseInt(chart_num.proteinAll));


    console.log(proteinAll1);
    //脂肪含量占比
    var fatAll1 = 100 * parseInt(chart_num.fatAll) / (parseInt(chart_num.fiberAll) + parseInt(chart_num.proteinAll) + parseInt(chart_num.fatAll) + parseInt(chart_num.carbohydrateAll));
    console.log(fatAll1);
    //碳水化合物含量占比
    var carbohydrateAll1 = 100 * parseInt(chart_num.carbohydrateAll) / (parseInt(chart_num.fiberAll) + parseInt(chart_num.proteinAll) + parseInt(chart_num.fatAll) + parseInt(chart_num.carbohydrateAll));
    console.log(carbohydrateAll1);
    //膳食纤维含量占比
    var fiberAll1 = 100 * parseInt(chart_num.fiberAll) / (parseInt(chart_num.fiberAll) + parseInt(chart_num.proteinAll) + parseInt(chart_num.fatAll) + parseInt(chart_num.carbohydrateAll));
    console.log(fiberAll1);

    var proteinAll10 = proteinAll1.toFixed(1);
    var fatAll10 = fatAll1.toFixed(1);
    var carbohydrateAll10 = carbohydrateAll1.toFixed(1);
    var fiberAll10 = fiberAll1.toFixed(1);
    console.log(carbohydrateAll10);



    //早餐含量占比
    var num_morning0 = 100 * parseInt(chart_num.KMorning) / (parseInt(chart_num.KNight) + parseInt(chart_num.KMorning) + parseInt(chart_num.KNoon));
    var num_morning01 = num_morning0.toFixed(1);
    var num_morning02 = parseInt(chart_num.KMorning).toFixed(1);
    console.log(num_morning0);
    //晚餐含量占比
    var num_night0 = 100 * parseInt(chart_num.KNight) / (parseInt(chart_num.KNight) + parseInt(chart_num.KMorning) + parseInt(chart_num.KNoon));
    var num_night11 = num_night0.toFixed(1);
    var num_night12 = parseInt(chart_num.KNight).toFixed(1);
    console.log(num_night0);
    //午餐含量占比
    var num_noon0 = 100 * parseInt(chart_num.KNoon) / (parseInt(chart_num.KNight) + parseInt(chart_num.KMorning) + parseInt(chart_num.KNoon));
    var num_noon11 = num_noon0.toFixed(1);
    var num_noon22 = parseInt(chart_num.KNoon).toFixed(1);
    console.log(num_noon0);


    var already_num0 = parseInt(chart_num.kcalAll); //已摄入能量总值（菜篮子界面传过来的参数）
    var should_num0 = 20000; //推荐摄入能量总值
    var need_num0 = should_num0 - already_num0; //还需摄入能量总值
    var percent0 = 100 * already_num0 / should_num0;

    that.setData({
      num1: parseInt(chart_num.proteinAll),
      num2: parseInt(chart_num.fatAll),
      num3: parseInt(chart_num.carbohydrateAll),
      num4: parseInt(chart_num.fiberAll),
      num01: proteinAll10,
      num02: fatAll10,
      num03: carbohydrateAll10,
      num04: fiberAll10,
      num11: num_morning02,
      num12: num_noon22,
      num13: num_night12,
      num21: num_morning01,
      num22: num_noon11,
      num23: num_night11,
      alreadynum: already_num0,
      shouldnum: should_num0,
      neednum: need_num0,
      pctg: percent0

    })


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
        data: proteinAll1,
      }, {
        name: '脂肪',
        data: fatAll1,
      }, {
        name: '碳水化合物',
        data: carbohydrateAll1,
      }, {
        name: '膳食纤维',
        data: fiberAll1,
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
        data: num_morning0,
      }, {
        name: '午餐',
        data: num_noon0,

      }, {
        name: '晚餐',
        data: num_night0,
      }, ],
      width: windowWidth,
      height: 200,
      dataLabel: false
    });

    
  },
  
  onPullDownRefresh(){
    this.onShow()
  }
})