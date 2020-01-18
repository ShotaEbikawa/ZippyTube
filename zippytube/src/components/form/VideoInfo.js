import React from 'react'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import {registerUser} from '../../redux/action/userAction';
import md5 from 'md5';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { createVideos } from '../../redux/action/mediaAction';
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton'
import PublishIcon from '@material-ui/icons/Publish';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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
        width: '8rem',
        height: '8rem',
    },
    publishStyle: {
        width: '80%',
        height:'80%',
        opacity: 0.8,
    },
    uploadText: {
        width: 'auto'
    }
}))

const VideoInfo = () => {
    return (
        <FormControl>
            <br/>
            <Typography variant='h5'>
                Please Enter Relevant Information 
            </Typography>
            <Typography variant='h6'>
                while uploading your video
            </Typography>
            <br/><br/>
            <TextField
                label='title'
                variant='outlined'
            />
            <br/>
            <TextField 
                label='description'
                multiline={true}
                variant='outlined'
                rows={6}
                rowsMax={6}
            />
            <br/>
            <Button variant='contained' color='primary'>Publish Video</Button>        
        </FormControl>
    )
}

export default VideoInfo