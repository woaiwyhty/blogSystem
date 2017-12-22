/**
 * Created by dell on 2017/11/21.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../dbModules/adminusers');
var Section = require('../dbModules/sections');
function ensureAuthenticatedInLogin(req, res, next) {
    if(!req.session.adminuser) {
        return next();
    }
    res.redirect('/db');
}
function ensureAuthenticated(req, res, next){
    if(req.session.adminuser){
        return next();
    }
    res.redirect('/db/login');
}
router.get('/', ensureAuthenticated, function(req, res, next) {
    var login = false;
    if(req.session.adminuser) {
        login = true;
    }
    var sid = req.query.sid || null, pid = req.query.page || null;
    Section.getAllSections(function(err, doc) {
        if(err) return next();
        var secList = [], activeSec, topicList = [], activePage, totalPage;
        for(var i in doc) {
            var obj = {
                name: doc[i].name,
                count: doc[i].threadCount,
                id:  doc[i].idNumber
            };
            secList.push(obj);
        }
        if(doc !== null) {
            activeSec = sid !== null ? parseInt(sid) : secList[0].id;
        }
        activePage = pid !== null ? parseInt(pid) : 1;
        res.render('dashboard_section', {
            sectionList: secList
        })
    });

});

router.get('/login', ensureAuthenticatedInLogin, function(req, res, next) {
    res.render('dashboard_login', { title: 'Login'});
});
router.get('/logout', ensureAuthenticated, function(req, res, next) {
    req.session.adminuser = null;
    res.redirect('/db');
});
router.post('/login',
    passport.authenticate('local',
        { failureRedirect: '/db', failureFlash: "Invalid username or passport"}),
    function(req, res) {
        req.session.adminuser = req.user || null;
        res.redirect('/db');
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