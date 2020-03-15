import React from 'react';
import '../../App.css';
import SignInModal from '../form/SignInModal';
import VideoButton from './VideoButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotificationButton from './NotificationButton';
import {signOut} from '../../redux/action/userAction';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    // the swipeable drawer
    drawerStyle: {
        display:'none',
        '@media only screen and (max-width: 450px)': {display: 'block'}
    }, 
}));


const MobileNav = ({username,dispatch,socketIo,history,setSearchFlag,searchFlag,isAuth}) => {
    const classes = useStyles();
    const [flag, setFlag] = React.useState(false);
    const [state, setState] = React.useState({right: false,});
    const colorStyle = {color:'#3f50b5' };

    /* re-renders the component if the serverside sends a 
    websocket response regarding mobile-nav, so that the
    notification feed will be updated */
    React.useEffect(() => {
        setFlag(true);
        socketIo.emit('mobile-nav','mobile-nav activated');
    }, [username,state,flag]);

    /* onClick event that handles situation for each icon existing in the
    MobileNav component. If a user presses search icon, the mobile search bar
    will expand/hide. If a user presses other icons, it will redirect a user
    to a designated url */
    const toggleIcon = (side,open,type='') => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
            setState({ ...state, [side]: open });
            if (type === 'search') setSearchFlag(!searchFlag);
            else if (type === 'upload') history.push('/create-video');
            else if (type === 'profile') history.push(`/user-profile/${username}`);
            else return;
    }

    return (
        <>
            <IconButton
                style={colorStyle}
                edge="start" 
                role="presentation" 
                onClick={toggleIcon('right', true)}
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                classes = {{paperAnchorRight: classes.drawerStyle}}
                anchor="right"
                open={state.right}
                onClose={toggleIcon('right', false)}
                onOpen={toggleIcon('right', true)}
            >
            {(isAuth && flag) ? (
                <div>
                    <div onClick={toggleIcon('right', false, 'search')}>
                        <IconButton style={colorStyle} role="presentation">
                            <SearchIcon />
                        </IconButton>
                        Search
                    </div>
                    <div                                     
                        role="presentation"
                        onClick={toggleIcon('right',false,'upload')}
                        onKeyDown={toggleIcon('right',false,'upload')}
                    >
                        <VideoButton/>
                        Upload
                    </div>
                    <div>
                        <NotificationButton socketIo={socketIo} state={state}/>
                        Notification &nbsp;&nbsp;&nbsp;
                    </div>
                    <div onClick={toggleIcon('right',false,'profile')}>
                        <IconButton>
                            <AccountBoxIcon style={colorStyle}/>
                        </IconButton>
                        Profile
                    </div>
                    <div onClick={()=>{dispatch(signOut(socketIo))}}>
                        <IconButton>
                            <ExitToAppIcon style={colorStyle} />
                        </IconButton>
                        Sign Out
                    </div>
                </div>) : (
                <div>
                    <div                                    
                        onClick={toggleIcon('right', false,'search')}
                        onKeyDown={toggleIcon('right', false,'search')}
                    >
                        <IconButton 
                            style={colorStyle}
                            role="presentation"
                        >
                            <SearchIcon />
                        </IconButton>
                        Search &nbsp;&nbsp;
                    </div>
                    <SignInModal socketIo={socketIo} variant={true} isLink={true}/>
                </div>
            )}
        </SwipeableDrawer>
    </>
    )
}

const mapStateToProps = (state,props) => ({
    username: state.user.username,
    dispatch: props.dispatch,
    socketIo: props.socketIo,
    history: props.history,
    isAuth: props.isAuth,
    setSearchFlag: props.setSearchFlag,
    searchFlag: props.searchFlag,
});

export default withRouter(connect(mapStateToProps)(MobileNav));