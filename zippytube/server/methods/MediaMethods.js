const mongoose = require('mongoose');
const uploadPhoto = require('../mediaWrite')
const Media = require('../model/MediaModel');

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
            username: req.body.username,
        });

        newVideo.save((error) => {
            if (error) {
                console.log(error)
                return -1;
            }
            console.log('success');
            console.log(req.body.title)
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
            console.log(doc);
        })
    }
}

module.exports = MediaMethods;