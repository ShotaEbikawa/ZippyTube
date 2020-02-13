const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 3010;

app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

app.get('/profile/get-profile-info', (req,res) => {
    const username = profile.query.username;
    // before I work on this, I think I need a better understanding of how asyn/await works tbh
    // it's also a good skill to know anyways
})

app.listen(PORT => console.log(`profileServer is listening on port ${PORT}`));
