
'use strict';


var mongoose = require('mongoose');
var passport	= require('passport');
var config   = require('../../configs/database');
var User   = require('../../models/user');
var jwt    = require('jwt-simple');
var UserCounter = require('../../models/user-counter');

var q = require('q');

var auth = {};


auth.init = function(m) {
    var r = {pl: {} , er:''};

        mongoose.connect(config.database); //can't user create connection;
        require('../../configs/passport')(passport);

        UserCounter.find({code:"users"},function(error, doc){
          if(doc&&doc.length){
              return;
         }else {
           // save counter to init it of not there.
          var counter = new UserCounter({});
          counter.save(function(error, counter){});
         }
        });

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

  console.log("register user----");

  var r = {pl: {}, er:'',em:''};
  var deferred = q.defer();


  if(m.pl && m.pl.user && m.pl.user.name && m.pl.user.pw){

      var ap = parseInt(m.pl.user.ap);
      var sex = m.pl.user.sex?parseInt(m.pl.user.sex):0;
      var newUser = new User({
                          name:m.pl.user.name,
                          pw:m.pl.user.pw,
                          addr:m.pl.user.addr,
                          ap:ap,
                          sex:sex,
                          phone:m.pl.user.phone,
                          an:''
                        });


       UserCounter.findOne({code: 'users'},function(error, counter){
         counter.seqs['sid'+ap] +=1;

         counter.save(function(err1, cnt){
           newUser.an = cnt.seqs['sid'+ap];
           if(!err1){
             console.log("user to save---", newUser);

             newUser.save(function (err2, user){
               console.log("new use saved----",user);
                 if (!err2){
                   r.pl.user = user;
                   deferred.resolve(r);
                 }
                 else{
                   r.er = err2;
                   r.em = 'invalid user. already exist?';
                   deferred.reject(r);
                 }
             });
           }
           else {
             r.er =  "could not increment user id";
             deferred.reject(r);
           }
         })

       });

    }
    else {
      r.er =  "no user name or password";
      deferred.reject(r);
    }
  return deferred.promise;
}



auth.updateUser = function(m){

  console.log("update user----");

  var r = {pl: {}, er:'',em:''};
  var deferred = q.defer();

  if(m.pl && m.pl.user && m.pl.user.an ){
    User.findOneAndUpdate({ an: m.pl.user.an }, m.pl.user, { new: true }, function(err, user) {
              if (err){
                r.er = err;
                r.em = 'problem fiding user';
                deferred.reject(r);
              }
              else{
                r.pl.user = user;
                deferred.resolve(r);
              }
    });
    }
    else {
      r.er =  "no user account provided";
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
        user.comparePassword(m.pl.user.pw, function (err, isMatch) {
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
            r.er = 'Authentication failed. passport not matching';
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


auth.getAccessUsers = function(m){
  var r = {pl: {}, er:''};
  var deferred = q.defer();
  // Thing.find().gt('age', 21)
    User.find().where('an').lt(60000).exec(
      function(err,users){

        if(err){
          r.er = err;
          deferred.reject(r);
        }
          r.pl.users = users;
          deferred.resolve(r);
      });
    return deferred.promise;
}


auth.getOfflineUsers = function(m){
  var r = {pl: {}, er:''};
  var deferred = q.defer();
  // Thing.find().gt('age', 21)
    User.find().where('an').gte(600).exec(
      function(err,users){

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
