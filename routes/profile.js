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
    res.render('profile/edit', ctx);
});

profile.get('/edit', function(req, res) {
    var ctx = {
        user: req.user,
        tb_highlighted: 'profile',
    };
    res.render('profile/edit', ctx);
});

profile.post('/edit', function(req, res) {
    var ctx = {
        user: req.user,
        tb_highlighted: 'profile',
    };

    var form = req.body;
    User.findById(req.user._id, function(err, user) {
        if(err) {
            console.log(err);
            ctx.flash = { type: 'invalid', message: 'User lookup error'};
            return res.render('profile/edit', ctx);
        }

        if(form.email && form.email != req.user.local.email) {
            if(validator.isEmail(form.email)) {
                user.local.email = form.email;
            } else {
                ctx.flash = { type: 'invalid', message: 'Invalid email' };
                return res.render('edit-profile', ctx);
            }
        } if(form.first_name) {
            user.profile.first_name = form.first_name;
        } if(form.last_name) {
            user.profile.last_name = form.last_name;
        }

        user.save();
        ctx.user = user;
        ctx.flash = { type: 'success', message: "Profile updated successfully!" };
        res.render('profile/edit', ctx);
    });
});

profile.get('/setup', function(req, res) {
    var ctx = {
        user: req.user,
        tb_highlighted: 'profile',
    };
    res.render('profile/setup', ctx);
});


module.exports = profile;
