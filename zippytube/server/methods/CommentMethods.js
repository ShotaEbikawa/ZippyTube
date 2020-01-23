const mongoose = require('mongoose');
const Comment = require('../model/CommentModel');

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