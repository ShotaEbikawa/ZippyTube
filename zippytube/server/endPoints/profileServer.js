const express = require('express');
const User = require('../methods/UserMethods');
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
// const FeedMethods = require('../methods/FeedMethods');
const awsCredendials = require('../secret/awsCredentials');
const ObjectId = mongoose.Types.ObjectId;
const ID = awsCredendials.id;
const SECRET = awsCredendials.secretKey;
const BUCKET_NAME = 'zippytube'
const app = express();
const PORT = 3010;

// Initializing the given S3 bucket for
// storing medias (photo/videos)
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
})

// initializing multer designed
// specifically for executing logic
// in the S3 bucket
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        key: (req,file,cb) => {
            cb(null, file.originalname)
        },
        acl: 'public-read'
    })
})

// create a function that parses the period
function parsePeriod(name,uniqueId) {
    let newName = []
    for (let i = 0; i < name.length; i++) {
        let c = name.charCodeAt(i);
        if ((c >= 97 && c <= 122) || (c >= 65 && c <= 90))
            newName.push(name[i]);
    };
    for (let i = 0; i < uniqueId.length; i++) {
        newName.push(uniqueId[i]);
    };
    console.log(newName.join(''));
    return newName.join('');
}


app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

app.get('/profile/get-profile-info', (req,res) => {
    // console.log('here')
    const username = req.query.username;
    console.log(req.query.username);
    User.getUserByUserName(username,res);
})

app.post('/profile/upload-profile', upload.single('file'), (req,res) => {
    // let fileInfo = path.parse(req.file.originalname);
/*     let uniqueId = new ObjectId();
    uniqueId = uniqueId.toString();
    fileInfo = parsePeriod(fileInfo.name,uniqueId);
    console.log(req.file);
    fileInfo += path.extname(req.file.filename); */
    User.storeNewProfile(req,res);
})

app.listen(PORT, () => console.log(`profileServer is listening on port ${PORT}`));
