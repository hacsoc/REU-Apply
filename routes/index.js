var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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
    
    res.render('index', { title: 'REU Apply', side_menu: side_menu});
});


router.get('/sign-up', function(req, res, next) {
    res.render('sign-up', { title: 'Sign Up' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
});

router.post('/login', function(req, res, next) {
    
    
    res.render('index', { title: 'REU Apply' });
});

router.get('/forgotten-password', function(req, res, next) {
    res.render('index', { title: 'REU Apply' });
});

module.exports = router;
