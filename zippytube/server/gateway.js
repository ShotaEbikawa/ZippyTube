const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');
const cors = require('cors');
const socket = require('socket.io');
const app = express();
const appServer = server.createServer(app);
const io = socket(appServer);
const apiProxy = httpProxy.createProxyServer(app);

const GATEWAY_PORT = 4000;
const FEED_READ_URL = process.env.FEED_URL || 'http://localhost:3007';
const USER_URL = process.env.USER_URL || 'http://localhost:3003';
const COMMENT_WRITE_URL = process.env.COMMENT_WRITE_URL || 'http://localhost:3006';
const MEDIA_WRITE_URL = process.env.MEDIA_WRITE_URL || 'http://localhost:3004';
const MEDIA_READ_URL = process.env.MEDIA_READ_URL || 'http://localhost:3005';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors())

app.all('/auth*', (req, res)=>{
    console.log("Routing to Auth: ", req.url);
    apiProxy.web(req, res, {target: USER_URL});
    apiProxy.on('error', (req,res) => {
        console.log('auth endpoint is not connecting');
    });
})

app.all('/media-write*', (req,res) => {
    console.log("Routing to Media (write): ", req.url);
    apiProxy.web(req,res, {target: MEDIA_WRITE_URL});
    apiProxy.on('error', (req,res) => {
        console.log('media-write endpoint is not connecting');
    });
})

app.all('/media-read*', (req,res) => {
    console.log("Routing to Media (read): ", req.url);
    apiProxy.web(req,res, {target: MEDIA_READ_URL});
    apiProxy.on('error', (req,res) => {
        console.log('media-read endpoint is not connecting');
    });
})

app.all('/comment-write*', (req,res) => {
    console.log("Routing to Comment (write): ", req.url);
    apiProxy.web(req,res, {target: COMMENT_WRITE_URL});
    apiProxy.on('error', (req,res) => {
        console.log('comment-write endpoint is not connecting');
    });
})

app.all('/feed*', (req,res) => {
    console.log("Routing to Feed (read): ", req.url);
    apiProxy.web(req,res, {target: FEED_READ_URL});
    apiProxy.on('error', (req,res) => {
        console.log('feed-read endpoint is not connecting');
    })
})

app.all('/*', (req,res) => {
    console.log("Routing to the Presentation layer of the app")
    apiProxy.web(req,res, {target: FRONTEND_URL});
    apiProxy.on('error', (req,res) => {
        console.log('main endpoint is not connecting');
    });
})


io.on('connection',socketIo=> {
    console.log('user connected')
    socketIo.emit('me','Hello World')
    socketIo.on('sign-out',()=>{
        socketIo.emit('sign-out','signed out');
    })
    socketIo.on('sign-in',()=>{
        socketIo.emit('sign-in','signed in')
    })
    socketIo.on('disconnect', () => {
        console.log('user disconnected');
    })
})


appServer.listen(GATEWAY_PORT);
console.log('Gateway started\n\n');