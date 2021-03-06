var helpers = require("../utilities/helpers");
var gpsConf = require("../configs/gps");
var globalConf = require("../configs/global");
var lib = require("../lib/lib");
var express = require("express");
var net = require("net");
var client = new net.Socket();
var router = express.Router();

//socket-------
var gpsApp = require("express")();
var port = 3001;
var server = require("http").Server(gpsApp);
var io = require("socket.io")(server);
server.listen(port);

var q = require("q");
var count = 1000;

module.exports = function(handler) {
  router.get("/all.json", function(req, res, next) {
    var param = {
      ns: "gps",
      vs: "1.0",
      op: "getData",
      pl: {
        user: lib.reqUser(req)
      }
    };

    handler(param)
      .then(function(r) {
        helpers.sendResponse(res, 200, r);
      })
      .fail(function(r) {
        console.log(r.er);
        helpers.sendResponse(res, 404, r);
      });
  });

  router.get("/cars/all.json", function(req, res, next) {
    var param = {
      ns: "gps",
      vs: "1.0",
      op: "getAllCars",
      pl: {
        user: lib.reqUser(req)
      }
    };

    handler(param)
      .then(function(r) {
        helpers.sendResponse(res, 200, r);
      })
      .fail(function(r) {
        console.log(r.er);
        helpers.sendResponse(res, 404, r);
      });
  });

  router.get("/sim/all.json", function(req, res, next) {
    helpers.sendResponse(res, 200, {
      pl: {
        sim: gpsConf.simPlate
      }
    });
  });

  router.get("/alert/all.json", function(req, res, next) {
    var param = {
      ns: "gps",
      vs: "1.0",
      op: "gpsAlerts",
      pl: {
        user: lib.reqUser(req)
      }
    };

    handler(param)
      .then(function(r) {
        helpers.sendResponse(res, 200, r);
      })
      .fail(function(r) {
        console.log(r.er);
        helpers.sendResponse(res, 404, r);
      });
  });

  router.post("/alert.json", function(req, res, next) {
    var param = {
      ns: "gps",
      vs: "1.0",
      op: "newGpsAlert",
      pl: {
        data: req.body,
        org: globalConf.orgs[0]
      }
    };

    handler(param)
      .then(function(r) {
        helpers.sendResponse(res, 200, r);
      })
      .fail(function(r) {
        console.log(r.er);
        helpers.sendResponse(res, 404, r);
      });
  });

  router.get("/shipments/done.json", function(req, res, next) {
    var param = {
      ns: "gps",
      vs: "1.0",
      op: "getCompletedShipments",
      pl: { user: lib.reqUser(req) }
    };

    handler(param)
      .then(function(r) {
        helpers.sendResponse(res, 200, r);
      })
      .fail(function(r) {
        console.log(r.er);
        helpers.sendResponse(res, 404, r);
      });
  });

  router.post("/shipment.json", function(req, res, next) {
    var param = {
      ns: "gps",
      vs: "1.0",
      op: "newShipment",
      pl: { data: req.body, user: lib.reqUser(req) }
    };

    handler(param)
      .then(function(r) {
        helpers.sendResponse(res, 200, r);
      })
      .fail(function(r) {
        console.log(r.er);
        helpers.sendResponse(res, 404, r);
      });
  });

  router.post("/shipment/complete/download.json", function(req, res, next) {
    var param1 = {
      ns: "gps",
      vs: "1.0",
      op: "getCompletedShipments",
      pl: { start: req.body.start, end: req.body.end, user: lib.reqUser(req) }
    };

    var param2 = {
      ns: "gps",
      vs: "1.0",
      op: "downloadCompletedShipments",
      pl: { data: null }
    };

    handler(param1)
      .then(function(r) {
        param2.pl.data = r.pl.shipments;
        handler(param2)
          .then(function(r) {
            helpers.sendResponse(res, 200, r);
          })
          .fail(function(r) {
            helpers.sendResponse(res, 404, r);
          });
      })
      .fail(function(r) {
        helpers.sendResponse(res, 404, r);
      });
  });

  router.put("/shipment/done.json", function(req, res, next) {
    var param = {
      ns: "gps",
      vs: "1.0",
      op: "shipmentComplete",
      pl: { data: req.body, user: lib.reqUser(req) }
    };

    handler(param)
      .then(function(r) {
        helpers.sendResponse(res, 200, r);
      })
      .fail(function(r) {
        console.log(r.er);
        helpers.sendResponse(res, 404, r);
      });
  });

  //gps Connection
  _tcpCLient(handler);

  return router;
};

var _tcpCLient = function(handler) {
  client.connect(gpsConf.port, gpsConf.ip, function() {
    var delay = gpsConf.timer;
    var user = gpsConf.user;
    var initquery = queryGps(user)[0];
    // console.log("initquery--",initquery);

    client.write(initquery, function() {
      var timer = setInterval(function() {
        var query = queryGps(user)[1];
        // console.log("making request",query);
        client.write(query);
      }, delay);
    });
  });

  client.on("error", function(err) {
    console.log("GPS CONNECTION ERROR -----", err);
  });

  client.on("data", function(data) {
    var stream = data.toString("utf8");
    if (stream.length > 20) {
      processIncommingData(handler, stream);
    }
  });

  client.once("close", function() {
    setTimeout(function() {
      _tcpCLient(handler);
      console.log("Connection closed cd||||||");
    }, 4000);
  });

  client.once("end", function() {
    setTimeout(function() {
      _tcpCLient(handler);
      console.log("Connection ended cb|||||");
    }, 4000);
  });
};

function processIncommingData(handler, stream) {
  var param = {
    ns: "gps",
    vs: "1.0",
    op: "processIncommingData",
    pl: { stream: stream, org: globalConf.orgs[0] }
  };

  handler(param)
    .then(function(r) {
      console.log("route: gps successful");
      io.emit("carMove:" + globalConf.orgs[0].oID, r);
    })
    .fail(function(r) {
      console.log("route: gps process data  fail");
    });
}

function queryGps(user) {
  //@024|1234|01||8932,8932.pwd| ---handShake
  //@015|1235|02||8932|  ---requery

  var handShake = buildStreams(count, user).handShake;
  var requery = buildStreams(count, user).requery;
  var hlen = buildStreams(count, user).hlen;
  if (hlen > 999) {
    count = 1000;
    handShake = buildStreams(count, user).handShake;
    requery = buildStreams(count, user).requery;
    hlen = buildStreams(count, user).hlen;
  }

  var hlenStr = formatLen(hlen);
  var qlen = hlen - 9;
  var qlenStr = formatLen(qlen);

  count++;

  return ["@" + hlenStr + handShake, "@" + qlenStr + requery];
}

function buildStreams(count, user) {
  var hs = "|" + count + "|01||" + user + "," + user + ".pwd|";
  var q = "|" + count + "|02||" + user + "|";
  var hl = hs.length;
  return { handShake: hs, requery: q, hlen: hl };
}

function formatLen(len) {
  // console.log("len--",len)
  var newLen = len.toString();
  if (newLen.length < 2) {
    newLen = "00" + newLen;
  } else if (newLen.length < 3) {
    newLen = "0" + newLen;
  }

  // console.log("newLen--",newLen)
  return newLen;
}
