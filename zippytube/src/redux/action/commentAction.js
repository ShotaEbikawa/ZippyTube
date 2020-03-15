import React from 'react';
import CommentList from '../../components/CommentList';
import { getCookieType } from './userAction';
import { updateComment } from './mediaAction';
import axios from 'axios';



/* createComment sends a request to the /comment-write endpoint to
create a new comment document in the comment collection. Before
it fulfills a given functionality, it sends a request to the /auth
endpoint to see whether the user's token is valid. Once the validation
is successful, it will send the request to the /comment-write endpoint
to fullfill its desired functionality. the endpoint returns response status 200,
it will call updateComment function to add the submitted comment to the given
media document's comment list. */
export const createComment = (obj) => {
    const token = getCookieType('token')
    axios.post('/auth/check-account',{token: token})
    .then(res => {
        let body = {
            desc: obj.desc,
            username: res.data.username,
            userId: res.data._id,
            videoId: obj.videoId,
        };
        axios.post('/comment/create-comment',body)
        .then(result=>{
            obj.setComments([<CommentList comment={result.data.comment}/>].concat(obj.comments));
            obj.setIsOpen(false);
        }) 
        .catch(err=>console.log(err));
    })
    .catch(err => {
        console.log('Token does not match')
    })
}


/* fetchComments retrieves all of the comments that were submitted in the 
given video */
export const fetchComments = (mediaId,setComments,setIsOpen) => {
    axios.get(`/comment/fetch-comments?id=${mediaId}`)
    .then(res => {
       let commentList = res.data.comment;
       let comment = commentList.reverse().map((result,i) => <CommentList comment={result}/>);
       setComments(comment);
       setIsOpen(true);
    })
    .catch(err => {
        console.log(err);
    })
}