import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import {isAuthenticated, signOut} from '../../redux/action/userAction'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: '0.0rem 0.4rem',
    },
    avatarContainer: {
    }
}))

const Avatar = ({username,dispatch}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLogged, setIsLogged] = React.useState(false);

    // check whether the user is authenticated
    // before all components are rendered
    React.useEffect(()=> {
        setIsLogged(dispatch(isAuthenticated()))
        console.log(isLogged);
    },[username])

    // displays the dropdown if a user clicks on
    // the Avatar component
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    // Closes the drowndown if a user clicks outside
    // of the dropdown 
    const handleClose = () => {
      setAnchorEl(null);
    };

    // If a user clicks on a Logout button,
    // the app closes the dropdown, deletes the
    // the existing cookie and the existing 
    // username cached in redux
    const handleLogOut = () => {
        console.log('is it working')
        setAnchorEl(null);
        dispatch(signOut());
        console.log(username);
    }

    return(
        <>
            <div>
                <IconButton 
                    className={classes.avatarContainer} 
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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
            </div>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    username: state.user.username,
    dispatch: props.dispatch,
})

export default withRouter(connect(mapStateToProps)(Avatar))