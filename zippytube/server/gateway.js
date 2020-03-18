const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');
const cors = require('cors');
const socket = require('socket.io');
const app = express();
const appServer = server.createServer(app);
const io = socket(appServer);
const apiProxy = httpProxy.createProxyServer(app);

const GATEWAY_PORT = 80;
const FEED_READ_URL = process.env.FEED_URL || 'http://localhost:3007';
const USER_URL = process.env.USER_URL || 'http://localhost:3003';
const PROFILE_URL = process.env.PROFILE_URL || 'http://localhost:3010';
const COMMENT_WRITE_URL = process.env.COMMENT_WRITE_URL || 'http://localhost:3006';
const MEDIA_WRITE_URL = process.env.MEDIA_WRITE_URL || 'http://localhost:3004';
const MEDIA_READ_URL = process.env.MEDIA_READ_URL || 'http://localhost:3005';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors())

// endpoint handling user authentication system
app.all('/auth*', (req, res)=>{
    console.log("Routing to Auth: ", req.url);
    apiProxy.web(req, res, {target: USER_URL});
    apiProxy.on('error', (req,res) => {
        console.log('auth endpoint is not connecting');
    });
})

// endpoint handling video upload system
app.all('/media-write*', (req,res) => {
    console.log("Routing to Media (write): ", req.url);
    apiProxy.web(req,res, {target: MEDIA_WRITE_URL});
    apiProxy.on('error', (req,res) => {
        console.log('media-write endpoint is not connecting');
    });
})

/* endpoint handling video fetching system
(videos with matching query, related videos; etc.) */
app.all('/media-read*', (req,res) => {
    console.log("Routing to Media (read): ", req.url);
    apiProxy.web(req,res, {target: MEDIA_READ_URL});
    apiProxy.on('error', (req,res) => {
        console.log('media-read endpoint is not connecting');
    });
})

// endpoint handling comment feature
app.all('/comment*', (req,res) => {
    console.log("Routing to Comment (write): ", req.url);
    apiProxy.web(req,res, {target: COMMENT_WRITE_URL});
    apiProxy.on('error', (req,res) => {
        console.log('comment-write endpoint is not connecting');
    });
})

/* endpoint handling profile page feature 
(profile image uploads, fetching the user's 
profile information; etc.) */
app.all('/profile*', (req,res) => {
    console.log("Routing to Profile: ", req.url);
    apiProxy.web(req,res, {target: PROFILE_URL});
    apiProxy.on('error', (req,res) => {
        console.log('profile endpoint is not connecting');
    })
})

/* endpoint handling notification feed feature */
app.all('/feed*', (req,res) => {
    console.log("Routing to Feed (read): ", req.url);
    apiProxy.web(req,res, {target: FEED_READ_URL});
    apiProxy.on('error', (req,res) => {
        console.log('feed-read endpoint is not connecting');
    })
})

/* the default endpoint (presentation layer) */
app.all('/*', (req,res) => {
    console.log("Routing to the Presentation layer of the app")
    apiProxy.web(req,res, {target: FRONTEND_URL});
    apiProxy.on('error', (req,res) => {
        console.log('main endpoint is not connecting');
    });
})

/* serverside websocket that sends response to given 
websocket requests */
io.on('connection',socketIo=> {
    console.log('user connected')
    // beginning of the app
    socketIo.emit('beginApp','Welcome to ZippyTube!!!')
    socketIo.on('sign-out',()=>{
        socketIo.emit('sign-out','signed out');
    });
    // when the profile image uploads succeeds
    socketIo.on('uploaded',()=>{
        socketIo.emit('uploaded','profile pic uploaded');
    });
    /* when mobile navbar is activated 
    (after reaching given resolution sizes) */
    socketIo.on('mobile-nav',()=>{
        socketIo.emit('mobile-nav','mobile-nav activated');
    });
    // when a given event triggers a feed update
    socketIo.on('feed',()=>{
        console.log('feed sent')
        socketIo.emit('feed','update feed');
    });
    // when a user signs in to one's account
    socketIo.on('sign-in',()=>{
        socketIo.emit('sign-in','signed in');
    });
    // when a websocket connection gets lost
    socketIo.on('disconnect', () => {
        console.log('user disconnected');
    });
})


appServer.listen(GATEWAY_PORT);
console.log('Gateway started\n\n');