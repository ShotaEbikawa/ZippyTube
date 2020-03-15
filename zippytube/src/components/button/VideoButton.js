import React from 'react';
import '../../App.css';
import { withRouter } from 'react-router-dom';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
const useStyles = makeStyles(theme => ({}));

const VideoButton = (props) => {
    const classes = useStyles();

    /* onClick handler that redirects the user to the
    video-upload page */
    const handleClick = () => {
        props.history.push('/create-video')
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                {
                    /* changes the icon color depending on the 
                    value of props color */
                }
                <VideoCallIcon style={{color: props.color == "white" ? "white" : "#3f50b5"}}/>
            </IconButton>
        </>
    )
}

export default withRouter(VideoButton);