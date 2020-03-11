import React from 'react';
import '../../App.css'
import VideoCallIcon from '@material-ui/icons/VideoCall';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import { withRouter } from 'react-router-dom'
const useStyles = makeStyles(theme => ({}))

const VideoButton = (props) => {
    const classes = useStyles();
    const handleClick = () => {
        props.history.push('/create-video')
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <VideoCallIcon style={{color: props.color == "white" ? "white" : "#3f50b5"}}/>
            </IconButton>
        </>
    )
}

export default withRouter(VideoButton)