import React from 'react';
import '../App.css';
import Toolbar from '@material-ui/core/Toolbar';
import VideoButton from './button/VideoButton';
import Avatar from './button/Avatar';
import MobileNav from '../components/button/MobileNav';
import LogoButton from './button/LogoButton';
import SearchBar from './searchbar/SearchBar';
import SignInModal from './form/SignInModal';
import { connect } from 'react-redux';
import NotificationButton from './button/NotificationButton';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {isAuthenticated, signOut} from '../redux/action/userAction';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    // parent element that holds the MobilNav component
    mobileNavBar: {
        display: 'none',
        marginLeft: 'auto',
        color: '#3f50b5',
        '@media only screen and (max-width: 450px)': {display: 'flex'}
    },
    // parent element that holds the SearchBar component
    searchBar: {
        display:'flex',
        marginLeft: '3vw',
        marginRight: '6vw',
        '@media only screen and (max-width: 1003px)': {display: 'none'}
    },
    // parent element that holds the search icon image
    mobileSearchButton: {
        display:'none',
        color: '#3f50b5',
        '@media only screen and (max-width: 1003px)': {display: 'flex'}
    },
    /* parent element that holds the mobile-friendly 
    SearchBar component */
    mobileContainer: {
        display: 'none',
        justifyContent: 'center',
        padding:'1rem',
        '@media only screen and (max-width: 1003px)': {display: 'flex'}
    },
    /* parent element that holds all of the icons 
    displaying in the NavBar component */
    iconContainer: {
        display: 'flex',
        marginLeft: 'auto',
        justifyContent: 'flex-end',
        '@media only screen and (max-width: 450px)': {display: 'none'}
    },
    /* parent element that holds NavBar component's 
    contents */
    navContent: {
        backgroundColor: 'white',
        display:'inline-flex',
    },
    // the navigation bar itself
    grow: {
        flexGrow: 1,
        color: 'black',
        backgroundColor: 'white',
    },
}))


const NavBar = ({username,dispatch,socketIo, history}) => {
    const classes = useStyles();
    const [isAuth, setIsAuth] = React.useState(false);
    const [searchFlag, setSearchFlag] = React.useState(false);
    const [flag, setFlag] = React.useState(false);

    React.useEffect(() => {
        setIsAuth(dispatch(isAuthenticated(socketIo)));
        setFlag(true);
    }, [username])

    return(
        <AppBar position='static' className={classes.grow}>
            <Toolbar className={classes.navContent}>
                <LogoButton/>
                    <div className={classes.mobileNavBar}>
                        {
                            /* the ternary operator below displays 
                            the mobile-friendly navbar depending on 
                            the given resolution sizes */
                        }
                        {flag ? (
                            <MobileNav 
                                isAuth={isAuth}
                                socketIo={socketIo} 
                                searchFlag={searchFlag}
                                setSearchFlag={setSearchFlag}
                            />
                        ) : ('')}
                    </div>
                    <div className={classes.searchBar}>
                        <SearchBar/>
                    </div>
                    <div className={classes.iconContainer}>
                        <IconButton 
                            className={classes.mobileSearchButton} 
                            onClick={()=>{setSearchFlag(!searchFlag);}}
                        >
                            <SearchIcon/>
                        </IconButton>
                        {
                            /* If the user is authenticated and the flag is set 
                             to true (fully rendered), then IconButton, VideoButton,
                             and NotificationButton will appear. Otherwise, only 
                             SignInModal will appear in the NavBar */
                        }
                        {(isAuth && flag) ? (
                            <>
                                <VideoButton/>
                                <NotificationButton socketIo={socketIo}/>
                                <Avatar socketIo={socketIo}/>
                            </>) : (
                                <SignInModal socketIo={socketIo} variant={true}/>)
                        } 
                    </div>  
            </Toolbar>
                {
                    /* Displays a mobile-friendly search bar
                    when user presses the SearchIcon */
                }
                {(searchFlag) ? (
                    <>
                        <Divider/>
                        <div className={classes.mobileContainer}>
                            <br/>
                            <div>
                                <SearchBar/>
                            </div>
                        </div>
                    </>
                ) : ('')}
        </AppBar>
    )
}

const mapStateToProps = (state,props) => ({
    username: state.user.username,
    dispatch: props.dispatch,
    socketIo: props.socketIo,
    history: props.history,
});

export default withRouter(connect(mapStateToProps)(NavBar));
