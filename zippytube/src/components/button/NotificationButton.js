import React from 'react';
import '../../App.css'
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import { connect } from 'react-redux';
import { getFeed } from '../../redux/action/feedAction';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    icon: {color: 'gray',},
}))

const NotificationButton = ({feeds,dispatch,history,socketIo}) => {
    const classes = useStyles();
    const [feedNum,setFeedNum] = React.useState(0)
    const [flag, setFlag] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    React.useEffect(() => {
        socketIo.on('sign-out', (message)=>{
            console.log(message);
            dispatch(getFeed(setFeedNum,setFlag));
        });
        socketIo.on('sign-in', (message)=>{
            console.log(message);
            dispatch(getFeed(setFeedNum,setFlag));
        });
        socketIo.on('feed', (message) => {
            console.log(message);
            dispatch(getFeed(setFeedNum,setFlag));
        });
        },[])

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    let feedList = flag && feeds ? feeds.data.map(feed => 
                                <MenuItem id = {feed._id} onClick={handleClose}>
                                    {feed.message}
                                </MenuItem>) : <MenuItem>No new notification</MenuItem>;
    return (
        <>
            <IconButton
                aria-controls='avatar-drop' 
                aria-haspopup='true'
                onClick={handleClick}  
            >
                <Badge badgeContent={feedNum} >
                    <NotificationsIcon 
                        className={classes.icon}  
                        onClick={handleClick}
                    />
                </Badge>
            </IconButton>
            <Menu                 
                id='avatar-drop'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {feedList}
            </Menu>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    feeds: state.feed.feeds,
    dispatch: props.dispatch,
    history: props.history,
    socketIo: props.socketIo,
})

export default withRouter(connect(mapStateToProps)(NotificationButton))