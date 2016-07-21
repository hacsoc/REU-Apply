var express = require('express');
var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('../config/admin.js');

var User = require('../models/user');
var Application = require('../models/application');
var REU = require('../models/reu');

var admin = express.Router();

admin.use('/', function(req, res, next) {
    res.redirect('/db');
});

module.exports = admin;