var express = require('express');
var helpers = require('../utilities/helpers');
var router = express.Router();
var passport = require('passport');


module.exports = function (handler)
{

  router.post('/signup', function(req, res, next) {
        var param = {
          ns: 'auth',
          vs: '1.0',
          op: 'registerUser',
          pl:{
            user:{
              name:req.body.name,
              password:req.body.password
            }
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






  // login
router.post('/authenticate', function(req, res) {

  var param = {
    ns: 'auth',
    vs: '1.0',
    op: 'authenticateUser',
    pl:{
      user:{
        name:req.body.name,
        password:req.body.password
      }
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
        helpers.sendResponse(res, 501, r);
      });
});










// restricted routes
router.get('/admin', passport.authenticate('jwt', { session: false}), function(req, res) {

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



//  var token = getToken(req.headers);
  // if (token) {
  //   var decoded = jwt.decode(token, config.secret);
  //   User.findOne({
  //     name: decoded.name
  //   }, function(err, user) {
  //       if (err) throw err;
  //
  //       if (!user) {
  //         return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
  //       } else {
  //         res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
  //       }
  //   });
  // } else {
  //   return res.status(403).send({success: false, msg: 'No token provided.'});
  // }
});



  // _tcpCLient(handler);

  return router;
};
