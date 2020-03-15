import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import Link from '@material-ui/core/Link';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    // parent element that holds the success icon
    iconContainer: {
        width: '10rem',
        height: '10rem',
        display:'inline-flex',
        justifyContent:'center'
    },
    // the success icon
    successIcon: {
        width: '100%',
        height: '100%',
        color: 'green'
    },
}))

const VideoSuccess = (props) => {
    const classes = useStyle();

    /* redirects user back to the homepage
    when clicked on the "Go to Homepage" link */
    const handleClick = () => {
        props.history.push('/');
    }
    return (
        <>
            <Typography  variant='h5'>
                Congratulations!! You have submitted your video
            </Typography>
            <Typography  variant='h6'>
                Your video should be published soon.
            </Typography>
            <br/>
            <br/>
            <div className={classes.iconContainer}>
                <CheckCircleIcon className={classes.successIcon}/>
            </div>
            <br/>
            <br/>
            <br/>
            <Link onClick={handleClick}>Go to Homepage</Link>
        </>
    )
}

export default withRouter(VideoSuccess);