import React from 'react';
import Container from '@material-ui/core/Container';
import Image from './siu.jpg';
import { Typography } from '@material-ui/core';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    // parent element that holds the existing grid items
    bannerContainer: {
        height:'250px',
    },
    // the written advertisement of SIU
    quote: {
        backgroundSize: 'cover',
        background: `url(${Image}) no-repeat center center`,
        width:'30%',
        height: 'auto',
        '@media only screen and (max-width: 800px)': {
            display: 'none',
        }
    },
    // parent element that holds the SIU video
    videoContainer: {
        overflow: 'hidden',
        width:'70%',
        height:'250px',
        '@media only screen and (max-width: 800px)': {
            width: '100%',
        }
    },
    // the SIU video
    videoStyle: {
        objectFit: 'cover',
    }
}));


const HomeBanner = () => {
    const classes = useStyles();
    return (
        <>
        <br/>
        <Grid className={classes.bannerContainer} container>
            <Grid item className={classes.videoContainer}>
                <video 
                    className={classes.videoStyle} 
                    width={'100%'} 
                    height={'100%'} 
                    controls 
                    muted 
                    autoPlay
                >
                    <source
                        src='http://zippytube.s3.us-west-1.amazonaws.com/Southern Illinois University Commercial - Experience SIU.mp4'
                        type='video/mp4'
                    >
                    </source>
                </video>
            </Grid>
            <Grid className={classes.quote} items>
            </Grid>
        </Grid>
        </>
    )
}

export default HomeBanner;