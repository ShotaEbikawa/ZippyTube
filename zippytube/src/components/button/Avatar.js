import React from 'react';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import {isAuthenticated, signOut} from '../../redux/action/userAction'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({}))

const Avatar = ({username,color,dispatch,history,socketIo}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLogged, setIsLogged] = React.useState(false);
    const avatarStyle = {
        margin: '0.0rem 0.4rem',
        color: color == "white" ? "white" : "#3f50b5",
        width: '3rem',
    }

    /* check whether the user is authenticated
    before all components are rendered */
    React.useEffect(()=> {
        setIsLogged(dispatch(isAuthenticated(socketIo)));
        console.log(isLogged);
    },[]);

    /* displays the dropdown if a user clicks on
    the Avatar component */
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    /* Closes the drowndown if a user clicks outside
    of the dropdown */
    const handleClose = () => {
        setAnchorEl(false);
        history.push('/create-video');
    };

    /* redirects user to one's profile page if 
    a user presses the profile icon */
    const redirectToProfile = () => {
        setAnchorEl(false);
        history.push(`/user-profile/${username}`);
    }

    /* If a user clicks on a Logout button,
    then the app closes the dropdown, deletes
    the existing cookie and the existing 
    username cached in redux */
    const handleLogOut = () => {
        console.log('is it working')
        setAnchorEl(null);
        dispatch(signOut(socketIo));
        console.log(username);
    }

    return(
        <>
            <div>
                <IconButton 
                    style={avatarStyle}
                    aria-controls='avatar-drop' 
                    aria-haspopup='true'
                    onClick={handleClick}  
                >
                <div className={classes.avatar}>
                    {username.substring(0,1).toUpperCase()}
                </div>
                </IconButton>
                <Menu                 
                    id='avatar-drop'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Upload Video</MenuItem>
                    <MenuItem onClick={redirectToProfile}>Your Profile</MenuItem>
                    <MenuItem onClick={handleLogOut}>Sign Out</MenuItem>
                </Menu>
            </div>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    username: state.user.username,
    dispatch: props.dispatch,
    socketIo: props.socketIo,
    history: props.history,
    color: props.color,
});

export default withRouter(connect(mapStateToProps)(Avatar));