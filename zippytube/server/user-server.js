const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const UserMethods = require('./methods/UserMethods')
const cors = require('cors');
const app = express();
const MONGODB_URL = (process.env.MONGO_HOST && `${process.env.MONGO_HOST}/zippytube-database`) || 'mongodb://localhost:27017/zippytube-database',
port = 3003;

// Blocks of code that connects to the given DB
mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log(`ERROR: ${error}`);
})

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
    console.log(username,password)
    console.log('is it going in here')
    UserMethods.loginUser(username, password, res);
    try {
    } catch (err) {
        res.send(err);
    }
})

// Listens to port 3003
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));
