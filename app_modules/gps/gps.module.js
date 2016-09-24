
'use strict';

var mongoose = null ; //mongoose object
var message = null;   // message function
 global.allCars = {};
var gps = {};


var q = require('q');
var gpsModel = require('../../models/gps');
var gpsAlertModel = require('../../models/gps-alert');
var Shiment = require('../../models/shipment');
var gpsConfig = require('../../configs/gps');
var lib = require('../../lib/lib');

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



gps.getAllShipments =  function(m) {
  console.log("getAllShipments FUNCTION");
 var r = {pl: null, status:false , er:''};
  var deferred = q.defer();

  Shiment.find(function (err, resp) {
      if (err){
        r.er = JSON.stringify(err);
        deferred.reject(r);
      }
      else{
        r.pl = {shipments:resp};
        r.status = true;
        deferred.resolve(r);
      }
  })
  return deferred.promise;

}




gps.getCompletedShipments =  function(m) {
  console.log("getCompletedShipments FUNCTION");
 var r = {pl: null, status:false , er:''};
  var deferred = q.defer();

  Shiment.find({status:1},function (err, resp) {
      if (err){
        r.er = err;
        deferred.reject(r);
      }
      else{
        r.pl = {shipments:resp};
        r.status = true;
        deferred.resolve(r);
      }
  })
  return deferred.promise;

}


gps.getAllCars =  function(m) {

  var r = {pl: null, status:false , ec:'',em:''};
   var deferred = q.defer();

   gpsModel.aggregate(
           [
             { $sort: { sim: 1, time: 1}},
             {
               $group:
                 {
                   _id:"$sim",
                   time: { $last: "$time" },
                   lng: { $last: "$lng" },
                   lat: { $last: "$lat" },
                   speed: { $last: "$speed"},
                   lp:{$last: "$lp"}
                 }
             }
           ]
        ).exec(function(err,resp){
            if (err){
              console.log("err-----gps mod-----",err);
              r.ec = JSON.stringify(err.ec);
              r.em = JSON.stringify(err.em);
              deferred.reject(r);
            }
            else{
              r.pl = {cars:resp};
              r.status = true;
              deferred.resolve(r);
            }
        });
   return deferred.promise;

}






gps.processIncommingData = function(m){
  // console.log("processIncommingData FUNCTION");
 var r = {pl: null,status:false, er:''};
  var deferred = q.defer();

  var stream = m.pl.stream;


  if(stream){
    var data  = stream.split(',');
    var sim = stream.split('|')[3];
    var loc = data[0].split('|').pop();
    loc = parseInt(loc,10);
    var lat = data[2];
    var lp = gpsConfig.simPlate[sim];
    var lng = data[1];
    var lat = data[2];
    var speed = data[3];
    var course = data[4];
    var time = data[5];
    var alarm = data[6].split('|')[0];
    var addr = "";
    var rawd = stream;

    if(!lp){
      // console.log("no macthing licence plate found for sim number ",sim);
      r.er = "no macthing licence plate found for sim number "+sim;
      deferred.resolve(r);
    }
    else {

      var toSave = {sim:sim,loc:loc,lng:lng,lat:lat,speed:speed,course:course,time:time,alarm:alarm,addr:addr,rawd:rawd,lp:lp};

      var gpsData = new gpsModel(toSave);
        global.allCars[sim] = gpsData;  //save latest position of each car;
        r.pl =  {gps:gpsData};
        r.status = true;
        deferred.resolve(r);
    }
  }
  else{
      r.er = "no or stream provided";
      deferred.reject(r);
  }

 return deferred.promise;

}



