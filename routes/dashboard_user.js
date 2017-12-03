/**
 * Created by dell on 2017/12/2.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var AdminUser = require('../dbModules/adminusers');
var User = require('../dbModules/user');
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
    res.render('dashboard_user');
});

router.post('/', ensureAuthenticated, function(req, res, next) {
    //console.log(req.body);
    if(req.body.draw == null) return next();
    User.getAllUsers(parseInt(req.body.draw), function(err, doc) {
        if(err) return next();
        var data = [], resData = {
            draw: 0,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: null
        };
        for(var i in doc) {
            var obj = {
                idNumber: doc[i].idNumber,
                username: doc[i].username,
                password: doc[i].password
            };
            data.push(obj);
        }
        resData.data = data;
        User.getCount(function(err, cnt) {
            if(err) return next();
            resData.recordsFiltered = cnt;
            resData.recordsTotal = cnt;
            resData.draw = parseInt(req.body.draw);
            res.send(resData);
        })
    })
});

router.post('/admin', ensureAuthenticated, function(req, res, next) {
    if(req.body.draw == null) return next();
    AdminUser.getAllUsers(parseInt(req.body.draw), function(err, doc) {
        if(err) return next();
        var data = [], resData = {
            draw: 0,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: null
        };
        for(var i in doc) {
            var obj = {
                idNumber: parseInt(i) + 1,
                username: doc[i].username,
                password: doc[i].password
            };
            data.push(obj);
        }
        resData.data = data;
        AdminUser.getCount(function(err, cnt) {
            if(err) return next();
            resData.recordsFiltered = cnt;
            resData.recordsTotal = cnt;
            resData.draw = parseInt(req.body.draw);
            res.send(resData);
        })
    });
});
module.exports = router;