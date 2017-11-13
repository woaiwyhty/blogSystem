/**
 * Created by Wu on 11/8/2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../dbModules/user');
var valid = require('../dataProcess/validation');
var Section = require('../dbModules/sections');
var Thread = require('../dbModules/thread');

function ensureAuthenticated(req, res, next){
    if(req.session.user){
        return next();
    }
    res.redirect('/login');
}


router.get('/', function(req, res, next) {
    var id = req.query.tid;
    Thread.getThreadByIdNumber(id, function(err, doc) {
        if(err || doc == null) return next();
        var info = {
            threadTitle: doc.threadTitle,
            threadContent: doc.threadContent,
            threadDate: doc.threadDate.getFullYear() + '/' + doc.threadDate.getMonth() + '/' + doc.threadDate.getDate(),
            userName: doc.userName,
            sectionName: doc.belongSectionId.name,
            sectionId: doc.belongSectionId.idNumber
        };
        res.send({ retCode: 0, res: info });
    });
});

router.post('/', ensureAuthenticated, function(req, res, next) {
    if(!valid.thread(req.body.title, req.body.content, req.body.sectionID))
        return next();
    var info = {
        threadTitle: req.body.title,
        threadContent: req.body.content,
        threadDate: new Date(),
        belongUserId: null,
        belongSectionId: null,
        userName: req.session.user.username,
        idNumber: null
    };
    Section.getSectionByIdNumber(req.body.sectionID, function(err, doc) {
        if(err) return next();
        info.belongSectionId = doc._id;
        User.getUserNameByName(req.session.user.username, function(err, doc) {
            if(err) return next();
            info.belongUserId = doc._id;
            Thread.idNumberInc(function(err, doc) {
                info.idNumber = doc.idNumber;
                Thread.addThread(info, function(err, doc) {
                    if(err) return next();
                    res.send({ retCode: 0 });
                })
            });
        })
    });
});

module.exports = router;