var xlsx = require("node-xlsx");
var fs = require("fs");
var https = require("https");
var qs = require("querystring");
var plcConf = require("../configs/plc");
var globalConf = require("../configs/global");
var q = require("q");
var uuid = require("node-uuid");
var path = require("path");

var lib = {};

lib.dateTime = function() {
  var now = new Date(),
    tzo = -now.getTimezoneOffset(),
    pad = function(num) {
      var norm = Math.abs(Math.floor(num));
      return (norm < 10 ? "0" : "") + norm;
    };
  return (
    now.getFullYear() +
    "-" +
    pad(now.getMonth() + 1) +
    "-" +
    pad(now.getDate()) +
    " " +
    pad(now.getHours()) +
    ":" +
    pad(now.getMinutes()) +
    ":" +
    pad(now.getSeconds())
  );
};

lib.deductTimeFromDate = function(milliseconds) {
  var milliSec = Date.now() - milliseconds;
  var now = new Date(milliSec),
    tzo = -now.getTimezoneOffset(),
    pad = function(num) {
      var norm = Math.abs(Math.floor(num));
      return (norm < 10 ? "0" : "") + norm;
    };
  return (
    now.getFullYear() +
    "-" +
    pad(now.getMonth() + 1) +
    "-" +
    pad(now.getDate()) +
    " " +
    pad(now.getHours()) +
    ":" +
    pad(now.getMinutes()) +
    ":" +
    pad(now.getSeconds())
  );
};

// lib.dateTime = function(){
//   var rightNow = new Date();
//   var datePart = rightNow.toISOString().slice(0,10);
//   var timePart = rightNow.toString().slice(16,24);
//   var result = datePart+" "+timePart;
//   return result;
// }

lib.getPlcFloat = function(hex, fixTo, coef) {
  var result = Buffer(hex, "hex").readFloatBE(0);
  var coef = coef || 1;
  var fix = fixTo || 0;
  if (result) {
    result = result * coef;
    result = result.toFixed(fix);
  }
  return result;
};

lib.isPlcBegin = function(data) {
  var patern = data.slice(0, 6);
  var result = patern.toString("utf8");
  if (result === plcConf.start) {
    return true;
  }

  return false;
};

lib.isPlcEnd = function(data) {
  var patern = data.slice(-4);
  var result = patern.toString("utf8");
  if (result === plcConf.end) {
    return true;
  }
  return false;
};

// lib.getMonthBefore = function(year,month){
//   if(month==1){
//     return {y:year-1,m:12};
//   }
//   return {y:year,m:month-1};
// }

lib.getPreviousMonthDate = function(date) {
  var d = new Date(date);
  d.setMonth(d.getMonth() - 1); //last month date;
  return d.toISOString().slice(0, 10);
};

lib.getPreviousDayDate = function(date) {
  var d;
  if (date) {
    d = new Date(date);
  } else {
    d = new Date();
  }

  d.setDate(d.getDate() - 1); //yesterday date;
  return d.toISOString().slice(0, 10);
};

lib.reqUser = function(req) {
  // used to remove 'null' from req user.
  var user = {};
  if (req.headers.user) {
    user = JSON.parse(req.headers.user);
  }
  return user;
};

lib.procesDownloadStats = function(param, tank, meter) {
  var deferred = q.defer();
  const data = [["罐号", "日期", "累计流量", "用量"]];
  var maxVal = "maxVal1";
  var usage = "usage1";

  if (parseInt(meter) == 2) {
    maxVal = "maxVal2";
    usage = "usage2";
  }

  for (var i = 0; i < param.length; i++) {
    data.push([tank, param[i].date, param[i][maxVal], param[i][usage]]);
  }
  var buffer = xlsx.build([{ name: "统计数据表", data: data }]); // Returns a buffer

  var location =
    path.join(__dirname + "/.." + "/public/files/") + uuid.v4() + ".xlsx";
  console.log("location-----", location);

  fs.writeFile(location, buffer, "utf-8", function(err) {
    if (err) {
      console.log("failed to save");
      deferred.reject(err);
    } else {
      console.log("succeeded in saving");
      deferred.resolve({ path: location.slice(location.indexOf("/files")) });
    }
  });

  return deferred.promise;
};

lib.processDownloadProcessedAlerts = function(param) {
  var deferred = q.defer();
  const data = [["罐号", "报警时间", "接报时间", "调度员", "报警类型"]];
  for (var i = 0; i < param.length; i++) {
    data.push([
      param[i].tank,
      param[i].atime,
      param[i].pt,
      param[i].pa,
      param[i].atype
    ]);
  }
  var buffer = xlsx.build([{ name: "已处理报警", data: data }]); // Returns a buffer

  var location =
    path.join(__dirname + "/.." + "/public/files/") + uuid.v4() + ".xlsx";
  console.log("location-----", location);

  fs.writeFile(location, buffer, "utf-8", function(err) {
    if (err) {
      console.log("failed to save");
      deferred.reject(err);
    } else {
      console.log("succeeded in saving");
      deferred.resolve({ path: location.slice(location.indexOf("/files")) });
    }
  });

  return deferred.promise;
};

