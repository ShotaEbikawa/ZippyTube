import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    bannerImage: {
        height:'300px',
        display: 'flex',
    },
    quote: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: ''
    }
}))


const HomeBanner = () => {
    const classes = useStyles();
    return (
        <>
        <br/>
        <Grid className={classes.bannerImage} container>
            <Grid item>
            <video className={classes.videoStyle} width={500} controls autoplay>
                <source
                    src='http://zippytube.s3.us-west-1.amazonaws.com/Southern Illinois University Commercial - Experience SIU.mp4'
                    type='video/mp4'
                >
                </source>
            </video>
            </Grid>
            <Grid className={classes.quote} items>
                    <Typography variant='h4'>
                        Experience SIU
                    </Typography>
            </Grid>
        </Grid>
        </>
    )
}

export default HomeBanner