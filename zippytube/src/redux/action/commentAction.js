import React from 'react';
import { getCookieType } from './userAction';
import { updateComment } from './mediaAction';
import axios from 'axios';

export const createComment = (desc,username,videoId,setFlag) => (dispatch) => {
    let body = {
        desc: desc,
        username:username,
        videoId: videoId,
        token:getCookieType('token')
    };
    console.log(body)
    axios.post('/comment-write/create-comment',body)
    .then(result=>dispatch(updateComment(result.data,setFlag)))
    .catch(err=>console.log(err));
}