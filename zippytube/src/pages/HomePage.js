import React from 'react';
import VideoList from '../components/videos/VideoList';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import HomeBanner from '../components/banner/HomeBanner';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import { fetchAllVideos } from '../redux/action/mediaAction';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';

const useStyles = makeStyles(theme => ({
    // parent element that holds the VideoList component
    videoContainer: {
        backgroundColor:'#f9f9f9'
    },
    // the "Recommended" title
    suggestStyle: {
        fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "500",
        fontSize: '1.4rem',
    }
}));

const HomePage = ({media,dispatch,history,width,socketIo}) => {
    const classes = useStyles();
    const [flag,setFlag] = React.useState(false);

    React.useEffect(() => {
        dispatch(fetchAllVideos(setFlag))
    },[]);

    return(
        <>
            <Container>
                <HomeBanner/>
                <br/><br/>
                <Typography className={classes.suggestStyle} variant="h5">
                    Recommended
                </Typography>
                <br/>
                <Paper className={classes.videoContainer}>
                    {(flag) ? <VideoList medias={media}/> : ''}
                </Paper>
            </Container>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    media: state.media.results.data,
    dispatch: props.dispatch,
    history: props.history,
    socketIo: props.socketIo,
    width: props.width,
});

export default withWidth()(withRouter((connect(mapStateToProps)(HomePage))));