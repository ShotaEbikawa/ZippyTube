const mongoose = require('mongoose');
const uploadPhoto = require('../media')
const Media = require('../model/MediaModel');

class MediaMethods {

    // createVideo creates a new document in the media collection.
    // It accepts four attributes: url, title, description, and the 
    // user's token.
    static createVideo(url,token,title,desc,username,req,fileInfo,filePath) {
        const newVideo = new Media({
            url: url,
            title: title,
            desc: desc,
            token: token,
            username: username,
        });

        newVideo.save((error) => {
            if (error) {
                console.log(error)
                return -1;
            }
            console.log('success');
            uploadPhoto.uploadPhoto(req,fileInfo,filePath);
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



    // fetchVideo returns document that matches to the given
    // query that the user has made from the client-side.
    // Notice that the function is performing full-text search,
    // meaning any word that matches in the values of title or 
    // description will be considered as a document to be returned
    static fetchVideo(query,res) {
        Media.find({$text: {$search: query}}).then((videos) => {
            console.log(videos);
            res.json({data: videos});
        })
    }


    // getAllVideo returns all of the document that exists in 
    // media collection.
    static getAllVideo(res) {
        Media.find({}).then((videos) => {
            console.log(videos);
            res.json({data: videos})
        })
    }


    // getVideo returns media document that matches the given id
    static getVideo(id,res) {
        Media.find({_id:id}).then((videos) => {
            console.log(videos);
            res.json({data:videos});
        })
    }
}

module.exports = MediaMethods;