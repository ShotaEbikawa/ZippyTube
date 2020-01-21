import axios from 'axios'


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
export const loginUser = (userName, passWord) => (dispatch) => {
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
    })
    .then(result => {
        dispatch({
            type: 'CACHE_USERNAME',
            payload: userName,
        })
    })
    .catch(err => {console.log(err)});
}

export const isAuthenticated = () => (dispatch) => {
    const token = getCookieType('token');
    const id = getCookieType('id');
    if (id != '' && token != '') {
        axios.post('/auth/get-username', {token:token})
        .then(res=>res.data)
        .then(result => {
            console.log(result);
            console.log(result.data[0].username);
            console.log(token)
            dispatch({
                type: 'CACHE_USERNAME',
                payload: result.data[0].username,
            });
            return true;
        });
        return true;
    }
    else
        return false;
}

// Credit goes to this user Mac
// https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript
export const getCookieType = (type) => {
    var b = document.cookie.match('(^|[^;]+)\\s*' + type + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

export const signOut = () => (dispatch) => {
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie="first=; expires=Thue, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch({
        type: 'SIGN_OUT',
        payload: ''
    })
    window.location.reload();

}