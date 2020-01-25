import React from 'react'
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router-dom';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    noResults: {
        textAlign: 'center',
        paddingTop: '3rem',
    },
    card: {
        cursor: 'pointer'
    },
    contentSize: {
        width:'50vw',
        height:'10rem',
        '@media only screen and (max-width: 800px)': {
            fontSize:'100%',
        },
        '@media only screen and (max-width: 600px)': {
            fontSize:'90%',
        }
    },
    cover: {
      width:'100%',
      height:'100%',
    },
    imgContainer: {
        width:'300px',
        '@media only screen and (max-width: 700px)': {
            width:'200px'
        },
        height:'150px',
    },
    titleStyle: {
        fontWeight:'540',
        '@media only screen and (max-width: 800px)': {
            fontSize:'100%',
        },
        '@media only screen and (max-width: 600px)': {
            fontSize:'90%',
        }
    },
  }));



const ResultVideo = ({dispatch,history,media,query}) => {
    const classes = useStyles();

    // when the user clicks on the video's thumbnail,
    // it navigates to the /video url w/ its respective id.
    function handleClick(id) {
        history.push(`/video/${id}`)
    }

    let results = media && media.length > 0 ?
        media.map(results => 
            <div key={results._id}>
                <br/><br/><br/>
                <Grid container 
                    className={classes.card}
                    onClick={() => handleClick(results._id)}
                    spacing={2}
                >
                    <Grid item className={classes.imgContainer}>
                        <CardMedia
                            className = {classes.cover}
                            image={results.thumbnail}
                        />
                    </Grid>
                    <Grid item className={classes.contentSize}>
                        <CardContent>
                            <Typography className={classes.titleStyle} variant='h6'>
                                {results.title.length > 40 ? results.title.substring(0,40)+'...' : results.title}
                            </Typography>
                            <Typography variant='p'>{results.username}</Typography><br/>
                            <Typography variant='p'>
                                {results.desc.length > 50 ? results.desc.substring(0,50)+'...' : results.desc}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        ) :
        <div>
            <Container className={classes.noResults}>
                <Typography variant='h5'>The query does not match any of the video...</Typography>
            </Container>
        </div>  


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