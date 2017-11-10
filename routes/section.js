/**
 * Created by Wu on 11/8/2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../dbModules/user');
var valid = require('../dataProcess/validation');
var Section = require('../dbModules/sections')
router.get('/', function(req, res, next) {
    // get all sections
    Section.getAllSections(function(err, doc) {
        if(err) return next();
        var infoArr = [];
        for(var i in doc) {
            var obj = {
                sectionName: doc[i].name,
                threadCounts: doc[i].threadCount,
                idNumber: doc[i].idNumber
            };
            infoArr.push(obj);
        }

        res.send({ retCode: 0, resArr: infoArr });
    })
});


function ensureAdministrator(req, res, next) {
    if(req.session.admin) {
        return next();
    }
    res.status(404);
    res.send('you cant do this');
}

router.post('/', ensureAdministrator, function(req, res, next) {
    // add a section
    if(!valid.section(req.body.sectionName))
        return next();
    Section.idNumberInc(function(err, doc) {
        if(err) return next();
        var info = {
            name: req.body.sectionName,
            threadCount: 0,
            idNumber: doc.idNumber
        };
        Section.addSection(info, function(err, doc) {
            if(err) return next();
            res.send({ retCode: 0 });
        });
    })
});

module.exports = router;