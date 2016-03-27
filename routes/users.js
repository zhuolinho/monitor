var express = require('express');
var userModel = require('../models/users');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', function(req, res, next) {
      userModel.find(function (err, users) {
        if (err) return console.error(err);
        res.send(users);
      })
});

router.get('/single/:name', function(req, res, next) {
      userModel.find({name:'rolland'},function (err, users) {
        if (err) return console.error(err);
        res.send(users);
      })
});

router.get('/new/:name/:email', function(req, res, next) {
  console.log("query",req.params);
  var newUser = new userModel();
  newUser.name = req.params.name;
  newUser.email = req.params.email;
  console.log("new user",newUser);
  newUser.save(function(err){
    if(err){
      throw err;
    }
    res.send(200,newUser);
  })

});

module.exports = router;
