import React from 'react'
import { connect } from 'react-redux'
import {videoSize, relatedSize, contentContainer} from '../media'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    contentSize: relatedSize,
    card: {
        cursor: 'pointer',
    },
    content: {
        flex: '1 0 auto',
    },
    relatedUserStyle: {
        fontSize: '1rem',
        fontWeight:'348',
    },
    relatedTitleStyle: {
        fontWeight:'540',
    },
    noResults: {
        textAlign: 'center',
        paddingTop: '3rem',
    },
    cover: {
      width: '200px',
      height:'100px',
    },
}))


const RelatedVideo = ({media,history, handleClick}) => {
    const classes = useStyles();
    let medias = media && media.length > 0 ? 
        media.map(results => 
            <div key={results._id}>
                <Grid 
                    className={classes.card}
                    onClick={() => handleClick(results._id)}
                    container 
                    spacing={2}
                >
                    <Grid item>
                        <CardMedia
                            className = {classes.cover}
                            image={results.thumbnail}
                        />
                    </Grid>
                    <Grid item>
                        <CardContent className={classes.contentSize}>
                            <Typography className={classes.relatedTitleStyle}variant='p'>{results.title.length > 40 ? results.title.substring(0,40) + '...' : results.title}</Typography>
                            <Typography className={classes.relatedUserStyle}>{results.username}</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        ) : 
        <div>
            <Container className={classes.noResults}>
                <Typography variant='p'>The query does not match any of the video...</Typography>
            </Container>
        </div>



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
})

export default withRouter(connect(mapStateToProps)(RelatedVideo))