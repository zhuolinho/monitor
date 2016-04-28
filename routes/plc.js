
var helpers = require('../utilities/helpers');
var express = require('express');
var net = require('net');
var client = new net.Socket();
var router = express.Router();



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

  //plc Connection
  _tcpCLient(handler);

  return router;
};


var _tcpCLient = function(handler){

  console.log("plc up and runing---")
  var client = new net.Socket();
  var client2 = new net.Socket();

    client.connect(8081, '139.196.18.222', function() {
    	console.log('plc Connected');
    	client.write('Hello, connection successful!');
    });

    client.on('data', function(data) {
    	console.log('plc Received: ' + data);
    	// client.destroy(); // kill client after server's response
    });

    client.on('close', function() {
    	console.log('plc Connection closed');
    });



    client2.connect(8081, '127.0.0.1', function() {
      console.log('plc local host Connected');
      client2.write('Hello, connection successful!');
    });

    client2.on('data', function(data) {
      console.log('plc local Received: ' + data);
      // client.destroy(); // kill client after server's response
    });

    client2.on('close', function() {
      console.log('plc local Connection closed');
    });

}


function saveData(handler,data,which){

  // var param = {
  //       ns: 'gps',
  //       vs: '1.0',
  //       op: 'handleIncommingData',
  //       pl:data
  // }
  //
  // handler(param)
  //     .then(function (r) {
  //       console.log("save"+which+" data successful");
  //       io.emit("carMove",r);
  //     })
  //     .fail(function (r) {
  //         console.log("save1 data fail");
  //     });
}

function buildStreams(count,user){
    // var hs = '|'+count+"|01||"+user+","+user+".pwd|";
    // var q = '|'+count+"|02||"+user+"|";
    // var hl = hs.length;
    // return {handShake:hs,requery:q,hlen:hl};
}

function formatLen(len){
//     // console.log("len--",len)
//     var newLen = len.toString();
//     if(newLen.length < 2){
//         newLen = "00"+newLen;
//     }
//     else  if(newLen.length<3){
//           newLen = "0"+newLen;
//     }
//
//   // console.log("newLen--",newLen)
//     return newLen;

}
