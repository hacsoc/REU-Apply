var express = require('express');
var passport = require('passport');
var validator = require('validator');

var User = require('../models/user');

var router = express.Router();

router.get('/sign-up', function(req, res) {
    res.render('sign-up', { flash: req.flash('signupMessage') });
});

router.post('/sign-up', passport.authenticate('local-signup', {
    successRedirect : '/profile/setup', // redirect to the secure profile section
    failureRedirect : '/sign-up', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.use(isLoggedIn);

/* GET home page. */
router.get('/home',  function(req, res) {
    var side_menu = {
        title: "Home",
        items: [
            { href: "#",
              text: "tset 1" },
            { href: "#",
              text: "test2" },
            { href: "#",
              text: "test 3"},
        ],
    };

    var ctx = {
        side_menu: side_menu,
        tb_highlighted: "dashboard",
    };
    
    res.render('home', ctx);
});

router.get('/about', function(req, res) {
    res.render('about');
});

router.get('/forgotten-password', function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/', function(req, res) {
    res.redirect('/home');
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    var ctx = {
        flash: req.flash('loginMessage'),
    };
    res.render('login', ctx);
}

module.exports = router;
