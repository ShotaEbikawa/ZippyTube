const mongoose = require('mongoose');

const CommentModel = mongoose.Schema({
    desc: {
        type: String,
        unique: false,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        unique: false,
        required: true,
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
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

// CommentModel.index({desc: 'text', username: 'text'});
const Comment = mongoose.model('Comment', CommentModel);
module.exports = Comment;