import axios from 'axios'
import { getFeed } from './feedAction';

// registerUser sends a request to the server to 
// use an entered data to create an account
export const registerUser = (newUser, history) => {
    axios.post('/auth/register-account', newUser)
    .then(res => { history.push('/'); })
    .catch(err => { console.log('err'); })
}


// loginUser sends a request to the server to check whether
// the given username and password matches in any of the 
// document in the users collecion
export const loginUser = (userName, passWord, setToggle,setPassErr,setPassError,setUsrErr,setUserError,socketIo) => (dispatch) => {
    let userObj = {
        username: userName, 
        password: passWord
    };
    axios.post('/auth/login-account', userObj)
    .then(res => { 
        console.log(`id=${res.data.id};token=${res.data.token};`);
        document.cookie = `id=${res.data.id};`;
        document.cookie = `token=${res.data.token};`;
        document.cookie = `first=${userName.substring(0,1).toUpperCase()}`
        console.log('redirecting...');
        setToggle(false);
    })
    .then(result => {
        dispatch({
            type: 'CACHE_USERNAME',
            payload: userName,
        })
        socketIo.emit('sign-in', 'signed in');
    })
    .catch(err => {
        console.log('cannot find username');
        setPassErr(true);
        setUsrErr(true);
        setPassError('username/password is incorrect');
        setUserError('username/password is incorrect');
    });
}



// isAuthenticated sends a request to the server to 
// validate whether a given id and token matches
// to any document in users collection if user's cookie exists
export const isAuthenticated = (socketIo) => (dispatch) => {
    const token = getCookieType('token');
    const id = getCookieType('id');
    if (!cookieIsEmpty(token,id)) {
        axios.post('/auth/get-username', {token:token})
        .then(res=>res.data)
        .then(result => {
            dispatch({
                type: 'CACHE_USERNAME',
                payload: result.data[0].username,
            });
            socketIo.emit('sign-in','signed in');
            return true;
        })
        .catch(err =>{
            console.log('cannot find username'); 
            return false;
        });
        return true;
    }
    else {
        return false;
    }
}


// checks whether the cookie is empty
export const cookieIsEmpty = (token,id) => {
    if (id == '' || id == undefined || token == '' || token == undefined)
        return true;
    return false;
}


// Credit goes to this user Mac
// https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript
export const getCookieType = (type) => {
    var b = document.cookie.match('(^|[^;]+)\\s*' + type + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}



// signOut clears user's cookie assigned in
// all of the path that exists in the app
export const signOut = (socketIo) => (dispatch) => {
    const type = ['id','first','token']
    for (var i = 0; i < 3; i++) {
        document.cookie = `${type[i]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        document.cookie = `${type[i]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/results`;
    }
    socketIo.emit('sign-out', 'signed out');
    dispatch({
        type: 'SIGN_OUT',
        payload: ''
    })
}