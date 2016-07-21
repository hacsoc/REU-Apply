var express = require('express');

var User = require('../models/user');
var REU = require('../models/reu');

var reu = express.Router();

reu.get('/', function(req, res) {
    var ctx = {
        user: req.user,
        tb_highlighted: 'reu',
    };
    res.render('reu/search', ctx);
});

reu.post('/search', function(req, res) {
    var ctx = {
        user: req.user,
        tb_highlighted: 'reu',
    };

    var searchRXP = new RegExp(req.body.reu_search_info);

    REU.find({
        name: searchRXP,
        school: searchRXP,
        location: searchRXP,
        professors: searchRXP
    }, function(err, reus) {
        if(err) {
            console.log(err);
            ctx.results = [];
            return res.render('reu/search', ctx);
        }
        ctx.results = reus;
        return res.render('reu/search', ctx);
    });
});

module.exports = reu;