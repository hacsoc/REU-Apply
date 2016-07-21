var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var mongo_express = require('mongo-express/lib/middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// DB setup
require('./config/database.js')(mongoose);
var mongo_express_config = require('./config/admin.js');

// Auth setup
require('./config/passport')(passport);
app.use(session({ secret: "DavidLance" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routing
app.use('/', require('./routes/index'));
app.use('/profile', require('./routes/profile'));
app.use('/reu', require('./routes/reu'));
app.use('/apps', require('./routes/application'));
app.use('/admin', require('./routes/admin'));
app.use('/db', mongo_express(mongo_express_config));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404', {});
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
