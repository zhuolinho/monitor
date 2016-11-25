var express = require('express');
var lib = require('./lib/lib');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var q = require('q');
var dispatcher = require('./app_modules/dispatcher/dispatcher.module');
var app = express();
var passport	= require('passport');


console.log('\nAPP: Loading APP ...');

  dispatcher().then(function(r){

          console.log('\nAPP: DISPATCHER is fully loaded ...');
            if(r && r.pl && r.pl.fn instanceof Function){




                  var handler = r.pl.fn;
                  var gps = require('./routes/gps')(handler);
                  var plc = require('./routes/plc')(handler);
                  // var index = require('./routes/index');
                  var users = require('./routes/users')(handler);
                  // view engine setup
                  // app.set('views', path.join(__dirname, 'views'));
                  app.set('view engine', 'hjs');

                  // uncomment after placing your favicon in /public
                  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
                  app.use(morgan('dev')); //log console

                  app.use(passport.initialize());
                  app.use(bodyParser.json());
                  app.use(bodyParser.urlencoded({ extended: false }));
                  app.use(cookieParser());
                  app.use(require('less-middleware')(path.join(__dirname, 'public')));
                  app.use(express.static(path.join(__dirname, 'public')));

                  // app.use('/', index);
                  app.use('/users', users);
                  app.use('/gps', gps);
                  app.use('/plc', plc);

                  //connecting to the database
                  mongoose.createConnection('mongodb://localhost:27017/test_db', function(err){
                    if(err) throw err;
                    else {
                        // console.log("test_db nonnection is up");
                    }

                  });

                  // catch 404 and forward to error handler
                  app.use(function(req, res, next) {
                    var err = new Error('Route Not Found');
                    err.status = 404;
                    next(err);
                  });

                  // error handlers

                  // development error handler
                  // will print stacktrace
                  // if (app.get('env') === 'development') {
                  //   app.use(function(err, req, res, next) {
                  //     res.status(err.status || 500);
                  //     res.render('error', {
                  //       message: err.message,
                  //       error: err
                  //     });
                  //   });
                  //
                  // }

            }
            else {
              console.log("App: Failed to dispatcher not available")
            }
      })
      .fail(function (r) {
              console.log('APP: INITIALIZATION FAILED : app/dispatcher ', r);
              return q({pl: null, er: {ec: null, em: r}})
    });

module.exports = app;
