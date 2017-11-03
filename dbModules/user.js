/**
 * Created by dell on 2017/11/2.
 */
var dbHandle = require("../dbManipulations/dbHandles");
var userModel = dbHandle.getModel('users');
var ids = dbHandle.getModel('ids');
var User = {
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
    getAllUsers: function(roles, callback) {
        var queryStr;
        if(typeof(roles) == undefined) queryStr = {};
        else {
            queryStr = { role : { $gte : roles}};
        }
        userModel.find(queryStr, callback);
        //userModel.find(queryStr).populate('departmentId', 'name', null).exec(callback);
    },
    removeUserByName: function(username, callback) {
        userModel.remove({ username: username}, callback);
    },
    addUser: function(info, callback) {
        userModel.create(info, callback);
    },
    idNumberInc: function(callback) {
        ids.findOneAndUpdate({name: 'users'}, {$inc: {idNumber: 1}}, {new: true}, callback);
    }
};

module.exports = User;