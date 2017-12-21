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
            ]).exec(callback);
    },
    getThreadByIdNumber: function(idNumber, callback) {
        model.findOne({ idNumber: idNumber }).populate([
            { path: 'belongUserId', select: 'username idNumber'},
            { path: 'belongSectionId', select: 'name threadCount idNumber'}
            ]).exec(callback);
    },
    searchByTitle: function(title, callback) {
        model.find({ threadTitle: { $regex: title } }, callback);
    },
    idNumberInc: function(callback) {
        ids.findOneAndUpdate({name: 'threads'}, {$inc: {idNumber: 1}}, {new: true}, callback);
    },
    getThreadsBySectionID: function(id, callback) {
        model.find({ belongSectionId: id }).populate(
            [
                { path: 'belongUserId', select: 'username idNumber'},
                { path: 'belongSectionId', select: 'name threadCount idNumber'}
            ]
            ).exec(callback);
    },
    getThreadsBySectionIDAndPage: function(id, pageNumber, callback) {
        // add pagination
        model.find({ belongSectionId: id }).skip(10 * (pageNumber - 1)).limit(10).populate(
            [
                { path: 'belongUserId', select: 'username idNumber'},
                { path: 'belongSectionId', select: 'name threadCount idNumber'}
            ]
        ).exec(callback);
    },
    removeAllThreadsByUser: function(userId, callback) {
        model.find({ belongUserId: userId }, callback);
    },
    removeAllThreadsBySection: function(secId, callback) {
        model.find({ belongSectionId: secId }, callback);
    }
};

module.exports = Thread;