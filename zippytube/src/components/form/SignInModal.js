import React from 'react'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import md5 from 'md5';
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { loginUser, isAuthenticated } from '../../redux/action/userAction.js';
import { withRouter } from 'react-router-dom';
import Avatar from '../button/Avatar';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    signin: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 1.5rem',
        marginTop: '0.2rem',
        height: '2.5rem',
        marginLeft: '1rem',
    },
    root: {
        display: 'flex',
        width: 'auto',
        heigh: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        '&:focus': {
            outline: 'none',
        }
    },
    containerStyle: {
        display: 'flex',
        width: 'auto',
        heigh: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paperStyle: {
        padding: '3rem',
    },
    signInText: {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center'
    }
}))
const SignInModal = ({username,dispatch,socketIo}) => {
    const classes = useStyles();
    const [toggle, setToggle] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [passWord, setPassWord] = React.useState('');
    const [isLogged, setIsLogged] = React.useState(false)
    const [userErr, setUsrErr] = React.useState(false);
    const [passErr, setPassErr] = React.useState(false);
    const [userError, setUserError] = React.useState('');
    const [passError, setPassError] = React.useState('');


    // checks whether a user is signed in to one's account
    // by checking whether a cookie's value matches to its 
    // document's value
    React.useEffect(() => {
        setIsLogged(dispatch(isAuthenticated()))
    })

    // validate function handles all of the cornercase
    // existing in SignInModal
    const validate = () => {
        let userFlag = false;
        let passFlag = false;

        if (userName == '') {
            setUsrErr(true);
            userFlag = true;
            setUserError('Please fill in your username')
        }
        else {
            setUsrErr(false);
            setUserError('')
        }
        if (passWord == '') {
            setPassErr(true)
            passFlag = true;
            setPassError('Please fill in your password')
        }
        else {
            setPassErr(false);
            setPassError('')
        }
        console.log(userErr, passErr)
        return userFlag == false && passFlag == false;
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
                <Button
                    variant='outlined'
                    color='primary' 
                    className={classes.signin}
                    onClick = {()=>setToggle(!toggle)}
                >
                    Sign in
                </Button>
                <Modal
                    open={toggle}
                    onClose={()=>setToggle(!toggle)}
                    className={classes.root}
                >
                    <Container maxWidth='sm' className={classes.root}>
                        <Paper className={classes.paperStyle}>
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
                                <br/><br/>
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
}) 

export default withRouter(connect(mapStateToProps)(SignInModal));