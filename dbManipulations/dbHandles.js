/**
 * Created by Wu on 10/31/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {
    users: {
        username: {type: String, required: true, index: 1, unique: true},
        password: {type: String, required: true},
        email: {type: String},
        birthday: {type: Date},
        idNumber: {type: Number, unique: true, index: 1}
    },
    sections: {
        name: {type: String, required: true, unique: true},
        threadCount: {type: Number},
        idNumber: {type: Number, unique: true, index: 1}
    },
    threads: {
        threadTitle: {type: String},
        threadContent: {type: String},
        threadDate: {type: Date},
        belongUserId: {type: Schema.Types.ObjectId, ref: 'users', index: 1},
        belongSectionId: {type: Schema.Types.ObjectId, ref: 'sections', index: 1},
        userName: {type: String},
        idNumber: {type: Number, unique: true, index: 1}
    },
    ids: {
        name: {type: String, required: true, unique: true},
        idNumber: {type: Number, required: true}
    }
};