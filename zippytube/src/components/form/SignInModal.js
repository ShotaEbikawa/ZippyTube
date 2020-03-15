import React from 'react';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import md5 from 'md5';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import { loginUser, isAuthenticated } from '../../redux/action/userAction.js';

const useStyles = makeStyles(theme => ({
    // parent element of the sign in modal
    ModalContainer: {
        display: 'flex',
        width: 'auto',
        heigh: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        '&:focus': {
            outline: 'none',
        }
    },
    /* parent element that holds child elements 
    regarding form */
    formContainer: {
        padding: '3rem',
    },
    // the sign-in text
    signInText: {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center'
    },
    // the sign-in button
    signInButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 1.5rem',
        marginTop: '0.2rem',
        height: '2.5rem',
        marginLeft: '1rem',
        backgroundColor:'white'
    }
}))
const SignInModal = ({username,dispatch,socketIo,variants,isLink}) => {
    const classes = useStyles();
    const [toggle, setToggle] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [passWord, setPassWord] = React.useState('');
    const [userErr, setUsrErr] = React.useState(false);
    const [passErr, setPassErr] = React.useState(false);
    const [userError, setUserError] = React.useState('');
    const [passError, setPassError] = React.useState('');


    /* checkField is a helper function that runs 
    validation check for all possible corner cases.*/
    const checkField = (type) => {
        let flag = false;
        switch (type) {
            case 'username': {
                if (userName == '') {
                    setUsrErr(true);
                    flag = true;
                    setUserError('Please fill in your username')
                }
                else {
                    setUsrErr(false);
                    setUserError('')
                }  
                return flag;              
            }
            case 'password': {
                if (passWord == '') {
                    setPassErr(true)
                    flag = true;
                    setPassError('Please fill in your password')
                }
                else {
                    setPassErr(false);
                    setPassError('')
                }
                return flag;
            }
        }
    }
    
    /* validate function handles all of the cornercase
    existing in SignInModal */
    const validate = () => {
        return checkField('username') == false && checkField('password') == false;
    }


    // handleSubmit sends a given username and password
    // to userAction, which sends a request to the serverside.
    const handleSubmit = () => {
        if (validate()) {
            dispatch(
                loginUser(
                userName, md5(passWord),setToggle,
                setPassErr,setPassError,setUsrErr,
                setUserError,socketIo)
            );
        }
    }


    return(
        <>
            <div>
                {(isLink) ? (
                <>
                    <IconButton
                        variant='outlined'
                        color= 'primary'
                        onClick = {()=>setToggle(!toggle)}
                        disableRipple={variants==true ? true : false}
                    >
                        <LockOpenIcon />
                    </IconButton>
                    Sign In &nbsp;
                </>
                ) : (
                    <Button
                        variant='outlined'
                        color= 'primary'
                        className={classes.signInButton}
                        onClick = {()=>setToggle(!toggle)}
                        disableRipple={variants==true ? true : false}
                    >
                        Sign in
                    </Button>)
                }
                <Modal
                    open={toggle}
                    onClose={()=>setToggle(!toggle)}
                    className={classes.ModalContainer}
                >
                    <Container maxWidth='sm' className={classes.ModalContainer}>
                        <Paper className={classes.formContainer}>
                            <FormControl>
                                <Typography variant='h4' className={classes.signInText}>
                                    Sign In
                                </Typography>
                                <br/>
                                <Typography variant='h6'>
                                    to continue to ZippyTube
                                </Typography>
                                <br/>
                                <TextField 
                                    error = {userErr}
                                    label='username'
                                    value={userName}
                                    onChange={e=>setUserName(e.target.value)}
                                    helperText={userError}
                                    fullWidth
                                />
                                <br/>
                                <TextField 
                                    error = {passErr}
                                    label='password'
                                    type='password'
                                    value={passWord}
                                    onChange={e=>setPassWord(e.target.value)}
                                    helperText={passError}
                                    fullWidth
                                />
                                <br/>
                                <br/>
                                <Link href='/signup'>
                                Create account
                                </Link>
                                <br/>
                                <Button onClick={handleSubmit} variant='contained' color='primary'>
                                    Sign in
                                </Button>
                            </FormControl>
                        </Paper>
                    </Container>
                </Modal>
            </div>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    username: state.user.username,
    dispatch: props.dispatch,
    socketIo: props.socketIo,
    variants: props.variant,
    isLink: props.isLink,
});

export default withRouter(connect(mapStateToProps)(SignInModal));