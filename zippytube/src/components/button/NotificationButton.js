import React from 'react';
import '../../App.css';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import { getFeed, setFeedToRead } from '../../redux/action/feedAction';



const useStyles = makeStyles(theme => ({}));

const NotificationButton = ({color,dispatch,history,socketIo,state,feeds}) => {
    const classes = useStyles();
    const [feedNum,setFeedNum] = React.useState(0)
    const [flag, setFlag] = React.useState(false);
    const [feedData, setFeedData] = React.useState('');
    const [feedList, setFeedList] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const iconStyle = {
        color: color == "white" ? "white" : "#3f50b5",
    };

    /* onClick handler that opens or closes the 
    swipeable drawer depending on its state */
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = (feedData) => {
        setFeedToRead(feedData,socketIo,setAnchorEl);
        // function that turns every feed into true;
    }

    /* re-renders the component if the serverside sends a 
    web-socket response regarding sign-out event, sign-in event,
    feed event, or mobile-nav event. url-change will also 
    trigger the re-rendering of the component */
    React.useEffect(() => {
        socketIo.on('sign-in', (message)=>{
            dispatch(getFeed(setFeedNum,setFeedList,
                    setFeedData,handleClose,setFlag));
        });
        socketIo.on('feed', (message) => {
            dispatch(getFeed(setFeedNum,setFeedList,
                    setFeedData,handleClose,setFlag));
        });
        socketIo.on('mobile-nav', (message) => {
            dispatch(getFeed(setFeedNum,setFeedList,
                    setFeedData,handleClose,setFlag));
            console.log('recieved');
        });
        history.listen((location,action) => {
            socketIo.emit('feed', 'update feed');
        });
        socketIo.on('sign-out', (message)=>{
            setFeedNum(0);
            setFeedList('');
        });
        },[history,state])

    return (
        <>
            <IconButton
                aria-controls='avatar-drop' 
                aria-haspopup='true'
                onClick={handleClick}  
            >
                <Badge badgeContent={feedNum} >
                    <NotificationsIcon 
                        style={iconStyle}
                        onClick={handleClick}
                    />
                </Badge>
            </IconButton>
            <Menu                 
                id='avatar-drop'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={()=>handleClose(feedData)}
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
});

export default withRouter(connect(mapStateToProps)(NotificationButton));