/**
 * Created by dell on 2017/11/3.
 */
var dbHandle = require("../dbManipulations/dbHandles");
var model = dbHandle.getModel('threads');
var ids = dbHandle.getModel('ids');

var Thread = {
    getAllThreads: function(callback) {
        model.find({}, callback);
    },
    addThread: function(info, callback) {
        model.create(info, callback);
    },
    getThreadById: function(id, callback) {
        model.findOne({ _id: id }, callback);
    },
    getThreadByIdNumber: function(idNumber, callback) {
        model.findOne({ idNumber: idNumber }, callback);
    },
    searchByTitle: function(title, callback) {
        model.find({ threadTitle: { $regex: title } }, callback);
    },
    idNumberInc: function(callback) {
        ids.findOneAndUpdate({name: 'threads'}, {$inc: {idNumber: 1}}, {new: true}, callback);
    }
};

module.exports = Thread;