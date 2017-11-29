/**
 * Created by dell on 2017/11/28.
 */
var dbHandle = require("../dbManipulations/dbModel");
var userModel = dbHandle.getModel('adminusers');
var AdminUser = {
    getUserNameByName: function(username, callback) {
        //console.log(username);
        userModel.findOne({username: username}, callback);
    },
    comparePassword: function(pwd, pwd1) {
        return pwd == pwd1;
    },
    getUserIDbyID: function(id, callback) {
        userModel.findOne({id: id}, callback);
    },
    addUser: function(info, callback) {
        userModel.create(info, callback);
    }
};
module.exports = AdminUser;