var express = require('express');

var User = require('../models/user');
var Application = require('../models/application');

var apps = express.Router();

apps.get('/', function(req, res) {
    //console.log(req.user);
    var ctx = {
        user: req.user,
        tb_highlighted: 'apps',
    };

    User.findById(req.user._id, function(err, user) {
        if(err) throw err;
        Application.find({
            '_id': { $in: user.applications }
        }, function(err, apps) {
            if(err) throw err;
            ctx.applications = apps;
            return res.render('application/view', ctx);
        });
    });
});

module.exports = apps;