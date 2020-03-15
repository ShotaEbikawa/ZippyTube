import React from 'react'
import { connect } from 'react-redux'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import Container from '@material-ui/core/Container';
import CommentList from '../components/CommentList';
import CertainVideo from '../components/videos/CertainVideo';
import RelatedVideo from '../components/videos/RelatedVideo';
import Grid from '@material-ui/core/Grid';
import CommentForm from '../components/form/CommentForm';
import {fetchResults, getVideo} from '../redux/action/mediaAction'
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    // wrapper element
    mediaWrapper: {
        width: '100%'
    },
    // col of the video
    videoCol: {
        width: '60%',
        '@media only screen and (max-width:800px)': {
            width: '100%',
        }
    },
    // col of related videos
    relatedCol: {
        width: '40%',
        '@media only screen and (max-width:800px)': {
            width: '100%',
        }
    },
}))

const Video = ({id,media,history,dispatch,video}) => {
    const classes = useStyles();
    // validates whether the server successfully sent the
    // given media document to redux
    const [flag, setFlag] = React.useState(false);
    const [certainVideo,setCertainVideo] = React.useState('');


    // Sends a request to the server to return the media
    // document matching the given id, alongside with the related
    // document media matching the document's title
    // It runs everytime the id (in mapStateToProps) changes
    function handleClick(id) {
        history.push(`/video/${id}`);
    }

    React.useEffect(()=>{
        setFlag(false);
        dispatch(getVideo(id,setFlag,history,setCertainVideo,CertainVideo));
    }, [id,history,])

    return(
            <Container>
                <br/><br/>
                <Grid container spacing={3} className={classes.mediaWrapper}>
                    <Grid className={classes.videoCol} item>
                        {(flag) 
                            ? (
                                <div>
                                    {certainVideo}
                                    <br/>
                                    <CommentForm videoId={id}/>
                                    <br/>
                                </div> 
                              )
                            : ('')
                        }
                    </Grid>
                    <Grid className={classes.relatedCol} item>
                        {flag ?
                        <>
                        <Typography variant='h6'>
                            Related Videos
                        </Typography>
                        <br/></> : ''}
                        {flag ? <RelatedVideo media={media} handleClick={handleClick}/> : ''}
                    </Grid>
                </Grid>
                <br/>
            </Container>
    )
}

const mapStateToProps = (state,props) => ({
    video: state.media.video.data ? state.media.video.data : '',
    media: state.media.results.data,
    history: props.history,
    id: props.match.params.id,
    dispatch: props.dispatch
}) 

export default withRouter(connect(mapStateToProps)(Video))