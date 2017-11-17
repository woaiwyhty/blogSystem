/**
 * Created by dell on 2017/11/2.
 */
var dbHandle = require("../dbManipulations/dbModel");
var model = dbHandle.getModel('sections');
var ids = dbHandle.getModel('ids');

var Section = {
    getAllSections: function(callback) {
        model.find({}, callback);
    },
    addSection: function(info, callback) {
        model.create(info, callback);
    },
    getSectionById: function(id, callback) {
        model.findOne({ _id: id }, callback);
    },
    getSectionByIdNumber: function(idNumber, callback) {
        model.findOne({ idNumber: idNumber }, callback);
    },
    idNumberInc: function(callback) {
        ids.findOneAndUpdate({name: 'sections'}, {$inc: {idNumber: 1}}, {new: true}, callback);
    },
    getSectionAndIncByIdNumber: function(idNumber, callback) {
        //get this section information and increment 1 to threadCount
        model.findOneAndUpdate({ idNumber: idNumber }, {$inc: {threadCount: 1}}, callback);
    }
};

module.exports = Section;