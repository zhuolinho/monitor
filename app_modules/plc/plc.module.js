
'use strict';

var mongoose = null ; //mongoose object
var _ = require('lodash');
var message = null;   // message function
var plc = {};
var moment = require('moment');
moment().format();

var q = require('q');
var PlcAlert = require('../../models/plc-alert');
var iPlc = require('../../models/iplc');  //incomming plc data
var Address = require('../../models/plc-address');
// var PlcFormula = require('../../models/plc-formula');
var User   = require('../../models/user');
var Tank   = require('../../models/tank');
var PlcFormula   = require('../../models/plc-formula');
var plcConfig = require('../../configs/plc');
var lib = require('../../lib/lib');


var alertsList =[
              {
                addr:'C002-闸北区大宁路335号XX站',
                id:'6112',
                atype:'余量警报',
                remainingTime:'2小时02分',
                upTime:'15.5.3-13:02/----',
                processed:false,
                atime:'5.5.3-13:02',
                am:'6%/12kg/hps',
                processedAgent:'234'
              },
              {
                addr:'C009-闸北区大宁路335号XX站',
                id:'9832',
                atype:'泄漏警报',
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



plc.handleIncommingData =  function(m) {
  console.log("plc: handleIncommingData");
  var r = {pl: {alerts:null}, status:true , er:''};
  var latestIncommingData = null; //define these variable so we know what is in the redis server
  var latestInteruptedChanels = null;
  var latestFormula = null;
  var lastestRemainingAmountAlerts = null;


  if (m.pl.org){


   var deferred = q.defer();

   var newAlerts = [];

   var incommingData = m.pl.data;

   if(incommingData){
      var extractDataPchain = [];
      var pchain = [];
      var pipeline = m.redisClient.pipeline();
      pipeline.get("lastestPlc");
      pipeline.get("lastestFormula");
      pipeline.get("lastestInterupts");
      pipeline.get("lastestRemainingAmountAlerts");
      pipeline.exec(function (err, results) {
          // console.log("redis client data ------", JSON.parse(results[0][1]));

          var temp1 = {};
          temp1[m.pl.org.oID] = {};
          latestIncommingData = JSON.parse(results[0][1])||temp1;

          var temp2 = {};
          temp2[m.pl.org.oID] = {};
          latestFormula = JSON.parse(results[1][1])||temp2;

          var temp3 = {};
          temp3[m.pl.org.oID] = {};
          latestInteruptedChanels = JSON.parse(results[2][1])||temp3;

          var temp4 = {};
          temp4[m.pl.org.oID] = {};
          lastestRemainingAmountAlerts = JSON.parse(results[3][1])||temp4;


          for (var i = 0; i < 100; i++) {

                (function(i){ //closure to keep context
                      extractDataPchain.push(
                        _extractPlcData(incommingData,i,m.pl.org.oID,latestIncommingData,latestFormula,lastestRemainingAmountAlerts,m.redisClient).then(function(resp){
                       var dataToSave = resp.data;

                      // console.log("--resp-->>>---",resp);
                      if(!(dataToSave.dct == '0-0-0 0:0:0' || dataToSave.dct == 'NaN' ||  (dataToSave.dct == '2') ||  dataToSave.cdct == '0-0-0 0:0:0' || (dataToSave.cdct == '1970-1-1 0:0:0') || dataToSave.cdct == NaN)){

                        var chanelCheck =  _checkChanelInterruption(dataToSave,m.pl.org.oID, latestIncommingData,latestInteruptedChanels);

                        m.redisClient.set("lastestPlc", JSON.stringify(chanelCheck.latestIncommingData));  //save updated data
                        m.redisClient.set("lastestInterupts", JSON.stringify(chanelCheck.latestInteruptedChanels)); //save updated data


                        if (resp.alert){  //TODO the cng alerts are not being added. should first uncomment the conresponding section on extractCngData function after formula confirmation.
                            newAlerts.push(resp.alert);
                        }

                        if (chanelCheck.createAlert){
                            var alert = {
                                  am:'信号中断',
                                  atype:'信号中断',
                                  tank:dataToSave.tank
                            }
                            newAlerts.push(alert);
                        }
                        else if (chanelCheck.save){
                              dataToSave.setOwner(m.pl.org, function(setErr, setDoc){
                                     pchain.push(_saveIncommingData(setDoc));
                              });
                        }

                      }

                    // console.log("loop----",i);

                   })
                 );
           })(i);

          }

           q.all(extractDataPchain).then(function(){
            // console.log("mass extraced data done------",extractResponse);

              var result =  q({length:pchain.length});
              pchain.forEach(function (f) {
                  result = result.then(f);
              });

              r.pl.alerts = newAlerts;
              deferred.resolve(r);

          });

      });
       // return result;
       return deferred.promise;
     }
  }
  else{
    throw 'plc org not provided';
  }

}


var _saveIncommingData =  function(m) {
  // console.log("plc saveIncommingData");
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

  if(m && m.pl && m.pl.user && m.pl.user.oID) {
    iPlc.find({oID:m.pl.user.oID,cd:{$gt:lib.deductTimeFromDate(plcConfig.sTimer+2*60*1000)}})
    .sort({cd:-1}).limit(length).exec(function (err, plc) {
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
  } else {
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
  var instantaneousValues1 = [];
  var instantaneousValues2 = [];
  var dates = [];


  if(m && m.pl && m.pl.user && m.pl.user.oID && m.pl.tank) {

    var flow1 = '';
    var flow2 = '';
    var dateNow = lib.dateTime();
    var todayZeroHour = dateNow.split(' ')[0]+' 00:00:00';

      iPlc.find({oID:m.pl.user.oID,})

        if (m.pl.tank[0] =='G'){
              flow1 = 'isc1';
              flow2 = 'isc2';
        }
        else{
              flow1 = 'instfow';
              flow2 = 'instfow0';
        }

        iPlc.find({oID: m.pl.user.oID,tank:m.pl.tank,cd:{$gte:todayZeroHour}})
        .sort({cd:1}).exec(function (err, plc) {
            if (err){
              r.er = err;
              r.status = false;
              deferred.reject(r);
            }
            else{
              for (var i = 0; i < plc.length; i++) {
                  instantaneousValues1[i] = parseFloat(plc[i][flow1]) // return only instantaneous data
                  instantaneousValues2[i] = parseFloat(plc[i][flow2]) // return only instantaneous data
                  dates[i] = plc[i].cd;
              }
              r.pl.plc = {values:instantaneousValues1, values2: instantaneousValues2,dates:dates};
              r.status = true;
              deferred.resolve(r);
            }
        })
  }
  else{
    r.er = 'no org or tank provided';
    r.status = false;
    deferred.reject(r);
  }

  return deferred.promise;
}


plc.getPlcStats = function(m) {
    console.log("plc module: getPlcStats FUNCTION");
    var r = {pl: {}, status:false , er:''};
    var deferred = q.defer();
    var computedValues = [];


    if(m && m.pl && m.pl.user && m.pl.user.oID){
          if(m && m.pl && m.pl.start && m.pl.end && m.pl.tank){

            var start = m.pl.start+' 00:00:00';
            var end = m.pl.end+' 23:59:59';
            var flow1 = '';
            var flow2 = '';

            if (m.pl.tank[0] == 'G'){
                  flow1 = 'psc1';
                  flow2 = 'psc2';
            }
            else{
                  flow1 = 'cumfow0';
                  flow2 = 'cumfow';
            }

            if( m.pl.mode && m.pl.mode === 'day' ){

              iPlc.aggregate([
                  {
                        $match: {oID:m.pl.user.oID,tank:m.pl.tank,cd:{$gte:start,$lte:end}}
                  },
                  {
                      $group: {
                          _id:"$d",
                          maxVal1:{ $max: "$"+flow1 },
                          maxVal2:{ $max: "$"+flow2 },
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

                              console.log("got previous plc------",plc2);
                          if (err2){
                            r.er = err2;
                            r.status = false;
                            deferred.reject(r);
                          }
                          else{
                            if(plc2.length) {
                                plc[0].usage1  =  Math.abs(parseInt(plc[0].maxVal1-plc2[0][flow1], 10));
                                plc[0].usage2  =  Math.abs(parseInt(plc[0].maxVal2-plc2[0][flow2], 10));
                            } else{
                                // plc[0].usage  =  plc[0].maxVal;
                                plc[0].usage1  = null;
                                plc[0].usage2  = null;
                            }

                              plc[0].date = plc[0].date.slice(0,10);

                            for (var i = 1; i < plc.length; i++) {
                              plc[i].usage1 = Math.abs(parseInt(plc[i].maxVal1 - plc[i-1].maxVal1, 10));
                              plc[i].usage2 = Math.abs(parseInt(plc[i].maxVal2 - plc[i-1].maxVal2, 10));
                              plc[i].date = plc[i].date.slice(0, 10);
                            }

                            r.pl.plc = plc;
                            r.status = true;
                            deferred.resolve(r);
                          }
                      })

                    } else {
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
                      $match: {oID:m.pl.user.oID,tank:m.pl.tank,cd:{$gte:startMonth,$lte:endMonth}}
                  },
                  {
                      $group: {
                          _id:"$d",
                          maxVal1:{ $max: "$"+flow1 },
                          maxVal2:{ $max: "$"+flow2 },
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
                                plc[0].usage1  =  Math.abs(parseFloat(plc[0].maxVal1-plc2[0][flow1]));
                                plc[0].usage2  =  Math.abs(parseFloat(plc[0].maxVal2-plc2[0][flow2]));
                            }
                            else{
                                // plc[0].usage  =  plc[0].maxVal;
                                plc[0].usage1  = null;
                                plc[0].usage2  = null;
                            }

                            plc[0].date = plc[0].date.slice(0,7);

                            for (var i = 1; i < plc.length; i++) {
                              plc[i].usage1 = Math.abs(parseFloat(plc[i].maxVal1 - plc[i-1].maxVal1));
                              plc[i].usage2 = Math.abs(parseFloat(plc[i].maxVal2 - plc[i-1].maxVal2));
                              plc[i].date = plc[i].date.slice(0,7);
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
              r.er = "no start, end date or tank provided";
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




plc.getAllPlcStats = function(m) {
    console.log("plc module: getPlcAllStats FUNCTION");
    var r = {pl: {}, status:false , er:''};
    var deferred = q.defer();
    var computedValues = [];
    var previousDate = lib.getPreviousDayDate() + ' 23:59:59';

    if(m && m.pl && m.pl.user && m.pl.user.oID) {
      iPlc.aggregate([
          {
            $match: {
              oID:m.pl.user.oID,
              // oID: "10000000001",
              cd:{$gt: previousDate}
            }
          },
          {
            $group: {
                _id:"$tank",
                doc: { $push: "$$ROOT" },
                cumfowMaxVal1:{ $max: "$cumfow"},
                cumfowMaxVal2:{ $max: "$cumfow0"},
                pscMaxVal1:{ $max: "$psc1"},
                pscMaxVal2:{ $max: "$psc2"},
                cumfowMinVal1:{ $min: "$cumfow"},
                cumfowMinVal2:{ $min: "$cumfow0"},
                pscMinVal1:{ $min: "$psc1"},
                pscMinVal2:{ $min: "$psc2"},
                count: {$sum: 1}
            }
          }
          ,{
            $project: {
              maxVal1: {
                $let: {
                  vars: {
                    plcFlow: {
                      $cond: [{$eq:['$cumfowMaxVal1', null]} ,'$pscMaxVal1', '$cumfowMaxVal1']
                    }
                  },
                  in: {$max: '$$plcFlow'}
                }
              },

              maxVal2: {
                $let: {
                  vars: {
                    plcFlow: {
                      $cond: [{$eq:['$cumfowMaxVal2', null]} ,'$pscMaxVal2', '$cumfowMaxVal2']
                    }
                  },
                  in: {$max: '$$plcFlow'}
                }
              },
              minVal1: {
                $let: {
                  vars: {
                    plcFlow: {
                      $cond: [{$eq:['$cumfowMinVal1', null]} ,'$pscMinVal1', '$cumfowMinVal1']
                    }
                  },
                  in: {$max: '$$plcFlow'}
                }
              },

              minVal2: {
                $let: {
                  vars: {
                    plcFlow: {
                      $cond: [{$eq:['$cumfowMinVal2', null]} ,'$pscMinVal2', '$cumfowMinVal2']
                    }
                  },
                  in: {$max: '$$plcFlow'}
                }
              },
              tank: '$_id',
              '_id': 0
            }
          }
      ]).sort({date:1})
        .allowDiskUse(true)
        .exec(function (err, plc) {
          if (err){
            r.er = err;
            r.status = false;
            deferred.reject(r);
          } else {
            for (var i = 0; i < plc.length; i++) {
              plc[i].maxVal1 = Math.abs(parseInt(plc[i].maxVal1));
              plc[i].maxVal2 = Math.abs(parseInt(plc[i].maxVal2));
              plc[i].minVal1 = Math.abs(parseInt(plc[i].minVal1));
              plc[i].minVal2 = Math.abs(parseInt(plc[i].minVal2));

              plc[i].usage1 = plc[i].maxVal1 - plc[i].minVal1;
              plc[i].usage2 = plc[i].maxVal2 - plc[i].minVal2;
              delete plc[i].minVal1;
              delete plc[i].minVal2;
            }

            r.pl.plc = plc;
            r.status = true;
            deferred.resolve(r);
          }
      });

  } else {
    r.er = 'no org provided';
    r.status = false;
    deferred.reject(r);
  }

  return deferred.promise;

}




plc.getInstantaniousPlcData = function(m){ // for download


    console.log("plc module: getInstantaniousPlcData FUNCTION",m.pl);
    var r = {pl: {}, status:false , er:''};
    var deferred = q.defer();


    if(m && m.pl && m.pl.user && m.pl.user.oID){
          if(m && m.pl && m.pl.start && m.pl.end){

            var start = m.pl.start+' 00:00:00';
            var end = m.pl.end+' 23:59:59';

              iPlc.find({oID:m.pl.user.oID,tank:m.pl.tank,cd:{$gte:start,$lte:end}}).sort({date:1}).exec(function (err, plc) {

                console.log("getting instantaneous plc for downlaod-------",m.pl.tank);

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

  if(m && m.pl && m.pl.user && m.pl.user.oID) {

    Address.find({oID: m.pl.user.oID}).sort({cd:-1}).exec(function (err, address) {
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





plc.getFormula =  function(m) {
  console.log("plc module: getFormula FUNCTION");
 var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();

  if(m && m.pl && m.pl.user && m.pl.user.oID){

    PlcFormula.find({oID:m.pl.user.oID}).sort({cd:-1}).exec(function (err, resp) {
        if (err){
          r.er = err;
          r.status = false;
          deferred.reject(r);
        }
        else{
          r.pl.formula = resp;
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
                          plcip1:m.pl.address.plcip1,
                          plcip2:m.pl.address.plcip2,
                          tank:m.pl.address.tank
                          });

            newAddress.setOwner(m.pl.user,function(err,doc){
                if(!err){
                  doc.save(function (serr, address){
                      if (!serr){
                        r.pl.address = address;
                        deferred.resolve(r);
                      }
                      else{
                        r.er = JSON.stringify(serr);
                        r.em = 'could not save. already exist?';
                        deferred.reject(r);
                      }
                  });
                }
                else{
                  r.er = err;
                  r.em = 'set owner failled';
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






var _addNewFormula =  function(user,tank) {

    console.log("add new formula----");

    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();


    if(user&&tank){
      var newFormula = new PlcFormula({
                        cd:lib.dateTime(),
                        code:tank.slice(1),
                        tank:tank,
                        tankType:plcConfig.plcTypeByPrefix[tank[0]]
                        });


          console.log("newFormula------",newFormula);

          newFormula.setOwner(user,function(err,doc){
              if(!err){
                doc.save(function (serr, formula){
                    if (!serr){
                      r.pl.formula = formula;
                      deferred.resolve(r);
                    }
                    else{
                      r.er = JSON.stringify(serr);
                      r.em = 'could not save. already exist?';
                      deferred.reject(r);
                    }
                });
              }
              else{
                r.er = err;
                r.em = 'set owner failled';
                deferred.reject(r);
              }

          })



      }
      else {
        r.er =  "no user or tank provided";
        deferred.reject(r);
      }
    return deferred.promise;
}

plc.updateFormula =  function(m) {

    console.log(" update formula----");

    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();



      if(m && m.pl && m.pl.user && m.pl.user.oID){

        if(m.pl && m.pl.formula){

          PlcFormula.findOneAndUpdate({_id:m.pl.formula._id,oID:m.pl.user.oID}, m.pl.formula, { new: true }, function(err, resp) {
                    if (err){
                      r.er = err;
                      r.em = 'problem finding address';
                      deferred.reject(r);
                    }
                    else{
                      r.pl.formula = resp;

                      m.redisClient.get("lastestFormula", function(err, result) {  //all latest formula
                         var temp = {};
                         temp[m.pl.user.oID] = {};
                         var latestFormula = JSON.parse(result)||temp;
                        //  console.log("latestFormula[m.pl.formula.tank]----",latestFormula[m.pl.user.oID][m.pl.formula.tank]);
                         latestFormula[m.pl.user.oID][m.pl.formula.tank] = r.pl.formula;
                         m.redisClient.set("lastestFormula", JSON.stringify(latestFormula));
                       });

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

  // console.log("add new alert----",m.pl.alert);

  var r = {pl: {}, er:'',em:''};
  var deferred = q.defer();

  if(m && m.pl && m.pl.user && m.pl.user.oID){

    plc._sendAlertNotification(m);

    var d = new Date();

    if(m.pl.alert){
            var newAlert = new PlcAlert({
                              atime:lib.dateTime(),
                              atype:m.pl.alert.atype,
                              addr:m.pl.alert.addr,
                              tank:m.pl.alert.tank,   //todo dynamically set tank id
                              am:m.pl.alert.am,
                              rt:m.pl.alert.rt,
                              ra:m.pl.alert.ra,
                              st:m.pl.alert.st,
                              y:d.getFullYear(),
                              m:d.getMonth() + 1,
                              d:d.getDate()
                            });

              newAlert.setOwner(m.pl.user, function(setErr,setDoc){
                setDoc.save(function (error, alert){
                  // console.log("new alert saved----",alert);
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


plc._sendAlertNotification = function(m){


  console.log("plc module: send alert notification");
 var r = {pl: {}, status:false , er:''};
 var deferred = q.defer();
 var query = {};

 if(m && m.pl && m.pl.user && m.pl.user.oID){

     User.find({oID:m.pl.user.oID,'$or':[{'anc.a':true},{'anc.sia':true},{'anc.iaa':true},{'anc.la':true}]}).sort({atime:-1}).exec(function (err, resp) {
         if (err){
           r.er = err;
           r.status = false;
           deferred.reject(r);
         }
         else{

           r.pl.phones = resp;
           deferred.resolve(r);

           resp.push('18939801899');//yaojia.
           resp.push('15921180831');//zhouze.
           resp.push('13917207446');//Rolland.

           for (var i = 0; i < resp.length; i++) {
             if (resp[i].phone){
               lib.sendSms(resp[i].phone,m.pl.alert);
             };
           }
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


plc.getPlcAlerts =  function(m) {
  console.log("plc module: getPlcAlerts FUNCTION",m.pl.which);
 var r = {pl: {}, status:false , er:''};
 var deferred = q.defer();
 var query = {};
 var d = new Date();

 if(m.pl && m.pl.which){
   if(m.pl.which == "processed"){
     query.status = 1;
     query.y = d.getFullYear();
    //  query.m = d.getMonth() + 1;
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

     PlcAlert.find({oID:m.pl.user.oID})
     .$where('(this.status == 1) && ((this.atype == "余量警报")||(this.atype == "拉回警报")||(this.atype == "进场警报"))')
     .sort({'atime': -1})
     .exec(
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

    console.log(" update updatePlcAlert----",m);

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



plc.downloadDataProcessedAlerts = function(m) {
  console.log(" downloadDataProcessedAlerts----");

  var r = {pl:null , er:'',em:''};
  var deferred = q.defer();

    if(m && m.pl && m.pl.data){
      lib.processDownloadProcessedAlerts(m.pl.data).then(function(res){
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
plc.downloadStats = function(m){
  console.log(" downloadStats----");

  var r = {pl:null , er:'',em:''};
  var deferred = q.defer();

    if(m && m.pl && m.pl.data){

          lib.procesDownloadStats(m.pl.data,m.pl.tank).then(function(res){
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
  console.log(" downloadStats----",m.pl.tank);

  var r = {pl:null , er:'',em:''};
  var deferred = q.defer();

    if(m && m.pl && m.pl.data){

          lib.procesDownloadInstantPlc(m.pl.data,m.pl.tank).then(function(res){
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


var _extractPlcData = function(data,index,oID,latestIncommingData,latestFormula,lastestRemainingAmountAlerts,redisClient){

  var i = index?index:0;
  var shift = i*76;
  var plcType = null;
  var extractedData = null;
  var tank = null;
  var plcCode = null;


  var dates = _extractDates(data,shift);

  if (i<50){
      plcType = 'Guanwang';
      plcCode = lib.padNum(i+1,3);
      tank = plcType[0] + plcCode;
      extractedData = _exractGuanwangData(data,shift,oID,tank);
      return _setCommonPlcData(extractedData,dates,plcCode,plcType,tank);
  } else {
      var type = _getPlcType(data,shift);

      if (type==0 || type==2) {

        plcType='CNG';
        plcCode = lib.padNum(i+1,3);
        tank = plcType[0] + plcCode;
        var formula = latestFormula[oID][tank];
        // console.log('formula----',formula);


        if (!formula){ //create formula if not already created

            return _addNewFormula({oID:oID},tank).then(function(resp){
              // console.log("created formula---",resp);
              if (resp && resp.pl && resp.pl.formula){
                  latestFormula[oID][tank] = resp.pl.formula;
                  redisClient.set("lastestFormula", JSON.stringify(latestFormula));  //add new formula to the latest formula object
                  extractedData = _extractCngData(data,shift,i,type,oID,tank,latestIncommingData,resp.pl.formula,lastestRemainingAmountAlerts,redisClient);
                  return _setCommonPlcData(extractedData,dates,plcCode,plcType,tank);
              }
            });
        }
        else{
            extractedData = _extractCngData(data,shift,i,type,oID,tank,latestIncommingData,formula,lastestRemainingAmountAlerts,redisClient);
            return _setCommonPlcData(extractedData,dates,plcCode,plcType,tank);
        }


      } else if (type==1) {
        plcType='LNG';
        plcCode = lib.padNum(i+1,3);
        tank = plcType[0] + plcCode;
        var formula = latestFormula[oID][tank];
        // console.log('formula----',formula);


        if (!formula){  //create formula if not already created
          return _addNewFormula({oID:oID},tank).then(function(resp){
            // console.log("created formula---",resp);
            if (resp && resp.pl && resp.pl.formula){
                latestFormula[oID][tank] = resp.pl.formula;
                redisClient.set("lastestFormula", JSON.stringify(latestFormula));  //add new formula to the latest formula object
                extractedData = _extractLngData(data,shift,oID,tank,resp.pl.formula,lastestRemainingAmountAlerts,redisClient);
                return _setCommonPlcData(extractedData,dates,plcCode,plcType,tank);
            }
          });
        }
        else{
            extractedData = _extractLngData(data,shift,oID,tank,formula,lastestRemainingAmountAlerts,redisClient);
            return _setCommonPlcData(extractedData,dates,plcCode,plcType,tank);
        }
      } else if (type == 3) {
        plcType='CNG';
        plcCode = lib.padNum(i+1,3);
        tank = plcType[0] + plcCode;
        var formula = latestFormula[oID][tank];
        // console.log('formula----',formula);


        if (!formula){ //create formula if not already created
            return _addNewFormula({oID:oID},tank).then(function(resp){
              // console.log("created formula---",resp);
              if (resp && resp.pl && resp.pl.formula){
                  latestFormula[oID][tank] = resp.pl.formula;
                  redisClient.set("lastestFormula", JSON.stringify(latestFormula));  //add new formula to the latest formula object
                  extractedData = _extractCngData(data,shift,i,type,oID,tank,latestIncommingData,resp.pl.formula,lastestRemainingAmountAlerts,redisClient);
                  return _setCommonPlcData(extractedData,dates,plcCode,plcType,tank);
              }
            });


        } else {
            extractedData = _extractCngData(data,shift,i,type,oID,tank,latestIncommingData,formula,lastestRemainingAmountAlerts,redisClient);
            return _setCommonPlcData(extractedData,dates,plcCode,plcType,tank);
        }
      }
  }


  // if(plcType){
  //     // var d = new Date();
  //     //
  //     // var fullData = extractedData;
  //     // fullData.cd = lib.dateTime();
  //     // fullData.y = d.getFullYear();
  //     // fullData.m = d.getMonth()+1;
  //     // fullData.d = d.getDate();
  //     // fullData.dct = dates.date; //data collection time
  //     // fullData.cdct = dates.chanelDate; //chanel data collection time
  //     // fullData.cdcns = dates.cnanosecond; //chanel data collection time
  //     // fullData.plcCode =plcCode;
  //     // fullData.plcType = plcType;
  //     // fullData.tank = tank;
  //     //
  //     // return new iPlc(fullData);
  //
  //     return _setCommonPlcData(extractedData,dates,plcCode,plcType,tank);
  //   }
  //   else {
  //     throw "no plc type found!!!----";
  //   }
}


var _setCommonPlcData = function(extractedData,dates,plcCode,plcType,tank){


  var deferred = q.defer();

    var d = new Date();

    // var fullData = extractedData;
    extractedData.data.cd = lib.dateTime();
    extractedData.data.y = d.getFullYear();
    extractedData.data.m = d.getMonth()+1;
    extractedData.data.d = d.getDate();
    extractedData.data.dct = dates.date; //data collection time
    extractedData.data.cdct = dates.chanelDate; //chanel data collection time
    extractedData.data.cdcns = dates.cnanosecond; //chanel data collection time
    extractedData.data.plcCode =plcCode;
    extractedData.data.plcType = plcType;
    extractedData.data.tank = tank;
    extractedData.data = new iPlc(extractedData.data);
    deferred.resolve(extractedData);

    return deferred.promise;   //should return promise because of the case where we first save the the formula

}


var _extractDates = function(data,shift){

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


    return {date:date,chanelDate:chanelDate,cnanosecond:parseInt(cnanosecond.toString('hex'), 16)}



}

var _exractGuanwangData = function(data,shift,oID,tank){

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

  var r = {data:null,alert:null};

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

  var processedData = {
                        addr1:parseInt(addr1.toString('hex'), 16),
                        iwc1:lib.getPlcFloat(instantaneousWorkingCond1.toString('hex'),1),// instantaneous working conditions 1
                        isc1:lib.getPlcFloat(instantaneousStandardCond1.toString('hex'),1),//instantaneous standard conditions 1
                        p1:lib.getPlcFloat(pressure1.toString('hex'),1),// pressure 1
                        temp1:lib.getPlcFloat(temp1.toString('hex'),1),//temperature 1
                        pwc1:lib.getPlcFloat(positiveWorkingCond1.toString('hex'),1),// positive working conditions 1
                        psc1:lib.getPlcFloat(positiveStandardCond1.toString('hex'),0),// positive standard conditions 1
                        rsc1:lib.getPlcFloat(reverseStandardCond1.toString('hex'),1),// reverse standard conditions 1
                        cf1:parseInt(comminucationFailure1.toString('hex'), 16),//communication failure 1
                        er1:parseInt(errorReport1.toString('hex'), 16),// error report 1
                        addr2:parseInt(addr2.toString('hex'), 16),
                        iwc2:lib.getPlcFloat(instantaneousWorkingCond2.toString('hex'),1),// instantaneous working conditions 2
                        isc2:lib.getPlcFloat(instantaneousStandardCond2.toString('hex'),1),//instantaneous standard conditions 2
                        p2:lib.getPlcFloat(pressure2.toString('hex'),1),// pressure 2
                        temp2:lib.getPlcFloat(temp2.toString('hex'),1),//temperature 2
                        pwc2:lib.getPlcFloat(positiveWorkingCond2.toString('hex'),1),// positive working conditions 2
                        psc2:lib.getPlcFloat(positiveStandardCond2.toString('hex'),0),// positive standard conditions 2
                        rsc2:lib.getPlcFloat(reverseStandardCond2.toString('hex'),1),// reverse standard conditions 2
                        cf2:parseInt(comminucationFailure2.toString('hex'), 16),//communication failure 2
                        er2:parseInt(errorReport2.toString('hex'), 16),// error report 2
                      };
    r.data = processedData;
    return r;
}



// //cng
// inputP1:String, //inut presure1 入口压力1 MPa
// inputP2:String, //inut presure2 入口压力2 MPa
// paflpa1:String, //presure after first level presure ajustment 一级调压后压力1 Bar
// paflpa2:String, //presure after first level presure ajustment 一级调压后压力2 Bar
// taflpa1:String, //temperature after first level presure ajustment 一级调压后温度1 ℃
// taflpa2:String, //temperature after first level presure ajustment 一级调压后温度2 ℃
// outputP1:String, //output presure1 一号出口压力 Bar
// outputP2:String, //output presure2 二号出口压力 Bar
//
// //lng
// tankp:String, //tankpresure 储罐压力 Bar
// azip:String, //ajustment zone input presure 调压区入口压力 Bar
// tanklavel:String, //(remaining amount) 储罐液位 %
//
// //both lng and cng
// outputP:String, //output presure 出口压力 KPa
// fmot:String, //flowmeter ouput temperature 流量计出口温度 ℃
// instfow:String, //instantaneous flow 瞬时流量 Nm3/h
// cumfow:String //cummulative flow 累计流量 Nm3 -- raw val*10

var _extractCngData =  function(data,shift,i,type,oID,tank,latestIncommingData,formula,lastestRemainingAmountAlerts,redisClient){

  var r = {data:null,alert:null};

  var inputP1 = data.slice(24+shift,28+shift);
  var inputP2 = data.slice(28+shift,32+shift);
  var paflpa1 = data.slice(32+shift,36+shift);
  var paflpa2 = data.slice(36+shift,40+shift);
  var taflpa1 = data.slice(40+shift,44+shift);
  var taflpa2 = data.slice(44+shift,48+shift);
  // var outputP1 = data.slice(48+shift,52+shift);
  // var outputP2 = data.slice(52+shift,56+shift);
  var holderVal1 = data.slice(48+shift,52+shift);
  var holderVal2 = data.slice(52+shift,56+shift);
  var outputP = data.slice(56+shift,60+shift);
  var fmot = data.slice(60+shift,64+shift);

  var outputPOrInstfow0 = data.slice(56+shift,60+shift);
  var fmotOrCumfow0 = data.slice(60+shift,64+shift);

  var instfow = data.slice(64+shift,68+shift);
  var cumfow = data.slice(68+shift,72+shift);
  var holderKey1 = 'hxt1';
  var holderKey2 = 'hxt2';
  var holderKey3 = 'outputP';
  var holderKey4 = 'fmot';

  if (type==0) {
    holderKey1 = 'outputP1';
    holderKey2 = 'outputP2';
  }

  if (type == 3) {
    holderKey3 = 'instfow0';
    holderKey4 = 'cumfow0';
  }

  cumfow = lib.getPlcFloat(cumfow.toString('hex'),0);

  inputP1 = lib.getPlcFloat(inputP1.toString('hex'),1);
  inputP2 = lib.getPlcFloat(inputP2.toString('hex'),1);

  // console.log("i is----",i);
  // console.log("inputP1----",inputP1);

  //
  //
  // // var rfq = (inputP1/10)*18; //(Nm3)
  // var divisor = formula.divisor||1;
  // var rfq = (inputP1/divisor)*formula.factor; //(Nm3)
  // rfq=rfq.toFixed(3);
  //
  // var usagePerHour = null;
  //
  // if (latestIncommingData[oID]&&latestIncommingData[oID][tank]){
  //   usagePerHour = cumfow - parseFloat(latestIncommingData[oID][tank].cumfow);//(Nm3/h)
  // } else {
  //   usagePerHour = cumfow;
  // }
  //
  // // console.log("usagePerHour----",usagePerHour);
  // var dataRecepionIntervalInMinutes = plcConfig.sTimer/(60*1000);  // convert from millisecs to minutes
  // usagePerHour = usagePerHour*(60/dataRecepionIntervalInMinutes);   // get flow per hours, assuming the data reception occurs every dataRecepionIntervalInMinutes minutes
  //
  // if(usagePerHour<1){  //avoid division by zero
  //   usagePerHour = 1;
  // }
  //
  // var rft  = rfq/usagePerHour; //remaining time in hours
  //
  // rft=rft.toFixed(3);
  //

  // if (rft<formula.tt){ //// TODO: uncoment this once the condition is clear
  //
  //   if (!lastestRemainingAmountAlerts[oID][tank]){  //to avoid recreating same alert multiple times
  //     //create alert
  //     var alert = {
  //           am:'余量警报',
  //           atype:'余量警报',
  //           tank:tank,
  //           rt:rft,
  //           ra:rfq
  //     }
  //
  //     lastestRemainingAmountAlerts[oID][tank]=alert;
  //     redisClient.set("lastestRemainingAmountAlerts",JSON.stringify(lastestRemainingAmountAlerts));
  //     r.alert = alert;
  //   };
  // }
  // else{
  //   if (lastestRemainingAmountAlerts[oID][tank]){  //remove remaining amount alert if previously created to this tank
  //     delete lastestRemainingAmountAlerts[oID][tank];
  //     redisClient.set("lastestRemainingAmountAlerts",JSON.stringify(lastestRemainingAmountAlerts));
  //   };
  // }

  var procesedInfo = _checkCngAlert(inputP1, inputP2, formula, cumfow, lastestRemainingAmountAlerts, latestIncommingData, oID, tank, redisClient);

  r.alert = procesedInfo.alert;

  var result = {
      inputP1 :inputP1,
      inputP2 :inputP2,
      paflpa1 :lib.getPlcFloat(paflpa1.toString('hex'),1),
      paflpa2 :lib.getPlcFloat(paflpa2.toString('hex'),1),
      taflpa1 :lib.getPlcFloat(taflpa1.toString('hex'),1),
      taflpa2 :lib.getPlcFloat(taflpa2.toString('hex'),1),
      rft:procesedInfo.rft, // remaining flow  time -- computed
      rfq:procesedInfo.rfq, // remaining flow  quantity -- computed
      // outputP1 :lib.getPlcFloat(outputPOrInstfow.toString('hex'),1), // set below due to dynamic key
      // outputP2 :lib.getPlcFloat(fmotOrCumfow.toString('hex'),1),  // set below due to dynamic key
      // outputP: lib.getPlcFloat(outputP.toString('hex'),1), // set below due to dynamic key
      // fmot :lib.getPlcFloat(fmot.toString('hex'),1), // set below due to dynamic key
      instfow: lib.getPlcFloat(instfow.toString('hex'),1),
      // cumfow: lib.getPlcFloat(cumfow.toString('hex'),0,plcConfig.cumFlowCoef),
      cumfow: cumfow,
      cngType:type
  }

  result[holderKey1] =  lib.getPlcFloat(holderVal1.toString('hex'),1);
  result[holderKey2] =  lib.getPlcFloat(holderVal2.toString('hex'),1);

  result[holderKey3] =  lib.getPlcFloat(outputPOrInstfow0.toString('hex'),1);
  result[holderKey4] =  lib.getPlcFloat(fmotOrCumfow0.toString('hex'),1);

  r.data = result;

  return r;
}


var _checkCngAlert = function(inputP1, inputP2, formula, cumfow, lastestRemainingAmountAlerts, latestIncommingData, oID, tank, redisClient) {
  var r = {alert: null, rfq:null, rft:null};

    var inputP = Math.abs(Math.max(inputP1, inputP2));
    var divisor = formula.divisor||1;
    var rfq = (inputP/divisor)*formula.factor; //(Nm3)
    rfq = rfq.toFixed(3);

    var usagePerHour = null;

    if (latestIncommingData[oID]&&latestIncommingData[oID][tank]){
      // console.log("cumfow , last cumfow", cumfow, parseFloat(latestIncommingData[oID][tank].cumfow))
      // TODO this diff is about 1 - 4 only.
      usagePerHour = Math.abs(cumfow - parseFloat(latestIncommingData[oID][tank].cumfow));//(Nm3/h)=>Usage for plcConfig.sTimer time interval
    } else {
      usagePerHour = cumfow;
    }

    // usagePerHour = usagePerHour* (60/plcConfig.sTimer);   // get flow per hours, assuming the data reception occurs every dataRecepionIntervalInMinutes minutes

    var hourInMilliseccond = 3600000;
    usagePerHour = (usagePerHour * hourInMilliseccond) / plcConfig.sTimer;   // get flow per hours, assuming the data reception occurs every dataRecepionIntervalInMinutes minutes

    if(usagePerHour<1){  //avoid division by zero
      usagePerHour = 1;
    }

    console.log("usagePerHour----",usagePerHour);

    var rft  = rfq/usagePerHour; //remaining time in hours

    rft = rft.toFixed(3);

    if ((rft >  0) && (rft<formula.tt)) { // TODO: uncoment this once the condition is clear

      if (!lastestRemainingAmountAlerts[oID][tank]){  //to avoid recreating same alert multiple times
        //create alert
        var alert = {
              am:'余量警报',
              atype:'余量警报',
              tank:tank,
              rt:lib.H2Hms(rft),
              ra:rfq+'%'
        }

        lastestRemainingAmountAlerts[oID][tank]=alert;
        redisClient.set("lastestRemainingAmountAlerts",JSON.stringify(lastestRemainingAmountAlerts));
        r.alert = alert;
      };
    } else { //TODO remove only when it has been processed
      // if (lastestRemainingAmountAlerts[oID][tank]){  //remove remaining amount alert if previously created to this tank
      //   delete lastestRemainingAmountAlerts[oID][tank];
      //   redisClient.set("lastestRemainingAmountAlerts",JSON.stringify(lastestRemainingAmountAlerts));
      // };
    }

    console.log("rfq,rft---",rfq,rft);
    r.rfq = rfq;
    r.rft = lib.H2Hms(rft);
    return r;
}


var _extractLngData = function(data,shift,oID,tank,formula,lastestRemainingAmountAlerts,redisClient){
  var r = {data:null,alert:null};

  var tankp = data.slice(24+shift,28+shift);
  var azip = data.slice(28+shift,32+shift);
  var tanklavel = data.slice(32+shift,36+shift);
  var outputP = data.slice(36+shift,40+shift);
  var fmot = data.slice(40+shift,44+shift);
  var instfow = data.slice(44+shift,48+shift);
  var cumfow = data.slice(48+shift,52+shift);

  var remainingAmount = lib.getPlcFloat(tanklavel.toString('hex'),1);

  var result = {
      tankp :lib.getPlcFloat(tankp.toString('hex'),1),
      azip :lib.getPlcFloat(azip.toString('hex'),1),
      tanklavel :remainingAmount,
      outputP: lib.getPlcFloat(outputP.toString('hex'),1),
      fmot :lib.getPlcFloat(fmot.toString('hex'),1),
      instfow: lib.getPlcFloat(instfow.toString('hex'),1),
      // cumfow: lib.getPlcFloat(cumfow.toString('hex'),0,plcConfig.cumFlowCoef)
      cumfow: lib.getPlcFloat(cumfow.toString('hex'),0)
  }


  if (remainingAmount<formula.pt){
    //create alert
    var alert = {
          am:'余量警报',
          atype:'余量警报',
          tank:tank,
          ra:remainingAmount+'%'
    }

    if (!lastestRemainingAmountAlerts[oID][tank]){  //to avoid recreating same alert multiple times
      lastestRemainingAmountAlerts[oID][tank]=alert;
      redisClient.set("lastestRemainingAmountAlerts",JSON.stringify(lastestRemainingAmountAlerts));
      r.alert = alert;
    };
  } else { //TODO remove only after processed
    // if (lastestRemainingAmountAlerts[oID][tank]){  //remove remaining amount alert if previously created to this tank
    //   delete lastestRemainingAmountAlerts[oID][tank];
    //   redisClient.set("lastestRemainingAmountAlerts",JSON.stringify(lastestRemainingAmountAlerts));
    // };
  }

  r.data = result;
  return r;
}


var _getPlcType = function(data,shift) {
    var type  = data.slice(84+shift,86+shift);
    return parseInt(type.toString('hex'), 16);
}

var _checkChanelInterruption = function(data, oID,latestIncommingData,latestInteruptedChanels) {

    var result = {createAlert:false,save:false, latestIncommingData:latestIncommingData,latestInteruptedChanels:latestInteruptedChanels};

          if(latestInteruptedChanels[oID] && data){  //is always set by default
                if (!latestInteruptedChanels[oID][data.tank]){ //make sure the interuption has not been registered yet
                  if (latestIncommingData[oID][data.tank]){//if not the first time to get this data
                      if ((latestIncommingData[oID][data.tank].cdct+latestIncommingData[oID][data.tank].cdcns) === (data.cdct+data.cdcns)){  //if same as previous value
                            if(Math.abs((new Date(data.dct))-(new Date(data.cdct)))>(plcConfig.sTimer-10000)){   //check difference betwen sample and transmition times.
                                latestInteruptedChanels[oID][data.tank] = data;
                                //keep to create interuption alert
                                result.createAlert = true;
                            }
                      }
                      else{
                        result.save = true;
                        latestIncommingData[oID][data.tank] = data; //update latest data
                      }
                  }
                  else{
                    result.save = true;
                    latestIncommingData[oID][data.tank] = data; //save in latest data
                  }
                } else if(latestIncommingData[oID][data.tank]){
                    if ((latestIncommingData[oID][data.tank].cdct+latestIncommingData[oID][data.tank].cdcns) !== (data.cdct+data.cdcns)){  //normal flow restored
                        delete latestInteruptedChanels[oID][data.tank]; //will be set to redis client above
                        result.save = true;
                        latestIncommingData[oID][data.tank] = data;  //update latest data
                    }
                }
    }
    return result;
}










////TODO tanks related




plc.getPlcTanks =  function(m) {
  console.log("plc module: getPlcTanks FUNCTION");
 var r = {pl: {}, status:false , er:''};
 var deferred = q.defer();

  if(m && m.pl && m.pl.user && m.pl.user.oID) {
    Tank.find({oID:m.pl.user.oID},function (err, tank) {
        if (err){
          r.er = err;
          r.status = false;
          deferred.reject(r);
        }
        else{
          r.pl.tank = tank;
          r.status = true;
          deferred.resolve(r);
        }
    })
  } else {
    r.er = 'no org provided';
    r.status = false;
    deferred.reject(r);
  }

  return deferred.promise;
}



plc.addNewTank =  function(m) {
    console.log("add new address----");

    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();

    if(m.pl && m.pl.tank && m.pl.tank.addr && m.pl.user){
        var newTank = new Tank({
                          cd:lib.dateTime(),
                          addr:m.pl.tank.addr,
                          tank:m.pl.tank.tank
                          });

            newTank.setOwner(m.pl.user,function(err, doc) {
                if(!err){
                  doc.save(function (serr, tank){
                      if (!serr){
                        r.pl.tank = tank;
                        deferred.resolve(r);
                      }
                      else{
                        r.er = JSON.stringify(serr);
                        r.em = 'could not save. already exist?';
                        deferred.reject(r);
                      }
                  });
                }
                else{
                  r.er = err;
                  r.em = 'set owner failled';
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


plc.updatePlcTank =  function(m) {
    console.log(" update address----");
    var r = {pl: {}, er:'',em:''};
    var deferred = q.defer();

      if(m && m.pl && m.pl.user && m.pl.user.oID){

        if(m.pl && m.pl.tank){

          Tank.findOneAndUpdate({_id:m.pl.tank._id,oID:m.pl.user.oID}, m.pl.tank, { new: true }, function(err, tank) {
                    if (err){
                      r.er = err;
                      r.em = 'problem finding address';
                      deferred.reject(r);
                    }
                    else{
                      r.pl.tank = tank;
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


module.exports = plc;
