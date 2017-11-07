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
        idNumber: {type: Number, unique: true}
    },
    sections: {
        name: {type: String, required: true, index: 1, unique: true},
        threadCount: {type: Number},
        idNumber: {type: Number, unique: true}
    },
    threads: {
        threadTitle: {type: String},
        threadContent: {type: String},
        threadDate: {type: Date},
        belongUserId: {type: Schema.Types.ObjectId, ref: 'users'},
        belongSectionId: {type: Schema.Types.ObjectId, ref: 'sections'},
        userName: {type: String},
        idNumber: {type: Number, unique: true}
    },
    ids: {
        name: {type: String, required: true, unique: true},
        idNumber: {type: Number, required: true}
    }
};