import React from 'react';
import axios from 'axios';

export const getProfileInfo = (username) => {
    axios.get(`/profile/get-profile-info?username=${username}`)
    .then(res => {console.log(res)})
    .catch(err=> console.log(err));
}