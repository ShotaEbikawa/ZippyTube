const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3006;
const CommentMethods = require('../methods/CommentMethods')
const app = express();

app.use(bodyParser());
app.use(cookieParser());
app.use(cors());

// creates a new document in the Comment collection
app.post('/comment-write/create-comment', (req,res) => {
    console.log(req.body)
    CommentMethods.CreateComment(req,res);
})


app.listen(port, () => console.log(`Example app listening on port ${port}`))
