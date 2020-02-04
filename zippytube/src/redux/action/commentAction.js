import React from 'react';
import { getCookieType } from './userAction';
import { updateComment } from './mediaAction';
import axios from 'axios';

export const createComment = (obj,CommentList) => (dispatch) => {
    const token = getCookieType('token')
    axios.post('/auth/check-account',{token: token})
    .then(res => {
        let body = {
            desc: obj.desc,
            username: res.data.username,
            videoId: obj.videoId,
            token: token
        };
        axios.post('/comment-write/create-comment',body)
        .then(result=>{
            obj.setCommentObj([result.data.comment].concat(obj.commentObj))
            console.log(obj.commentObj)
            obj.setComments([<CommentList comment={result.data.comment}/>].concat(obj.comments))
            dispatch(updateComment(result.data,obj.setIsOpen,obj.history))
        })
        .catch(err=>console.log(err));
    })
    .catch(err => {
        console.log('Token does not match')
    })
}