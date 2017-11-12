/**
 * Created by dell on 2017/11/3.
 */
var dbHandle = require("../dbManipulations/dbModel");
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
        model.findOne({ _id: id }).populate([
                { path: 'belongUserId', select: 'username idNumber'},
                { path: 'belongSectionId', select: 'name threadCount'}
            ]
            , callback);
    },
    getThreadByIdNumber: function(idNumber, callback) {
        model.findOne({ idNumber: idNumber }).populate([
            { path: 'belongUserId', select: 'username idNumber'},
            { path: 'belongSectionId', select: 'name threadCount'}
            ]
        , callback);
    },
    searchByTitle: function(title, callback) {
        model.find({ threadTitle: { $regex: title } }, callback);
    },
    idNumberInc: function(callback) {
        ids.findOneAndUpdate({name: 'threads'}, {$inc: {idNumber: 1}}, {new: true}, callback);
    },
    getThreadsBySectionID: function(id, callback) {
        model.find({ _id: id }).populate(
            [
                { path: 'belongUserId', select: 'username idNumber'},
                { path: 'belongSectionId', select: 'name threadCount'}
            ]
            , callback);
    }
};

module.exports = Thread;