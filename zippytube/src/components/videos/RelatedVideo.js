import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    
    // parent element that holds the video's thumbnail
    thumbnailCol: {
        width: '40%',
        '@media only screen and (max-width:800px) and (min-width:500px)': {width: '30%'},
        '@media only screen and (max-width:415px)': {
            width: '100%',
            height: '170px',
        }
    },
    // parent element that holds the video's information
    descCol: {
        width: '60%',
        '@media only screen and (max-width:800px) and (min-width:500px)': {width: '70%'},
        '@media only screen and (max-width:415px)': {width: '100%'}
    },
    // parent element that holds the grid items (videos)
    gridContainer: {
        cursor: 'pointer',
        '@media only screen and (max-width:415px)': {display: 'block'}
    },
    // parent element that holds the required child elements
    // if there are no matching queries
    noResults: {
        textAlign: 'center',
        paddingTop: '3rem',
    },
    // the video's username
    userStyle: {
        fontSize: '1rem',
        fontWeight:'350',
        color: '#4a4b52',
    },
    // the video's title
    titleStyle: {
        fontWeight: '500',
        fontSize: '1rem',
    },
    // the video's thumbnail
    thumbnailStyle: {
      width: '100%',
      height: '100%',
      
    },
}))


const RelatedVideo = ({media,history,handleClick}) => {
    const classes = useStyles();
    let medias = (media && media.length > 0) 
                ? (
                    media.map(results => 
                        <div key={results._id}>
                            <Grid 
                                className={classes.gridContainer}
                                onClick={() => handleClick(results._id)}
                                container 
                                spacing={2}
                            >
                                <Grid className={classes.thumbnailCol} item>
                                    <CardMedia className = {classes.thumbnailStyle} image={results.thumbnail}/>
                                </Grid>
                                <Grid className={classes.descCol} item>
                                    <CardContent>
                                        <Typography className={classes.titleStyle}variant='p'>
                                            {   // displays first 40 characters of the
                                                // video's title
                                                (results.title.length > 40) ? 
                                                results.title.substring(0,40) + '...' : 
                                                results.title
                                            }
                                        </Typography>
                                        <Typography className={classes.userStyle}>
                                            {results.username}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </div>
                    )) 
                :   (
                        <div>
                            <Container className={classes.noResults}>
                                <Typography variant='p'>
                                    The query does not match any of the video...
                                </Typography>
                            </Container>
                        </div>
                     );



    return (
        <>
            {medias}
        </>
    )
}

const mapStateToProps = (state,props) => ({
    media: props.media,
    history: props.history,
    handleClick: props.handleClick
});

export default withRouter(connect(mapStateToProps)(RelatedVideo));