const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: mongoose.Schema.Types.ObjectId,
    },
    profile_url: {
        type: String,
        default: '',
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    edited_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    media: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
    }],
});

const User = mongoose.model('User', UserModel);

module.exports = User;