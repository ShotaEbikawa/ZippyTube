const mongoose = require('mongoose');
const User = require('../model/UserModel.js');
const Media = require('../model/MediaModel');
const {addToken} = require('../endPoints/redisServer')
const ObjectId = mongoose.Types.ObjectId;


const MONGODB_URL = (process.env.MONGO_HOST && `${process.env.MONGO_HOST}/zippytube-database`) || 'mongodb://localhost:27017/zippytube-database'

// Block of codes that connects to the given DB.
mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log(`ERROR: ${error}`);
})


class UserMethods {

    // registerUser creates a new document in the users
    // collection. It accepts four parameters:
    // username, password, email,  
    // and res (for returning a response)
    static registerUser(username, password, email, res) {
        let current_date = new Date();
        console.log("I'm here");
        const newUser = new User({
            username: username,
            password: password,
            email: email,
            token: null,
            created_at: current_date,
            edited_at: current_date,
        });

        newUser.save((error) => {
            if (error) {
                console.log(error);
                res.send({error:error});
                return
            }
            res.send({
                token: newUser.token,
                userId: newUser._id
            })
        })
    }

    // retrieves a document from users collection that matches
    // the given token
    static getUser(token,res) {
        User.find({token:token}, (err,user) => {
            if (err) {
                res.status(404).send(err);
                return;
            }
            let username = {username: user.username};
            res.json({data:user});
        })
    }

    // loginUser validates whether the given username and password
    // given by the user matches to the document in users collection.
    // If there's a match, it will create a token and:
    // 1) adds it in the document's token attributes
    // 2) assigns the given token as user's cookie
    static loginUser(username, password, res) {
        let token = new ObjectId();
        User.findOneAndUpdate({username: username, password: password}, {token:token}, (err, user) => {
            console.log(user);
            if (err || user === null) {
                res.status(404).send('err');
                return;
            }
            addToken(user.token,user);
            let userId = user._id;
            let userToken = user.token;
            let tokenObj = {id: userId, token: userToken};
            res.send(tokenObj);
        })
    }

    static getUserByUserName(username,res) {
        User.findOne({username:username}, (err,user) => {
            if (err) {
                res.status(404).send(err);
                return;
            }
            
            this.retrieveUserMedia(username,user,res);
        })
    }

    static retrieveUserMedia(username,user,res) {
        User.findOne({username:username}).populate('media').exec((err,media) => {
            if (err) {
                res.status(404).send(err);
                return;
            }
            const obj = {
                media: media.media,
                user: user,
            }
            res.send(obj);  
        })
    }

    static storeNewProfile(req,res,fileInfo) {
        User.findOneAndUpdate({_id: req.body.userId}, {profile_url: `${req.file.location}`}, (err,user) => {
            if (err || user == null) {
                res.status(404).send('err');
                return
            }
            res.send({url: user.url});
        } )
    }
}

module.exports = UserMethods;