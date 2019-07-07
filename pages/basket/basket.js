const util = require('../../utils/util.js');
const app = getApp();

const ajax = app.globalData.ajax;

var ptime;



Page({
  /**
   * 设定页面的初始数据
   */
  data: {
    shop: {}, // 商品数据
    classifySeleted: '',
    defaultImg: 'guide_logo.png', //开始时设为默认图片
    cardDetailStatus: false,
    goodsModalStatus: false, // 选择规格弹窗
    activeSpecItemsId: '',
    activeSpec: [],
    cartList: [],
    cart: {
      count: 0,
      total: 0,
      protein_total: 0, //蛋白质含量
      fat_total: 0, //脂肪含量
      carbohydrate_total: 0, //碳水化合物含量
      dietary_fiber_total: 0, //膳食纤维含量
    },
    localList: [],
    addAppMaskStatus: true,
    orderType: 0, // 0为正常下单 1为修改订单
    foodList: [], //食品列表
    scrollHeight: '',
    maskAllPage: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    wx.request({
      url: 'https://zh123456eng.xyz/smartdiet/project/dishesbykeyword',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        keyword: ''
      },
      success: function (v) {
        console.log(123)
        console.log(v.data)
      },
    })

    // 开启遮罩层
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    })
    //存储options.time的值，下面调用并传给接口
    try {
      wx.setStorageSync('time', options)
    } catch (e) {}

    // 下单类型
    console.log(options, 'orderTypeorderTypeorderTypeorderTypeorderType')
    if (options.type) {
      this.setData({
        orderType: Number(options.type)
      });
    }

    // 获取商品
    this.getGoodsList();
    // 是否需要显示添加小程序蒙层
    wx.getStorage({
      key: 'addAppMaskStatus',
      success: function(res) {
        console.log(res)
        that.setData({
          addAppMaskStatus: res.data
        })
      },
    });
    //获取系统的参数，scrollHeight数值,微信必须要设置style:height才能监听滚动事件
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    });
  },

  // 关闭添加小程序
  closeAddAppMask() {
    this.setData({
      addAppMaskStatus: false
    });
    wx.setStorage({
      key: 'addAppMaskStatus',
      data: false
    })
    console.log(this.data.addAppMaskStatus)
  },

  // 获取商品
  getGoodsList() {
    var res = {
      "code": 0,
      "message": null,
      "data": {
        "code": 0,
        "message": null,
        "data": [{
          "id": "C1",
          "name": "饮品汤类",
          "menu": [{
            "id": 10,
            "name": "排骨萝卜汤",
            "spec": "",
            "img": "",
            "price": 279,
            "total": 0,
            "num": 0,
            "menu": [{
              id: "1-1",
              spec: "小份",
              price: 13,
              num: 0
            }, {
              id: "1-2",
              spec: "大份",
              price: 21,
              num: 0
            }]
          }, {
            "id": 11,
            "name": "小白菜鸡蛋汤",
            "spec": "",
            "img": "",
            "price": 220,
            "total": 0,
            "num": 0,
            "menu": null
          }, {
            "id": 12,
            "name": "玉米山药汤",
            "spec": "",
            "img": "",
            "price": 13,
            "total": 0,
            "num": 0,
            "menu": null
          }]
        }, {
          "id": "C2",
          "name": "素菜类",
          "menu": [{
            "id": 4,
            "name": "炝炒油菜",
            "spec": "",
            "img": "",
            "price": 8,
            "total": 0,
            "num": 0,
            "menu": null
          }, {
            "id": 5,
            "name": "豆腐黄瓜片",
            "spec": "",
            "img": "",
            "price": 8,
            "total": 0,
            "num": 0,
            "menu": null
          }, {
            "id": 6,
            "name": "香菇青豆",
            "spec": "",
            "img": "",
            "price": 8,
            "total": 0,
            "num": 0,
            "menu": null
          }]
        }, {
          "id": "C3",
          "name": "水产类",
          "menu": [{
            "id": 1,
            "name": "青椒牛肉",
            "spec": "",
            "img": "",
            "price": 15,
            "total": 0,
            "num": 0,
            "menu": null
          }, {
            "id": 2,
            "name": "清炒藕片",
            "spec": "",
            "img": "",
            "price": 10,
            "total": 0,
            "num": 0,
            "menu": null
          }, {
            "id": 3,
            "name": "清炒香菇",
            "spec": "",
            "img": "",
            "price": 10,
            "total": 0,
            "num": 0,
            "menu": null
          }]
        }, {
          "id": "C4",
          "name": "主食类",
          "menu": [{
            "id": 7,
            "name": "蒸排骨",
            "spec": "",
            "img": "",
            "price": 20,
            "total": 0,
            "num": 0,
            "menu": null
          }, {
            "id": 8,
            "name": "梅菜扣肉",
            "spec": "",
            "img": "",
            "price": 20,
            "total": 0,
            "num": 0,
            "menu": null
          }, {
            "id": 9,
            "name": "风味肉末蒸豆腐",
            "spec": "",
            "img": "",
            "price": 20,
            "total": 0,
            "num": 0,
            "menu": null
          }]
        }, {
          "id": "C5",
          "name": "肉类",
          "menu": [{
            "id": 13,
            "name": "凉拌鸡丝",
            "spec": "",
            "img": "",
            "price": 18,
            "total": 0,
            "num": 0,
            "menu": null
          }, {
            "id": 14,
            "name": "蒜泥白肉",
            "spec": "",
            "img": "",
            "price": 18,
            "total": 0,
            "num": 0,
            "menu": null
          }, {
            "id": 15,
            "name": "浇汁皮蛋",
            "spec": "",
            "img": "",
            "price": 18,
            "total": 0,
            "num": 0,
            "menu": null
          }]
        }, {
          "id": "C6",
          "name": "水果类",
          "menu": [{
            "id": 16,
            "name": "珍珠米饭",
            "spec": "",
            "img": "",
            "price": 2,
            "total": 0,
            "num": 0,
            "menu": null
          }]
        }, {
          "id": "C7",
          "name": "其他",
          "menu": [{
            "id": 16,
            "name": "珍珠米饭",
            "spec": "",
            "img": "",
            "price": 2,
            "total": 0,
            "num": 0,
            "menu": null
          }]
        }]
      }
    }
    this.setData({
      shop: res.data,
      classifySeleted: res.data.data["0"].id
    })
    // 获取本地已储存数据
    if (this.data.orderType == 0) {
      this.getLocalData();
    } else {
      this.getLocalDataModify();
    }
    // 关闭遮罩层
    this.setData({
      maskAllPage: false
    })
    wx.hideToast()

  },

  // 获取本地订单数据
  getLocalData() {
    var res = wx.getStorageSync('orderList');
    if (res) {
      this.setData({
        cart: {
          count: res.count,
          total: res.total,
          protein_total: res.protein_total, //蛋白质含量
          fat_total: res.fat_total, //脂肪含量
          carbohydrate_total: res.carbohydrate_total, //碳水化合物含量
          dietary_fiber_total: res.dietary_fiber_total, //膳食纤维含量
        }
      });
      if (!util.isEmptyObject(res.cartList)) {
        this.setData({
          cartList: res.cartList,
          localList: util.filterEmptyObject(res.cartList)
        });
        // 用本地数据覆盖获取的数据
        res.cartList.forEach((localItem, index) => {
          var _id = localItem.id;
          var _shop = this.data.shop;
          _shop.data.forEach((item1, index1) => { // 循环分类
            // console.log(1111111,item1);
            item1.menu && item1.menu.forEach((item2, index2) => { // 循环菜品
              // console.log(222222,item2);
              if (item2.id === _id) {
                item2.num = localItem.num;
              }
              item2.menu && item2.menu.forEach((item3, index3) => { // 循环规格
                if (item3.id === _id) {
                  item3.num = localItem.num;
                  _shop.data[index1].menu[index2].num += localItem.num;
                  _shop.data[index1].menu[index2].total += localItem.num * localItem.price;
                }
              })
            })
          })
          this.setData({
            shop: _shop
          })
        })
      }
    }
  },

  // 获取本地修改订单数据
  getLocalDataModify() {
    var foodList = wx.getStorageSync('foodList');
    var count = 0;
    var total = 0;
    var cartList = [];
    var order = {};
    if (foodList) {
      foodList.forEach((item, index) => {
        count += item.quantity;
        total += item.quantity * item.unitPrice;
        total = this.toFixed2(total)
        order = {
          "id": item.dishesId,
          "name": item.dishesName,
          "price": item.unitPrice,
          "spec": item.dishesSpecName,
          "num": item.quantity,
          "img": item.imgUrl
        }
        cartList.push(order);
      })

      this.setData({
        cart: {
          count: count,
          total: total
        }
      });
      if (!util.isEmptyObject(cartList)) {
        this.setData({
          cartList: cartList,
          localList: util.filterEmptyObject(cartList)
        });
        // 用本地数据覆盖获取的数据
        cartList.forEach((localItem, index) => {
          var _id = localItem.id;
          var _shop = this.data.shop;
          _shop.data.forEach((item1, index1) => { // 循环分类
            // console.log(1111111,item1);
            item1.menu && item1.menu.forEach((item2, index2) => { // 循环菜品
              // console.log(222222,item2);
              if (item2.id === _id) {
                item2.num = localItem.num;
              }
              item2.menu && item2.menu.forEach((item3, index3) => { // 循环规格
                if (item3.id === _id) {
                  item3.num = localItem.num;
                  _shop.data[index1].menu[index2].num += localItem.num;
                  _shop.data[index1].menu[index2].total += localItem.num * localItem.price;
                }
              })
            })
          })
          this.setData({
            shop: _shop
          })
        })
      }
    }
  },
  // 左边点击时触发
  tapClassify(e) {
    var id = e.target.dataset.id;
    // console.log(id);
    this.setData({
      classifyViewed: id
    });
    console.log(this.data.classifyViewed)
    var self = this;
    setTimeout(function() {
      self.setData({
        classifySeleted: id
      });
    }, 100);
  },
  // 右边滚动时触发
  onGoodsScroll(e) {
    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.shop.data.length;
    this.data.shop.data.forEach(function(classify, i) {
      var _h = 74 + classify.menu.length * 156;
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });

    this.setData({
      classifySeleted: classifySeleted
    });
  },
  // 显示隐藏购物车详情
  changeCardDetailStatus() {
    this.setData({
      cardDetailStatus: !this.data.cardDetailStatus
    })
  },
  // 检测购物车中是否有相同的商品(名字判断)
  checkOrderSameName: function(name) {
    var list = this.data.cartList;
    for (var index in list) {
      if (list[index].name === name) {
        return index;
      }
    }
    return false;
  },
  // 检测购物车中是否有相同的商品 规格(名字判断)
  checkOrderSameSpecName: function(specName) {
    var list = this.data.activeSpec.menu;
    for (var index in list) {
      if (list[index].specName === specName) {
        return index;
      }
    }
    return false;
  },
  // 检测购物车中是否有相同的商品
  checkOrderSameId: function(id) {
    var list = this.data.cartList;
    for (var index in list) {
      if (list[index].id === id) {
        return index;
      }
    }
    return false;
  },
  // 添加商品到购物车
  addCart(e) {
    // console.log(e);
    var id = e.target.dataset.id;
    var name = e.target.dataset.name;
    var price = parseFloat(e.target.dataset.price);
    var spec = e.target.dataset.spec;
    var num = e.target.dataset.num;
    var img = e.target.dataset.img;
    console.log(id, name, price, spec, num, img)

    var _shop = this.data.shop;
    var list = this.data.cartList;
    var sortedList = {};
    var index; // 购物车中相同id index
    console.log(this.data.cartList);

    if (index = this.checkOrderSameId(id)) { //相同商品id
      sortedList = list[index];
      var num = list[index].num;
      list[index].num = num + 1;
    } else { //不同商品id
      var order = {
        "id": id,
        "name": name,
        "price": price,
        "spec": spec,
        "num": 1,
        "img": img
      }
      console.log(spec)
      list.push(order);
      sortedList = order;
    }
    // 改变数据
    this.changeShopData(id, 'add');
    this.setData({
      cartList: list,
      localList: util.filterEmptyObject(list)
    });
    this.addCount(sortedList);
  },

  // 添加删除商品时改变数据；
  changeShopData(id, flag) {
    var _shop = this.data.shop;
    _shop.data.forEach((item1, index1) => { // 循环分类
      // console.log(1111111,item1);
      item1.menu.forEach((item2, index2) => { // 循环菜品
        // console.log(222222,item2);
        if (item2.id === id) {
          if (flag === 'add') {
            item2.num++;
          } else {
            item2.num--;
          }
        }
        item2.menu && item2.menu.forEach((item3, index3) => { // 循环规格
          if (item3.id === id) {
            if (flag === 'add') {
              item3.num++;
              _shop.data[index1].menu[index2].num++;
              _shop.data[index1].menu[index2].total += item3.price;
            } else {
              item3.num--;
              _shop.data[index1].menu[index2].num--;
              _shop.data[index1].menu[index2].total -= item3.price;
            }
          }
        })
      })
    })
    this.setData({
      shop: _shop
    })
  },

  // 删除购物车商品
  reduceCart(e) {
    // console.log(e);
    var id = e.target.dataset.id;
    var name = e.target.dataset.name;
    var price = parseFloat(e.target.dataset.price);
    var spec = e.target.dataset.spec;
    var num = e.target.dataset.num;
    console.log(id, name, price, spec, num)

    var _shop = this.data.shop;
    var list = this.data.cartList;
    var sortedList = {};
    var index; // 购物车中相同id index
    if (index = this.checkOrderSameId(id)) {
      var num = list[index].num;
      sortedList = list[index];
      if (num > 1) {
        list[index].num = num - 1;
      } else {
        list.splice(index, 1);
      }

      // 为初始数据添加数量
      this.changeShopData(id, 'reduce');

    }
    this.setData({
      cartList: list,
      localList: util.filterEmptyObject(list)
    });
    this.deduceCount(sortedList);
  },

  // 保留两位小数
  toFixed2(money) {
    if (String(money).indexOf(".") != -1 && String(money).split(".")[1].length > 2) {
      // money = Math.round(Number(money) * 100) / 100;
      money = parseFloat(money).toFixed(2);
    }
    return parseFloat(money)
  },

  // 添加商品计算商品总数和总能量
  addCount: function(list) {
    var count = this.data.cart.count + 1,
      total = this.data.cart.total + list.price;
    total = this.toFixed2(total);
    this.saveCart(count, total);
  },
  // 删除商品计算商品总数和总能量
  deduceCount: function(list) {
    var count = this.data.cart.count - 1,
      total = this.data.cart.total - list.price;
    total = this.toFixed2(total);
    this.saveCart(count, total);
  },

  // 把选中的商品储存到本地
  saveCart: function(count, total) {
    if (typeof total == null) {
      total = 0;
    }

    this.setData({
      cart: {
        count: count,
        total: total
      }
    });

    if (this.data.orderType === 0) {
      wx.setStorage({
        key: 'orderList',
        data: {
          cartList: this.data.cartList,
          count: this.data.cart.count,
          total: this.data.cart.total,
        }

      })

      //......
      /*var passed_total = this.data.cart.total;
      wx.setStorage({
        key: 'pass_num',
        data: passed_total,
        
      })
      console.log(this.data.cart.total)
      console.log(passed_total)*/
      //.....




    } else {
      var foodList = [];
      var order = {};
      this.data.cartList.forEach((item, index) => {
        order = {
          "dishesId": item.id,
          "dishesName": item.name,
          "unitPrice": item.price,
          "dishesSpecName": item.spec,
          "quantity": item.num,
          "imgUrl": item.img
        }
        foodList.push(order);
      })
      wx.setStorage({
        key: 'foodList',
        data: foodList
      })
    }
    console.log(foodList)
  },

  // 选择规格
  selectSpec(e) {
    var activeSpecItemsId = (e.target.dataset.id); // 当前多规格菜品 id
    var classifyIndex = (e.target.dataset.classifyindex); // 分类index
    var menuIndex = (e.target.dataset.menuindex); // 菜品index
    console.log(classifyIndex, menuIndex, activeSpecItemsId)
    this.setData({
      activeSpecItemsId: activeSpecItemsId,
      goodsModalStatus: !this.data.goodsModalStatus,
      activeSpec: this.data.shop.data[classifyIndex].menu[menuIndex]
    })
  },
  // 清空购物车
  clearCart() {
    var that = this;
    wx.showModal({
      title: '清空所选菜品',
      content: '确认要清空吗？',
      success(res) {
        if (res.confirm) {
          that.setData({
            cart: {
              count: 0,
              total: 0
            },
            cartList: [],
            localList: []
          });
          wx.removeStorageSync('orderList');
          wx.removeStorageSync('foodList');
          that.getGoodsList();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 选择规格模态框
  selectGoodsModalStatus() {
    this.setData({
      activeSpecItemsId: '',
      goodsModalStatus: !this.data.goodsModalStatus
    })
  },


  // 确认选择点击事件
  goSureOrder() {
    if (this.data.cart.count == 0) {
      wx.showToast({
        title: '请至少选择一样菜品',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var passed_total = this.data.cart.total;
    wx.setStorage({
      key: 'pass_num',
      data: passed_total,
    })
    var that = this;
    wx.showModal({
      title: '请确认所选菜品',
      content: '点击取消可继续选菜或修改所选菜品',
      success(res) {
        if (res.confirm) {
          console.log(that.data.cartList);
          //调用time本地缓存，获取区分早中晚餐[0,1,2]
          wx.getStorage({
            key: 'time',
            success: function(res) {
              console.log(res.data)
              ptime = res.data;
              console.log(ptime)
            }
          })

          console.log(111111)
          console.log(app.globalData.uniqueid)
          //获取本地当前时间，每确定一次都会log一次
          var currenTime = util.formatTime(new Date());
          console.log(currenTime)
          console.log(ptime)
          console.log(that.data.cartList.id);
          console.log(that.data.cartList.num);

          /* wx.request({
            url: '',
            data:{
               把本餐的数据传给数据库
            },
            method:'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success:function(e){

            }
          }) */

          that.setData({
            cart: {
              count: 0,
              total: 0
            },
            cartList: [],
            localList: []
          });

          wx.removeStorageSync('orderList');
          wx.removeStorageSync('foodList');
          that.getGoodsList();

          


          wx.switchTab({
            url: '../test/main',
          })

        }
      }

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
    this.setData({
      classifySeleted: this.data.shop.data[0].id
    });
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
    return {
      title: '自定义分享标题', //分享标题 
      desc: '自定义分享描述', //分享描述
      path: '/page/index?id=123' //通常是设置url，这里是设置在首页直接分享
    }

  }
})