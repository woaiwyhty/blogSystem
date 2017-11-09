/**
 * Created by dell on 2017/11/3.
 */
var valid = {
    register: function(username, password, email, birthday) {
        return true;
    },
    section: function(sectionName) {
        return true;
    },
    thread: function(title, content, sec) {
        return true;
    }
};

module.exports = valid;