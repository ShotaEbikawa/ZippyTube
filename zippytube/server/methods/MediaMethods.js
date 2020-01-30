const mongoose = require('mongoose');
const uploadPhoto = require('../mediaWrite')
const Media = require('../model/MediaModel');
const createTopic = require('../admin')


const MONGODB_URL = (process.env.MONGO_HOST && `${process.env.MONGO_HOST}/zippytube-database`) || 'mongodb://localhost:27017/zippytube-database'

// Block of codes that connects to the given DB.
mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log(`ERROR: ${error}`);
})


class MediaMethods {
    // createVideo creates a new document in the media collection.
    // It accepts four attributes: url, title, description, and the 
    // user's token.
    static createVideo(url,req,fileInfo,filePath) {
        const newVideo = new Media({
            url: url,
            title: req.body.title,
            desc: req.body.desc,
            token: req.body.token,
            comment: [{}],
            username: req.body.username,
        });
        newVideo.save((error) => {
            if (error) {
                console.log(error)
                return -1;
            }
            console.log('success');
            console.log(req.body.title);
            uploadPhoto.uploadPhoto(req,url,fileInfo,filePath);
            return 1;
        })
    }

    // updateVideo adds the given video's thumbnail's url to 
    // its document in media collection.
    static updateVideo(url,token,video_url) {
        let query = {url:video_url,token:token};
        Media.findOneAndUpdate(query, {thumbnail:url}, (err,doc) => {
            if (err) {
                console.log(err);
            }
            createTopic(token,'The video has been uploaded!!','video')
            console.log(doc);
        })
    }

    // updateComment adds a new comment document to the media
    // document's comment array.
    static updateComment(req,res) {
        let comment = req.body.comment.comment;
        let videoId = comment.videoId;
        let commentId = comment._id;
        let queryId = mongoose.Types.ObjectId(videoId);
        console.log(queryId);
        let setQuery = `comment.0.${commentId}`;
        let query = {_id: queryId};
        Media.findOneAndUpdate(query, {$set: {[setQuery]:comment}}, (err, data) => {
            if (err)
                res.send(err);
            console.log(data,'success');
            res.json({data:data});
        });
    }
}

module.exports = MediaMethods;