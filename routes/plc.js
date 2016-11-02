
var helpers = require('../utilities/helpers');
var bufferConcat = require('buffer-concat');
var lib = require('../lib/lib');
var plcConf = require('../configs/plc');
var globalConf = require('../configs/global');
var express = require('express');
var net = require('net');
var plcApp = require('express')();
var server = require('http').Server(plcApp);
var io = require('socket.io')(server);
// var client = new net.Socket();
var router = express.Router();
var gotStart = false;
var gotInOnePiece = false;
var goodConnection = false;
var lastDataTime = 0;
var chunks = [];
var sTimer = plcConf.sTimer;
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
            user:lib.reqUser(req)
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
            pl:{length:100, user:lib.reqUser(req)}
      }

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });


  router.get('/latest/withaddress.json', function(req, res, next) {


      var param1 = {
            ns: 'plc',
            vs: '1.0',
            op: 'getAddress',
            pl:{user:lib.reqUser(req)}
      };

      var param2 = {
            ns: 'plc',
            vs: '1.0',
            op: 'getLatestData',
            pl:{length:100, user:lib.reqUser(req)}
      };

        handler(param1)
            .then(function (r1) {
              handler(param2)
                  .then(function (r2) {

                    r2.pl.address = r1.pl.address;
                     helpers.sendResponse(res, 200, r2);
                  })
                  .fail(function (r2) {
                    helpers.sendResponse(res, 404, r2);
                  });

            })
            .fail(function (r1) {
              helpers.sendResponse(res, 404, r1);
            });
  });

  router.get('/forlasthours/:tank.json', function(req, res, next) {

      var param = {
            ns: 'plc',
            vs: '1.0',
            op: 'getAlertForTimeInterval',
            pl:{user:lib.reqUser(req),tank:req.params.tank}
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

        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'getPlcAlerts',
          pl:{which:req.params.which,user:lib.reqUser(req)}
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });

router.get('/stats/:start/:end/:tank/:mode.json', function(req, res, next) {


    //which = all, processed, unprocessed.
      var param = {
        ns: 'plc',
        vs: '1.0',
        op: 'getPlcStats',
        pl:{start:req.params.start, end:req.params.end,mode:req.params.mode,tank:req.params.tank, user:lib.reqUser(req)}
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
            data:req.body,
            user:lib.reqUser(req)
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

      var user = lib.reqUser(req);

        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'addNewAlert',
          pl:{
            alert:req.body,
            user:user
          }
        };

        handler(param)
            .then(function (r) {
              io.emit("newPlcAlert:"+user.oID,r);
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
          pl:{user:lib.reqUser(req)}
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
          pl:{user:lib.reqUser(req)}
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });

  // router.get('/sms/users.json', function(req, res, next) {
  //
  //       var param = {
  //         ns: 'plc',
  //         vs: '1.0',
  //         op: '_sendAlertNotification',
  //         pl:{user:globalConf.orgs[0]}
  //       };
  //
  //       handler(param)
  //           .then(function (r) {
  //              helpers.sendResponse(res, 200, r);
  //           })
  //           .fail(function (r) {
  //             helpers.sendResponse(res, 404, r);
  //           });
  // });





  router.post('/address.json', function(req, res, next) {

        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'addNewAddress',
          pl:{address:req.body,user:lib.reqUser(req)}
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
          pl:{address:req.body,user:lib.reqUser(req)}
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
          pl:{user:lib.reqUser(req)}
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });


  router.post('/stats/download.json', function(req, res, next) {

    var which = req.body.which;
    var tank = req.body.tank;

      var param1 = {
        ns: 'plc',
        vs: '1.0',
        op: 'getPlcStats',
        pl:{start:req.body.start, end:req.body.end,mode:req.body.mode,tank:tank, user:lib.reqUser(req)}
      };


        var param2 = {
          ns: 'plc',
          vs: '1.0',
          op: 'downloadStats',
          pl:{data:null,tank:tank}
        };


        if(which ==='instantaneous'){
          param1.op = 'getInstantaniousPlcData';
          param2.op = 'downloadInstantPlcData';
        }


        handler(param1)
            .then(function (r) {
              param2.pl.data = r.pl.plc;
              handler(param2)
                  .then(function (r) {
                     helpers.sendResponse(res, 200, r);
                  })
                  .fail(function (r) {
                    helpers.sendResponse(res, 404, r);
                  });
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });








  // router.post('/test.json', function(req, res, next) {
  //     console.log("route plc test-----");
  //       var param = {
  //         ns: 'plc',
  //         vs: '1.0',
  //         op: 'handleIncommingData',
  //         pl:req.body.plc
  //       };
  //
  //       handler(param)
  //           .then(function (r) {
  //             console.log("plc test data saved-----");
  //              helpers.sendResponse(res, 200, r);
  //           })
  //           .fail(function (r) {
  //             helpers.sendResponse(res, 404, r);
  //           });
  // });

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

      if(lib.isPlcBegin(data) && lib.isPlcEnd(data)){ //check if both begin and end
            console.log('got both ends of  plc data----');
          gotInOnePiece = true;
      }
      else  if(!gotStart && lib.isPlcBegin(data)){  ///check begin
            gotStart = true;
            console.log('got begin plc data----',plcConf.start);
            var temp1 = data.slice(6);
            size += temp1.length;
            chunks.push(temp1);
          }

      else  if(gotStart && !lib.isPlcBegin(data) && !lib.isPlcEnd(data)){//check middle
            console.log('got middle plc data----',data);
            var temp2 = data;
            size += temp2.length;
            chunks.push(temp2);
        }

      if(lib.isPlcEnd(data)){ //check end


          console.log('got end plc data----',plcConf.start);

          var temp3 = null;

          if(gotInOnePiece){
            temp3 = data.slice(6,-4);
          }
          else{
            temp3 = data.slice(0,-4);
          }

          size += temp3.length;
          chunks.push(temp3);

          socket.pause();
          var validData = bufferConcat(chunks, size);


          if(!isSaving){
            isSaving = true;
            saveData(handler, validData);
            var timer = setTimeout(function(){
                socket.resume();
                gotStart = false;
                chunks = [];
                gotInOnePiece = false;
                size = 0;
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
        pl:{data:data,org:globalConf.orgs[0]}
  }

  handler(param)
      .then(function (r) {
        console.log("plc route save data successful---",r);
        _getLatest(handler,r.length, globalConf.orgs[0]);
      })
      .fail(function (r) {
          console.log("plc save data fail-->>>----",r);
      });
}

function _getLatest(handler,length,user){

  var param = {
        ns: 'plc',
        vs: '1.0',
        op: 'getLatestData',
        pl:{length:length,user:user}
  }

  handler(param)
      .then(function (r) {
        console.log("plc route save data successful---",r);
              io.emit("realTimePlc:"+user.oID,r);
      })
      .fail(function (r) {
          console.log("plc get lates data fail----",r);
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
            io.emit("plcDataInterruption:"+globalConf.orgs[0].oID,{interuptionTime:lib.dateTime()});

        }
      }

    },ctimer);
  }

  function _createPlcAlert(alert,handler){
    var user = globalConf.orgs[0];
    var param = {
      ns: 'plc',
      vs: '1.0',
      op: 'addNewAlert',
      pl:{
        alert:alert,
        user:user  //call it user to be consistent with the user created post alert
      }
    };

    handler(param)
        .then(function (r) {
              console.log("route: plc alert created-----",r);
              io.emit("newPlcAlert:"+user.oID,r);
        })
        .fail(function (r) {
          //
          console.log('plc route:  error creating new alert',r);
        });
  }
