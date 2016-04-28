
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
  _tcpSerever(handler);
  _tcpCLient(handler);

  return router;
};


var _tcpCLient = function(handler){

  console.log("plc client up and runing---");
  var client = new net.Socket();

    client.connect(3002, '127.0.0.1', function() {
    	console.log('plc client: Connected');
    	client.write('Hello, connection successful!');
    });

    client.on('data', function(data) {
    	console.log('plc client:  Received data: ' + data);
    	// client.destroy(); // kill client after server's response
    });

    client.on('error', function(error) {
      console.log('plc client: Received error: ',error );
    });

    client.on('close', function() {
    	console.log('plc client: Connection closed');
    });

}


var _tcpSerever = function(handler){

  // Keep track of the chat clients
  var clients = [];

  // Start a TCP Server
  net.createServer(function (socket) {

    // Identify this client
    socket.name = socket.remoteAddress + ":" + socket.remotePort

    // Put this new client in the list
    clients.push(socket);

    console.log('plc server: incoming client----',socket.name);

    // Send a nice welcome message and announce
    socket.write("Welcome " + socket.name + "\n");
    broadcast(socket.name + " joined the chat\n", socket);

    // Handle incoming messages from clients.
    socket.on('data', function (data) {
      console.log('plc server: got data----',data);
      broadcast(socket.name + "> " + data, socket);
    });

    // Remove the client from the list when it leaves
    socket.on('end', function () {
      console.log('plc server: client left----', socket.name );
      clients.splice(clients.indexOf(socket), 1);
      broadcast(socket.name + " left the chat.\n");
    });

    // Send a message to all clients
    function broadcast(message, sender) {
      clients.forEach(function (client) {
        // Don't want to send it to sender
        if (client === sender) return;
        client.write(message);
      });
      // Log it to the server output too
      process.stdout.write(message)
    }

  }).listen(3002);
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
