import React from 'react'
import NavBar from './NavBar';
import {Switch, Route, withRouter} from 'react-router-dom'

const Main = (props) => {
    if (props.location.pathname === '/signup') return null;
    return (
            <div>
                <NavBar/>
            </div>
    )
}

export default withRouter(Main);