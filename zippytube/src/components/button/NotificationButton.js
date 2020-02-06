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
    const [feedList, setFeedList] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    React.useEffect(() => {
        socketIo.on('sign-out', (message)=>{
            console.log(message);
            setFeedNum(0);
            setFeedList('');
        });
        socketIo.on('sign-in', (message)=>{
            console.log(message);
            dispatch(getFeed(setFeedNum,setFeedList,setAnchorEl,setFlag));
        });
        socketIo.on('feed', (message) => {
            console.log(message);
            dispatch(getFeed(setFeedNum,setFeedList,setAnchorEl,setFlag));
        });
        history.listen((location,action) => {
            socketIo.emit('feed', 'update feed');
        });
        },[history])

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
        console.log(feedNum);
    }

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
                onClose={()=> {setAnchorEl(null)}}
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