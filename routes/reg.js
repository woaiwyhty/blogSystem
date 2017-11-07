/**
 * Created by dell on 2017/11/3.
 */
var express = require('express');
var router = express.Router();
var User = require('../dbModules/user');
var valid = require('../dataProcess/validation');
router.get('/', function(req, res, next) {

});


router.post('/', ensureAuthenticatedInLogin, function(req, res, next) {
    valid.register(req.body.info);

});