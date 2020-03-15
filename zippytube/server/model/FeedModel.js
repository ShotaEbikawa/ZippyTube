const mongoose = require('mongoose');

const FeedModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        unique: false,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    seen: {
        type: Boolean,
        required: true,
        default: false,
    }
})

const Feed = mongoose.model('Feed', FeedModel);
module.exports = Feed;