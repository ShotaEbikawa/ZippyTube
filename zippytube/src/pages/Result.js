import React from 'react'
import {connect} from 'react-redux';
import { fetchResults, getVideo } from '../redux/action/mediaAction';
import Card from '@material-ui/core/Card';
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
    },
    details: {
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    contentSize: {
        width:'50vw',
        height:'10rem',
    },
    cover: {
      width:'100%',
      height:'100%',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    imgContainer: {
        width:'300px',
        '@media only screen and (max-width: 700px)': {
            width:'200px'
        },
        height:'150px',
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));



const Results = ({dispatch,history,media,query}) => {
    const classes = useStyles();

    // to validate whether the server successfully returned
    // the given given media document based on the query.
    const [flag,setFlag] = React.useState(false);

    // sends the request to the server to retrieve all 
    // media documents matching the given query. After it 
    // successfully finishes its task, flag will be set to true
    React.useEffect(() => {
        return dispatch(fetchResults(query,setFlag));
    },[])
    

    // when the user clicks on the video's thumbnail,
    // it sets the flag to false, to prevent data leakage,
    // and navigates to the /video url w/ its respective id.
    function handleClick(id) {
        setFlag(false)
        history.push(`/video/${id}`)
    }

    function getMedia() {
        if (media && media.length > 0 && flag) {
            return (
                media.map(results => 
                    <div
                        className={classes.card}
                        key={results._id}
                    >
                        <br/><br/><br/>
                        <Grid container spacing={2}>
                            <Grid item className={classes.imgContainer}>
                                <CardMedia
                                    onClick={() => handleClick(results._id)}
                                    className = {classes.cover}
                                    image={results.thumbnail}
                                />
                            </Grid>
                            <Grid item className={classes.contentSize}>
                                <CardContent>
                                    <Typography variant='h6'>{results.title.length > 55 ? results.title.substring(0,55)+'...' : results.title}</Typography>
                                    <Typography variant='p'>{results.desc.length > 100 ? results.desc.substring(0,100)+'...' : results.desc}</Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </div>
                )
            )
        }
        else if (media && media.length == 0 && flag) {
            return (
                <div>
                    <Container className={classes.noResults}>
                        <Typography variant='h5'>The query does not match any of the video...</Typography>
                    </Container>
                </div>
            )
        }
        else {
            return ''
        }
    }
    let medias = getMedia();

        return (
            <>
            <Container>
                {medias}
            </Container>
            </>
        )
}

const mapStateToProps = (state, props) => ({
    media: state.media.results.data,
    history: props.history,
    dispatch: props.dispatch,
    query: props.match.params.query
})

export default withRouter(connect(mapStateToProps)(Results))