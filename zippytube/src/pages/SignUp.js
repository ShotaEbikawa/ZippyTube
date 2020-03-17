import React from 'react';
import md5 from 'md5';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {withRouter} from 'react-router-dom';
import ServiceModal from '../components/form/ServiceModal';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import {registerUser} from '../redux/action/userAction';


const useStyle = makeStyles(theme => ({
    /* parent element that holds all of the 
    child element */
    registerContainer: {
        display: 'flex',
        width: 'auto',
        heigh: 'auto',
        justifyContent:'center',
        marginTop: '7vh',
    },
    /* parent element that holds all of the 
    child element regarding form contents*/
    formContainer: {
        padding: '3rem',
        textAlign: 'center'
    },
    // the error message
    checkErrorMessage: {
        display: 'inline-flex',
        fontSize: '0.8rem',
        color: 'red',
    },
    // the ZippyTube logo
    logoStyle: {
        fontWeight:'550'
    },
    // link of the ZippyTube logo
    logoLink: {
        textDecoration: 'none',
        color: '#283cb5'
    }
}));

const SignUp = (props) => {
    const classes = useStyle();
    /* the required information that user must enter,
    which are username, password, email address, and
    agreement check */
    const [userName, setUserName] = React.useState('');
    const [passWord, setPassWord] = React.useState('');
    const [repeatPass, setRepeatPass] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [check, setCheck] = React.useState(false);

    /* flag that validates whether user entered the given
    required field */
    const [userErr, setUserErr] = React.useState(false);
    const [passErr, setPassErr] = React.useState(false);
    const [repeatPassErr, setRepeatPassErr] = React.useState(false);
    const [emailErr, setEmailErr] = React.useState(false);
    const [checkErr, setCheckErr] = React.useState(false);

    /* error message of each required field that the user 
    must enter */
    const [userError, setUserError] = React.useState('');
    const [passWordError, setPassWordError] = React.useState('');
    const [repeatPassError, setRepeatPassError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');

    /* helper function that contains all of the validation logic 
    that checks if the user successfully entered all of 
    the required field*/
    const fieldCheck = (type) => {
        switch (type) {
            case 'username': {
                if (userName === '') {
                    setUserErr(true);
                    setUserError('Please fill the given field');
                }
                else setUserErr(false);
            }
            case 'password': {
                if (passWord === '') {
                    setPassErr(true);
                    setPassWordError('Please fill the given field');
                } else 
                setPassErr(false);
            }
            case 'repeat-password': {
                if (repeatPass === '') {
                    setRepeatPassErr(true);
                    setRepeatPassError('Please fill the given field')
                }
                else if (passWord != repeatPass) {
                    setRepeatPassErr(true);
                    setRepeatPassError('Password is not the same');
                }
                else setRepeatPassErr(false);
            }
            case 'email': {
                if (email === '') {
                    setEmailErr(true);
                    setEmailError('Please fill the given field');
                }
                else setEmailErr(false);               
            }
            case 'check': {
                if (!check) setCheckErr(true);
                else setCheckErr(false);  
            }
        }
    }

    /* function that validates if the user successfully entered
    all of the required field*/
    const validate = () => {
        fieldCheck('username');
        fieldCheck('password');
        fieldCheck('repeat-password');
        fieldCheck('email');
        fieldCheck('check');
        return userName != '' && passWord != '' && passWord == repeatPass && email != '' && check;
    }

    const handleSubmit = () => {
        let newUser = {
            username: userName,
            password: md5(passWord),
            email: email,
        };
        if (validate())
            registerUser(newUser, props.history);   
    }
    return(
        <>
            <Container maxWidth='sm' className={classes.registerContainer}>
                <Paper className={classes.formContainer}>
                    <FormControl color='primary'> 
                        <Typography variant='h6' color='primary' className={classes.logoStyle}>
                            <a className={classes.logoLink} href="/">
                                ZippyTube
                            </a>
                        </Typography>
                        <br/>
                        <Typography variant='h5'>
                            Create your ZippyTube Account
                        </Typography>
                        <br/>  
                        <TextField 
                            error = {userErr}
                            label='username'
                            value = {userName}
                            onChange = {e=>setUserName(e.target.value)}
                            helperText = {userErr ? userError : ''}
                            fullWidth
                        />
                        <br/>
                        <TextField
                            error = {passErr}
                            label='password'
                            type='password'
                            value = {passWord}
                            onChange = {e=>setPassWord(e.target.value)}
                            helperText = {passErr ? passWordError : ''}
                            fullWidth
                        />
                        <br/>
                        <TextField 
                            error = {repeatPassErr}
                            label='repeat password'
                            type='password'
                            value = {repeatPass}
                            onChange = {e=>setRepeatPass(e.target.value)}
                            helperText = {repeatPassErr ? repeatPassError : ''}
                            fullWidth
                        />
                        <br/>
                        <TextField
                            error = {emailErr}
                            label='email address'
                            value = {email}
                            onChange = {e=>setEmail(e.target.value)}
                            helperText = {emailErr ? emailError : ''}
                            fullWidth
                        />
                        <br/>
                        <FormControlLabel 
                            checked = {check}
                            control = {<Checkbox/>}
                            onChange = {e => setCheck(!check)}
                            label= {<ServiceModal />}
                        />

                        {
                            (checkErr) ? (
                                <span className={classes.checkErrorMessage}>
                                    Please fill in the checkbox 
                                </span>
                            ) : ('')
                        }
                        
                        <br/>
                        <Button 
                            onClick={handleSubmit} 
                            variant='contained' 
                            color='primary'
                        >
                            Create account
                        </Button>
                    </FormControl>
                </Paper>
            </Container>
        </>
    )
}

export default withRouter(SignUp);