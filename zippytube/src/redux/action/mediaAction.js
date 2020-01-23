import React from 'react'
import axios from 'axios'
import { getCookieType } from './userAction';


// createVideos sends the required data: 
// 1) video file
// 2) user token
// 3) given title
// 4) given description
// 5) user's username
// to the server
export const createVideos = (files,title,desc,username) => {
    let token = getCookieType('token');
    let formData = new FormData();
    formData.append('file', files[0]);
    formData.append('token',token);
    formData.append('title',title);
    formData.append('desc',desc);
    formData.append('username',username);
    console.log('connecting...')
    console.log(files[0]);
    
    axios.post('/media-write/create-video', formData, {
        headers: {
            'content-type': 'multipart/form-data',
            // onUploadProgress: progressEvent => console.log(progressEvent.loaded)
        }
    })
    .then(res => {
        console.log('successfully uploaded video')
    })
    .catch(err => console.log(err))
}

export const fetchAllVideos = (setFlag) => (dispatch) => {
    axios.get('/media-read/get-all-videos')
    .then(res=>res.data)
    .then(results=>{
        dispatch({
            type:'GET_QUERY',
            payload:results
        })
        setFlag(true);
    })
}

// fetchResults sends the request to the server to retrieve all 
// of the documents in the media collection that matches the 
// given query that the user made
export const fetchResults = (query,setFlag) => (dispatch) => {
    axios.get(`/media-read/fetch-video?search=${query}`)
    .then(res=>res.data)
    .then(results=>{
        dispatch({
            type:'GET_QUERY',
            payload:results
        })
        setFlag(true);
    })
    
    //.catch(err=> console.log(err));
}

export const fetchRelated = (setFlag,query,id) => (dispatch) => {
    axios.get(`/media-read/fetch-video?search=${query}`)
    .then(res=>res.data)
    .then(results=>{
        let temp = [];
        console.log(results)
        results.data.map(result => {
            if (result._id != id)
                temp.push(result);
        })
        console.log(temp)
        dispatch({
            type:'GET_QUERY',
            payload: {data:temp}
        })
        setFlag(true);
    })
}


// getVideo sends the request to the server to retrieve the 
// media collection with the matching video id.
export const getVideo = (id,setFlag,history,setCertainVideo, CertainVideo) => (dispatch) => {
    axios.get(`/media-read/video?id=${id}`)
    .then(res=>res.data)
    .then(result=>{
        dispatch({
            type:'GET_VIDEO',
            payload:result,
        })
        return result.data
    })
    .then(result =>{
        setCertainVideo(<CertainVideo video={result[0]}/>)
        return dispatch(fetchRelated(setFlag,result[0].title,id))
        }
    )
}

export const updateComment = (req) => (dispatch) => {
    console.log(req)
    let body = {
        comment: req,
        commentId: req._id,
        videoId: req.videoId,
    }
    axios.post('/media-write/update-comment',body)
    .then(res=> {console.log('submitted')});
}