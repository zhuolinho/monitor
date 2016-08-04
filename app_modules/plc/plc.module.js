
'use strict';

var mongoose = null ; //mongoose object
var message = null;   // message function
var plc = {};


var q = require('q');
var PlcAlert = require('../../models/plc-alert');
var iPlc = require('../../models/iplc');  //incomming plc data
var Address = require('../../models/plc-address');
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

      var plcData = _extractPlcData(incommingData);

      console.log("saving plc-------", plcData);

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


plc.getData =  function(m) {
  console.log("plc module: getData FUNCTION");
 var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();

  iPlc.find(function (err, plc) {
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


plc.getAddress =  function(m) {
  console.log("plc module: getData FUNCTION");
 var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();

  Address.find(function (err, address) {
      if (err){
        r.er = err;
        r.status = false;
        deferred.reject(r);
      }
      else{
        r.pl.address = address;
        r.status = true;
        deferred.resolve(r);
      }
  })
  return deferred.promise;
}


plc.addNewAddress =  function(m) {

    console.log("add new address----");

    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();


    if(m.pl && m.pl.address && m.pl.address.addr){
        var newAddress = new Address({
                          code:m.pl.address.code,
                          addr:m.pl.address.addr,
                          cn:m.pl.address.cn,
                          at:m.pl.address.at,
                          plcaddr1:m.pl.address.plcaddr1,
                          plcaddr2:m.pl.address.plcaddr2
                          });

               newAddress.save(function (error, address){
                   if (!error){
                     r.pl.address = address;
                     deferred.resolve(r);
                   }
                   else{
                     r.er = error;
                     r.em = 'could not save. already exist?';
                     deferred.reject(r);
                   }
               });
      }
      else {
        r.er =  "no address or address code provided";
        deferred.reject(r);
      }
    return deferred.promise;
}

plc.updateAddress =  function(m) {

    console.log(" update address----");

    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();

    if(m.pl && m.pl.address){

      Address.findOneAndUpdate({_id:m.pl.address._id}, m.pl.address, { new: true }, function(err, address) {
                if (err){
                  r.er = err;
                  r.em = 'problem finding address';
                  deferred.reject(r);
                }
                else{
                  r.pl.address = address;
                  deferred.resolve(r);
                }
      });
      }
      else {
        r.er =  "no address or address code provided";
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





var _extractPlcData = function(data){



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




     //依次是   year（2字节）
     // month（1字节）
     // day（1字节）
     // weekday（1字节）
     // hour（1字节）
     // minute（1字节）
     // second（1字节）
     // nanosecond（4字节）

     var chanelDate = '';
     var cyear = data.slice(12,14);
     var cmonth = data.slice(14,15);
     var cday = data.slice(15,16);
     var cweekday = data.slice(16,17);
     var chour = data.slice(17,18);
     var cminute = data.slice(18,19);
     var csecond = data.slice(19,20);
     var cnanosecond = data.slice(20,24); //not needed

     //var strYear = year.toString('hex')
     //parseInt(strYear, 16);
 //not needed
     chanelDate = parseInt(cyear.toString('hex'), 16) +"-"+
            parseInt(cmonth.toString('hex'), 16) +"-"+
            parseInt(cday.toString('hex'), 16) +" "+
            parseInt(chour.toString('hex'), 16) +":"+
            parseInt(cminute.toString('hex'), 16) +":"+
            parseInt(csecond.toString('hex'), 16);

  //数据	64 bits
  //表1站地址	2
  //表1瞬时工况	4
  // 表1瞬时标况	4
  // 表1压力	4
  // 表1温度	4
  // 表1正工况累计	4
  // 表1正标况累计	4
  // 表1逆标况累计	4
  // 表1通讯故障	1
  // 表1错误情报	1
  // 表2站地址	2
  // 表2瞬时工况	4
  // 表2瞬时标况	4
  // 表2压力	4
  // 表2温度	4
  // 表2正工况累计	4
  // 表2正标况累计	4
  // 表2逆标况累计	4
  // 表2通讯故障	1
  // 表2错误情报	1





  var addr1 = data.slice(24,26);
  var instantaneousWorkingCond1 = data.slice(26,30);
  var instantaneousStandardCond1 = data.slice(30,34);
  var pressure1 = data.slice(34,38);
  var temp1 = data.slice(38,42);
  var positiveWorkingCond1  = data.slice(42,46);
  var positiveStandardCond1  = data.slice(46,50);
  var reverseStandardCond1  = data.slice(50,54);
  var comminucationFailure1 = data.slice(54,55);
  var errorReport1 = data.slice(55,56);


  var addr2 = data.slice(56,58);
  var instantaneousWorkingCond2 = data.slice(58,62);
  var instantaneousStandardCond2 = data.slice(62,66);
  var pressure2 = data.slice(66,70);
  var temp2 = data.slice(70,74);
  var positiveWorkingCond2  = data.slice(74,78);
  var positiveStandardCond2  = data.slice(78,82);
  var reverseStandardCond2  = data.slice(82,86);
  var comminucationFailure2 = data.slice(86,87);
  var errorReport2 = data.slice(87,88);




 var result = new iPlc({
                         rawd:data,  //raw data
                         dct:date, //data collection time
                         cdct:chanelDate, //chanel data collection time
                         addr1:parseInt(addr1.toString('hex'), 16),
                         iwc1:parseInt(instantaneousWorkingCond1.toString('hex'), 16),// instantaneous working conditions 1
                         isc1:parseInt(instantaneousStandardCond1.toString('hex'), 16),//instantaneous standard conditions 1
                         p1:parseInt(pressure1.toString('hex'), 16),// pressure 1
                         temp1:parseInt(temp1.toString('hex'), 16),//temperature 1
                         pwc1:parseInt(positiveWorkingCond1.toString('hex'), 16),// positive working conditions 1
                         psc1:parseInt(positiveStandardCond1.toString('hex'), 16),// positive standard conditions 1
                         rsc1:parseInt(reverseStandardCond1.toString('hex'), 16),// reverse standard conditions 1
                         cf1:parseInt(comminucationFailure1.toString('hex'), 16),//communication failure 1
                         er1:parseInt(errorReport1.toString('hex'), 16),// error report 1
                         addr2:parseInt(addr2.toString('hex'), 16),
                         iwc2:parseInt(instantaneousWorkingCond2.toString('hex'), 16),// instantaneous working conditions 2
                         isc2:parseInt(instantaneousStandardCond2.toString('hex'), 16),//instantaneous standard conditions 2
                         p2:parseInt(pressure2.toString('hex'), 16),// pressure 2
                         temp2:parseInt(temp2.toString('hex'), 16),//temperature 2
                         pwc2:parseInt(positiveWorkingCond2.toString('hex'), 16),// positive working conditions 2
                         psc2:parseInt(positiveStandardCond2.toString('hex'), 16),// positive standard conditions 2
                         rsc2:parseInt(reverseStandardCond2.toString('hex'), 16),// reverse standard conditions 2
                         cf2:parseInt(comminucationFailure2.toString('hex'), 16),//communication failure 2
                         er2:parseInt(errorReport2.toString('hex'), 16),// error report 2
                         tank:''
                      });

  console.log("extracted plc data result----",result);

  return result;
}










module.exports = plc;
