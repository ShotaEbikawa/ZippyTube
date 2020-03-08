import React from 'react'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import VideoSuccess from '../components/VideoSuccess'
import TextField from '@material-ui/core/TextField';
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
    inputStyle: {display: 'none'},
    iconStyle: {
        width: '8rem',
        height: '8rem',
    },
    loadingStyle: {
        width: '10rem',
        height: '10rem',
        marginTop: '5%',
        display:'inline-flex',
        justifyContent:'center'
    },
    circularStyle: {
        width: '100%',
        height:'100%',
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

const VideoForm = ({username, socketIo}) => {
    const classes = useStyle();
    const [video,setVideo] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [titleErr,setTitleErr] = React.useState(false);
    const [desc, setDesc] = React.useState('')
    const [isLoading,setIsLoading] = React.useState(false);
    const [descErr,setDescErr] = React.useState(false);
    const [success,setSuccess] = React.useState(false);
    const [next, setNext] = React.useState(false);

    // Once the video is submitted,
    // the given video will be stored as the video state
    // and it will move forward to next form
    function handleChange(e) {
        setVideo(e.target.files);
        setNext(true);
    }
    
    // checks whether the title and description
    // is empty or vice versa
    const validate = () => {
        if (title == '')
            setTitleErr(true);
        else
            setTitleErr(false);
        if (desc == '')
            setDescErr(true);
        else
            setDescErr(false);
        return title != '' && desc != '';
    }

    // sends the request to the server
    // if the validate function returns true
    const submitVideos = () => {
        if (validate()) {
            setIsLoading(true);
            createVideos(video, title, desc,username,setSuccess,);
            socketIo.emit('feed', 'upload the video')
        }
    }

    // Displays loading component until the video is uploaded and shown
    // via the presentation layer of the application (FEATURE POST-PONED)
    const LoadingComponent = ()=> {
        return (
            <>
                <div className={classes.loadingStyle}>
                    <CircularProgress size={'70%'}/>
                </div>
                <br/>
                <div>
                    <Typography vairant='p'>
                        Sending the data to the serverside...
                    </Typography>
                    <Typography vairant='p'>
                        Please be patiant....
                    </Typography>
                </div>
            </>
        )
    }

    return(
        <>
          <Container maxWidth='md' className={classes.root}>
                        {(next) 
                            ? (  
                                <Paper className={classes.paperStyle}>
                                        {(success) ? (
                                                        <div>
                                                            <Grow in={true}>
                                                                <div>
                                                                    <VideoSuccess/>
                                                                </div>
                                                            </Grow> 
                                                        </div>
                                                    )   
                                                    : (isLoading) 
                                                            ? (<LoadingComponent/>)
                                                            : (
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
                                                                            error={titleErr}
                                                                            label='title'
                                                                            variant='outlined'
                                                                            value={title}
                                                                            onChange={e=>setTitle(e.target.value)}
                                                                            helperText={titleErr ? 'Please fill the given field' : ''}
                                                                        />
                                                                        <br/>
                                                                        <TextField 
                                                                            error={descErr}
                                                                            label='description'
                                                                            multiline={true}
                                                                            variant='outlined'
                                                                            rows={6}
                                                                            rowsMax={6}
                                                                            value = {desc}
                                                                            onChange = {e=>setDesc(e.target.value)}
                                                                            helperText={descErr ? 'Please fill the given field' : ''}
                                                                        />
                                                                        <br/><br/>
                                                                        <Button variant='contained' color='primary' onClick={submitVideos}>Publish Video</Button>        
                                                                    </FormControl>
                                                                </Grow> 
                                                             )
                                        }
                                    </Paper>
                                 )
                                : (
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
                                        </FormControl>
                                    </Paper>
                                  )
                        }
                </Container>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    username: state.user.username,
    socketIo: props.socketIo,
})

export default withRouter(connect(mapStateToProps)(VideoForm))