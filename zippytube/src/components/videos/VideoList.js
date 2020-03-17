import React from 'react';
import './videolist.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    /* parent element that holds the 
    video's information */
    infoContainer: {
        height: '30%',
    },
    // parent element that holds the video itself 
    videoContainer: {
        height: '100%',
        cursor: 'pointer',
        borderRadius:'0',
        fontSize: '0.9rem',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        '@media only screen and (max-width: 960px)': {overflow:'none'},
    },
    // parent element that holds the video's thumbnail
    imgContainer: {
        width:'100%',
        height:'70%',
    },
    // parent element that holds the lists of video
    mediaListStyle: {
        padding:'0.7rem',
    },
    // the video's title
    titleStyle: {
        fontWeight:'500',
    }
  }));

const VideoList = ({history, medias, username, width}) => {
    const classes = useStyles();
    React.useEffect(() => {
    }, [width]);

    /* redirects the user to the given video's page 
    when clicked on the video's thumbnail */
    function handleClick(id) {
        history.push(`/video/${id}`);
    }

    /* modifies the number of video(s) being displayed
    each row depending on the given resolution sizes */
    const getColVal = () => {
            if (isWidthDown('xs',width)) return 2;
            else if (isWidthDown('sm',width)) return 3;
            else if (isWidthDown('md',width)) return 4;
            else return 4;
    }

    // variable that holds the list of videos
    const mediaList = (medias && medias.length > 0) ? (
        medias.map(result =>
            <GridListTile className=".MuiGridListTile-root.jss301">
                <Card className={classes.videoContainer}>
                    <CardMedia
                        key={result._id}
                        className={classes.imgContainer}
                        image={result.thumbnail}
                        onClick={() => handleClick(result._id)}
                    />
                    <CardContent className={classes.infoContainer}>
                        <Typography variant='p' className={classes.titleStyle}>
                            {   /* displays first 30 characters of the 
                                video's title*/
                                result.title.length > 30 ? 
                                result.title.substring(0,30) + '...' : 
                                result.title
                            }
                        </Typography>
                    </CardContent>
                </Card>
            </GridListTile>
        )) : ('');
    
    return(
        <>
            <GridList cols={getColVal()} spacing={10} className={classes.mediaListStyle}>
                {(medias && mediaList != '') ? mediaList : ''}
            </GridList>     
        </>
    )
}

const mapStateToProps = (state,props) => ({
    medias: props.medias,
    width: props.width,
    history: props.history,
    username: props.username,
});

export default withWidth()(withRouter(connect(mapStateToProps)(VideoList)));