const mongoose = require('mongoose');
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
    static addFeed(token,message) {
        if (token == '' || message == '')
            return -1;

        const newFeed = new Feed({
            to: token,
            message:message,
        });

        newFeed.save((error,data) => {
            if (error) {
                console.log('error');
                return -1;
            }
            console.log(data);
            console.log('Feed successfully added')
            return 1
        })
    }


    /* getFeed retrieves feed documents that matches to the given token.
    It will send 403 error if some error occurs during the process. */
    static getFeed(userId,res) {
        Feed.find({to: userId, seen:false}).then((feeds) => {
            if (feeds) {
                console.log(feeds);
                res.json({data: feeds});
                return;
            }
            res.status(403).send('error');
        })
    }

    /* setFeedToRead sets the feed document with a given feed id's 
    seen attribute to False */
    static setFeedToRead(userId,feedId,res) {
        const query = {_id: mongoose.Types.ObjectId(feedId)}
        Feed.findOneAndUpdate(query, {$set: {seen:true}}, (err, data) => {
            if (err)
                res.send(err);
            console.log(data,'success');
            res.json({data:data});
        });
    }
}

module.exports = FeedMethods;