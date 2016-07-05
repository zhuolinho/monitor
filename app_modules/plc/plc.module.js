
'use strict';

var mongoose = null ; //mongoose object
var message = null;   // message function
var plc = {};


var q = require('q');
var PlcAlert = require('../../models/plc-alert');
var Tank = require('../../models/tank');
var plcConfig = require('../../configs/plc');
var lib = require('../../lib/lib');


var alertsList =[
              {
                addr:'C002-闸北区大宁路335号XX站',
                id:'6112',
                atype:'余量报警',
                remainingTime:'2小时02分',
                upTime:'15.5.3-13:02/----',
                processed:false,
                atime:'5.5.3-13:02',
                am:'6%/12kg/hps',
                processedAgent:'234'
              },
              {
                addr:'C014-闸北区大宁路335号XX站',
                id:'8000',
                atype:'余量报警',
                remainingTime:'2小时02分',
                upTime:'15.5.3-13:02/----',
                processed:true,
                atime:'5.5.3-13:02',
                am:'6%/12kg/hps'
              },
              {
                addr:'C023-闸北区大宁路335号XX站',
                id:'8001',
                atype:'余量报警',
                remainingTime:'2小时02分',
                upTime:'15.5.3-13:02/----',
                processed:true,
                atime:'5.5.3-13:02',
                am:'6%/12kg/hps'
              },
              {
                addr:'C333-闸北区大宁路335号XX站',
                id:'8007',
                atype:'余量报警',
                remainingTime:'2小时02分',
                upTime:'15.5.3-13:02/----',
                processed:true,
                atime:'5.5.3-13:02',
                am:'6%/12kg/hps'
              },
              {
                addr:'C214-闸北区大宁路335号XX站',
                id:'5467',
                atype:'信号中断',
                remainingTime:'',
                upTime:'15.5.3-13:02/----',
                processed:false,
                atime:'5.5.3-13:02',
                am:'信号中断'
              }
              ,{
                  addr:'C005-闸北区大宁路335号XX站',
                  id:'5555',
                  atype:'信号中断',
                  remainingTime:'',
                  upTime:'15.5.3-13:02/----',
                  processed:true,
                  atime:'5.5.3-13:02',
                  am:'信号中断'
              },
              {
                addr:'C006-闸北区大宁路335号XX站',
                id:'1839',
                atype:'信号中断',
                remainingTime:'',
                upTime:'15.5.3-13:02/----',
                processed:false,
                atime:'5.5.3-13:02',
                am:'信号中断'
              },
              {
                addr:'C007-闸北区大宁路335号XX站',
                id:'8880',
                atype:'信号中断',
                remainingTime:'',
                upTime:'15.5.3-13:02/----',
                processed:false,
                atime:'5.5.3-13:02',
                am:'信号中断'
              },
              {
                addr:'C008-闸北区大宁路335号XX站',
                id:'5832',
                atype:'泄漏报警',
                remainingTime:'',
                upTime:'15.5.3-13:02/----',
                processed:false,
                atime:'5.5.3-13:02',
                am:'泄漏报警'
              },
              {
                addr:'C009-闸北区大宁路335号XX站',
                id:'9832',
                atype:'泄漏报警',
                remainingTime:'',
                upTime:'15.5.3-13:02/----',
                processed:false,
                atime:'5.5.3-13:02',
                am:'泄漏报警'
              },
              {
                addr:'C010-闸北区大宁路335号XX站',
                id:'6842',
                atype:'压力报警',
                remainingTime:'',
                upTime:'15.5.3-13:02/----',
                processed:false,
                atime:'5.5.3-13:02',
                am:'压力报警'
              },
              {
                addr:'C011-闸北区大宁路335号XX站',
                id:'6838',
                atype:'压力报警',
                remainingTime:'',
                upTime:'15.5.3-13:02/----',
                processed:true,
                atime:'5.5.3-13:02',
                am:'压力报警'
              }
    ];

