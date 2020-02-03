const redis = require('redis');
const mongoose = require('mongoose')
const client = redis.createClient();


client.on('error', err => {
    console.log("Error " + err);
});

const addToken = (token,user) => {
    console.log(token)
    console.log('!!!!!!!!!ok')
    console.log(token.toString());
    client.set(token.toString(),JSON.stringify(user).toString(),(err,res) => {
        if (err)
            console.log(err)
        console.log(res);
    });
}

async function checkToken(token,res) {
    console.log(token);
    await client.get(token,(err,data) => {
        if (err || data === undefined || data === null) {
            res.status(403).send('token does not match');
        }
        res.json(JSON.parse(data));
    })
}

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