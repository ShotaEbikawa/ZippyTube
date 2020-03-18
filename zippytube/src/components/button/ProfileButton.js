import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {createMuiTheme, makeStyles, withTheme, ThemeProvider} from '@material-ui/core/styles'; 
import { uploadProfile } from '../../redux/action/profileAction';

const iconButtonTheme = createMuiTheme({
    props: {
        // Style sheet name ⚛️
        MuiIconButton: {
          // Name of the rule
          disableRipple: true,
        },
      },
})

const useStyles = makeStyles(theme => ({
    // the username of the logged-in user
    adminStyle: {
        marginTop: '1.3rem',
        marginLeft: '3rem',
        fontWeight: '500',
        fontSize: '1.7rem',
        '@media only screen and (max-width: 450px)': {fontSize: '1.5rem'},
        '@media only screen and (max-width: 350px)': {fontSize: '1rem'},
        fontFamily: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,
                    Ubuntu,Cantarell, Fira Sans,Droid Sans,Helvetica Neue,sans-serif`,
    },
    // the username of the user
    userStyle: {
        marginTop: '1.3rem',
        marginLeft: '1.2rem',
        fontWeight: '500',
        fontSize: '1.7rem',
        '@media only screen and (max-width: 450px)': {fontSize: '1.5rem'},
        '@media only screen and (max-width: 350px)': {fontSize: '1rem'},
        fontFamily: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,
                    Ubuntu,Cantarell, Fira Sans,Droid Sans,Helvetica Neue,sans-serif`,
    },
    // the profile icon
    iconStyle: {
        backgroundColor: '#e0e0e0',
        width:'100%',
        height:'100%',
        color: '#3f50b5',
        zIndex:1,
        '&:hover': { backgroundColor: '#e0e0e0', },
    },
    // the camera icon
    cameraStyle: {
        display:'none',
        width:'70%',
        height:'70%',
        marginLeft:'0.65rem',
        marginTop: '1rem',
        backgroundColor:'transparent',
        zIndex:2,
    },
    /* parent element that holds the label 
    of the profile button */
    labelContainer: {
        width:'3rem',
        height:'3rem',
        borderRadius:'50%',
        alignContent:'center',
        '&:hover > $cameraStyle': {
            opacity: 0.5,
            display: 'block',
            position: 'absolute',
        }
    },
    /* parent container that holds the child 
    elements regarding the icons */
    themeContainer: {
        width:'4.5rem',
        height:'4.5rem',
        borderRadius:'50%',
    },
    // the input field
    inputStyle: {display: 'none'},
  }));



const ProfileButton = ({history,username,dispatch,isUser,userUrl,socketIo}) => {
    const classes = useStyles();
    const [photo, setPhoto] = React.useState('');

    /* object that stores the user's uploaded image as 
    the background */
    const iconProfile = {
        backgroundImage: `url(${userUrl})`,
        backgroundSize: 'cover',
        width:'100%',
        height:'100%',
        color: '#3f50b5',
        '&:hover': { backgroundColor: '#e0e0e0', },
    }
    React.useEffect(() => {
    }, []);

    /* onSubmit handler that sends the selected image object
    to the profileAction.js */
    const handleSubmit = (e) => {
        setPhoto(e.target.files);
        uploadProfile(e.target.files,socketIo)
    }
    return (
        <>
            <FormControl>
                {
                    (isUser)
                    ?   <>
                            <input 
                                className={classes.inputStyle}
                                accept="image/*"
                                variant="contained"
                                multiple
                                type="file" 
                                files={photo}
                                onChange={e => handleSubmit(e)}
                                id="profile-submit"
                            />
                            <label className={classes.labelContainer} htmlFor="profile-submit">
                                <CameraAltIcon className={classes.cameraStyle}/>
                                {
                                    (userUrl == '') ?
                                    <IconButton className={classes.iconStyle} component="span">
                                        {username[0].toUpperCase()}
                                    </IconButton>  :
                                    <IconButton style={iconProfile} component="span">
                                    </IconButton>          
                                }
                            </label>
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; 
                        </>
                    :      
                        <ThemeProvider theme={iconButtonTheme}>
                            <div className={classes.themeContainer}>
                                {
                                    (userUrl == '') ? 
                                    <IconButton className={classes.iconStyle}>
                                        {username[0].toUpperCase()}
                                    </IconButton> : 
                                    <IconButton style={iconProfile}>
                                    </IconButton>                
                                }
                            </div>
                        </ThemeProvider>                      
                }
            </FormControl>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    dispatch: props.dispatch,
    history: props.history,
    username: props.username, 
    isUser: props.isUser,
    userUrl: props.userProfile,
    socketIo: props.socketIo,
});

export default withRouter(connect(mapStateToProps)(ProfileButton));