
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

    // populating plcalerts

    // PlcAlert.find({},function(error, doc){
    //   if(doc&&doc.length){
    //       return;
    //  }else {
    //       // save sample to init it of not there.
    //       var pchain = [];
    //       for (var i = 0; i < alertsList.length; i++) {
    //              var message = {pl:{}};
    //              message.pl.alert =  alertsList[i];
    //              pchain.push(plc.addNewAlert(message));
    //       }
    //
    //       var result =  q();
    //       pchain.forEach(function (f) {
    //           result = result.then(f);
    //       });
    //
    //  }
    // });
    return q(r);
}

// plc.handleIncommingData =  function(m) {
//   // console.log("plc: handleIncommingData",m.pl);
//   var deferred = q.defer();
//
// var incommingData = m.pl;
//
//   if(incommingData){
//
//      var pchain = [];
//
//       for (var i = 0; i < 100; i++) {
//             //  console.log("loop----",i);
//              var dataToSave = _extractPlcData(incommingData,i);
//              if((dataToSave.cdct == '1970-1-1 0:0:0') || dataToSave.cdct == NaN){
//                break;
//              }
//              pchain.push(_saveIncommingData(dataToSave));
//       }
//
//       var result =  q();
//       var allResults = [];
//       pchain.forEach(function (f) {
//           result = result.then(f);
//           if(allResults.length === pchain.length){
//               deferred.resolve(allResults);
//           }
//
//       });
//
//     }
//     else {
//       r.er =  "empty data";
//       r.status = false
//       deferred.reject(r);
//     }
//   return deferred.promise;
//
// }




plc.handleIncommingData =  function(m) {
  // console.log("plc: handleIncommingData",m.pl);
  var deferred = q.defer();

  var incommingData = m.pl.data;

  if(incommingData){

     var pchain = [];

      for (var i = 0; i < 100; i++) {
            //  console.log("loop----",i);
             var dataToSave = _extractPlcData(incommingData,i);
            //  console.log("dataToSave-----",dataToSave);
             if(dataToSave.dct == '0-0-0 0:0:0' || dataToSave.dct == 'NaN' ||  (dataToSave.dct == '1970-1-1 0:0:0') ||  dataToSave.cdct == '0-0-0 0:0:0' || (dataToSave.cdct == '1970-1-1 0:0:0') || dataToSave.cdct == NaN){
               break;
             }


             if(m.pl.org){
               dataToSave.setOwner(m.pl.org, function(setErr, setDoc){
                      pchain.push(_saveIncommingData(setDoc));
               });
             }
             else{
               throw 'plc org not provided';
             }



      }

      var result =  q({length:pchain.length});
      pchain.forEach(function (f) {
          result = result.then(f);
      });

      return result;
    }
}


