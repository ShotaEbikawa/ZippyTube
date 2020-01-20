import React from 'react'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import VideoInfo from '../components/form/VideoInfo'
import VideoSuccess from '../components/VideoSuccess'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import { connect } from 'react-redux'; 
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { createVideos } from '../redux/action/mediaAction';
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

const VideoForm = ({username}) => {
    const classes = useStyle();
    const [video,setVideo] = React.useState('');
    const [videoUrl, setVideoUrl] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('')
    const [success,setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [next, setNext] = React.useState(false);

    function handleChange(e) {
        console.log(e.target.files)
        setVideo(e.target.files);
        setNext(true);
        // createVideos(e.target.files,loading,setLoading,setVideoUrl)
    }
    
    const submitVideos = () => {
        console.log(video,title,desc,username);
        createVideos(video, title, desc,username);
        setSuccess(true)
        
        
    }

    const LoadingComponent = ()=> {
        return (
            <div>
                <CircularProgress />
                <p>Uploading videos...</p>
            </div>
        )
    }

    return(
        <>
          <Container maxWidth='md' className={classes.root}>
                        {next ?
                            <Paper className={classes.paperStyle}>
                                    {success ? 
                                                <div>
                                                    <Grow in={true}>
                                                        <div>
                                                            <VideoSuccess/>
                                                        </div>
                                                    </Grow> 
                                                </div>
                                             :
                                                <Grow in={next}>
                                                        <FormControl>
                                                            <br/>
                                                            <Typography variant='h5'>
                                                                Please Enter Given Information 
                                                            </Typography>
                                                            <Typography variant='h6'>
                                                                for the chosen video
                                                            </Typography>
                                                            <br/><br/>
                                                            <TextField
                                                                label='title'
                                                                variant='outlined'
                                                                value = {title}
                                                                onChange = {e=>setTitle(e.target.value)}
                                                            />
                                                            <br/>
                                                            <TextField 
                                                                label='description'
                                                                multiline={true}
                                                                variant='outlined'
                                                                rows={6}
                                                                rowsMax={6}
                                                                value = {desc}
                                                                onChange = {e=>setDesc(e.target.value)}
                                                            />
                                                            <br/><br/>
                                                            <Button variant='contained' color='primary' onClick={submitVideos}>Publish Video</Button>        
                                                        </FormControl>
                                                </Grow> 
                                    }
                                </Paper>
                                :
                                <Paper className={classes.paperStyle}>
                                    <FormControl> 
                                        <Typography variant='h5' className={classes.uploadText}>
                                            Upload Video
                                        </Typography>
                                        <br/>
                                        <input
                                            accept="video/*"
                                            className={classes.inputStyle}
                                            id="contained-button-file"
                                            multiple
                                            files={video}
                                            type="file"
                                            onChange={e=> handleChange(e)}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <IconButton variant="contained" color="primary" className={classes.iconStyle} component="span">
                                                <PublishIcon className={classes.publishStyle}/>
                                            </IconButton>
                                        </label>
                                        <br/>
                                        <Typography variant='p' className={classes.uploadText}>
                                            Select a file you want to upload
                                        </Typography>
                                        <input
                                            accept="video/*"
                                            className={classes.inputStyle}
                                            id="contained-button-file"
                                            multiple
                                            files={video}
                                            type="file"
                                            onChange={e=> handleChange(e)}
                                        />
                                        <br/><br/>
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" color="primary" component="span">
                                            Upload
                                            </Button>  
                                        </label>
                                    </ FormControl>
                                </Paper>
                        }
                </Container>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    username: state.user.username
})

export default withRouter(connect(mapStateToProps)(VideoForm))