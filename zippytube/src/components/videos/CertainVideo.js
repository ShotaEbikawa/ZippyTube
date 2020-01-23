import React from 'react'
import {videoSize, relatedSize, contentContainer} from '../media'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    videoContainer: videoSize,
    titleContainer: contentContainer,
    card: {
        cursor: 'pointer',
    },
    videoSize: {
        width:'100%',
        height:'100%',
    },
}))

const CertainVideo = (props) => {
    const classes = useStyles();
    return(
        <>
        {
            props.video ?
            <>
                <div key={props.video.id} className={classes.videoContainer}>
                    <video className={classes.videoSize} controls> 
                        <source src={props.video.url} type="video/mp4">
                        </source>
                    </video>
                </div> <br/>         
                <div className={classes.titleContainer}>
                    <Typography variant='h5' >
                            {props.video.title}
                    </Typography>
                    <hr/>
                    <Typography variant='h6' >
                            {props.video.username}
                    </Typography>
                    <br/>
                    <Typography variant='p'>
                        {props.video.desc}
                    </Typography>
                    <br/>
                </div> 
            </> 
        : ''
        }
        </>
    )
}

export default CertainVideo;
