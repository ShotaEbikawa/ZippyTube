const mongoose = require('mongoose');
const Comment = require('../model/CommentModel');
const MONGODB_URL = (process.env.MONGO_HOST && `${process.env.MONGO_HOST}/zippytube-database`) || 'mongodb://localhost:27017/zippytube-database'

// Block of codes that connects to the given DB.
mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log(`ERROR: ${error}`);
})


class CommentMethods {
    static CreateComment(req,res) {
        const newComment = new Comment({
            desc: req.body.desc,
            token: req.body.token,
            videoId: req.body.videoId,
            username: req.body.username,
        })

        newComment.save((error,data) => {
            if (error) {
                console.log(error)
                return -1;
            }
            console.log('success',data)
            res.json({comment:data})
        })
    }
}

module.exports = CommentMethods;