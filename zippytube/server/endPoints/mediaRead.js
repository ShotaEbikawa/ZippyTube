const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const MediaMethods = require('../methods/MReadMethods')
const app = express();
const port = process.env.PORT || 3005 ;

// Initializing required middlewares
app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

app.get('/media-read/get-all-videos', (req,res) => {
    MediaMethods.getAllVideo(res,12);
})

// fetch-video endpoint fetches videos with the given query
// that the user entered from the client-side
app.get('/media-read/fetch-video', (req,res) => {
    console.log('connecting to the server');
    console.log(req.query.search);
    console.log(req.query.type)
    MediaMethods.fetchVideo(req.query.search, res,req.query.type);
})

app.get('/media-read/video', (req,res) => {
    console.log('connecting to the server');
    console.log(req.query.id);
    MediaMethods.getVideo(req.query.id,res)
})



// Listens to port 3005
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));