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
    static fetchVideo(id,query,res,type) {
        Media.find({$text: {$search: query},_id:{$ne:id}}).limit().then((videos) => {
            if (videos) {
                if (type == 'related') {
                    if (videos.length < 10) {
                        console.log(videos.length)
                        this.concatVideo(res,id,videos,10-videos.length);
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
    static concatVideo(res,id,videos,nums) {
        Media.find({}).then((remainingVideos) => {
            if (remainingVideos) {
                let idDict = {}
                idDict[id] = true;
                // push all existing id in the object (dictionary)
                for (let i = 0; i < videos.length; i++)
                    idDict[videos[i]._id] = true;

                /* push media document only if its id does not
                exist in the object */
                for (let i = 0; i < remainingVideos.length; i++) {
                    if (nums == 0) break;
                    if (remainingVideos[i]._id in idDict == false) {
                        idDict[remainingVideos[i]._id]=true;
                        videos.push(remainingVideos[i]);
                        nums--;
                    }
                }
                res.json({data: videos});
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