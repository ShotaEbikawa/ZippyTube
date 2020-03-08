import React from 'react'
import {videoSize, relatedSize, contentContainer} from '../media'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    titleContainer: contentContainer,
    card: {
        cursor: 'pointer',
    },
    videoSize: {
        width:'100%',
        height:'100%',
        '&:focus': {outline:'none'},
    },
}))

const CertainVideo = (props) => {
    const classes = useStyles();
    return(
        <>
            {
                (props.video) 
                ? (
                    <div>
                        <div key={props.video.id}>
                            <video className={classes.videoSize} controls autoPlay> 
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
                                    <Link><a href= {'/user-profile/' + props.video.username} >{props.video.username}</a></Link>
                            </Typography>
                            <br/>
                            <Typography variant='p'>
                                {props.video.desc}
                            </Typography>
                            <br/>
                        </div> 
                    </div> 
                )
                :   ('')}
        </>
    )
}

export default CertainVideo;
