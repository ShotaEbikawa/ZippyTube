const mongoose = require('mongoose');
const Comment = require('../model/CommentModel');
const Media = require('../model/MediaModel');
const User = require('../model/UserModel');
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
    /* CreateComment method initializes new comment
    document and calls addCommentToOthers method if 
    the task was executed successfully */
    static createComment(req,res) {
        const newComment = new Comment({
            desc: req.body.desc,
            user: req.body.userId,
            media: req.body.videoId,
            username: req.body.username,
        });


        newComment.save((error,data) => {
            if (error) {
                console.log(error)
                return -1;
            };
            // console.log('success',data);
            // res.json({comment:data});
            this.addCommentToOthers(data,data.user._id,data.media._id,res);
        })
    }



    /* adds the reference of newly created comment document to
    the respesctive media document and user document */
    static addCommentToOthers(comment,userId,mediaId,res) {
        User.findOne({_id:userId}, (err,userDoc) => {
            userDoc.comment.push(comment._id);
            userDoc.save((error) => {
                if (error) {
                    console.log(error);
                    return -1;
                }
                Media.findOne({_id:mediaId}, (err,mediaDoc) => {
                    mediaDoc.comment.push(comment._id);
                    mediaDoc.save((error) => {
                        if (error) {
                            console.log(error);
                            return -1
                        }
                        res.send({comment:comment});
                    })
                })
            });
        });
    }
    
    

    // fetches comments from media document with matching id
    static fetchComments(id, res) {
        Media.findOne({_id:id}).populate('comment').exec((err,comment) => {
            if (err) {
                res.status(404).send(err);
                return;
            }
            const obj = {
                comment: comment.comment,
            };
            res.send(obj);  
        })
    }
}

module.exports = CommentMethods;