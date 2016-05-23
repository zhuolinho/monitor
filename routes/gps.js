
var helpers = require('../utilities/helpers');
var gpsConf = require('../configs/gps');
var express = require('express');
var net = require('net');
var client1 = new net.Socket();
var client2 = new net.Socket();
var router = express.Router();

//socket-------
var gpsApp = require('express')();
var server = require('http').Server(gpsApp);
var io = require('socket.io')(server);
server.listen(3001);


var q = require('q');
var count = 1000;

module.exports = function (handler)
{


  router.get('/all', function(req, res, next) {

        var param = {
          ns: 'gps',
          vs: '1.0',
          op: 'getData',
          pl:{
          }
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {

              console.log(r.er);
              var r = {pl: null, er: {ec: 404, em: "could not find comment"}};
              helpers.sendResponse(res, 404, r);
            });
  });


  router.get('/cars/all', function(req, res, next) {

        var param = {
          ns: 'gps',
          vs: '1.0',
          op: 'getAllCars',
          pl:{
          }
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              console.log(r.er);
              var r = {pl: null, er: {ec: 404, em: "could not find comment"}};
              helpers.sendResponse(res, 404, r);
            });
  });


  //gps Connection
  _tcpCLient(handler);

  return router;
};


var _tcpCLient = function(handler){

              var ports = Object.keys(gpsConf.port);
            client1.connect(ports[0],gpsConf.ip, function(){

              var delay = gpsConf.timer;
              var user = gpsConf.port[ports[0]].user;
              var initquery = queryGps(user)[0];
              // console.log("initquery1--",initquery);

              client1.write(initquery, function(){
                        var timer = setInterval(function(){
                            var query = queryGps(user)[1]
                              // console.log("making request1",query)
                           client1.write(query);    // todo this part is failling ?
                        },delay);
              });
            });

            client1.on('error',function(err){
                console.log("GPS CONNECTION ERROR 1-----",err);
            });
            client1.on('data', function (data) {
                var stream = data.toString('utf8');
                if(stream.length > 20){
                    processIncommingData(handler,stream, ports[0]);
                }
            });

            client1.once('close', function () {
                console.log('Connection1 closed');
            });

            client2.connect(ports[1],gpsConf.ip, function(){

              var delay = 2*gpsConf.timer;
              var user = gpsConf.port[ports[1]].user;
              var initquery = queryGps(user)[0];
              // console.log("initquery2--",initquery);

              client2.write(initquery, function(){
                        var timer = setInterval(function(){
                            var query = queryGps(user)[1]
                              // console.log("making request2",query)
                           client2.write(query);
                        },delay);
              });
            });

            client2.on('error',function(err){
                console.log("GPS CONNECTION ERROR 2-----",err);
            });

            client2.on('data', function (data) {
                var stream = data.toString('utf8');
                if(stream.length > 20){
                    processIncommingData(handler,stream, ports[1]);
                }
            });
            client2.once('close', function () {
                console.log('Connection2 closed');
            });

}


function processIncommingData(handler,stream,port){

  var param = {
        ns: 'gps',
        vs: '1.0',
        op: 'processIncommingData',
        pl:{stream:stream,port:port}
  }

  handler(param)
      .then(function (r) {
        console.log("processed"+port+" data successful",r);
        io.emit("carMove",r);
      })
      .fail(function (r) {
          console.log("gps route save data fail");
      });
}


function queryGps(user){

  //@024|1234|01||8932,8932.pwd| ---handShake
  //@015|1235|02||8932|  ---requery

  var handShake = buildStreams(count,user).handShake;
  var requery =  buildStreams(count,user).requery;
  var hlen = buildStreams(count,user).hlen;
  if(hlen > 999){
     count = 1000;
     handShake = buildStreams(count,user).handShake;
     requery =  buildStreams(count,user).requery;
     hlen = buildStreams(count,user).hlen;
  }

  var hlenStr = formatLen(hlen);
  var qlen = hlen-9;
  var qlenStr = formatLen(qlen);

  count++;

  return ["@" + hlenStr + handShake,"@"+ qlenStr + requery];
}


function buildStreams(count,user){
    var hs = '|'+count+"|01||"+user+","+user+".pwd|";
    var q = '|'+count+"|02||"+user+"|";
    var hl = hs.length;
    return {handShake:hs,requery:q,hlen:hl};
}

function formatLen(len){
    // console.log("len--",len)
    var newLen = len.toString();
    if(newLen.length < 2){
        newLen = "00"+newLen;
    }
    else  if(newLen.length<3){
          newLen = "0"+newLen;
    }

  // console.log("newLen--",newLen)
    return newLen;

}
