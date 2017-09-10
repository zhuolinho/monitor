
'use strict';


var mongoose = require('mongoose');
var passport	= require('passport');
var config   = require('../../configs/database');
var User   = require('../../models/user');
var jwt    = require('jwt-simple');
// var UserCounter = require('../../models/user-counter');
var OrgCounter = require('../../models/org-counter');
var Organization = require('../../models/org');

var q = require('q');

var auth = {};


auth.init = function(m) {
    var r = {pl: {} , er:''};

        mongoose.connect(config.database); //can't user create connection;
        require('../../configs/passport')(passport);

        OrgCounter.findOne({code:"org"},function(error, doc){
          if(doc){
              return;
         }else {
           // save counter to init it of not there.
          var counter = new OrgCounter({});
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

  if(m && m.pl && m.pl.data && m.pl.data.name && m.pl.data.pw &&  m.pl.user.oID){

    var data = m.pl.data;

      var ap = parseInt(data.ap);
      var sex = data.sex?parseInt(data.sex):0;
      var newUser = new User({
                          name:data.name,
                          pw:data.pw,
                          addr:data.addr,
                          ap:ap,
                          sex:sex,
                          phone:data.phone,
                          email:data.email,
                          an:''
                        });


       Organization.findOne({oID: m.pl.user.oID},function(error1, doc1){

         if(!error1){


           doc1.ouc['sid'+ap] +=1;

           newUser.setOrg(doc1, function(temperr,tmpuser){
               doc1.save(function(error2, doc2){

                   if(!error2){
                      newUser.an = doc2.ouc['sid'+ap];
                     console.log("user to save---", newUser);

                     newUser.save(function (error3, doc3){
                       console.log("new use saved----",doc3);
                         if (!error3){
                           r.pl.user = doc3;
                           deferred.resolve(r);
                         }
                         else{
                           r.er = error3;
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
           })
       }
       else{
         r.er = error1;
         r.em = 'could not find organization';
         deferred.reject(r);
       }
     })
    }
    else {
      r.er =  "no user name or password";
      deferred.reject(r);
    }

  return deferred.promise;
}



auth.createOrganization = function(m){

  console.log("createOrganization------");

  var r = {pl: {}, er:'',em:'',rber:''};
  var deferred = q.defer();


  if(m && m.pl&& m.pl.org){

        var orgParam = m.pl.org;

        OrgCounter.findOne({code:"org"},function(error1, doc1){
          console.log("orgcounter----");
          if(doc1){
            doc1.oc+=1;
            doc1.save(function(error2, doc2){

              if(doc2){
                var org = new Organization({
                    name:orgParam.name,
                    email:orgParam.email,
                    desc:orgParam.desc,
                    oID:doc2.oc
                });

                org.save(function(error3, doc3){
                  if(doc3){
                    var ap = 1;
                    var newUser = new User({    //create default user.
                                        name:doc3.email,
                                        oID:doc3.oID,
                                        pw:'admin',
                                        ap:ap,
                                        email:doc3.email,
                                        an:''
                                      });



                         doc3.ouc['sid'+ap] +=1;
                         doc3.save(function(error4, org){

                             if(!error4){
                                newUser.an = org.ouc['sid'+ap];
                               console.log("user to save---", newUser);

                               newUser.save(function (error5, user){
                                 console.log("new use saved----",user);
                                   if (!error5){
                                     r.pl.user = user;
                                     r.pl.org = org;
                                     deferred.resolve(r);
                                   }
                                   else{
                                     //decrement org counter and remove created org if error
                                     //decrement counter
                                     OrgCounter.findOne({code:"org"},function(rollbackOrgCounterErr3, rollbackOrgCounterParam3){
                                       rollbackOrgCounterParam3.oc-=1;
                                       rollbackOrgCounterParam3.save(function(saveRberror3, saveRbdoc3){
                                         //remove org
                                         Organization.findOneAndRemove({oID:doc3.oID},function(rollbackUserCounterErr1, rollbackUserCounterParam1){
                                             r.er = error5;
                                             r.rber = rollbackOrgCounterErr3; //rollback error
                                             r.rber2 = saveRberror3;
                                             r.em = 'invalid user. already exist?';
                                              console.log('mod errr log: ',r.em);
                                             deferred.reject(r);
                                          });
                                      });
                                    });
                                   }
                               });
                             }
                             else {
                                  //decrement org counter and remove created org if error
                                  //decrement counter
                                  OrgCounter.findOne({code:"org"},function(rollbackOrgCounterErr2, rollbackOrgCounterParam2){
                                    rollbackOrgCounterParam2.oc-=1;
                                    rollbackOrgCounterParam2.save(function(saveRberror2, saveRbdoc2){
                                      //remove org
                                      Organization.findOneAndRemove({oID:doc3.oID},function(rollbackUserCounterErr1, rollbackUserCounterParam1){
                                          r.er = error4;
                                          r.rber = rollbackOrgCounterErr2; //rollback error
                                          r.rber2 = rollbackUserCounterErr1;
                                          r.em = 'could not increment user count';
                                          console.log('mod errr log: ',r.em);
                                          deferred.reject(r);
                                       });
                                   });
                                });
                             }

                       })

                  }
                  else{
                    OrgCounter.findOne({code:"org"},function(rollbackOrgCounterErr1, rollbackOrgCounterParam){
                      rollbackOrgCounterParam.oc-=1;
                      rollbackOrgCounterParam.save(function(saveRberror, saveRbdoc){
                              r.er = error3;
                              r.rber = saveRberror; //rollback error
                              r.em = 'error creating oranization: org already exist? ';
                              console.log('mod errr log: ',r.em);
                              deferred.reject(r);
                           });
                        });

                      }

              });
            }
            else{
              r.er = error2;
              r.em = 'error incrementing orgcounter';
              console.log('mod errr log: ',r.em);
              deferred.reject(r);
            }
          });

        }
        else{

          r.em = ' orgcounter not found';
            console.log('mod errr log: ',r.em);
          deferred.reject(r);
        }
      });
    }
  else{
        r.em = 'no oranization provided';
          console.log('mod errr log: ',r.em);
        deferred.reject(r);
    }

  return deferred.promise;
}





auth.updateUser = function(m){

  console.log("update user----");

  var r = {pl: {}, er:'',em:''};
  var deferred = q.defer();

  if(m.pl && m.pl.user && m.pl.user.an ){
    User.findOneAndUpdate({ an: m.pl.user.an, oID:m.pl.user.oID }, m.pl.user, { new: true }, function(err, user) {
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
  $or:[{ 'name': m.pl.user.name}, { 'phone': m.pl.user.name}]
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

  if(m&&m.pl&&m.pl.user&&m.pl.user.oID){
      User.find({oID:m.pl.user.oID},  function(err,users){

            if(err){
              r.er = err;
              deferred.reject(r);
            }
              r.pl.users = users;
              deferred.resolve(r);
          });
    }
    else{
      r.er = 'oranization id not provided';
      deferred.reject(r);
    }


    return deferred.promise;
}


auth.getAccessUsers = function(m){
  var r = {pl: {}, er:''};
  var deferred = q.defer();
  if(m&&m.pl&&m.pl.user&&m.pl.user.oID){
    User.find({oID:m.pl.user.oID})
    .where('an')
    .lt(60000000000)
    .exec(
        function(err,users){

          if(err){
            console.log("errr----->>>--",err);
            r.er = err;
            deferred.reject(r);
          }
            r.pl.users = users;
            deferred.resolve(r);
        });
  }
  else{
    r.er = 'oranization id not provided';
    deferred.reject(r);
  }

    return deferred.promise;
}


auth.getOfflineUsers = function(m){
  var r = {pl: {}, er:''};
  var deferred = q.defer();
      if(m&&m.pl&&m.pl.user&&m.pl.user.oID){
        User.find({oID:m.pl.user.oID}).where('an').gte(60000000000).exec(
            function(err,users){

              if(err){
                r.er = err;
                deferred.reject(r);
              }
                r.pl.users = users;
                deferred.resolve(r);
            });
      }
      else{
        r.er = 'oranization id not provided';
        deferred.reject(r);
      }

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
              deferred.reject(r);
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
