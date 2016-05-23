
'use strict';

var mongoose = null ; //mongoose object
var message = null;   // message function
var allCars = {};
var gps = {};


var q = require('q');
var gpsModel = require('../../models/gps');
var gpsConfig = require('../../configs/gps');

gps.init = function(m) {
    var r = {pl: {status:true} , er:''};
     return q(r);
    // if(!(m.pl.fn instanceof Function)) {
    //     r.er = {ec:null , em: 'Payload pl is not a function'};
    //     return q.fail(r);
    // }

    // message = m.pl.fn;
    // // the promise for this init is completed once we get mongoose
    // var p1 = message({
    //     op: 'dependency',
    //     pl: {dn:'mongoose'}
    // }).then(function(r1){
    //     //console.log(r);
    //     mongoose = r1.pl.fn;
    //     console.log('\n ivm: ivm has received mongodb dependency: ' + mongoose.connection.name + ' with readyState: ' + mongoose.connection.readyState);
    //       var r = {pl: {pm: 'ivm initialization done! '}, er: null};
    //      return q(r);
    // });
    // return p1;

}

// gps.saveIncommingData =  function(m) {
//   console.log("saveIncommingData");
//   var r = {pl: {}, status:false , er:''};
//   var deferred = q.defer();
//
// // var stream = m.pl.stream;
// // var port =  m.pl.port;
//
//   if(m.pl){
//       // var data  = stream.split(',');
//       // var sim = stream.split('|')[3];
//       // var loc = data[0].split('|').pop();
//       // var lp = gpsConfig.port[port].simPlate[sim];
//
//       if(m.pl.lp){
//         var gpsData = new gpsModel({
//                                   sim:m.pl.sim,
//                                   loc:m.pl.loc,
//                                   lng:m.pl.lng,
//                                   lat:m.pl.lat,
//                                   speed:m.pl.speed,
//                                   course:m.pl.course,
//                                   time:m.pl.time,
//                                   alarm:m.pl.alarm,
//                                   addr:m.pl.addr,
//                                   rawd:m.pl.rawd,
//                                   lp:m.pl.lp
//                           })
//
//
//           allCars[sim] = gpsData;  //save latest position of each car;
//
//           gpsData.save(function (err, gps) {
//               if (err){
//                 r.er = err;
//                 r.status = false;
//                 deferred.reject(r);
//               }
//               else{
//                 r.pl.gps = gps;
//                 r.status = true;
//                 deferred.resolve(r);
//               }
//           })
//       }
//       else{
//         r.er =  "no macthing licence plate found for sim number "+sim;
//         r.status = false
//         deferred.reject(r);
//       }
//     }
//     else {
//       r.er =  "empty data";
//       r.status = false
//       deferred.reject(r);
//     }
//   return deferred.promise;
//
// }


gps.getData =  function(m) {
  console.log("getData FUNCTION");
 var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();

  gpsModel.find(function (err, gps) {
      if (err){
        r.er = err;
        r.status = false;
        deferred.reject(r);
      }
      else{
        r.pl.gps = gps;
        r.status = true;
        deferred.resolve(r);
      }
  })
  return deferred.promise;

}



gps.getAllCars =  function(m) {
  console.log("getAllCars FUNCTION");
 var r = {pl: {}, er:''};
  var deferred = q.defer();
  r.pl.cars = allCars;
  deferred.resolve(r);
  return deferred.promise;

}



gps.processIncommingData = function(m){

  console.log("processIncommingData FUNCTION");
 var r = {pl: null, er:''};
  var deferred = q.defer();

  var stream = m.pl.stream;
  var port = m.pl.port;


  if(stream && port){
    var data  = stream.split(',');
    var sim = stream.split('|')[3];
    var loc = data[0].split('|').pop();
    loc = parseInt(loc,10);
    var lat = data[2];
    var lp = gpsConf.port[port].simPlate[sim];
    var lng = data[1];
    var lat = data[2];
    var speed = data[3];
    var course = data[4];
    var time = data[5];
    var alarm = data[6];
    var addr = "";
    var rawd = stream;

    if(!lp){
      console.log("no macthing licence plate found for sim number ",sim);

      r.er = "no macthing licence plate found for sim number "+sim;
      deferred.reject(r);
    }
    else {

      var toSave = {sim:sim,loc:loc,lng:lng,lat:lat,speed:speed,course:course,time:time,alarm:alarm,addr:addr,rawd:rawd,lp:lp};

      // var gpsData = new gpsModel({
      //                           sim:m.pl.sim,
      //                           loc:m.pl.loc,
      //                           lng:m.pl.lng,
      //                           lat:m.pl.lat,
      //                           speed:m.pl.speed,
      //                           course:m.pl.course,
      //                           time:m.pl.time,
      //                           alarm:m.pl.alarm,
      //                           addr:m.pl.addr,
      //                           rawd:m.pl.rawd,
      //                           lp:m.pl.lp
      //                   })

      var gpsData = new gpsModel(toSave);
        allCars[sim] = gpsData;  //save latest position of each car;
        r.pl = {pl:gpsData};
        deferred.resolve(r);
    }
  }
  else{
      r.er = "no port or stream provided";
      deferred.reject(r);
  }

 return deferred.promise;

}


gps.saveIncommingData =  function(m) {
  console.log("saveIncommingData");
  var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();

  if(m & m.pl){
          gpsData.save(function (err, gps) {
              if (err){
                r.er = err;
                deferred.reject(r);
              }
              else{
                r.pl.gps = gps;
                r.status = true;
                deferred.resolve(r);
              }
          })
      }
    else {
      r.er =  "empty data";
      deferred.reject(r);
    }
  return deferred.promise;

}


//save gps data periodically
var timer = setInterval(function(){
        var cars = Object.keys(allCars);
        var pchain = [];

        for (var i = 0; i < cars.length; i++) {
               var message =  allCars[cars[i]];
               console.log("message----",message);
               pchain.push(gps.saveIncommingData(message));
        }

        var result =  q();
        pchain.forEach(function (f) {
            result = result.then(f);
        });
        console.log('latest gps data saved----',result);
},gpsConfig.stimer);

module.exports = gps;
