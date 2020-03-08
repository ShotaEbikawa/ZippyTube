import axios from 'axios';
import { getCookieType } from './userAction';


// fetchProfile sends the request to the get-profile-info endpoint
// to retrieve the given user's profile info.
const fetchProfile = (username,setMedias,setUserUrl,setFlag) => {
    axios.get(`/profile/get-profile-info?username=${username}`)
    .then(res => {
        setMedias(res.data.media);
        setUserUrl(res.data.user.profile_url);
        setFlag(true);
    })
    .catch(err=> console.log(err));
}



// getProfileInfo retrieves all of the relevant data (media and user info)
// to display them on the given user's profile page.
// It first validates whether this page is the user itself by 
// calling the /auth endpoint, and if 
// the fetched username == user's username itself,
// isUser state will be set to True (which includes profile upload feature).
// Otherwise, it will send a request to the /profile endpoint to retrieve the data.
export const getProfileInfo = (username, setMedias, setFlag,setIsUser,setUserUrl) => {
    const token = getCookieType('token');
    if (token != "") {
        axios.post('/auth/check-account',{token:token})
        .then(userObj =>  {
            if (userObj.data.username == username) setIsUser(true);
            else setIsUser(false);
            fetchProfile(username,setMedias,setUserUrl,setFlag);
        })
        .catch(err => console.log(err));
    }
    else {
        setIsUser(false);
        fetchProfile(username,setMedias,setUserUrl,setFlag);
    }
}




// uploadProfile sends a request to the /profile endpoint 
// to upload the given image file to the AWS S3 bucket
// and store its URL in the user's profile_url attribute
// in one's document.
export const uploadProfile = (files, socketIo) => {
    const token = getCookieType('token');
    axios.post('/auth/check-account', {token: token})
    .then(userObj => {
        let formData = new FormData();
        let headers =  {'content-type': 'multipart/form-data'}
        formData.append('userId',userObj.data._id);
        formData.append('file', files[0]);
        axios.post('/profile/upload-profile', formData, {headers: headers})
        .then(res => {socketIo.emit('uploaded','uploaded new profile pic');})
        .catch(err => {console.log(err)});
    })
}