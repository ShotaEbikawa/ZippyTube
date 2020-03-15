import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import md5 from 'md5';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import FormControl from '@material-ui/core/FormControl';
import { createVideos } from '../../redux/action/mediaAction';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import {registerUser} from '../../redux/action/userAction';

const useStyle = makeStyles(theme => ({}));

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

export default VideoInfo;