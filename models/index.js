var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = Schema({
    twitter: {
        displayName: String,
        username: String,
        id: String,
        avatarUrl: String,
        token: String
    }
});

var picSchema = Schema({
    url: String,
    title: String,
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    vote: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ]
});

var User = mongoose.model('User', userSchema);
var Pic = mongoose.model('Pic', picSchema);

module.exports = {
    User: User,
    Pic: Pic
};