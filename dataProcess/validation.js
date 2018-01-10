/**
 * Created by dell on 2017/11/3.
 */
var validModule = require('validator');
var valid = {
    register: function(username, password, email, birthday) {
        if(typeof username !== 'string' && username.length < 8)
            return false;
        if(typeof password !== 'string' && password.length < 6)
            return false;
        if(!validModule.isEmail(email))
            return false;
        return true;
    },
    section: function(sectionName) {
        if(typeof sectionName !== 'string' && validModule.isEmpty(sectionName))
            return false;
        return true;
    },
    thread: function(title, content, sec) {
        if(typeof title !== 'string' && validModule.isEmpty(title))
            return false;
        if(typeof content !== 'string' && validModule.isEmpty(content))
            return false;
        return true;
    }
};

module.exports = valid;