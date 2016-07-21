var express = require('express');
var passport = require('passport');
var validator = require('validator');
var request = require('request');

var User = require('../models/user');
var Application = require('../models/application');

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
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.use(isLoggedIn);

/* GET home page. */
router.get('/home',  function(req, res) {
    var ctx = {
        user: req.user,
        tb_highlighted: "dashboard",
    };
    
    User.findById(req.user._id, function(err, user) {
        if(err) throw err;
        Application.find({
            '_id': { $in: user.applications }
        }, function(err, apps) {
            if(err) throw err;
            ctx.applications = apps;
            return res.render('home', ctx);
        });
    });
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

    User.findById(req.user._id, function(err, user) {
	if(err) throw err;
	var li = user.linkedin;
	if(li && li.token && li.timestamp && (new Date()).getTime()/1000 - li.timestamp.getTime()/1000 < 60*60*24*60) {
	    getLinkedInProfile(user, res);
	} else {
	    var options = {
    		uri: 'https://www.linkedin.com/oauth/v2/accessToken',
    		qs: {
    		    client_id: '77tgqz6flgej2j',
    		    client_secret: 'jGjoCdApJjgkGtdG',
    		    grant_type: 'authorization_code',
    		    redirect_uri: 'http://reu-apply.com/auth/linkedin/callback',
    		    code: req.query.code,
    		    scope: 'r_fullprofile'
    		},
    		headers: {
    		    'Content-Type': 'application/x-www-form-urlencoded',
    		}
	    };
	    
	    request.post(options, function(err, resp, body) {
		if(err) throw err;
		var data = JSON.parse(body);
		if(data.error) throw data.error;
		if(data.access_token === undefined || data.access_token === 'undefined') throw "undefined return error";
		user.linkedin.token = data.access_token;
		user.linkedin.timestamp = new Date();
		user.save();

		getLinkedInProfile(user, res);
	    });
	}
    });
});

function getLinkedInProfile(user, res) {
    var options = {
	url: "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,formatted-name,headline,location,industry,summary,specialties,positions,public-profile-url,picture-url,associations,interests,publications,patents,languages,skills,certifications,educations,courses,volunteer,recommendations-received,date-of-birth,honors-awards)?format=json",
	headers: {
	    Authorization: "Bearer " + user.linkedin.token,
	}
    };
    
    request.get(options, function(err, resp, body) {
	if(err) throw err;
	var data = JSON.parse(body);
	if(data.errorCode !== undefined) {
	    console.log(data);
	    throw "LinkedIn Request error";
	}

	user.first_name = data.firstName;
	user.last_name = data.lastName;
	user.formatted_name = data.firstName + " " + data.lastName;
	user.headline = data.headline;
	user.location = data.location;
	user.summary = data.summary;
	user.specialties = data.specialties;
	user.positions = data.positions;
	user.linkedin_url = data.publicProfileUrl;
	user.associations = data.associations;
	user.interests = data.interests;
	user.publications = data.publications;
	user.patents = data.patents;
	user.languages = data.languages;
	user.skills = data.skills;
	user.certifications = data.certifications;
	user.educations = data.educations;
	user.courses = data.courses;
	user.volunteer = data.volunteer;
	user.recommendations_received = data.recommendationsReceived;
	user.dob = data.dateOfBirth;
	user.honors_awards = data.honorsAwards;
	user.save();
	console.log(data);
	res.render('profile', { user: user });
    });
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;
