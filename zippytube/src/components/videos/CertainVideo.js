import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    // parent element that holds the video's title
    titleContainer: {
        width: '100%',
    },
    // parent element that holds the video itself
    videoContainer: {
        width:'100%',
        height:'100%',
        '&:focus': {outline:'none'},
    },
    // the video title
    titleStyle: {
        fontSize: '1.3rem',
        fontWeight: '500',
    },
    // link of the username
    linkStyle: {
        color: '#283cb5',
        fontWeight: '530',
        textDecoration: 'none',
        fontFamily: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,
        Fira Sans,Droid Sans,Helvetica Neue,sans-serif`,
    }
}))

const CertainVideo = (props) => {
    const classes = useStyles();
    return(
        <>
            { (props.video) ? (
                    <div>
                        <div key={props.video.id}>
                            <video className={classes.videoContainer} controls autoPlay> 
                                <source src={props.video.url} type="video/mp4">
                                </source>
                            </video>
                        </div> 
                        <br/>         
                        <div className={classes.titleContainer}>
                            <Typography className={classes.titleStyle} variant='h5'>
                                {props.video.title}
                            </Typography>
                            <hr/>
                            <Typography variant='h6' >
                                        <a className={classes.linkStyle} href={'/user-profile/' + props.video.username}>
                                            {props.video.username}
                                        </a>
                            </Typography>
                            <Typography variant='p'>
                                {props.video.desc}
                            </Typography>
                            <br/>
                        </div> 
                    </div>) : 
                    ('')
            }
        </>
    )
}

export default CertainVideo;
