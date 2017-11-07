var express = require('express');
var router = express.Router();
var User = require('../dbModules/user.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



function ensureAuthenticated(req, res, next){
    if(req.session.user){
        return next();
    }
    res.redirect('/login');
}
function ensureAuthenticatedInLogin(req, res, next) {
    if(!req.session.user) {
        return next();
    }
    res.redirect('/main');
}
router.get('/login', ensureAuthenticatedInLogin, function(req, res, next) {
    res.render('login', { title: 'Login'});
});

router.post('/login',
    passport.authenticate('local',
        { failureRedirect: '/', failureFlash: "Invalid username or passport"}),
    function(req, res) {
        req.session.user = req.user || null;
        res.redirect('/main');
    }
);

passport.serializeUser(function(user, done) {
    done(null, user.id); //store login status
});

passport.deserializeUser(function(id, done) {
    User.getUserIDbyID(id, function(err, doc) {
        done(null, doc);
    });
});

passport.use(new LocalStrategy(function(username, password, done) {
    User.getUserNameByName(username, function(err, doc) {
        if(err) throw err;
        if(!doc) {
            console.log('error');
            return done(null, false, { message: "Unknown username" });
        }
        if(User.comparePassword(password, doc.password)) {
            return done(null, doc);
        }
        return done(null, false, { message: "Incorrect password" });
    })
}));

module.exports = router;