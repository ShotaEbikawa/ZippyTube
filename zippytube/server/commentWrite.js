const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3006;
const CommentMethods = require('./methods/CommentMethods')
const app = express();
const MONGODB_URL = (process.env.MONGO_HOST && `${process.env.MONGO_HOST}/zippytube-database`) || 'mongodb://localhost:27017/zippytube-database'


// Block of codes that connects to the given DB.
mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log(`ERROR: ${error}`);
})


app.use(bodyParser());
app.use(cookieParser());
app.use(cors());

// creates a new document in the Comment collection
app.post('/comment-write/create-comment', (req,res) => {
    console.log(req.body)
    CommentMethods.CreateComment(req,res);
})


app.listen(port, () => console.log(`Example app listening on port ${port}`))
