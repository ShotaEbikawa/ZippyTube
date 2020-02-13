import React from 'react'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import Link from '@material-ui/core/Link'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    root: {
        marginTop: '4%',
    },
    containerStyle: {
        display: 'flex',
        width: 'auto',
        height: 'auto',
        justifyContent:'center',
        marginTop: '7vh',
    },
    paperStyle: {
        paddingTop: '1rem',
        width:'100%',
        paddingBottom: '5rem',
        textAlign: 'center'
    },
    checkErrorMessage: {
        display: 'inline-flex',
        fontSize: '0.8rem',
        color: 'red',
    },
    inputStyle: {
        display: 'none'
    },
    iconStyle: {
        width: '10rem',
        height: '10rem',
        display:'inline-flex',
        justifyContent:'center'
    },
    publishStyle: {
        width: '80%',
        height:'80%',
        opacity: 0.8,
    },
    uploadText: {
        width: 'auto'
    },
    successIcon: {
        width: '100%',
        height: '100%',
        color: 'green'
    },
}))

const VideoSuccess = (props) => {
    const classes = useStyle();
    const handleClick = () => {
        props.history.push('/')
    }
    return (
        <>
            <Typography  variant='h5'>
                Congratulations!! You have submitted your video
            </Typography>
            <Typography  variant='h6'>
                Your video should be published soon.
            </Typography>
            <br/><br/>
            <div className={classes.iconStyle}>
                <CheckCircleIcon className={classes.successIcon}/>
            </div>
            <br/><br/><br/>
            <Link onClick={handleClick}>Go to Homepage</Link>
        </>
    )
}

export default withRouter(VideoSuccess)