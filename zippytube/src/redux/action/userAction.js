import axios from 'axios'

export const registerUser = (newUser, history) => {
    axios.post('/auth/register-account', newUser)
    .then(res => { history.push('/'); })
    .catch(err => { console.log('err'); })
}

export const loginUser = (userName, passWord) => {
    let userObj = {
        username: userName, 
        password: passWord
    };
    axios.post('/auth/login-account', userObj)
    .then(res => { 
        console.log(`id=${res.data.id};token=${res.data.token};`);
        document.cookie = `id=${res.data.id};`;
        document.cookie = `token=${res.data.token};`;
        console.log('redirecting...');
        window.location.reload();
    })
    .catch(err => {console.log(err)})
}

export const isAuthenticated = () => {
    return getCookieType('id') != '' && getCookieType('token') != '';
}

// Credit goes to this user Mac
// https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript
export const getCookieType = (type) => {
    var b = document.cookie.match('(^|[^;]+)\\s*' + type + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

export const signOut = () => {
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}