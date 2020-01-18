import React from 'react'
import axios from 'axios'
import { getCookieType } from './userAction';


// createVideos sends the required data: 
// 1) video file
// 2) user token
// 3) given title
// 4) given description
// to the server
export const createVideos = (files,title,desc) => {
    let token = getCookieType('token');
    let formData = new FormData();
    formData.append('file', files[0]);
    formData.append('token',token);
    formData.append('title',title);
    formData.append('desc',desc);
    console.log('connecting...')
    console.log(files[0]);
    
    axios.post('/media/create-video', formData, {
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
    axios.get('/media/get-all-videos')
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
    axios.get(`/media/fetch-video?search=${query}`)
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
    axios.get(`/media/fetch-video?search=${query}`)
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
export const getVideo = (id,setFlag,history) => (dispatch) => {
    axios.get(`/media/video?id=${id}`)
    .then(res=>res.data)
    .then(result=>{
        dispatch({
            type:'GET_VIDEO',
            payload:result,
        })
        return result.data
    })
    .then(result => 
        dispatch(fetchRelated(setFlag,result[0].title,id))
    )
    
}