var _saveIncommingData =  function(m) {
  console.log("plc saveIncommingData");
  var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();
  if(m){
          m.save(function (err, plc) {
              if (err){
                r.er = err;
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
      r.er =  "empty plc data";
      deferred.reject(r);
    }
  return deferred.promise;

}


plc.getData =  function(m) {
  console.log("plc module: getData FUNCTION");
 var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();



  if(m && m.pl && m.pl.user && m.pl.user.oID){

    iPlc.find({oID:m.pl.user.oID},function (err, plc) {
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
  else{
    r.er = 'no org provided';
    r.status = false;
    deferred.reject(r);
  }

  return deferred.promise;
}

plc.getLatestData =  function(m) {

  console.log("plc module: getLatestData FUNCTION");
  var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();
  var length = m.pl.length||1;


  if(m && m.pl && m.pl.user && m.pl.user.oID){

    iPlc.find({oID:m.pl.user.oID}).sort({cd:-1}).limit(length).exec(function (err, plc) {
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
  else{
    r.er = 'no org provided';
    r.status = false;
    deferred.reject(r);
  }



  return deferred.promise;
}





plc.getAlertForTimeInterval =  function(m) {

  console.log("plc mod: getLatestDataForTimeInterval ");
  var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();
  var isc = [];
  var dates = [];


  if(m && m.pl && m.pl.user && m.pl.user.oID){

        iPlc.find({oID: m.pl.user.oID}).$where(
                function () {
                    return (Date.now() - this._id.getTimestamp() < (8 * 60 * 60 * 1000))

          }
        ).sort({cd:1}).exec(function (err, plc) {
            if (err){
              r.er = err;
              r.status = false;
              deferred.reject(r);
            }
            else{
              for (var i = 0; i < plc.length; i++) {
                  isc[i] = parseFloat(plc[i].isc2);  // return only instantaneous standard conditions
                  dates[i] = plc[i].cd;
              }
              r.pl.plc = {values:isc,dates:dates};
              r.status = true;
              deferred.resolve(r);
            }
        })
  }
  else{
    r.er = 'no org provided';
    r.status = false;
    deferred.reject(r);
  }

  return deferred.promise;
}


plc.getPlcStats = function(m){


    console.log("plc module: getPlcStats FUNCTION",m.pl);
    var r = {pl: {}, status:false , er:''};
    var deferred = q.defer();
    var computedValues = [];


    if(m && m.pl && m.pl.user && m.pl.user.oID){
          if(m && m.pl && m.pl.start && m.pl.end){

            var start = m.pl.start+' 00:00:00';
            var end = m.pl.end+' 23:59:59';

            if( m.pl.mode && m.pl.mode === 'day' ){

              iPlc.aggregate([
                  {
                        $match: {oID:m.pl.user.oID,cd:{$gte:start,$lte:end}}
                  },
                  {
                      $group: {
                          _id:"$d",
                          maxVal:{ $max: "$psc2" },
                          date:{$max:"$cd"},
                          count: {$sum: 1}
                      }
                  }
              ]).sort({date:1}).exec(function (err, plc) {

                      console.log("got group plc>>>>>>>---",plc);
                  if (err){
                    r.er = err;
                    r.status = false;
                    deferred.reject(r);
                  }
                  else{
                    if(plc && plc.length){

                      var previousDate = lib.getPreviousMonthDate(m.pl.start)+' 00:00:00'; // shift back one month
                      iPlc.find({oID:m.pl.user.oID,cd:{$gte:previousDate,$lt:start}}).sort({cd:-1}).limit(1).exec(function (err2, plc2) {

                              console.log("got previous plc",plc2);
                          if (err2){
                            r.er = err2;
                            r.status = false;
                            deferred.reject(r);
                          }
                          else{
                            if(plc2.length){
                                plc[0].usage  =  plc[0].maxVal-plc2[0].psc2;
                            }
                            else{
                                // plc[0].usage  =  plc[0].maxVal;
                                plc[0].usage  = null;
                            }

                              plc[0].date = plc[0].date.slice(0,10);

                            for (var i = 1; i < plc.length; i++) {
                              plc[i].usage = plc[i].maxVal - plc[i-1].maxVal;
                              plc[i].date = plc[i].date.slice(0,10);
                            }

                            if(!plc[0].usage){
                              plc.shift(); //remove first element;
                            }

                            r.pl.plc = plc;
                            r.status = true;
                            deferred.resolve(r);
                          }
                      })

                    }else{
                      r.pl.plc = [];
                      r.status = false;
                      deferred.resolve(r);
                    }
                  }
              });

            }
            else{

              var startMonth = m.pl.start.slice(0,8)+'01 00:00:00';
              var endMonth = m.pl.end.slice(0,8)+'31 23:59:59';  //31th will cover all cases(even february) since it's string comparison

              iPlc.aggregate([
                  {
                      $match: {oID:m.pl.user.oID,cd:{$gte:startMonth,$lte:endMonth}}
                  },
                  {
                      $group: {
                          _id:"$m",
                          maxVal:{ $max: "$psc2" },
                          date:{$max:"$cd"},
                          count: {$sum: 1}
                      }
                  }
              ]).sort({date:1}).exec(function (err, plc) {
                // console.log("got group plc",plc);
                  if (err){
                    r.er = err;
                    r.status = false;
                    deferred.reject(r);
                  }
                  else{

                    if(plc && plc.length){

                      var previousDate = lib.getPreviousMonthDate(m.pl.start)+' 00:00:00'; // shift back one month
                      iPlc.find({oID:m.pl.user.oID,cd:{$gte:previousDate,$lt:start}}).sort({cd:-1}).limit(1).exec(function (err2, plc2) {

                          // console.log("got previous plc",plc2);
                          if (err2){
                            r.er = err2;
                            r.status = false;
                            deferred.reject(r);
                          }
                          else{
                            if(plc2.length){
                                plc[0].usage  =  plc[0].maxVal-plc2[0].psc2;
                            }
                            else{
                                // plc[0].usage  =  plc[0].maxVal;
                                plc[0].usage  = null;
                            }

                            plc[0].date = plc[0].date.slice(0,7);

                            for (var i = 1; i < plc.length; i++) {
                              plc[i].usage = plc[i].maxVal - plc[i-1].maxVal;
                              plc[i].date = plc[i].date.slice(0,7);
                            }

                            if(!plc[0].usage){
                              plc.shift(); //remove first element;
                            }
                            r.pl.plc = plc;
                            r.status = true;
                            deferred.resolve(r);
                          }
                      })
                    }else {
                      r.pl.plc = [];
                      r.status = false;
                      deferred.resolve(r);
                    }

                  }
              });

            }
          }
          else{
              r.er = "no start or end date provided";
              r.status = false;
              deferred.reject(r);
          }

    }
    else{
      r.er = 'no org provided';
      r.status = false;
      deferred.reject(r);
    }

    return deferred.promise;

}




plc.getInstantaniousPlcData = function(m){


    console.log("plc module: getInstantaniousPlcData FUNCTION",m.pl);
    var r = {pl: {}, status:false , er:''};
    var deferred = q.defer();


    if(m && m.pl && m.pl.user && m.pl.user.oID){
          if(m && m.pl && m.pl.start && m.pl.end){

            var start = m.pl.start+' 00:00:00';
            var end = m.pl.end+' 23:59:59';

              iPlc.find({oID:m.pl.user.oID,cd:{$gte:start,$lte:end}}).sort({date:1}).exec(function (err, plc) {

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
              });


          }
          else{
              r.er = "no start or end date provided";
              r.status = false;
              deferred.reject(r);
          }

    }
    else{
      r.er = 'no org provided';
      r.status = false;
      deferred.reject(r);
    }

    return deferred.promise;

}


plc.getAddress =  function(m) {
  console.log("plc module: getData FUNCTION");
 var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();

  if(m && m.pl && m.pl.user && m.pl.user.oID){

    Address.find({oID:m.pl.user.oID},function (err, address) {
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
  }
  else{
    r.er = 'no org provided';
    r.status = false;
    deferred.reject(r);
  }


  return deferred.promise;
}


plc.addNewAddress =  function(m) {

    console.log("add new address----");

    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();


    if(m.pl && m.pl.address && m.pl.address.addr && m.pl.user){
        var newAddress = new Address({
                          cd:lib.dateTime(),
                          code:m.pl.address.code,
                          addr:m.pl.address.addr,
                          cn:m.pl.address.cn,
                          at:m.pl.address.at,
                          plcaddr1:m.pl.address.plcaddr1,
                          plcaddr2:m.pl.address.plcaddr2
                          });

            newAddress.setOwner(m.pl.user,function(err,doc){
                if(!err){
                  doc.save(function (error, address){
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
                else{
                  r.er = err;
                  r.em = 'update before save';
                  deferred.reject(r);
                }

            })


      }
      else {
        r.er =  "no address or address code or user provided";
        deferred.reject(r);
      }
    return deferred.promise;
}

plc.updateAddress =  function(m) {

    console.log(" update address----");

    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();



      if(m && m.pl && m.pl.user && m.pl.user.oID){

        if(m.pl && m.pl.address){

          Address.findOneAndUpdate({_id:m.pl.address._id,oID:m.pl.user.oID}, m.pl.address, { new: true }, function(err, address) {
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
      }
      else{
        r.er = 'no org provided';
        r.status = false;
        deferred.reject(r);
      }

    return deferred.promise;
}

plc.addNewAlert = function(m){

  console.log("add new alert----",m.pl.alert);

  var r = {pl: {}, er:'',em:''};
  var deferred = q.defer();


  if(m && m.pl && m.pl.user && m.pl.user.oID){
    if(m.pl.alert){
        var newAlert = new PlcAlert({
                            atime:lib.dateTime(),
                            atype:m.pl.alert.atype,
                            tank:m.pl.alert.addr,
                            am:m.pl.alert.am,
                            rt:m.pl.alert.remainingTime,
                            st:m.pl.alert.st
                          });

              newAlert.setOwner(m.pl.user, function(setErr,setDoc){
                setDoc.save(function (error, alert){
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
              });

      }
      else {
        r.er =  "no alert or alert code provided";
        deferred.reject(r);
      }
  }
  else{
    r.er = 'no org provided';
    r.status = false;
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

 if(m && m.pl && m.pl.user && m.pl.user.oID){

    query.oID = m.pl.user.oID;
     PlcAlert.find(query).sort({atime:-1}).exec(function (err, resp) {
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


 }
 else{
   r.er = 'no org provided';
   r.status = false;
   deferred.reject(r);
 }

  return deferred.promise;
}




plc.getShipmentList =  function(m) {
  console.log("plc module: getShipmentList FUNCTION");
 var r = {pl: null, status:false , er:''};
 var deferred = q.defer();



 if(m && m.pl && m.pl.user && m.pl.user.oID){

     PlcAlert.find({oID:m.pl.user.oID}).$where('(this.status == 1) && ((this.atype == "余量报警")||(this.atype == "拉回报警")||(this.atype == "进场报警"))').exec(
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


 }
 else{
   r.er = 'no org provided';
   r.status = false;
   deferred.reject(r);
 }

  return deferred.promise;
}

plc.updatePlcAlert =  function(m) {

    console.log(" update updatePlcAlert----");

    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();


    if(m && m.pl && m.pl.user && m.pl.user.oID){

          if(m.pl && m.pl.data && m.pl.data._id){

            PlcAlert.findOneAndUpdate({_id:m.pl.data._id,oID:m.pl.user.oID}, m.pl.data, { new: true }, function(err, resp) {
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


    }
    else{
      r.er = 'no org provided';
      r.status = false;
      deferred.reject(r);
    }

    return deferred.promise;
}

plc.downloadData = function(m){
  console.log(" downloadData----");

  var r = {pl:null , er:'',em:''};
  var deferred = q.defer();

    if(m && m.pl && m.pl.user){

          lib.procesDownload().then(function(res){
            console.log("file res----",res);
            r.pl = {file:res.path};
            deferred.resolve(r);
          });
    }
    else{
      r.er = 'no user/org provided';
      r.status = false;
      deferred.reject(r);
    }

    return deferred.promise;
}




plc.downloadStats = function(m){
  console.log(" downloadStats----");

  var r = {pl:null , er:'',em:''};
  var deferred = q.defer();

    if(m && m.pl && m.pl.data){

          lib.procesDownloadStats(m.pl.data).then(function(res){
            console.log("file res----",res);
            r.pl = {file:res.path};
            deferred.resolve(r);
          });
    }
    else{
      r.er = 'no data provided';
      r.status = false;
      deferred.reject(r);
    }

    return deferred.promise;
}


plc.downloadInstantPlcData = function(m){
  console.log(" downloadStats----");

  var r = {pl:null , er:'',em:''};
  var deferred = q.defer();

    if(m && m.pl && m.pl.data){

          lib.procesDownloadInstantPlc(m.pl.data).then(function(res){
            console.log("file res----",res);
            r.pl = {file:res.path};
            deferred.resolve(r);
          });
    }
    else{
      r.er = 'no data provided';
      r.status = false;
      deferred.reject(r);
    }

    return deferred.promise;
}

var _extractPlcData = function(data,index){

  var i = index?index:0;
  var shift = i*76;
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
     var cyear = data.slice(12+shift,14+shift);
     var cmonth = data.slice(14+shift,15+shift);
     var cday = data.slice(15+shift,16+shift);
     var cweekday = data.slice(16+shift,17+shift);
     var chour = data.slice(17+shift,18+shift);
     var cminute = data.slice(18+shift,19+shift);
     var csecond = data.slice(19+shift,20+shift);
     var cnanosecond = data.slice(20+shift,24+shift); //not needed

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



  var addr1 = data.slice(24+shift,26+shift);
  var instantaneousWorkingCond1 = data.slice(26+shift,30+shift);
  var instantaneousStandardCond1 = data.slice(30+shift,34+shift);
  var pressure1 = data.slice(34+shift,38+shift);
  var temp1 = data.slice(38+shift,42+shift);
  var positiveWorkingCond1  = data.slice(42+shift,46+shift);
  var positiveStandardCond1  = data.slice(46+shift,50+shift);
  var reverseStandardCond1  = data.slice(50+shift,54+shift);
  var comminucationFailure1 = data.slice(54+shift,55+shift);
  var errorReport1 = data.slice(55+shift,56+shift);

  var addr2 = data.slice(56+shift,58+shift);
  var instantaneousWorkingCond2 = data.slice(58+shift,62+shift);
  var instantaneousStandardCond2 = data.slice(62+shift,66+shift);
  var pressure2 = data.slice(66+shift,70+shift);
  var temp2 = data.slice(70+shift,74+shift);
  var positiveWorkingCond2  = data.slice(74+shift,78+shift);
  var positiveStandardCond2  = data.slice(78+shift,82+shift);
  var reverseStandardCond2  = data.slice(82+shift,86+shift);
  var comminucationFailure2 = data.slice(86+shift,87+shift);
  var errorReport2 = data.slice(87+shift,88+shift);

  var d = new Date();

  var result = new iPlc({
                         cd:lib.dateTime(),
                         y:d.getFullYear(),
                         m:d.getMonth()+1,
                         d:d.getDate(),
                         dct:date, //data collection time
                         cdct:chanelDate, //chanel data collection time
                         addr1:parseInt(addr1.toString('hex'), 16),
                         iwc1:lib.getPlcFloat(instantaneousWorkingCond1.toString('hex')),// instantaneous working conditions 1
                         isc1:lib.getPlcFloat(instantaneousStandardCond1.toString('hex'),true),//instantaneous standard conditions 1
                         p1:lib.getPlcFloat(pressure1.toString('hex')),// pressure 1
                         temp1:lib.getPlcFloat(temp1.toString('hex')),//temperature 1
                         pwc1:lib.getPlcFloat(positiveWorkingCond1.toString('hex')),// positive working conditions 1
                         psc1:lib.getPlcFloat(positiveStandardCond1.toString('hex')),// positive standard conditions 1
                         rsc1:lib.getPlcFloat(reverseStandardCond1.toString('hex')),// reverse standard conditions 1
                         cf1:parseInt(comminucationFailure1.toString('hex'), 16),//communication failure 1
                         er1:parseInt(errorReport1.toString('hex'), 16),// error report 1
                         addr2:parseInt(addr2.toString('hex'), 16),
                         iwc2:lib.getPlcFloat(instantaneousWorkingCond2.toString('hex')),// instantaneous working conditions 2
                         isc2:lib.getPlcFloat(instantaneousStandardCond2.toString('hex')),//instantaneous standard conditions 2
                         p2:lib.getPlcFloat(pressure2.toString('hex')),// pressure 2
                         temp2:lib.getPlcFloat(temp2.toString('hex')),//temperature 2
                         pwc2:lib.getPlcFloat(positiveWorkingCond2.toString('hex')),// positive working conditions 2
                         psc2:lib.getPlcFloat(positiveStandardCond2.toString('hex')),// positive standard conditions 2
                         rsc2:lib.getPlcFloat(reverseStandardCond2.toString('hex')),// reverse standard conditions 2
                         cf2:parseInt(comminucationFailure2.toString('hex'), 16),//communication failure 2
                         er2:parseInt(errorReport2.toString('hex'), 16),// error report 2
                         tank:''
                      });

  // console.log("extracted plc data result----",result);

  return result;
}










module.exports = plc;