gps.newShipment =  function(m) {
  // console.log("newShipment");
  var r = {pl: null, status:false , er:''};
  var deferred = q.defer();


  if(m && m.pl && m.pl.data){

        var data = m.pl.data;
        if(data.sim){


              var sim = data.sim;
              var lp =  gpsConfig.simPlate[sim];

                // console.log("lp---",lp);

              if(lp){


                var shipment = new Shiment({
                                    sim:sim,
                                    addr:data.addr,
                                    s:data.supercargo,
                                    driver:data.driver,
                                    dist:data.dist,
                                    lp:lp,
                                    dest:data.dest,
                                    origin:data.origin,
                                    oti:data.oti,
                                    nti:data.nti,
                                    ntt:data.ntt,
                                    ed:data.ed,
                                    pa:data.pa,
                                    rs:data.rs
                                });


                shipment.save(function (err, resp) {
                    if (err){
                      r.er = err;
                      deferred.reject(r);
                    }
                    else{
                      r.pl = {shipment:resp};
                      r.status = true;
                      deferred.resolve(r);
                    }
                })
              }
              else{
                    r.er =  "no matching license plate for provided sim";
                    r.status = false;
                    deferred.resolve(r);
              }
        }
        else{
              r.er =  "sim card provided";
              r.status = false;
              deferred.resolve(r);
        }
      }
    else {
      r.er =  "no data";
      deferred.reject(r);
    }
  return deferred.promise;
}



gps.newGpsAlert =  function(m) {
  console.log("newGpsAlert");
  var r = {pl: null, status:false , er:''};
  var deferred = q.defer();

  if(m && m.pl && m.pl.data){

              var data = m.pl.data;
                if(data.sim){

                            var sim = data.sim;
                            var lp =  gpsConfig.simPlate[sim];

                              console.log("lp---",lp);

                            if(lp){

                              var gpsAlert = new gpsAlertModel({
                                                  sim:sim,
                                                  addr:data.addr,
                                                  lp:lp,
                                                  atype:data.atype,
                                                  an:data.an,
                                                  speed:data.speed,
                                                  time:data.time,
                                                  lng:data.lng,
                                                  lat:data.lat,
                                              });


                              gpsAlert.save(function (err, resp) {
                                  if (err){
                                    r.er = err;
                                    deferred.reject(r);
                                  }
                                  else{
                                    r.pl = {shipment:resp};
                                    r.status = true;
                                    deferred.resolve(r);
                                  }
                              })

                }
                else {
                  r.er =  "no matching license plate for provided sim";
                  r.status = false;
                  deferred.resolve(r);
                }
              }
              else {
                r.er =  "no sim provide";
                r.status = false;
                deferred.resolve(r);
              }

          }
          else {
            r.er =  "no data  provided";
            deferred.reject(r);
      }
  return deferred.promise;
}




gps.gpsAlerts =  function(m) {
  console.log("gpsAlerts ------");
 var r = {pl: null, status:false , er:''};
  var deferred = q.defer();

  gpsAlertModel.find(function (err, resp) {
      if (err){
        r.er = JSON.stringify(err);
        deferred.reject(r);
      }
      else{
        r.pl = {alerts:resp};
        r.status = true;
        deferred.resolve(r);
      }
  })
  return deferred.promise;

}




gps.shipmentComplete = function(m){

  // console.log("shipmentComplete ----");

  var r = {pl: null, er:'',em:''};
  var deferred = q.defer();

  var shipment = m.pl.data;

  if(shipment && shipment.sim ){

    shipment.at = lib.dateTime();
    shipment.status = 1;

    // console.log("shipment to update----",shipment);

    Shiment.findOneAndUpdate({ _id: shipment._id }, shipment, { new: true }, function(err, resp) {
              if (err){
                r.er = err;
                r.em = 'problem finding shipment';
                // console.log("err---",err);
                deferred.reject(r);
              }
              else{
                if(resp){
                  r.pl = {shipment:resp};
                  deferred.resolve(r);
                }
                else {
                  r.em = 'problem shiment not found';
                  deferred.reject(r);
                }
              }
    });
    }
    else {
      r.er =  "no shiment info or sim provided";
      // console.log(r.er);
      deferred.reject(r);
    }
  return deferred.promise;
}


gps.saveIncommingData =  function(m) {
  // console.log("saveIncommingData");
  var r = {pl: {}, status:false , er:''};
  var deferred = q.defer();

  if(m){
          m.save(function (err, gps) {
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
        var cars = Object.keys(global.allCars);
        var pchain = [];

        for (var i = 0; i < cars.length; i++) {
               var message =  global.allCars[cars[i]];
              //  console.log("message----",message);
               pchain.push(gps.saveIncommingData(message));
        }

        var result =  q();
        pchain.forEach(function (f) {
            result = result.then(f);
        });
        // console.log('latest gps data saved----',result);
},gpsConfig.stimer);

module.exports = gps;
