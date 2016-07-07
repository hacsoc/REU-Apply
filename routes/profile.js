var express = require('express');
var passport = require('passport');
var validator = require('validator');

var User = require('../models/user');

var profile = express.Router();

profile.get('/', function(req, res) {
    var ctx = {
        user: req.user,
        tb_highlighted: 'profile',
    };
    res.render('profile', ctx);
});

profile.get('/edit', function(req, res) {
    var ctx = {
        user: req.user,
        tb_highlighted: 'profile',
    };
    res.render('edit-profile', ctx);
});

profile.post('/edit', function(req, res) {
    var ctx = {
        user: req.user,
        tb_highlighted: 'profile',
    };
    if(req.body.email != req.user.local.email) {
        if(validator.isEmail(req.body.email)) {
            User.findByIdAndUpdate(req.user._id, { $set: { 'local.email': req.body.email }}, function (err, user) {
                if (err) throw err;
            });
        } else {
            ctx.flash = { type: 'invalid', message: 'Invalid email' };
            return res.render('edit-profile', ctx);
        }
    }

    ctx.flash = { type: 'success', message: "Profile updated successfully!" };
    res.render('profile', ctx);
});

profile.get('/setup', function(req, res) {
    var ctx = {
        tb_highlighted: 'profile',
    };
    res.render('setup-profile', ctx);
});


module.exports = profile;
