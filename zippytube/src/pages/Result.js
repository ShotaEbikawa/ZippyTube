import React from 'react'
import {connect} from 'react-redux';
import { fetchResults, getVideo } from '../redux/action/mediaAction';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import ResultVideo from '../components/videos/ResultVideo';
import {withRouter} from 'react-router-dom';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    content: {
      flex: '1 0 auto',
    },
    containerStyle: {
        backgroundColor: '#f2f2f2',
        paddingLeft:'2vw',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
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
        setFlag(false);
        return dispatch(fetchResults(query,setFlag));
    },[])

        return (
            <>
            <Container maxWidth={false}>
                <br/>
                <Paper>
                    <div className={classes.containerStyle}>
                        {flag ? <ResultVideo media={media} flag={flag}/> : ''}
                    </div>
                </Paper>
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