plc.init = function(m) {
    var r = {pl: {status:true} , er:''};


    PlcAlert.find({},function(error, doc){
      if(doc&&doc.length){
          return;
     }else {
          // save sample to init it of not there.
          var pchain = [];
          for (var i = 0; i < alertsList.length; i++) {
                 var message = {pl:{}};
                 message.pl.alert =  alertsList[i];
                 pchain.push(plc.addNewAlert(message));
          }

          var result =  q();
          pchain.forEach(function (f) {
              result = result.then(f);
          });
          console.log('result----',result);

     }
    });
    return q(r);
}

plc.handleIncommingData =  function(m) {
  console.log("plc: handleIncommingData");
  var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();

var incommingData = m.pl;

  if(incommingData){

    var dateInfo =  _extractDateInfo(incommingData);

      var plcData = new PlcAlert({
                                rawd:incommingData.toString('hex'),
                                at:dateInfo.stdDate, //standard date.
                                wd:dateInfo.weekday, //weekday
                                ns:dateInfo.nanosecond,
                                tank:'C001'
                        })

        plcData.save(function (err, plc) {
            if (err){
              r.er = err;
              r.status = false;
              deferred.reject(r);
            }
            else{
              r.pl.plc = plc;
              r.status = true;
              deferred.resolve(r);
            }
        })
    }
    else {
      r.er =  "empty data";
      r.status = false
      deferred.reject(r);
    }
  return deferred.promise;

}

//依次是   year（2字节）
// month（1字节）
// day（1字节）
// weekday（1字节）
// hour（1字节）
// minute（1字节）
// second（1字节）
// nanosecond（4字节）

var _extractDateInfo = function(data){
  var date = '';
  var year = data.slice(0,2);
  var month = data.slice(2,3);
  var day = data.slice(3,4);
  var weekday = data.slice(4,5);
  var hour = data.slice(5,6);
  var minute = data.slice(6,7);
  var second = data.slice(7,8);
  var nanosecond = data.slice(8,12);

  //var strYear = year.toString('hex')
  //parseInt(strYear, 16);

  date = parseInt(year.toString('hex'), 16) +"-"+
         parseInt(month.toString('hex'), 16) +"-"+
         parseInt(day.toString('hex'), 16) +" "+
         parseInt(hour.toString('hex'), 16) +":"+
         parseInt(minute.toString('hex'), 16) +":"+
         parseInt(second.toString('hex'), 16);

  var result = {stdDate:date, weekday: parseInt(weekday.toString('hex'), 16), nanosecond:parseInt(nanosecond.toString('hex'), 16)};

  console.log("date result----",result);

  return result;
}





plc.getData =  function(m) {
  console.log("plc module: getData FUNCTION");
 var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();

  Plc.find(function (err, plc) {
      if (err){
        r.er = err;
        r.status = false;
        deferred.reject(r);
      }
      else{
        r.pl.plc = plc;
        r.status = true;
        deferred.resolve(r);
      }
  })
  return deferred.promise;
}


plc.getTanks =  function(m) {
  console.log("plc module: getData FUNCTION");
 var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();

  Tank.find(function (err, tanks) {
      if (err){
        r.er = err;
        r.status = false;
        deferred.reject(r);
      }
      else{
        r.pl.tanks = tanks;
        r.status = true;
        deferred.resolve(r);
      }
  })
  return deferred.promise;
}


// plc.getSingle = function(m){  mongodb lookup
//   db.plc.aggregate([
//       {$match: {_id:m.pl._id}},
//       {
//         $lookup:
//           {
//             from: "tank",
//             localField: "tank",
//             foreignField: "code",
//             as: "target_tank"
//           }
//      }
//   ])
// }


plc.addNewTank =  function(m) {

    console.log("add new tank----");

    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();


    if(m.pl && m.pl.tank && m.pl.tank.code){
        var newtank = new Tank({
                          code:m.pl.tank.code,
                          addr:m.pl.tank.addr,
                          plcaddr1:m.pl.tank.plcaddr1,
                          plcaddr2:m.pl.tank.plcaddr2
                          });

               newtank.save(function (error, tank){
                 console.log("new tank saved----",tank);
                   if (!error){
                     r.pl.tank = tank;
                     deferred.resolve(r);
                   }
                   else{
                     r.er = error;
                     r.em = 'invalid tank. already exist?';
                     deferred.reject(r);
                   }
               });
      }
      else {
        r.er =  "no tank or tank code provided";
        deferred.reject(r);
      }
    return deferred.promise;
}

