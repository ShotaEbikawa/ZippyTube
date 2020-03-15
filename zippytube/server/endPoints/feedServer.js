const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const FeedMethods = require('../methods/FeedMethods');
const port = process.env.PORT || 3007 ;
const app = express();

app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

app.get('/feed/get-feed', (req,res) => {
    let userId = req.query.userId;
    FeedMethods.getFeed(userId,res);
})

app.post('/feed/set-feed-to-read', (req,res) => {
    FeedMethods.setFeedToRead(req.body.feeds,res);
})

app.listen(port, () => {console.log(`feed-read endpoint listening to port ${3007}`)})
