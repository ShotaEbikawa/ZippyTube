import React from 'react';
import { uploadProfile } from '../../redux/action/profileAction';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {createMuiTheme, makeStyles, withTheme, ThemeProvider} from '@material-ui/core/styles'; 

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
    iconStyle: {
        backgroundColor: '#e0e0e0',
        width:'100%',
        height:'100%',
        color: '#3f50b5',
        zIndex:1,
        '&:hover': { backgroundColor: '#e0e0e0', },
    },
    cameraStyle: {
        display:'none',
        width:'70%',
        height:'70%',
        marginLeft:'1.2rem',
        marginTop: '1rem',
        backgroundColor:'transparent',
        zIndex:2,
    },
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
    themeContainer: {
        width:'4.5rem',
        height:'4.5rem',
        borderRadius:'50%',
    },
    inputStyle: {display: 'none'},
  }));



const ProfileButton = ({history,username,dispatch,isUser,userUrl,socketIo}) => {
    const classes = useStyles();
    const [isUploaded, setIsUploaded] = React.useState(false);
    const [photo, setPhoto] = React.useState('');
    const [validate,setValidate] = React.useState(false);
    const [url, setUrl] = React.useState('');
    console.log(userUrl);
    const iconProfile = {
        backgroundImage: `url(${userUrl})`,
        backgroundSize: 'cover',
        width:'100%',
        height:'100%',
        color: '#3f50b5',
        zIndex:1,
        '&:hover': { backgroundColor: '#e0e0e0', },
    }
    React.useEffect(() => {
    }, []);

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
                                    (userUrl == '') ? (
                                                        <IconButton className={classes.iconStyle} component="span">
                                                            {username[0].toUpperCase()}
                                                        </IconButton>
                                                      )
                                                    : (
                                                        <IconButton style={iconProfile} component="span">
                                                        </IconButton>
                                                      )
                                }
                            </label>
                        </>
                    :      
                        <ThemeProvider theme={iconButtonTheme}>
                            <div className={classes.themeContainer}>
                                {
                                    (userUrl == '') ? (
                                                        <IconButton className={classes.iconStyle}>
                                                            {username[0].toUpperCase()}
                                                        </IconButton>
                                                      )
                                                    : (
                                                        <IconButton style={iconProfile}>
                                                        </IconButton>
                                                      )
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