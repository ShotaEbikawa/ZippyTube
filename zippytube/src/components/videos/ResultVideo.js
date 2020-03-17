import React from 'react';
import Island from './island.svg';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {withRouter} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    // parent element that holds the video's information
    cardContent: {
        width:'75%',
        '@media only screen and (max-width: 830px)': {width: '70%'},
        '@media only screen and (max-width: 800px)': {fontSize:'100%'},
        '@media only screen and (max-width: 600px)': {
            fontSize:'90%',
            width: '60%',
        },
        '@media only screen and (max-width: 500px)': {width: '50%'},
        '@media only screen and (max-width: 415px)': {width: '100%',}
    },
    // parent element that holds the video's thumbnail
    cardImage: {
        width:'25%',
        height:'150px',
        '@media only screen and (max-width: 830px)': {width: '30%'},
        '@media only screen and (max-width: 600px)': {width: '40%'},
        '@media only screen and (max-width: 500px)': {width: '50%'},
        '@media only screen and (max-width: 415px)': {width: '100%'}
    },
    // the video title
    titleStyle: {
        fontWeight:'500',
        '@media only screen and (max-width: 800px)': {fontSize:'100%'},
        '@media only screen and (max-width: 600px)': {fontSize:'90%'},
    },
    // parent element that holds the island image
    islandContainer: {
        width:'20%',
        height:'20%',
        marginLeft:'35%',
    },
    // the island image
    islandStyle: {
        opacity: 0.75,
        width: '100%',
        height: '100%',
    },
    // the video's thumbnail
    thumbnailStyle: {
        width:'100%',
        height:'100%',
    },
    /* parent element that holds the required child elements
    for no matching query results */
    noResults: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '3rem',
    },
    // parent element of the Grid component
    gridContainer: {
        cursor: 'pointer',
    },
  }));



const ResultVideo = ({dispatch,history,media,query}) => {
    const classes = useStyles();

    /* when the user clicks on the video's thumbnail,
    it navigates to the /video url with its respective id. */
    function handleClick(id) {
        history.push(`/video/${id}`);
    }

    /* variable that holds the list of videos that matches
    the entered query. If no video matches to the query, then
    it would display an image of a deserted island */
    let results = (media && media.length > 0) 
        ? (
            media.map(results => 
                <div key={results._id}>
                    <Grid container 
                        className={classes.gridContainer}
                        onClick={() => handleClick(results._id)}
                        spacing={2}
                    >
                        <Grid className={classes.cardImage} item>
                            <CardMedia className={classes.thumbnailStyle} image={results.thumbnail}/>
                        </Grid>
                        <Grid className={classes.cardContent} item>
                            <CardContent>
                                <Typography className={classes.titleStyle} variant='h6'>
                                    {   
                                        /* displays the first 40 characters of the
                                        video's title */
                                        (results.title.length > 40) ? 
                                        results.title.substring(0,40)+'...' : 
                                        results.title
                                    }
                                </Typography>
                                <Typography variant='p'>
                                    {results.username}
                                </Typography>
                                <br/>
                                <Typography variant='p'>
                                    {
                                        /* displays the first 50 characters of the
                                        video's description */
                                        (results.desc.length > 50) ? 
                                        results.desc.substring(0,50)+'...' : 
                                        results.desc
                                    }
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </div>
            )) 
        : (
            <div>
                <Container className={classes.noResults}>
                    <div className={classes.islandContainer}>
                        {/** 
                         * Icons made by 
                         * Freepik (https://www.flaticon.com/authors/freepik")
                         * from https://www.flaticon.com/ 
                        */}
                        <img src={Island} className={classes.islandStyle}/>
                    </div>
                    <br/>
                    <Typography variant='h5'>
                        The query does not match any of the video...
                    </Typography>
                    <br/>
                </Container>
            </div> 
        );


    return(
        <>
            {results}
        </>)
}

const mapStateToProps = (state,props) => ({
    media: state.media.results.data,
    history: props.history,
    dispatch: props.dispatch,
    query: props.match.params.query,
}) 

export default withRouter(connect(mapStateToProps)(ResultVideo));