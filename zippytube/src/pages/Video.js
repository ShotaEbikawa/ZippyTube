import React from 'react'
import { connect } from 'react-redux'
import {videoSize, relatedSize, contentContainer} from '../components/media'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {fetchResults, getVideo} from '../redux/action/mediaAction'
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    videoContainer: videoSize,
    contentSize: relatedSize,
    titleContainer: contentContainer,
    
    details: {
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    playIcon: {
        width: 38,
        height: 38,
    },
    videoSize: {
        width:'100%',
        height:'100%',
    },
    noResults: {
        textAlign: 'center',
        paddingTop: '3rem',
    },
    cover: {
      width: '200px',
      height:'100px',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
}))

const Video = ({id,media,history,dispatch,video}) => {
    const classes = useStyles();
    // validates whether the server successfully sent the
    // given media document to redux
    const [flag, setFlag] = React.useState(false);


    // Sends a request to the server to return the media
    // document matching the given id, alongside with the related
    // document media matching the document's title
    // It runs everytime the id (in mapStateToProps) changes
    React.useEffect(()=>{
        dispatch(getVideo(id,setFlag,history));
    }, [id])


    // sets flag to false and navigates to the
    // same url path to render selected related video
    function handleClick(id) {
        setFlag(false);
        history.push(`/video/${id}`)
    }

    // component storing JSX regarding the selected video.
    // It checks whether the video exists and whether the flag
    // is set to true before initializing the JSX to the component
    const certainVideo = video && flag ? video.map(
        result => (<>
                        <div key={id} className={classes.videoContainer}>
                            <video className={classes.videoSize} controls> 
                                <source src={result.url} type="video/mp4">
                                </source>
                            </video>
                        </div> <br/>         
                        <div className={classes.titleContainer}>
                        <Typography variant='h5' >
                                {result.title}
                        </Typography>
                        <hr/>
                        <Typography variant='p'>
                            {result.desc}
                        </Typography>
                        </div>      
                    </>        
                ))  : ''


    // component that stores JSX regarding media documents that matches
    // the selected video's title
    let medias = media && media.length > 0 ? media.map(results => 
        <div
            className={classes.card}
            key={results._id}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <CardMedia
                        onClick={() => handleClick(results._id)}
                        className = {classes.cover}
                        image={results.thumbnail}
                    />
                </Grid>
                <Grid item>
                    <CardContent className={classes.contentSize}>
                        <Typography variant='p'>{results.title.length > 40 ? results.title.substring(0,40) + '...' : results.title}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>) : 
        <div>
            <Container className={classes.noResults}>
                <Typography variant='p'>The query does not match any of the video...</Typography>
            </Container>
        </div>
    return(
            <Container>
                <br/><br/>
                <Grid container spacing={3}>
                    <Grid item>
                        {certainVideo}
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>
                            Related Videos
                        </Typography>
                        <br/>
                        {medias}
                    </Grid>
                </Grid>
                <button>leave comments</button>
            </Container>
    )
}

const mapStateToProps = (state,props) => ({
    video: state.media.video.data,
    media: state.media.results.data,
    history: props.history,
    id: props.match.params.id,
    dispatch: props.dispatch
}) 

export default withRouter(connect(mapStateToProps)(Video))