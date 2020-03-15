const mongoose = require('mongoose');

const MediaModel = mongoose.Schema({
    title: {
        type: String,
        unique: false,
        required: false,
    },
    desc: {
        type: String,
        unique: false,
        required: false,
    },
    url: {
        type: String,
        unique: false,
        required: true,
    },
    username: {
        type: String,
        unique: false,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    token: {
        type: String,
        unique: false,
        required: true,
    },
    thumbnail: {
        type: String,
        unique: false,
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
    }

})
MediaModel.index({title: 'text', desc: 'text'});
const Media = mongoose.model('Media', MediaModel);

module.exports = Media;