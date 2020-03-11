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

const useStyles = makeStyles(theme => ({}))

const NotificationButton = ({color,dispatch,history,socketIo,state}) => {
    const classes = useStyles();
    const [feedNum,setFeedNum] = React.useState(0)
    const [flag, setFlag] = React.useState(false);
    const [feedList, setFeedList] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    React.useEffect(() => {
        socketIo.on('sign-out', (message)=>{
            setFeedNum(0);
            setFeedList('');
        });
        socketIo.on('sign-in', (message)=>{
            dispatch(getFeed(setFeedNum,setFeedList,setAnchorEl,setFlag));
        });
        socketIo.on('feed', (message) => {
            dispatch(getFeed(setFeedNum,setFeedList,setAnchorEl,setFlag));
        });
        socketIo.on('mobile-nav', (message) => {
            dispatch(getFeed(setFeedNum,setFeedList,setAnchorEl,setFlag));
        })
        history.listen((location,action) => {
            socketIo.emit('feed', 'update feed');
        });
        },[history,state])

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
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
                        style={{color: color == "white" ? "white" : "#3f50b5"}}
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
    color: props.color,
    state: props.state,
})

export default withRouter(connect(mapStateToProps)(NotificationButton));