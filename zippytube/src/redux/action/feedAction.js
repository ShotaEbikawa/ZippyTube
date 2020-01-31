import React from 'react'
import axios from 'axios'
import { getCookieType } from './userAction';
// import 

export const getFeed = (setFeedNum,setFlag) => (dispatch) => {
    const token = getCookieType('token');
    axios.get(`/feed/get-feed?token=${token}`)
    .then(res => res.data)
    .then(result => {
        dispatch({
            type: 'GET_FEED',
            payload: result
        })
        setFeedNum(result.data.length);
        setFlag(true);
    })
} 