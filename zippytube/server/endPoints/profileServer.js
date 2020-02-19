const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('../methods/UserMethods');
const cors = require('cors');
const app = express();
const PORT = 3010;

app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

app.get('/profile/get-profile-info', (req,res) => {
    console.log('here')
    const username = req.query.username;
    console.log(req.query.username);
    User.retrieveUserMedia(username,res);
    // before I work on this, I think I need a better understanding of how asyn/await works tbh
    // it's also a good skill to know anyways

    // well, the brute force approach is to string the function, but I feel like there are 
    // cleaner ways to do the same thing

    // what do I need to get....
    // I need all the user info, and all the video info that user uploaded
    // now here's the thing... do I even need all the user's info?
    // I need...
    // * username
    // * userId for retrieving all the videos....

    // maybe what I can do is... get the userId, and then connect to media documents to retrieve
    // all the media document.


    // but are there a better way to achieve this....
    // i'm not sure because we're gonna have to make two asynchronous call anyways.

    // it would be something like... user.getUser({userId: userif}, (req,res) => {
                                            //media.getAllMediaWithUserId()
    //                                  })
})

app.listen(PORT, () => console.log(`profileServer is listening on port ${PORT}`));
