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
const ObjectId = mongoose.Types.ObjectId;
const port = process.env.PORT || 3004;
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


// A wrapper function that handles logic for
// generating thumbnail from the video and uploading
// them on the given document in the DB
function uploadPhoto(req,url,fileInfo,filePath) {
    console.log(url);
    ffmpeg(url)
    .setFfmpegPath(ffmpegInstaller.path)
    .setFfprobePath(ffprobeInstaller.path)
    .on('end', () => {
        console.log('screenshots processed');
        filePath = `uploads/${fileInfo}.png`;
        fileUrl = `http://zippytube.s3.us-west-1.amazonaws.com/${fileInfo}.mp4`
        uploadScreenshots(filePath, `${fileInfo}.jpeg`, fileUrl,req.body.token);
    })
    .takeScreenshots({
        filename: fileInfo,
        count: 1,
    }, `uploads/`);
}



// wrapper function that converts the given video file
// into mp4 file, upload them on S3 bucket, and create a 
// new document in the DB.
function convertVideo(req,fileInfo,filePath) {
    ffmpeg(req.file.location)
    .setFfmpegPath(ffmpegInstaller.path)
    .output(filePath)
    .on('end', () => {
        console.log('processing is done');
        uploadFile(filePath,`${fileInfo}.mp4`,req, fileInfo,filePath);
    })
    .on('error', (err) => {
        console.log(err);
    })
    .run();
}



// function that uploads the given thumbnail (.png) file 
// into S3 bucket. After the file was successfully uploaded into
// S3 bucket, it will call MediaMethods.updateVideo function
// to update the given document's thumbnail attributes.
function uploadScreenshots(source,target,video_url,token) {
    fs.readFile(source, (err,data) => {
        if (!err) {
            let params = {
                Bucket: BUCKET_NAME,
                Key: target,
                Body: data,
                ContentType: 'image/png',
                ContentDisposition: 'inline'
            };
            s3.putObject(params, (err,data) => {
                if (!err) {
                    console.log('file uploaded')
                    console.log(data);
                    fs.unlink(source, (err) => {
                        if (err) {console.log("unlink failed", err);}
                        else {
                            console.log('file deleted');
                            const url = `http://zippytube.s3.us-west-1.amazonaws.com/${target}`;
                            console.log(token);
                            MediaMethods.updateVideo(url,token,video_url);
                        }
                    });
                }
                else {console.log(err);}
            })
        }
        else {console.log(err);}      
    })
}



// Uploads the converted video file into the S3 bucket.
// After it was successfully uploaded in the S3 bucket,
// it will create a new document in the DB.
function uploadFile(source,target,req,fileInfo,filePath) {
    fs.readFile(source, (err,data) => {
        if (!err) {
            let params = {
                Bucket: BUCKET_NAME,
                Key: target,
                Body: data,
                ContentType: 'video/mp4',
                ContentDisposition: 'inline',
            };
            s3.putObject(params, (err,data) => {
                if (!err) {
                    console.log('file uploaded')
                    console.log(data);
                    fs.unlink(source, (err) => {
                        if (err) {console.log("unlink failed", err);}
                        else {
                            console.log('file deleted');
                            const url = `http://zippytube.s3.us-west-1.amazonaws.com/${target}`
                            console.log(req.body.token)
                            MediaMethods.createVideo(url,req,fileInfo,filePath);
                        }
                    });
                }
                else {console.log(err);}
            })
        }
        else {console.log(err);}
    })
};

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

// Initializing required middlewares
app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

// create-video endpoint handles logic regarding video uploads
app.post('/media-write/create-video', upload.single('file'),(req,res,next) => {
    let fileInfo = path.parse(req.file.originalname);
    let uniqueId = new ObjectId();
    uniqueId = uniqueId.toString();
    fileInfo = parsePeriod(fileInfo.name,uniqueId);
    console.log(fileInfo)
    let filePath = `uploads/${fileInfo}.mp4`;
    convertVideo(req,fileInfo,filePath);
    res.json({downloaded: true})
})

// Listens to port 3004
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));

module.exports.uploadPhoto = uploadPhoto;