import React from 'react';
import '../../App.css'
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    icon: {color: 'gray',},
}))

const NotificationButton = (props) => {
    const classes = useStyles();
    const handleClick = () => {
        props.history.push('/create-video')
    }

    return (
        <>
            <IconButton>
                <NotificationsIcon 
                    className={classes.icon} 
                    onClick={handleClick}
                />
            </IconButton>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    // code goes in here.
})

export default withRouter(connect()(NotificationButton))