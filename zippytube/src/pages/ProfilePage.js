import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileInfo } from '../redux/action/profileAction';
import ProfileButton from '../components/button/ProfileButton';
import VideoList from '../components/videos/VideoList';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    headerStyle: { padding: '2rem', },
    headerContent: {display: 'flex'},
    avatarStyle: {
        borderRadius: '50%',
        width: '5rem',
        height: '5rem',
        backgroundColor: 'grey',
        textAlign: 'center',
    },
    paperStyle: {
        backgroundColor:'#f9f9f9',
        padding: '2rem',
    },
    userStyle: {
        marginTop: '1.3rem',
        marginLeft: '3rem'
    }
  }));

const ProfilePage = ({username, history, dispatch, width}) => {
    const classes = useStyles();
    const [content,setContent] = React.useState('');
    const [flag, setFlag] = React.useState(false);
    const [medias, setMedias] = React.useState('');
    React.useEffect(()=> {
        console.log(username);
        getProfileInfo(username,setMedias,setFlag);
    },[])

    return (
        <>
            <Container maxWidth={false}>
                <div className={classes.headerStyle}>
                    <div className={classes.headerContent}>
                        <ProfileButton username={username}/>
                        <Typography className={classes.userStyle} variant='h4'>
                            {username}
                        </Typography>
                    </div>
                </div>
                <Paper className={classes.paperStyle}>
                    <Typography variant='h6'>
                        Videos
                    </Typography>
                    {(flag) ? <VideoList medias={medias} username={username}/> : ''}
                </Paper>
            </Container>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    dispatch: props.dispatch,
    history: props.history,
    username: props.match.params.username,
    width: props.width,
});
export default withWidth()(withRouter(connect(mapStateToProps)(ProfilePage)));



