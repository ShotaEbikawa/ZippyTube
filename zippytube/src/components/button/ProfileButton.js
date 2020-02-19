import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    iconStyle: {
        padding: '1.5rem 2rem',
        backgroundColor: '#e0e0e0',
        color: '#3f50b5'
    },
    inputStyle: {display: 'none'},
  }));
const ProfileButton = ({username,dispatch}) => {
    const classes = useStyles();
    const [photo, setPhoto] = React.useState('');
    const [validate,setValidate] = React.useState(false);
    const [url, setUrl] = React.useState('');

    React.useEffect(() => {
    }, [])

    const handleSubmit = (e) => {
        setPhoto(e.target.value);
    }
    return (
        <>
            {
                /**
                 * okay... so what do I need to render first...
                 * so... I'm gonna need some sort of InputButton
                 * and I need two scenarios:
                 * IF the photo is empty, then what I need to do is to 
                 * display the backup picture
                 * 
                 * OTHERWISE, then what I should do is to 
                 * paste the profile picture to the InputButton's background
                 * 
                 * 
                 * Okay now if the username != logged in user, then we MUST disable user from 
                 * submitting photos
                 * 
                 * then my thought process is that we need two state:
                 * one for validating if the logged-in user == user
                 * another state is to render fetch the photo url from the db
                 **/
            }
            <FormControl>
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
                <label htmlFor="profile-submit">
                    <IconButton className={classes.iconStyle} component="span">
                        {username[0].toUpperCase()}
                    </IconButton>
                </label>
            </FormControl>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    dispatch: props.dispatch,
    username: props.username, 
});

export default withRouter(connect(mapStateToProps)(ProfileButton));