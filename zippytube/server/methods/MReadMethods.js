const mongoose = require('mongoose');
const Media = require('../model/MediaModel');

class MReadMethods {
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

module.exports = MReadMethods;