lib.procesDownloadCompletedShipments = function(param) {
  var deferred = q.defer();
  const data = [
    [
      "原罐号",
      "换罐号",
      "配送时间",
      "送达时间",
      "车牌/司机/押运",
      "调度员",
      "距离"
    ]
  ];
  for (var i = 0; i < param.length; i++) {
    data.push([
      param[i].oti,
      param[i].nti,
      param[i].dt,
      param[i].at,
      param[i].lp + "/" + param[i].driver + "/" + param[i].s,
      param[i].pa,
      param[i].dist
    ]);
  }
  var buffer = xlsx.build([{ name: "配送完成表", data: data }]); // Returns a buffer

  var location =
    path.join(__dirname + "/.." + "/public/files/") + uuid.v4() + ".xlsx";
  console.log("location-----", location);

  fs.writeFile(location, buffer, "utf-8", function(err) {
    if (err) {
      console.log("failed to save");
      deferred.reject(err);
    } else {
      console.log("succeeded in saving");
      deferred.resolve({ path: location.slice(location.indexOf("/files")) });
    }
  });

  return deferred.promise;
};

lib.procesDownloadInstantPlc = function(param, tank, meter) {
  var deferred = q.defer();
  const data = [["罐号", "时间", "瞬时流量"]];

  var flow = "";

  if (tank[0] == "G") {
    flow = "isc2";
  } else {
    if (parseInt(meter) == 1) {
      flow = "instfow0";
    } else {
      flow = "instfow";
    }
  }

  for (var i = 0; i < param.length; i++) {
    data.push([tank, param[i].cd, param[i][flow]]);
  }
  var buffer = xlsx.build([{ name: "瞬时流量数据表", data: data }]); // Returns a buffer

  var location =
    path.join(__dirname + "/.." + "/public/files/") + uuid.v4() + ".xlsx";
  console.log("location-----", location);

  fs.writeFile(location, buffer, "utf-8", function(err) {
    if (err) {
      console.log("failed to save");
      deferred.reject(err);
    } else {
      console.log("succeeded in saving");
      deferred.resolve({ path: location.slice(location.indexOf("/files")) });
    }
  });

  return deferred.promise;
};

lib.H2Hms = function(h) {
  var hours = parseInt(h, 10);
  var minutes = parseInt((h - hours) * 60, 10);

  var seconds = parseInt(((h - hours) * 60 - minutes) * 60, 10);

  return hours + "小时 " + minutes + "分 " + seconds + "秒";
};

lib.procesDownload = function(param) {
  var deferred = q.defer();
  const data = [
    ["item1", "item2", "item3", "item4", "item5"],
    ["true", false, null, "sheetjs", "yes "],
    ["foo", "bar", "2014-02-19T14:30Z", "0.3", "yzz "],
    ["baz", "徐汇", "qux", "宝山路", "ok"]
  ];
  var buffer = xlsx.build([{ name: "数据表", data: data }]); // Returns a buffer

  var location =
    path.join(__dirname + "/.." + "/public/files/") + uuid.v4() + ".xlsx";
  console.log("location-----", location);

  fs.writeFile(location, buffer, "utf-8", function(err) {
    if (err) {
      console.log("failed to save");
      deferred.reject(err);
    } else {
      console.log("succeeded in saving");
      deferred.resolve({ path: location.slice(location.indexOf("/files")) });
    }
  });

  return deferred.promise;
};

lib.padNum = function(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

lib.sendSms = function(mobile, alert) {
  var apikey = globalConf.sms.apikey;
  var tpl_id = globalConf.sms.plc_tpl_id;
  var sms_host = globalConf.sms.sms_host;
  var send_tpl_sms_uri = globalConf.sms.send_tpl_sms_uri;

  var tpl_value = { "#name#": alert.smsam, "#tank#": alert.tank };

  var post_data = {
    apikey: apikey,
    mobile: mobile,
    tpl_id: tpl_id,
    tpl_value: qs.stringify(tpl_value)
  }; //这是需要提交的数据
  var content = qs.stringify(post_data);
  postSMS(send_tpl_sms_uri, content, sms_host);

  function postSMS(uri, content, host) {
    var options = {
      hostname: host,
      port: 443,
      path: uri,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    };
    var req = https.request(options, function(res) {
      // console.log('STATUS: ' + res.statusCode);
      // console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding("utf8");
      res.on("data", function(chunk) {
        console.log("sms response body: " + chunk);
      });
    });
    //console.log(content);
    req.write(content);

    req.end();
  }
};

module.exports = lib;
