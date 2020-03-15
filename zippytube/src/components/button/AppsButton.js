import React from 'react';
import '../../App.css';
import AppsIcon from '@material-ui/icons/Apps';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    // the apps icon
    icon: {
        color: 'gray'
    },
}))


const AppsButton = () => {
    const classes = useStyles();

    return (
        <>
            <IconButton>
                <AppsIcon className={classes.icon}/>
            </IconButton>
        </>
    )
}

export default AppsButton;