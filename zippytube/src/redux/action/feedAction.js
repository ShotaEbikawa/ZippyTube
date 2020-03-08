import React from 'react'
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem';
import { getCookieType } from './userAction';



// getFeed retrieves the given user's notification feed by first:
// sending request to the /auth endpoint to validate the user's token store in redis.
// Once the validation succeeds, the given redux store with the user's feed will stay up-to-date.
// All the required states will be updated as well.
export const getFeed = (setFeedNum,setFeedList,setAnchorEl,setFlag) => (dispatch) => {
    const token = getCookieType('token');
    axios.post('/auth/check-account',{token:token})
    .then(userObj => {
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