const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffprobeInstaller = require('@ffprobe-installer/ffprobe')
const mongoose = require('mongoose');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const MediaMethods = require('./methods/MediaMethods')
const app = express();
const awsCredendials = require('./secret/awsCredentials')
const port = process.env.PORT || 3005;
const ID = awsCredendials.id;
const SECRET = awsCredendials.secretKey;
const BUCKET_NAME = 'zippytube'
const MONGODB_URL = (process.env.MONGO_HOST && `${process.env.MONGO_HOST}/zippytube-database`) || 'mongodb://localhost:27017/zippytube-database'


// Block of codes that connects to the given DB.
mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log(`ERROR: ${error}`);
})

// Initializing required middlewares
app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

app.get('/media/read/get-all-videos', (req,res) => {
    MediaMethods.getAllVideo(res);
})

// fetch-video endpoint fetches videos with the given query
// that the user entered from the client-side
app.get('/media/read/fetch-video', (req,res) => {
    console.log('connecting to the server');
    console.log(req.query.search);
    MediaMethods.fetchVideo(req.query.search, res);
})

app.get('/media/read/video', (req,res) => {
    console.log('connecting to the server');
    console.log(req.query.id);
    MediaMethods.getVideo(req.query.id,res)
})



// Listens to port 3004
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));