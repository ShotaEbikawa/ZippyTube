import React from 'react'
import NavBar from './NavBar';
import {Switch, Route, withRouter} from 'react-router-dom'

/* Driver component that redirects user to the signup page if 
the user visits /signup endpoint. Otherwise, it will redirect
to the main application page itself */
const Main = (props) => {
    if (props.location.pathname === '/signup') return null;
    return (
            <div>
                <NavBar socketIo={props.socketIo}/>
            </div>
    )
}

export default withRouter(Main);