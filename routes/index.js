var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../dbModules/user');
var Section = require('../dbModules/sections');
var Thread = require('../dbModules/thread');
/* GET home page. */
router.get('/', function(req, res, next) {
    var login = false;
    if(req.session.user) {
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
        if(doc != null) {
            activeSec = sid != null ? parseInt(sid) : secList[0].id;
        }
        activePage = pid != null ? parseInt(pid) : 1;
        Section.getSectionByIdNumber(activeSec, function(err, doc) {
            if(err)  return next();
            var cnt = parseInt(doc.threadCount);
            totalPage = cnt / 10 + (cnt % 10 == 0 ? 0 : 1);
            Thread.getThreadsBySectionIDAndPage(doc._id, activePage, function(err, doc) {
                if(err) return next();
                for(var i in doc) {
                    var dt = doc[i].threadDate;
                    var obj = {
                        title: doc[i].threadTitle,
                        authorName: doc[i].belongUserId.username,
                        date: dt.getFullYear() + '/' + dt.getMonth() + '/' + dt.getDate(),
                        tid: doc[i].idNumber
                    };
                    topicList.push(obj);
                }
                res.render('index', {
                    isLogin: login,
                    topicList: topicList,
                    sectionList: secList,
                    activeSec: activeSec,
                    activePage: activePage,
                    totalPage: totalPage
                });
            });
        });
    });

});

router.post('/addTopic', function(req, res, next) {
    var info = {
        threadTitle: req.body.title,
        threadContent: req.body.content,
        threadDate: new Date(),
        belongUserId: null,
        belongSectionId: null,
        userName: 'woaiwyhty',
        idNumber: null
    };
    Section.getSectionAndIncByIdNumber(req.body.secid.toString(), function(err, doc) {
        if(err) return next();
        info.belongSectionId = doc._id;
        User.getUserNameByName('woaiwyhty', function(err, doc) {
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
router.get('/addSection', function(req, res, next) {
    Section.idNumberInc(function(err, doc) {
        Section.addSection({
            idNumber: doc.idNumber,
            name: req.query.name,
            threadCount: 0
        }, function(err, doc) {
            if(err) return next();
            res.send({ retCode: 0 });
        })
    })
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
router.get('/logout', ensureAuthenticated, function(req, res, next) {
    req.session.user = null;
    res.redirect('/');
});
router.post('/login',
    passport.authenticate('local',
        { failureRedirect: '/', failureFlash: "Invalid username or passport"}),
    function(req, res) {
        req.session.user = req.user || null;
        res.redirect('/');
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