import React from 'react';
import VideoList from '../components/videos/VideoList';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllVideos } from '../redux/action/mediaAction';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import Paper from '@material-ui/core/Paper';
import HomeBanner from '../components/banner/HomeBanner';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    paperStyle: {backgroundColor:'#f9f9f9'},
}))

const HomePage = ({media,dispatch,history,width,socketIo}) => {
    const classes = useStyles();
    const [flag,setFlag] = React.useState(false);

    React.useEffect(() => {
        dispatch(fetchAllVideos(setFlag))
        console.log(media)
    },[])

    return(
        <>
            <Container maxWidth={false}>
                <HomeBanner/>
                <br/><br/>
                <Typography variant="h5" className={classes.recommendedStyle}>
                    Recommended
                </Typography>
                <br/>
                <Paper className={classes.paperStyle}>
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
})

export default withWidth()(withRouter((connect(mapStateToProps)(HomePage))))