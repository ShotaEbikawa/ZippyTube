import React from 'react';
import { getCookieType } from './userAction';
import { updateComment } from './mediaAction';
import axios from 'axios';


// createComment sends a request to the /comment-write endpoint to
// create a new comment document in the comment collection. Before
// it fulfills a given functionality, it sends a request to the /auth
// endpoint to see whether the user's token is valid. Once the validation
// is successful, it will send the request to the /comment-write endpoint
// to fullfill its desired functionality. the endpoint returns response status 200,
// it will call updateComment function to add the submitted comment to the given
// media document's comment list.
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