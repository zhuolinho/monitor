
'use strict';

var message = null;   // message function
var mongoose = require('mongoose');
 global.allCars = {};
var gps = {};


var q = require('q');
var gpsModel = require('../../models/gps');
var gpsAlertModel = require('../../models/gps-alert');
var Shiment = require('../../models/shipment');
var gpsConfig = require('../../configs/gps');
var globalConfig = require('../../configs/global');
var lib = require('../../lib/lib');
var scheduler = require('node-schedule');

gps.init = function(m) {
    var r = {pl: {status:true} , er:''};

   var  testShipments =[
        {
          oti:'C002-6328',
          nti:'6328',
          dt:'5.2-14:33',
          at:'5.2-23:10',
          lp:'2632',
          driver:'761',
          s:'822',
          pa:'310',
          dist:'12.2',
          ntt:'CNG'
        },
        {
          oti:'C002-6328',
          nti:'6328',
          dt:'5.2-14:33',
          at:'5.2-23:10',
          lp:'2632',
          driver:'761',
          s:'822',
          pa:'310',
          dist:'12.2',
          ntt:'CNG'
        }
        ,
        {
            oti:'C002-6328',
            nti:'6328',
            dt:'5.2-14:33',
            at:'5.2-23:10',
            lp:'2632',
            driver:'761',
            s:'822',
            pa:'310',
            dist:'12.2',
            ntt:'CNG'
          },
          {
            oti:'C002-6328',
            nti:'6328',
            dt:'5.2-14:33',
            at:'5.2-23:10',
            lp:'2632',
            driver:'761',
            s:'822',
            pa:'310',
            dist:'12.2',
            ntt:'CNG'
          },
          {
              oti:'C002-6328',
              nti:'6328',
              dt:'5.2-14:33',
              at:'5.2-23:10',
              lp:'2632',
              driver:'761',
              s:'822',
              pa:'310',
              dist:'12.2',
              ntt:'CNG'
            },
            {
              oti:'C002-6328',
              nti:'6328',
              dt:'5.2-14:33',
              at:'5.2-23:10',
              lp:'2632',
              driver:'761',
              s:'822',
              pa:'310',
              dist:'12.2',
              ntt:'CNG'
            }
          ,{
                oti:'C002-6328',
                nti:'6328',
                dt:'5.2-14:33',
                at:'5.2-23:10',
                lp:'2632',
                driver:'761',
                s:'822',
                pa:'310',
                dist:'12.2',
                ntt:'CNG'
              },
              {
                oti:'C002-6328',
                nti:'6328',
                dt:'5.2-14:33',
                at:'5.2-23:10',
                lp:'2632',
                driver:'761',
                s:'822',
                pa:'310',
                dist:'12.2',
                ntt:'CNG'
              },
              {
                  oti:'C002-6328',
                  nti:'6328',
                  dt:'5.2-14:33',
                  at:'5.2-23:10',
                  lp:'2632',
                  driver:'761',
                  s:'822',
                  pa:'310',
                  dist:'12.2',
                  ntt:'CNG'
                },
                {
                  oti:'C002-6328',
                  nti:'6328',
                  dt:'5.2-14:33',
                  at:'5.2-23:10',
                  lp:'2632',
                  driver:'761',
                  s:'822',
                  pa:'310',
                  dist:'12.2',
                  ntt:'CNG'
                }

    ];






        // populating shipments completed to test download

        Shiment.find({oID:globalConfig.orgs[0].oID,status:1},function(error, doc){
          if(doc&&doc.length){
              return;
         }else {

           console.log('populated shipments-----')
              // save sample to init it of not there.
              var pchain = [];
              for (var i = 0; i < testShipments.length; i++) {
                     var message = {pl:{}};
                     message.pl.data =  testShipments[i];
                     message.pl.data.status = 1;
                     message.pl.data.sim = '13472488407';
                     message.pl.user = globalConfig.orgs[0];
                     pchain.push(gps.newShipment(message));
              }

              var result =  q();
              pchain.forEach(function (f) {
                  result = result.then(f);
              });
         }
        });

      var montlyJob  = scheduler.scheduleJob('0 0 2 * * *', function(){
        console.log('Job: every day at 2 am');
        // remove data older than one week.
        gpsModel.remove({createdAt: {$lt: new Date((new Date())-7*24*60*60*1000) }}, function(err, resp) {
              console.log('++++++++++***************++++++++++++++++++')
              console.log('++++++++++***************++++++++++++++++++')
              console.log('++++++++++***************++++++++++++++++++')
              console.log('++++++++++***************++++++++++++++++++')
              console.log('removed-----gps before last months --',err,resp.result);
              console.log('++++++++++***************++++++++++++++++++')
              console.log('++++++++++***************++++++++++++++++++')
              console.log('++++++++++***************++++++++++++++++++')
              console.log('++++++++++***************++++++++++++++++++')
        })
      });


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

  if(m && m.user && m.user.oID){
    gpsModel.find({oID:m.user.oID},function (err, gps) {
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
  }
  else{
    r.er = 'no org provided';
    r.status = false;
    deferred.reject(r);
  }


  return deferred.promise;

}



gps.getAllShipments =  function(m) {
  console.log("getAllShipments FUNCTION");
 var r = {pl: null, status:false , er:''};
  var deferred = q.defer();

    if(m && m.user && m.user.oID){
      Shiment.find({oID:m.user.oID},function (err, resp) {
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
    }
    else{
      r.er = 'no org provided';
      r.status = false;
      deferred.reject(r);
    }

  return deferred.promise;

}




gps.getCompletedShipments =  function(m) {
  console.log("getCompletedShipments FUNCTION");
 var r = {pl: null, status:false , er:''};
  var deferred = q.defer();

  if(m && m.pl &&  m.pl.user && m.pl.user.oID){
    var query = {oID:m.pl.user.oID,status:1};
    if(m.pl.start && m.pl.end){
        var start = m.pl.start+' 00:00:00';
        var end = m.pl.end+' 23:59:59';
        query.cd = {$gte:start,$lte:end};
      }

      Shiment.find(query,function (err, resp) {
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
  }
  else{
    r.er = 'no org provided';
    r.status = false;
    deferred.reject(r);
  }

  return deferred.promise;

}


gps.getAllCars =  function(m) {

  var r = {pl: null, status:false , ec:'',em:''};
   var deferred = q.defer();



   if(m && m.pl && m.pl.user && m.pl.user.oID){

     gpsModel.aggregate()
     .match({oID:m.pl.user.oID})
     .sort({ sim: 1, time: 1})
     .group({
               _id:"$sim",
               time: { $last: "$time" },
               lng: { $last: "$lng" },
               lat: { $last: "$lat" },
               speed: { $last: "$speed"},
               lp:{$last: "$lp"}
             })
      .allowDiskUse(true)
      .exec(function(err,resp){
              // console.log("all cars----",resp)
              if (err){
                console.log("MOD::------",err);
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


   }
   else{
     r.er = 'no org provided';
     r.status = false;
     deferred.reject(r);
   }
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
      gpsData.setOwner(m.pl.org,function(setErr,setDoc){
          global.allCars[sim] = setDoc;  //save latest position of each car;
          r.pl =  {gps:setDoc};
          r.status = true;
          deferred.resolve(r);
      });

    }
  }
  else{
      r.er = "no or stream provided";
      deferred.reject(r);
  }

 return deferred.promise;

}



gps.newShipment =  function(m) {
  console.log("newShipment-----",m);
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
                                    cd:lib.dateTime(),
                                    dest:data.dest,
                                    origin:data.origin,
                                    oti:data.oti,
                                    nti:data.nti,
                                    ntt:data.ntt,
                                    ed:data.ed,
                                    pa:data.pa,
                                    rs:data.rs,
                                    status:data.status
                                });

                console.log("m.pl.user----",m.pl.user);
                shipment.setOwner(m.pl.user,function(error,doc){
                  console.log("shipment owner set-------");
                  doc.save(function (err, resp) {
                      if (err){
                        r.er = err;
                        deferred.reject(r);
                      }
                      else{
                        console.log("new shipment saved----");
                        r.pl = {shipment:resp};
                        r.status = true;
                        deferred.resolve(r);
                      }
                  })

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

                                if(m.pl.org){
                                  gpsAlert.setOwner(m.pl.org,function(setError,setDoc){
                                    setDoc.save(function (err, resp) {
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

                                  });
                                }
                                else{
                                  throw 'plc org not provided';
                                }

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


  if(m && m.user && m.user.oID){

      gpsAlertModel.find({oID:m.user.oID},function (err, resp) {
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
  }
  else{
    r.er = 'no org provided';
    r.status = false;
    deferred.reject(r);
  }

  return deferred.promise;

}




gps.shipmentComplete = function(m){

  // console.log("shipmentComplete ----");

  var r = {pl: null, er:'',em:''};
  var deferred = q.defer();

  var shipment = m.pl.data;
  var user =  m.pl.user;

  if(shipment && shipment.sim && user && user.oID){

    shipment.at = lib.dateTime();
    shipment.status = 1;

    // console.log("shipment to update----",shipment);

    Shiment.findOneAndUpdate({ _id: shipment._id, oID:user.oID}, shipment, { new: true }, function(err, resp) {
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



gps.downloadCompletedShipments = function(m){
  console.log(" downloadCompletedShipments----");

  var r = {pl:null , er:'',em:''};
  var deferred = q.defer();

    if(m && m.pl && m.pl.data){

          lib.procesDownloadCompletedShipments(m.pl.data).then(function(res){
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
