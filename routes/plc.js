
var helpers = require('../utilities/helpers');
var express = require('express');
var net = require('net');
var client = new net.Socket();
var router = express.Router();



var q = require('q');

module.exports = function (handler)
{


  router.get('/all', function(req, res, next) {

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

  router.get('/tanks/all', function(req, res, next) {

        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'getTanks',
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





  router.post('/tank', function(req, res, next) {

        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'addNewTank',
          pl:{tank:req.body}
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });




  router.put('/tank', function(req, res, next) {
        var param = {
          ns: 'plc',
          vs: '1.0',
          op: 'updateTank',
          pl:{tank:req.body}
        };

        handler(param)
            .then(function (r) {
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              helpers.sendResponse(res, 404, r);
            });
  });



  //plc Connection
  _tcpSerever(handler);

  return router;
};


var _tcpSerever = function(handler){

  // Keep track of the chat clients
  var clients = [];
  console.log('plc server: Start');
  // Start a TCP Server
  net.createServer(function (socket) {

    console.log('plc got new socket-----');
    // Identify this client
    socket.name = socket.remoteAddress + ":" + socket.remotePort;

    // Put this new client in the list
    clients.push(socket);

    console.log('plc server: incoming socket----',socket.name);

    // Send a nice welcome message and announce
    socket.write("Welcome " + socket.name + "\n");
    // broadcast(socket.name + " joined the chat\n", socket);

    // Handle incoming messages from clients.
    socket.on('data', function (data) {
        console.log('plc server: got data stream----');
        // saveData(handler,data);
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
      })
      .fail(function (r) {
          console.log("plc save data fail----",r);
      });
}
