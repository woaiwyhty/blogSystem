/**
 * Created by dell on 2017/11/3.
 */
var express = require('express');
var router = express.Router();
var User = require('../dbModules/user');
var valid = require('../dataProcess/validation');
function ensureAuthenticatedInLogin(req, res, next) {
    if(!req.session.user) {
        return next();
    }
    res.redirect('/main');
}


router.get('/', function(req, res, next) {
    res.render('register');
});


router.post('/', ensureAuthenticatedInLogin, function(req, res, next) {
    valid.register(req.body.username, req.body.password, req.body.email, req.body.birthday);
    User.idNumberInc(function(err, doc) {
        if(err) return next();
        var info = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: new Date(req.body.birthday),
            idNumber: doc.idNumber
        };
        User.addUser(info, function(err, doc) {
            if(err) return next();
            res.send({retCode: 0});
        })
    });
});

module.exports = router;