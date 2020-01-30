const mongoose = require('mongoose');
const User = require('../model/UserModel.js');
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
        let token = new ObjectId();
        let current_date = new Date();

        const newUser = new User({
            username: username,
            password: password,
            email: email,
            token: token,
            created_at: current_date,
            edited_at: current_date,
        });

        newUser.save((error) => {
            if (error) {
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
        User.find({username: username, password: password}, (err, user) => {
            if (err || user.length === 0) {
                res.status(404).send('err');
                return;
            }
            let userId = user[0]._id;
            let userToken = user[0].token;
            let tokenObj = {id: userId, token: userToken};
            res.send(tokenObj);
        })
    }
}

module.exports = UserMethods;