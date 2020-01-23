const mongoose = require('mongoose');

const CommentModel = mongoose.Schema({
    desc: {
        type: String,
        unique: false,
        required: true,
    },
    videoId: {
        type: String,
        unique: false,
        required: true,
    },
    username: {
        type: String,
        unique: false,
        required: true,
    },
    token: {
        type: String,
        unique: false,
        required: true,
    },
    comment: {
        type: Array,
        unique: false,
        default: {}
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
})

CommentModel.index({desc: 'text', username: 'text'});
const Comment = mongoose.model('Comment', CommentModel);
module.exports = Comment;