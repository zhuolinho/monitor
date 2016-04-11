
'use strict';


var mongoose = require('mongoose');
var passport	= require('passport');
var config   = require('../../configs/database');
var User   = require('../../models/user');
var jwt    = require('jwt-simple');

var q = require('q');

var auth = {};


auth.init = function(m) {
    var r = {pl: {} , er:''};

        mongoose.connect(config.database); //can't user create connection;
        require('../../configs/passport')(passport);



        // pass passport for configuration

    //  mongoose.createConnection(config.database, function (err) {
    //    if(err) throw err;
    //    else{
    //      console.log('auth db is up ');
    //    }
     //
    //  });


    return q(r);

}








auth.registerUser = function(m){

  var r = {pl: {}, er:'',em:''};
  var deferred = q.defer();

  if(m.pl && m.pl.user && m.pl.user.name && m.pl.user.password){
      var newUser = new User({
                          name:m.pl.user.name,
                          password:m.pl.user.password
                        });

        newUser.save(function (err, user){
          // console.log('user saved--',err,user);
            if (err){
              r.er = err;
              r.em = 'invalid user. already exist?';
              deferred.reject(r);
            }
            else{
              r.pl.user = user;
              deferred.resolve(r);
            }
        });
    }
    else {
      r.er =  "no user name or password";
      deferred.reject(r);
    }
  return deferred.promise;

}


auth.authenticateUser = function(m){
  var r = {pl: {}, er:''};
  var deferred = q.defer();

  User.findOne({
    name: m.pl.user.name    //phone or unique id
  }, function(err, user) {
    if (err){
      r.er = err;
      deferred.reject(r);
    }
    else {
      if (!user) {
          r.er = 'Authentication failed. User not found';
          deferred.reject(r);
      } else {
        // check if password matches
        user.comparePassword(m.pl.user.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            user.ll = new Date(); //update last login
            user.save(function(err,user){
                if(err){
                  r.pl.success = false;
                  r.er = 'Could not update last login';
                  deferred.reject(r);
                }
                else {
                  console.log('user saved after login',user);
                  r.pl.success = true;
                  r.pl.token = 'JWT ' + token;
                  r.pl.user = user;
                  deferred.resolve(r);
                }
            });

          } else {
            r.pl.success = false;
            r.er = 'Authentication failed. User not found';
            deferred.reject(r);
          }
        });
      }
    }

  });

 return deferred.promise;

}

auth.getUsers = function(m){
  var r = {pl: {}, er:''};
  var deferred = q.defer();
    User.find({},function(err,users){

      if(err){
        r.er = err;
        deferred.reject(r);
      }
        r.pl.users = users;
        deferred.resolve(r);
    });

    return deferred.promise;
}


auth.hasAccess = function(m){

  var r = {pl:{},er:''};
  var deferred = q.defer();

  if(m.pl.headers){
    var token = _getToken(m.pl.headers);
    if (token) {
      var decoded = jwt.decode(token, config.secret);
      User.findOne({
        name: decoded.name
      }, function(err, user) {
          if (err) {
              r.er = err;
              deferred.reject(r);
          }

          if (!user) {
              r.pl.success = false;
              r.pl.er = 'Authentication failed. User not found.'
              defrred.reject(r);
          } else {
            r.pl.success =true;
            r.pl.ms = "vip user---";
            deferred.resolve(r);
          }
      });
    } else {
      r.er = "No token provided";
      deferred.reject(r);
    }
  }else {
    r.er = "No token provided";
    deferred.reject(r);
  }

  return deferred.promise;
}




var _getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


module.exports = auth;
