import React from 'react'
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem';
import { getCookieType } from './userAction';

/* getFeed retrieves the given user's notification feed by first:
sending request to the /auth endpoint to validate the user's token store in redis.
Once the validation succeeds, the retured feeds will be stored in feedData, and
feedList will be updated with its respective components */
export const getFeed = (setFeedNum,setFeedList,setFeedData,redirectToProfile,setFlag) => (dispatch) => {
    const token = getCookieType('token');
    axios.post('/auth/check-account',{token:token})
    .then(userObj => {
        axios.get(`/feed/get-feed?userId=${userObj.data._id}`)
        .then(res => {
            let feeds = res.data.feed.reverse();
            let newFeeds = 0;
            for (let i = 0; i < feeds.length; i++)
                newFeeds = feeds[i].seen == false ? newFeeds + 1 : newFeeds;
            console.log(userObj.data.username);
            let currFeed = (feeds && feeds.length > 0) ? feeds.map(feed => 
                <MenuItem 
                    style={{color: feed.seen == false ? 'black' : 'gray'}} 
                    id={feed._id} 
                    onClick={() => redirectToProfile(feeds,userObj.data.username)}
                    disabled={feed.seen ? true : false}
                >
                    {feed.message}
                </MenuItem>) 
                : <MenuItem>No new notification</MenuItem>
                
            setFeedList(currFeed);
            setFeedData(feeds);
            setFeedNum(newFeeds);
            setFlag(true);
        })
    })
    .catch(err => {console.log(err)})
} 

/* setFeedToRead converts every feed's seen attribute
to true */
export const setFeedToRead = (feed,socketIo,setAnchorEl) => {
    axios.post('/feed/set-feed-to-read', {feeds:feed})
    .then(res => {
        console.log(res);
        socketIo.emit('feed','update feed');
        setAnchorEl(null);
    })
    .catch(err => console.log(err));
}