plc.updateTank =  function(m) {

    console.log(" update tank----");

    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();

    if(m.pl && m.pl.tank && m.pl.tank.code){

      Tank.findOneAndUpdate({_id:m.pl.tank._id}, m.pl.tank, { new: true }, function(err, tank) {
                if (err){
                  r.er = err;
                  r.em = 'problem finding tank';
                  deferred.reject(r);
                }
                else{
                  r.pl.tank = tank;
                  deferred.resolve(r);
                }
      });
      }
      else {
        r.er =  "no tank or tank code provided";
        deferred.reject(r);
      }
    return deferred.promise;
}

plc.addNewAlert = function(m){

  console.log("add new alert----",m.pl.alert);

  var r = {pl: {}, er:'',em:''};
  var deferred = q.defer();


  if(m.pl && m.pl.alert){
      var newAlert = new PlcAlert({
                          atime:m.pl.alert.atime,
                          atype:m.pl.alert.atype,
                          tank:m.pl.alert.addr,
                          pa:m.pl.alert.processedAgent,
                          am:m.pl.alert.am,
                          rt:m.pl.alert.remainingTime,
                          st:m.pl.alert.st,
                          code:m.pl.alert.addr.substring(0,4)
                        });

             newAlert.save(function (error, alert){
               console.log("new alert saved----",alert);
                 if (!error){
                   r.pl.alert = alert;
                   deferred.resolve(r);
                 }
                 else{
                   r.er = error;
                   r.em = 'invalid alert. already exist?';
                   deferred.reject(r);
                 }
             });
    }
    else {
      r.er =  "no alert or alert code provided";
      deferred.reject(r);
    }
  return deferred.promise;

}


plc.getPlcAlerts =  function(m) {
  console.log("plc module: getPlcAlerts FUNCTION",m.pl.which);
 var r = {pl: {}, status:false , er:''};
 var deferred = q.defer();
 var query = {};

 if(m.pl && m.pl.which){
   if(m.pl.which == "processed"){
     query.status = 1;
   }
   else  if(m.pl.which == "unprocessed"){
      query.status = 0;
  }
 }

  PlcAlert.find(query,function (err, resp) {
      if (err){
        r.er = err;
        r.status = false;
        deferred.reject(r);
      }
      else{
        r.pl.alerts = resp;
        r.status = true;
        deferred.resolve(r);
      }
  })
  return deferred.promise;
}




plc.getShipmentList =  function(m) {
  console.log("plc module: getShipmentList FUNCTION");
 var r = {pl: null, status:false , er:''};
 var deferred = q.defer();

 PlcAlert.find().$where('(this.status == 1) && ((this.atype == "余量报警")||(this.atype == "拉回报警")||(this.atype == "进场报警"))').exec(
   function (err, resp) {
       if (err){
         r.er = err;
         deferred.reject(r);
       }
       else{
         r.pl = {shipmentList:resp};
         r.status = true;
         deferred.resolve(r);
       }
   });
  return deferred.promise;
}

plc.updatePlcAlert =  function(m) {

    console.log(" update updatePlcAlert----");

    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();

    if(m.pl && m.pl.alert && m.pl.alert._id){

      PlcAlert.findOneAndUpdate({_id:m.pl.alert._id}, m.pl.alert, { new: true }, function(err, resp) {
                if (err){
                  r.er = err;
                  r.em = 'problem finding alert';
                  deferred.reject(r);
                }
                else{
                  if(resp){
                    r.pl.alert = resp;
                    deferred.resolve(r);
                  }else {
                    r.er =  "alert not found!..";
                    deferred.reject(r);
                  }
                }
      });
      }
      else {
        r.er =  "no alert or alert _id provided";
        deferred.reject(r);
      }
    return deferred.promise;
}

plc.downloadData = function(m){
  console.log(" downloadData----");

  var r = {pl:null , er:'',em:''};
  var deferred = q.defer();

    lib.procesDownload().then(function(res){
      console.log("file res----",res);
      r.pl = {file:res.path};
      deferred.resolve(r);
    });


    return deferred.promise;
}







module.exports = plc;
