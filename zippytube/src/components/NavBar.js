import React from 'react';
import SearchBar from './searchbar/SearchBar';
import SignInModal from './form/SignInModal';
import '../App.css';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import VideoButton from './button/VideoButton';
import AppsButton from './button/AppsButton';
import IconButton from '@material-ui/core/IconButton';
import Avatar from './button/Avatar';
import LogoButton from './button/LogoButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {isAuthenticated} from '../redux/action/userAction';
import NotificationButton from './button/NotificationButton';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    bar: {
        backgroundColor: 'white',
        display:'inline-flex',
    },
    grow: {
        flexGrow: 1,
        color: 'black',
        backgroundColor: 'white',
    },
    search: {
        display:'flex',
        marginLeft: '3vw',
        marginRight: '6vw',
        '@media only screen and (max-width: 1000px)': {
            display: 'none'
        }
    },
    sTwo: {
        width: '60vw'
    },
    icon: {
        color: 'gray',
    },
    secondSearch: {
        display: 'flex',
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        padding:'1rem',
        '@media only screen and (max-width: 1003px)': {
            display: 'flex'
        },
        '@media only screen and (min-width: 1003px)': {
            display: 'none'
        }
    },
    searchIcon: {
        color: 'gray',
        display:'none',
        '@media only screen and (max-width: 1003px)': {
            display: 'block'
        }
    },
    iconContainer: {
        display: 'flex',
        marginLeft: 'auto',
        justifyContent: 'flex-end'
    },
    signin: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 1.5rem',
        marginTop: '0.2rem',
        height: '2.5rem',
        marginLeft: '1rem',
    },
    avatar: {
        margin: '0.0rem 0.4rem',
    },
}))


const NavBar = ({username,dispatch}) => {
    const classes = useStyles();

    return(
        <>
        <AppBar position='static' className={classes.grow}>
            <Toolbar className={classes.bar}>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <LogoButton/>
                <div className={classes.search}>
                    <SearchBar/>
                </div>
                <div className={classes.iconContainer}>
                    {isAuthenticated() ? <VideoButton/> : ''}
                    <AppsButton/>
                    <NotificationButton/>
                    {isAuthenticated() ? <Avatar/> : <SignInModal/>}
                </div>
            </Toolbar>
            <Divider />
            <div className={classes.secondSearch}>
                <br/>
                <div className={classes.sTwo}>
                    <SearchBar/>
                </div>
            </div>
            
        </AppBar>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    username: state.user.username,
    dispatch: props.dispatch,
})

export default withRouter(connect(mapStateToProps)(NavBar))