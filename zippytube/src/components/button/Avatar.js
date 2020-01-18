import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import {isAuthenticated, signOut} from '../../redux/action/userAction'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withRouter} from 'react-router-dom'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: '0.0rem 0.4rem',
    },
    avatarContainer: {
    }
}))

const Avatar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLogged, setIsLogged] = React.useState(false);

    React.useEffect(()=> {
        setIsLogged(isAuthenticated())
    })

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogOut = () => {
        setAnchorEl(null);
        signOut();
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
                                <div className={classes.avatar}>S</div>
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

export default withRouter(Avatar);