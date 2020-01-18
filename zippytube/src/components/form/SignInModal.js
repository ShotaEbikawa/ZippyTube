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
import { loginUser, isAuthenticated } from '../../redux/action/userAction.js';
import { withRouter } from 'react-router-dom';
import Avatar from '../button/Avatar'
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
const SignInModal = (props) => {
    const classes = useStyles();
    const [toggle, setToggle] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [passWord, setPassWord] = React.useState('');
    const [isLogged, setIsLogged] = React.useState(false)

    React.useEffect(()=> {
        setIsLogged(isAuthenticated())
    })

    const [userErr, setUsrErr] = React.useState(false);
    const [passErr, setPassErr] = React.useState(false);
    const [userError, setUserError] = React.useState('');
    const [passError, setPassError] = React.useState('');


    const validate = () => {
        if (userName == null) {
            setUsrErr(true);
            setUserError('Please fill in your username')
        }
        if (passWord == null) {
            setPassErr(true)
            setPassError('Please fill in your password')
        }
        return userErr && passErr == false;

    }

    const handleSubmit = () => {
        // input validation logic goes here
        if (validate) {
            loginUser(userName, md5(passWord));
            setToggle(false);
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

export default withRouter(SignInModal);