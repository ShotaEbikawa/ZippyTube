const redis = require('redis');
const mongoose = require('mongoose')
const client = redis.createClient();

// prints error message if the redis connection fails
client.on('error', err => {
    console.log("Error " + err);
});

/* stringifies the token (key)
and stringifies user object (value) */
const addToken = (token,user) => {
    console.log(token)
    client.set(token.toString(),JSON.stringify(user).toString(),(err,res) => {
        if (err)
            console.log(err);
        console.log(res);
    });
}

// check if the given token exists in redis
async function checkToken(token,res) {
    console.log(token);
    await client.get(token,(err,data) => {
        if (err || data === undefined || data === null) {
            res.status(403).send('token does not match');
            return;
        }
        res.json(JSON.parse(data));
    })
}

// delete given token in the redis
const deleteToken = (token) => {
    console.log(token);
    client.del(token,(err,res) => {
        if (err)
            console.log(err);
        else
            console.log(res);
    });
}

module.exports = {addToken: addToken, checkToken: checkToken, deleteToken:deleteToken};