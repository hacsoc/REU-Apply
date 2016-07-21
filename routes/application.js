var express = require('express');

var User = require('../models/user');
var Application = require('../models/application');
var REU = require('../models/reu');

var apps = express.Router();

apps.get('/', function(req, res) {
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

apps.post('/apply', function(req, res) {
    var id = req.body.reu;
    User.findById(req.user._id, function(err, user) {
        if(err) throw err;
        REU.findById(id, function(err, reu) {
            if(err) throw err;
            Application.find({reuId: id}, function(err, apps) {
                if(err) throw err;

                var app;
                if(apps.length > 0) {
                    app = apps[0];
                } else {
                    ctx.flash = { type: 'success', message: 'New application created!'};
                    app = new Application({
                        reuId: id,
                        status: "unsubmitted",
                        name: reu.name,
                    });
                    app.save();
                    user.applications.push(app._id);
                    user.save();
                }

                res.redirect('/apps');
            });
        });
    });
});

module.exports = apps;