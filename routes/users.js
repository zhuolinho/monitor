var express = require('express');
var helpers = require('../utilities/helpers');
var router = express.Router();
var passport = require('passport');


module.exports = function (handler)
{

  router.post('/signup.json', function(req, res, next) {
        var param = {
          ns: 'auth',
          vs: '1.0',
          op: 'registerUser',
          pl:{
            user:req.body
          }
        };

        handler(param)
            .then(function (r) {
              console.log("user registered----",r);
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              // console.log(r.er);
              var r = {pl: null, er:r.er};
              helpers.sendResponse(res, 501, r);
            });
  });



  router.put('/update.json', function(req, res, next) {
        var param = {
          ns: 'auth',
          vs: '1.0',
          op: 'updateUser',
          pl:{
            user:req.body
          }
        };

        handler(param)
            .then(function (r) {
              console.log("user updated----",r);
               helpers.sendResponse(res, 200, r);
            })
            .fail(function (r) {
              // console.log(r.er);
              var r = {pl: null, er:r.er};
              helpers.sendResponse(res, 501, r);
            });
  });






  // login
router.post('/login.json', function(req, res) {

  var param = {
    ns: 'auth',
    vs: '1.0',
    op: 'authenticateUser',
    pl:{
      user:{name:req.body.username, pw:req.body.password}
    }
  };

  handler(param)
      .then(function (r) {
        console.log("user authenticated--",r);
         helpers.sendResponse(res, 200, r);
      })
      .fail(function (r) {
        console.log(r.er);
        var r = {pl: null, er: r.er};
        helpers.sendResponse(res, 200, r);
      });
});



router.get('/all.json', function(req, res) {

var param = {
  ns: 'auth',
  vs: '1.0',
  op: 'getUsers',
  pl:{}
};

handler(param)
    .then(function (r) {
      console.log("found users--");
       helpers.sendResponse(res, 200, r);
    })
    .fail(function (r) {
      console.log(r.er);
      var r = {pl: null, er: r.er};
      helpers.sendResponse(res, 501, r);
    });
});


router.get('/access.json', function(req, res) {

var param = {
  ns: 'auth',
  vs: '1.0',
  op: 'getAccessUsers',
  pl:{}
};

handler(param)
    .then(function (r) {
      console.log("found users--");
       helpers.sendResponse(res, 200, r);
    })
    .fail(function (r) {
      console.log(r.er);
      var r = {pl: null, er: r.er};
      helpers.sendResponse(res, 501, r);
    });
});



router.get('/offline.json', function(req, res) {

var param = {
  ns: 'auth',
  vs: '1.0',
  op: 'getOfflineUsers',
  pl:{}
};

handler(param)
    .then(function (r) {
      console.log("found users--");
       helpers.sendResponse(res, 200, r);
    })
    .fail(function (r) {
      console.log(r.er);
      var r = {pl: null, er: r.er};
      helpers.sendResponse(res, 501, r);
    });
});










// restricted routes...not used?
router.get('/admin.json', passport.authenticate('jwt', { session: false}), function(req, res) {

  var param = {
    ns: 'auth',
    vs: '1.0',
    op: 'hasAccess',
    pl:{
      headers:req.headers
    }
  };

  handler(param)
      .then(function (r) {
        console.log("user has accesss--",r);
         helpers.sendResponse(res, 200, r);
      })
      .fail(function (r) {
        console.log(r.er);
        var r = {pl: null, er: r.er};
        helpers.sendResponse(res, 501, r);
  });


});

  return router;
};
