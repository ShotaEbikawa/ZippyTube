import React from 'react'
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem';
import { getCookieType } from './userAction';
// import 

export const getFeed = (setFeedNum,setFeedList,setAnchorEl,setFlag) => (dispatch) => {
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
            let currFeed = result.data && result.data.length > 0 ? result.data.map(feed => 
                <MenuItem id = {feed._id} onClick={() => setAnchorEl(null)}>
                    {feed.message}
                </MenuItem>) 
                : <MenuItem>No new notification</MenuItem>
                
            setFeedList(currFeed);
            setFeedNum(result.data.length);
            setFlag(true);
        })
    })
    .catch(err => {console.log(err)})
} 