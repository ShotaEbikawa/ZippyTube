import React from 'react';
import '../../App.css'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import { withRouter } from 'react-router-dom'



const useStyles = makeStyles(theme => ({
    logo: {
        marginLeft:'3rem',
        color: 'black',
        cursor: 'pointer',
    },
}))

const LogoButton = (props) => {
    const classes = useStyles();
    const handleClick = () => {
        props.history.push('/');
    }

    return (
        <>
            <Typography variant='h5' className={classes.logo}>
                <Link style={{textDecoration:'none'}} onClick={handleClick}>
                    ZippyTube
                </Link>
            </Typography>
        </>
    )
}

export default withRouter(LogoButton)