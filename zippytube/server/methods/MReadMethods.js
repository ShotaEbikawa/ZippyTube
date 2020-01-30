const mongoose = require('mongoose');
const Media = require('../model/MediaModel');

const MONGODB_URL = (process.env.MONGO_HOST && `${process.env.MONGO_HOST}/zippytube-database`) || 'mongodb://localhost:27017/zippytube-database'

// Block of codes that connects to the given DB.
mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log(`ERROR: ${error}`);
})


class MReadMethods {
    // fetchVideo returns document that matches to the given
    // query that the user has made from the client-side.
    // Notice that the function is performing full-text search,
    // meaning any word that matches in the values of title or 
    // description will be considered as a document to be returned
    static fetchVideo(query,res) {
        Media.find({$text: {$search: query}}).then((videos) => {
            if (videos) {
                console.log(videos);
                res.json({data: videos});
                return;
            }
            res.status(403).send('error');
        })
    }


    // getAllVideo returns all of the document that exists in 
    // media collection.
    static getAllVideo(res) {
        Media.find({}).then((videos) => {
            if (videos) {
                console.log(videos);
                res.json({data: videos})
                return;
            }
            res.status(403).send('error');
        })
    }


    // getVideo returns media document that matches the given id
    static getVideo(id,res) {
        Media.find({_id:id}).then((videos) => {
            if (videos) {
                console.log(videos);
                res.json({data:videos});
                return;
            }
            res.status(403).send('error');
        })
    }
}

module.exports = MReadMethods;