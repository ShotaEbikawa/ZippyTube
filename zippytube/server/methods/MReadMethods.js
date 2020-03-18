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

    /* fetchVideo method returns document that matches to 
    the given query that the user has made from the client-side.
    Notice that the function is performing full-text search,
    meaning any word that matches in the values of title or 
    description will be considered as a document to be returned */
    static fetchVideo(query,res,type) {
        Media.find({$text: {$search: query}}).limit(10).then((videos) => {
            if (videos) {
                if (type == 'related') {
                    if (videos.length < 10) {
                        console.log(videos.length)
                        this.concatVideo(res,videos,10-videos.length);
                        return;
                    }
                }               
                console.log(videos);
                res.json({data: videos.splice(0,10)});
                return;
            }
            
            res.status(403).send('error');
        })
    }


    /* getAllVideo method eturns all of the document 
    that exists in media collection. */
    static getAllVideo(res,upperBound) {
        Media.find({}).then((videos) => {
            if (videos) {
                console.log(videos);
                res.json({data: videos.splice(0,upperBound)})
                return;
            }
            res.status(403).send('error');
        })
    }


    /* getVideo method returns media document 
    that matches the given id */
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

    /* concatVideo method fetches any remaining videos from
    the media collection and concatenates to the fetched videos via
    fetchVideo method */
    static concatVideo(res,videos,nums) {
        Media.find({}).limit(nums).then((remainingVideos) => {
            if (remainingVideos) {
                let temp = videos.concat(remainingVideos);
                temp.map(media => console.log(media.title));
                res.json({data: videos.concat(remainingVideos)});
                return;
            }
            res.status(403).send('error');
        })
    }

    // fetch user's uploaded video
    static getUserVideo(userId,res) {
        Media.find({})
    }
}

module.exports = MReadMethods;