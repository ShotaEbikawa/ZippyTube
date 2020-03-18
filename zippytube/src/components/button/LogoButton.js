import React from 'react';
import '../../App.css';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    // the ZippyTube logo
    logo: {
        marginLeft:'3rem',
        color: '#283cb5',
        cursor: 'pointer',
    },
    /* the Link component, wrapping the 
    logo text */
    linkStyle: {
        textDecoration:'none',
        fontWeight:'800',
        fontSize:'1.6rem',
    }
}))

const LogoButton = (props) => {
    const classes = useStyles();

    /* redirects user to the homepage if a 
    user presses the ZippyTube logo */
    const handleClick = () => {
        props.history.push('/');
    }

    return (
        <>
            <Typography variant='h5' className={classes.logo} onClick={handleClick}>
                <a className={classes.linkStyle} onClick={handleClick}>
                    ZippyTube
                </a>
            </Typography>
        </>
    )
}

export default withRouter(LogoButton)