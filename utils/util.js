function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-') 
}

function getDateStr(today, addDayCount) {
  var dd;
  if (today) {
    dd = new Date(today);
  } else {
    dd = new Date();
  }
  dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期 
  var d = dd.getDate();
  if (m < 10) {
    m = '0' + m;
  };
  if (d < 10) {
    d = '0' + d;
  };
  return y + "-" + m + "-" + d;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getDateStr: getDateStr
}



const Hub = require('signalr.js')
let hubConnect = new Hub.HubConnection();

function isEmptyObject(obj) {
  if ((typeof obj === "object" && !(obj instanceof Array)) || ((obj instanceof Array) && obj.length <= 0)) {
    var isEmpty = true;
    for (var prop in obj) {
      isEmpty = false;
      break;
    }
    return isEmpty;
  }
  return false;
}

function filterEmptyObject(list) {
  var cartList = [];
  for (var index in list) {
    if (!this.isEmptyObject(list[index])) {
      cartList.push(list[index])
    }
  }
  return cartList;
}
function toDecimal2(x) {
  var f = parseFloat(x)
  if (isNaN(f)) {
    return false
  }
  f = Math.round(x * 100) / 100
  var s = f.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}
function getNewOrder(that, token) {
  const innerAudioContext = wx.createInnerAudioContext();
  innerAudioContext.src = 'xxxxxxxxxxxxxx'
  wx.getStorage({
    key: 'orderTipStatus',
    success: function (res) {
      if (res.data == 1) {
        hubConnect.start('http://xxxxxxxxx/canteenHub', { access_token: token });
        hubConnect.onOpen = res => {
          console.log("成功开启连接")
        }
        hubConnect.on("employeeorderinfo", function (message) {
          var msg = JSON.parse(message)
          if (msg.code === 0) {
            console.log(666)
            innerAudioContext.play();
            innerAudioContext.onPlay(() => {
              console.log('录音播放中');
            })
            setTimeout(() => {
              innerAudioContext.pause()
            }, 5000)
          }
        })
      }
    },
  })

}
module.exports = {
  formatTime: formatTime,
  isEmptyObject: isEmptyObject,
  filterEmptyObject: filterEmptyObject,
  toDecimal2: toDecimal2,
  getNewOrder: getNewOrder,
  hubConnect: hubConnect,
  getDateStr: getDateStr
}

