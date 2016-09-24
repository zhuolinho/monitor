var xlsx = require('node-xlsx');
var fs = require('fs');
var plcConf = require('../configs/plc');
var q = require('q');
var uuid = require('node-uuid');
var path = require("path");


var lib = {};




lib.dateTime = function(){
      var now = new Date(),
          tzo = -now.getTimezoneOffset(),
          pad = function(num) {
              var norm = Math.abs(Math.floor(num));
              return (norm < 10 ? '0' : '') + norm;
          };
      return now.getFullYear()
          + '-' + pad(now.getMonth()+1)
          + '-' + pad(now.getDate())
          + ' ' + pad(now.getHours())
          + ':' + pad(now.getMinutes())
          + ':' + pad(now.getSeconds());
}

// lib.dateTime = function(){
//   var rightNow = new Date();
//   var datePart = rightNow.toISOString().slice(0,10);
//   var timePart = rightNow.toString().slice(16,24);
//   var result = datePart+" "+timePart;
//   return result;
// }

lib.getPlcFloat = function(hex){
  var result = Buffer(hex,'hex').readFloatBE(0);
  if(result){
      result = result.toFixed(1);
  }
  return result;
}

lib.isPlcBegin = function(data){

  var patern = data.slice(0,6);
  var result = patern.toString('utf8');
  if(result === plcConf.start){
    return true;
  }

  return false;
}

lib.isPlcEnd = function(data){
  var patern = data.slice(-4);
  var result = patern.toString('utf8');
  if(result === plcConf.end){
    return true;
  }
  return false;
}

lib.getMonthBefore = function(year,month){
  if(month==1){
    return {y:year-1,m:12};
  }
  return {y:year,m:month-1};
}

lib.reqUser = function(req){  // used to remove 'null' from req user.
  var user = JSON.parse(req.headers.user);
  return user;
}


lib.procesDownload = function(){

  var deferred = q.defer();
  const data = [["item1", "item2", "item3","item4","item5"], ["true", false, null, 'sheetjs',"yes "], ['foo', 'bar', '2014-02-19T14:30Z', '0.3',"yzz "], ['baz', "徐汇", 'qux','宝山路','ok']];
  var buffer = xlsx.build([{name: "数据表", data: data}]); // Returns a buffer

  var location = path.join(__dirname+'/..'+'/public/files/') +uuid.v4() +'.xlsx';
  console.log("location-----",location);

  fs.writeFile(location,buffer, 'utf-8', function (err) {

      if (err) {
          console.log("failed to save");
          deferred.reject(err);

      } else {
        console.log("succeeded in saving");
        deferred.resolve({path:location.slice(location.indexOf("/files"))});

      }
    });



  return deferred.promise;

}


module.exports = lib;
