const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const {checkToken,deleteToken} = require('./redisServer')
const UserMethods = require('../methods/UserMethods')
const cors = require('cors');
const app = express();
port = 3003;

// Initializing required middleware
app.use(cookieParser());
app.use(bodyParser());
app.use(cors());

// register-account endpoint handles user-registration logic.
app.post('/auth/register-account', (req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try {
        UserMethods.registerUser(username,password,email,res);
    } catch (err) {
        res.send({err});
    }
})

// login-account endpoint handles user-login logic
app.post('/auth/login-account', (req,res)=> {
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;
    UserMethods.loginUser(username, password, res);
    try {
    } catch (err) {
        res.send(err);
    }
})

// get-username endpoint retrieves a user's username
app.post('/auth/get-username', (req,res) => {
    UserMethods.getUser(req.body.token, res);
})

// check if the given token exists in redis
app.post('/auth/check-account', (req,res) => {
    checkToken(req.body.token,res);
})

// deletes key-value pair matching the given token from redis
app.post('/auth/sign-out',(req,res) => {
    deleteToken(req.body.token);
    res.send('success');
})

// Listens to port 3003
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));
