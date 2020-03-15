import React from 'react';
import ImgUrl from './empty-media.png';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    // wrapper elements
    wrapperStyle: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        fontWeight: '300',
        fontSize: '1.3rem',
        paddingBottom: '1rem',
    },
    // the given image
    imgStyle: {
        objectFit: 'cover',
        height: '180px',
        '@media only screen and (max-width: 450px)': {
            width: '50%',
            height:'50%',
        }
    }
}));

const EmptyMedia = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.wrapperStyle}>
                <img className={classes.imgStyle} src={ImgUrl} />
                <p>username not uploaded a video yet...</p>
            </div>
        </>
    )
}

export default EmptyMedia;