import React from 'react'
import axios from 'axios'
import { getCookieType } from './userAction';
// import 

export const getFeed = (setFeedNum,setFlag) => (dispatch) => {
    const token = getCookieType('token');
    axios.post('/auth/check-account',{token:token})
    .then(userObj => {
        console.log(userObj.data)
        axios.get(`/feed/get-feed?userId=${userObj.data._id}`)
        .then(res => res.data)
        .then(result => {
            dispatch({
                type: 'GET_FEED',
                payload: result
            })
            // console.log(result.data)
            setFeedNum(result.data.length);
            setFlag(true);
        })
    })
    .catch(err => {console.log(err)})
} 