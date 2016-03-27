
'use strict';

var mongoose = null ; //mongoose object
var message = null;   // message function
var gps = {};


var q = require('q');
var gpsModel = require('../../models/gps');

gps.init = function(m) {
    var r = {pl: {status:true} , er:''};
  //  console.log("gps module INIT------")
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

gps.handleIncommingData =  function(m) {
  //console.log("handleIncommingData");
  var r = {pl: {} , er:''};
  var deferred = q.defer();

//   var Cat = mongoose.model('Cat', { name: String });
//
// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// })

var stream = m.pl;
console.log("stream--",stream);

  if(stream){

      var data  = stream.split(',');
      var sim = stream.split('|')[3];
      var loc = data[0].split('|').pop();
      var gpsData = new gpsModel({
                                sim:sim,
                                loc:parseInt(loc,10),
                                lon:data[1],
                                lat:data[2],
                                speed:data[3],
                                course:data[4],
                                time:data[5],
                                alarm:data[6],
                                addr:"",
                                rawd:stream
                        })

        gpsData.save(function (err, gps) {
            if (err) return console.error(err);
            r.pl.gps = gps;
            deferred.resolve(r);
        })
    }
    else {
      r.er =  "empty data";
          deferred.reject(r);
    }
  return deferred.promise;

}


gps.getData =  function(m) {
  console.log("getData FUNCTION");
  var r = {pl: {} , er:''};
  var deferred = q.defer();

  gpsModel.find(function (err, gps) {
      if (err) return console.error(err);
      r.pl.gps = gps;
      deferred.resolve(r);
  })
  return deferred.promise;

}

module.exports = gps;
