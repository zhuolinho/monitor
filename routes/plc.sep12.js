
var helpers = require('../utilities/helpers');
var bufferConcat = require('buffer-concat');
var lib = require('../lib/lib');
var express = require('express');
var net = require('net');
var plcApp = require('express')();
var server = require('http').Server(plcApp);
var io = require('socket.io')(server);
var client = new net.Socket();
var router = express.Router();
var goodConnection = true;
var lastDataTime = 0;
var chunks = [];
var sTimer = 5*60000; //5min.
var size = 0;
server.listen(3003);



var q = require('q');

module.exports = function (handler)
{


  router.get('/all.json', function(req, res, next) {

        var param = {
          ns: 'plc',
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
              helpers.sendResponse(res, 404, r);
            });
  });

  router.get('/latest.json', function(req, res, next) {


      var param = {
            ns: 'plc',
            vs: '1.0',
            op: 'getLatestData',
            pl:{length:100}
      }

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });

  router.get('/alerts/:which.json', function(req, res, next) {


      //which = all, processed, unprocessed.
        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'getPlcAlerts',
          pl:{which:req.params.which}
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });

router.get('/stats/:year/:month.json', function(req, res, next) {


    //which = all, processed, unprocessed.
      var param = {
        ns: 'plc',
        vs: '1.0',
        op: 'getPlcStats',
        pl:{year:req.params.year,month:req.params.month}
      };

      handler(param)
          .then(function (r) {
             helpers.sendResponse(res, 200, r);
          })
          .fail(function (r) {
            helpers.sendResponse(res, 404, r);
          });
});

  router.put('/alert.json', function(req, res, next) {

        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'updatePlcAlert',
          pl:{
            alert:req.body
          }
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });



  router.post('/alert.json', function(req, res, next) {

        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'addNewAlert',
          pl:{
            alert:req.body
          }
        };

        handler(param)
            .then(function (r) {
              io.emit("newPlcAlert",r);
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });



  router.get('/shipments.json', function(req, res, next) {

        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'getShipmentList',
          pl:{}
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });


  router.get('/address/all.json', function(req, res, next) {

        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'getAddress',
          pl:{
          }
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });





  router.post('/address.json', function(req, res, next) {

        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'addNewAddress',
          pl:{address:req.body}
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });


  router.put('/address.json', function(req, res, next) {
        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'updateAddress',
          pl:{address:req.body}
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });

  router.post('/download.json', function(req, res, next) {

        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'downloadData',
          pl:{}
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });





  router.post('/test.json', function(req, res, next) {
      console.log("route plc test-----");
        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'handleIncommingData',
          pl:req.body.plc
        };

        handler(param)
            .then(function (r) {
              console.log("plc test data saved-----");
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });

  //plc Connection
  _tcpSerever(handler);
  _checkInterruption(handler);

  return router;
};


var _tcpSerever = function(handler){

  // Keep track of the chat clients
  var clients = [];
  // console.log('plc server: Start');
  // Start a TCP Server
  net.createServer(function (socket) {

      var isSaving  = false;

    console.log('plc got new socket-----');
    // Identify this client
    socket.name = socket.remoteAddress + ":" + socket.remotePort;

    // Put this new client in the list
    clients.push(socket);

    // console.log('plc server: incoming socket----',socket.name);

    // Send a nice welcome message and announce
    socket.write("Welcome " + socket.name + "\n");
    // broadcast(socket.name + " joined the chat\n", socket);

    // Handle incoming messages from clients.
    socket.on('data', function (data) {
      console.log("got plc data-----");
      goodConnection = true;
      lastDataTime = Date.now();
      size += data.length;
      chunks.push(data);
      console.log('plc data size and buffer size----',size, socket.bufferSize);
      if((size-12)/76 >= 100){
        console.log('got all plc data----');
        socket.pause();
        var validData = bufferConcat(chunks, size);
        size = 0;
        chunks = [];
        if(!isSaving){
          isSaving = true;
          saveData(handler, validData);
          var timer = setTimeout(function(){
              socket.resume();
              isSaving = false;
              clearTimeout(timer);
          },sTimer);
        }
      }
    });

    // Remove the client from the list when it leaves
    socket.on('end', function () {
      console.log('plc server: client left----', socket.name );
    });

  }).listen(3002);
}


function saveData(handler,data){

  var param = {
        ns: 'plc',
        vs: '1.0',
        op: 'handleIncommingData',
        pl:data
  }

  handler(param)
      .then(function (r) {
        console.log("plc route save data successful---",r);
        _getLatest(handler,r.length);
      })
      .fail(function (r) {
          console.log("plc save data fail----",r);
      });
}

function _getLatest(handler,length){

  var param = {
        ns: 'plc',
        vs: '1.0',
        op: 'getLatestData',
        pl:{length:length}
  }

  handler(param)
      .then(function (r) {
        console.log("plc route save data successful---",r);
              io.emit("realTimePlc",r);
      })
      .fail(function (r) {
          console.log("plc save data fail----",r);
      });
}


function _checkInterruption(handler){
    var ctimer = sTimer+10000;
    var checkInterruptionTimer = setInterval(_=>{
      var currentTime  = Date.now();
      if((currentTime - lastDataTime) > sTimer){
        if(goodConnection){ // if there has been any data since the last interuption
            goodConnection = false;
            var alert = {
                  am:'信号中断',
                  atype:'信号中断'
            }
            _createPlcAlert(alert,handler);
            io.emit("plcDataInterruption",{interuptionTime:lib.dateTime()});
        }
      }

    },ctimer);
  }

  function _createPlcAlert(alert,handler){
    var param = {
      ns: 'plc',
      vs: '1.0',
      op: 'addNewAlert',
      pl:{
        alert:alert
      }
    };

    handler(param)
        .then(function (r) {
              io.emit("newPlcAlert",r);
        })
        .fail(function (r) {
          //
          console.log('plc route:  error creating new alert',r);
        });
  }
