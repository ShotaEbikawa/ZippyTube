const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');
const cors = require('cors');
const app = express();
const appServer = server.createServer(app);
const apiProxy = httpProxy.createProxyServer(app);

const GATEWAY_PORT = 4000;
const USER_URL = process.env.USER_URL || 'http://localhost:3003';
const MEDIA_WRITE_URL = process.env.MEDIA_WRITE_URL || 'http://localhost:3012';
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
})

app.all('/media/write*', (req,res) => {
    console.log("Routing to Media (write): ", req.url);
    apiProxy.web(req,res, {target: MEDIA_WRITE_URL})
})
app.all('/media/read*', (req,res) => {
    console.log("Routing to Media (read): ", req.url);
    apiProxy.web(req,res, {target: MEDIA_READ_URL})
})

app.all('/*', (req,res) => {
    console.log("Routing to the Presentation layer of the app")
    apiProxy.web(req,res, {target: FRONTEND_URL});
})

appServer.listen(GATEWAY_PORT);
console.log('Gateway started\n\n');