var express = require('express');
var passport = require('passport');
var validator = require('validator');
var request = require('request');

var User = require('../models/user');

var router = express.Router();

router.get('/sign-up', function(req, res) {
    res.render('sign-up', { flash: req.flash('signupMessage') });
});

router.get('/login', function(req, res) {
    res.render('login', { flash: req.flash('loginMessage') });
});

// process the sinup form
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

router.get('/auth/linkedin/callback', function(req, res) {
    if(req.query.error) throw req.query.error;
    if(req.query.state != "0928354") throw "CSRF Attack error";

    var li = req.user.linkedin;
    // ignore this for now
    if(li && li.token && li.timestamp && (new Date()).getTime()/1000 - li.timestamp.getTime()/1000 < 60*60*24*60) {
	var options = {
	    url: "https://api.linkedin.com/v1/people/~?format=json",
	    headers: {
		Authorization: "Bearer " + li.token,
	    }
	};

	request.post(options, function(err, resp, body) {
	    if(err) throw err;
	    var data = JSON.parse(body);
	    if(data.error) throw data.error;

	    res.render('profile', { user: req.user });
	});
    } else {
	var options = {
	    uri: 'https://www.linkedin.com/oauth/v2/accessToken',
	    headers: {
	    },
	    qs: {
		client_id: '77tgqz6flgej2j',
		client_secret: 'jGjoCdApJjgkGtdG',
		grant_type: 'authorization_code',
		redirect_uri: "http://reu-apply.com/auth/linkedin/callback",
		code: req.query.code
	    },
            headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
            }
	};
    
	request.post(options, function(err, resp, body) {
	    if(err) throw err;
	    var data = JSON.parse(body)
	    if(data.error) throw data.error;
	    User.findById(req.user._id, function(err, user) {
		if(err) throw err;

		user.linkedin.token = data["access_token"];
		user.linkedin.timestamp = new Date();
		user.save();
	    });
	    var options = {
		url: "https://api.linkedin.com/v1/people/~?format=json",
		headers: {
		    Authorization: "Bearer " + data.access_token,
		}
	    };
	    request.post(options, function(err, resp, body) {
		if(err) throw err;
		var data = JSON.parse(body);
		if(data.error) throw data.error;

		res.render('profile', { user: req.user });
	    });
	});
    }
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;
