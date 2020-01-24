import React from 'react';
import { getCookieType } from './userAction';
import { updateComment } from './mediaAction';
import axios from 'axios';

export const createComment = (obj,CommentList) => (dispatch) => {
    let body = {
        desc: obj.desc,
        username: obj.username,
        videoId: obj.videoId,
        token: getCookieType('token')
    };
    console.log(body)
    axios.post('/comment-write/create-comment',body)
    .then(result=>{
        obj.setCommentObj(obj.commentObj.concat([result.data.comment]))
        console.log(obj.commentObj)
        obj.setComments(obj.comments.concat([<CommentList comment={result.data.comment}/>]))
        dispatch(updateComment(result.data,obj.setIsOpen,obj.history))
    })
    .catch(err=>console.log(err));
}