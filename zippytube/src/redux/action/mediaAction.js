import React from 'react'
import axios from 'axios'
import { getCookieType } from './userAction';



/* createVideos sends the required data regarding the submitted videos
to the /media-write endpoint. Before it sends to that endpoint, it will
first check whether the user's token exists in Redis. Once the validation
is successful, it will send the request to /media-write endpoint. */
export const createVideos = (files,title,desc,username,setSuccess) => {
    let token = getCookieType('token');
    axios.post('/auth/check-account',{token:token})
    .then(res=>{
        // console.log(res.data);
        // console.log(res.data._id);
        let formData = new FormData();
        let headers = { 'content-type': 'multipart/form-data', }
        formData.append('file', files[0]);
        formData.append('token',res.data._id);
        formData.append('title',title);
        formData.append('desc',desc);
        formData.append('username',res.data.username);
        formData.append('userId',res.data._id);
        axios.post('/media-write/create-video', formData, { headers: headers })
        .then(res => {
            setSuccess(true);
        })
        .catch(err => console.log(err))
    })
    .catch(err => {console.log('token did not match')});
}


/* fetchAllVideos retrieves all of the existing media documents (video)
in the media collection. */
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
    .catch(err => console.log(err));
}



/* fetchResults sends the request to the server to retrieve all 
of the documents in the media collection that matches the 
given query that the user made */
export const fetchResults = (query,setFlag) => (dispatch) => {
    axios.get(`/media-read/fetch-video?search=${query}&type=''`)
    .then(res=>res.data)
    .then(results=>{
        dispatch({
            type:'GET_QUERY',
            payload:results
        })
        setFlag(true);
    })
    .catch(err=>console.log(err));
}



/* fetchRelated sends a request to media-read endpoint, where it 
fetches all of the media documents (videos) that matches to the
selected media (video)'s title and description. */
export const fetchRelated = (setFlag,query,id) => (dispatch) => {
    axios.get(`/media-read/fetch-video?search=${query}&type=${'related'}`)
    .then(res=>res.data)
    .then(results=>{
        let temp = [];
        results.data.map(result => {
            if (result._id != id)
                temp.push(result);
        })
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
