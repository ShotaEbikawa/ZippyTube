const mongoose = require('mongoose');
const User = require('../model/UserModel');
const Feed = require('../model/FeedModel');

const MONGODB_URL = (process.env.MONGO_HOST && 
    `${process.env.MONGO_HOST}/zippytube-database`) || 
    'mongodb://localhost:27017/zippytube-database';

// Block of codes that connects to the given DB.
mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log(`ERROR: ${error}`);
})


class FeedMethods {
    // adds new notification feed to the Feed collection
    static addFeed(userId,message,io) {
        if (userId == '' || message == '')
            return -1;

        const newFeed = new Feed({
            user: userId,
            message: message,
        });

        newFeed.save((error,data) => {
            if (error) {
                console.log('error');
                return -1;
            }
            console.log(data);
            console.log('Feed successfully added');
            this.addFeedToUser(userId,data._id,io);
            return 1
        })
    }


    /* addFeedToUser method adds the initialized feed document
    into a respective user document's feed attribute */
    static addFeedToUser(userId, feedId,io) {
        User.findOne({_id:userId}, (err,doc) => {
            if (err)  {
                console.log(err);
                return -1
            }
            doc.feed.push(feedId);
            doc.save((error) => {
                if (error) {
                    console.log(error);
                    return -1;
                }
                io.emit('uploaded', 'video is uploaded');
                return 1;
            });
        })
    }



    /* getFeed retrieves feed documents that matches to the given token.
    It will send 403 error if some error occurs during the process. */
    static getFeed(userId,res) {
        User.findOne({_id:userId}).populate('feed').exec((err,feed) => {
            if (err) {
                res.status(404).send(err);
                return;
            }
            const obj = {
                feed: feed.feed,
            }
            res.send(obj);  
        })
    }

    /* setFeedToRead sets the feed document with a given feed id's 
    seen attribute to False */
    static setFeedToRead(feed,res) {
        for (let i = 0; i < feed.length; i++) {
            Feed.findOneAndUpdate({_id:feed[i]._id},{seen:true}, (err,feed) => {
                if (err || feed == null) {
                    res.status(403).send(err);
                }
            })
        }
        res.send('success');
    }
}

module.exports = FeedMethods;