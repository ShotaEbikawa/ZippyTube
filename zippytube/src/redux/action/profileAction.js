import React from 'react';
import axios from 'axios';

export const getProfileInfo = (username, setMedias, setFlag) => {
    axios.get(`/profile/get-profile-info?username=${username}`)
    .then(res => {
        console.log(res.data);
        setMedias(res.data);
        setFlag(true);
    })
    .catch(err=> console.log(err));
}