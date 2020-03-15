import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileButton from '../components/button/ProfileButton';
import VideoList from '../components/videos/VideoList';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { getProfileInfo } from '../redux/action/profileAction';
import EmptyMedia from '../components/emptyresults/EmptyMedia';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    // the username of the user
    userStyle: {
        marginTop: '1.3rem',
        marginLeft: '3rem',
        fontWeight: '300',
        fontFamily: 'Hind Guntur',
        '@media only screen and (max-width: 450px)': {fontSize: '1.5rem'},
        '@media only screen and (max-width: 350px)': {fontSize: '1rem'}
    },
    /* parent element that holds element with class name 
    of headerContainer */
    profileHeaders: {
        padding: '2rem',
    },
    /* parent element that holds ProfileButton component 
    and the username of the user*/
    headerContainer: {
        display: 'flex'
    },
    // parent element that holds user's uploaded video(s)
    uploadedContainer: {
        backgroundColor:'#f9f9f9',
    },
    // the "Videos" title
    videoTitle: {
        padding: '0.7rem 1rem 0rem 1rem',
    }
  }));

const ProfilePage = ({username, history, socketIo}) => {
    const classes = useStyles();
    const [userUrl, setUserUrl] = React.useState('');
    const [isUploaded,setIsUploaded] = React.useState(false);
    const [isUser,setIsUser] = React.useState(false);
    const [flag, setFlag] = React.useState(false);
    const [medias, setMedias] = React.useState('');
    
    React.useEffect(()=> {
        setFlag(false);
        getProfileInfo(username,setMedias,setFlag,setIsUser,setUserUrl);
        /* triggers component reload if the serverside sents websocket
        response regarding the upload event, sign-out event,
        or sign-in event*/
        socketIo.on('uploaded', (message) => {setIsUploaded(!isUploaded);});
        socketIo.on('sign-out', (message) => {setIsUploaded(!isUploaded);})
        socketIo.on('sign-in', (message) => {setIsUploaded(!isUploaded);})
    },[username,history, isUploaded])

    return (
        <>
            <Container>
                <div className={classes.profileHeaders}>
                    <div className={classes.headerContainer}>
                        {   /* If the flag is true, then display the
                            ProfileButton component. Otherwise, then
                            display empty content*/
                            (flag) ? 
                            <ProfileButton 
                                username={username} 
                                isUser={isUser} 
                                userProfile={userUrl} 
                                socketIo={socketIo}
                            /> : ''
                        }
                        <Typography className={classes.userStyle} variant='h4'>
                            {username}
                        </Typography>
                    </div>
                </div>
                <Paper className={classes.uploadedContainer}>
                    <Typography className={classes.videoTitle} variant='h6'>
                        Videos
                    </Typography>
                    {
                        /* If the flag is true and user uploaded video(s), 
                        then it displays VideoList component. Otherwise, 
                        then it displays the EmptyMedia component*/
                        (flag) ? 
                            (medias.length > 0) ? 
                                <VideoList medias={medias} username={username}/> : 
                                <EmptyMedia/> : 
                        ('')
                     }
                </Paper>
            </Container>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    history: props.history,
    username: props.match.params.username,
    socketIo: props.socketIo,
});

export default withRouter(connect(mapStateToProps)(ProfilePage));



