import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import {registerUser} from '../redux/action/userAction';
import md5 from 'md5';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';


const useStyle = makeStyles(theme => ({
    containerStyle: {
        display: 'flex',
        width: 'auto',
        heigh: 'auto',
        justifyContent:'center',
        marginTop: '7vh',
    },
    paperStyle: {
        padding: '3rem',
        textAlign: 'center'
    },
    checkErrorMessage: {
        display: 'inline-flex',
        fontSize: '0.8rem',
        color: 'red',
    }
}))

const SignUp = (props) => {
    const classes = useStyle();
    const [userName, setUserName] = React.useState('');
    const [passWord, setPassWord] = React.useState('');
    const [repeatPass, setRepeatPass] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [check, setCheck] = React.useState(false);

    const [userErr, setUserErr] = React.useState(false);
    const [passErr, setPassErr] = React.useState(false);
    const [repeatPassErr, setRepeatPassErr] = React.useState(false);
    const [emailErr, setEmailErr] = React.useState(false);
    const [checkErr, setCheckErr] = React.useState(false);

    const [userError, setUserError] = React.useState('');
    const [passWordError, setPassWordError] = React.useState('');
    const [repeatPassError, setRepeatPassError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');

    const validate = () => {
        if (userName === '') {
            setUserErr(true);
            setUserError('Please fill the given field');
        }
        else setUserErr(false);

        if (passWord === '') {
            setPassErr(true);
            setPassWordError('Please fill the given field');
        }
        else setPassErr(false);

        if (repeatPass === '') {
            setRepeatPassErr(true);
            setRepeatPassError('Please fill the given field')
        }
        else if (passWord != repeatPass) {
            setRepeatPassErr(true);
            setRepeatPassError('Password is not the same');
        }
        else setRepeatPassErr(false);

        if (email === '') {
            setEmailErr(true);
            setEmailError('Please fill the given field');
        }
        else setEmailErr(false);

        if (!check) {
            setCheckErr(true);
        }
        else setCheckErr(false)

        return userName != '' && passWord != '' && passWord == repeatPass && email != '' && check;
    }

    const handleSubmit = () => {
        console.log(props.history)
        let newUser = {
            username: userName,
            password: md5(passWord),
            email: email,
        }
        if (validate()) {
            registerUser(newUser, props.history);
        }
    }
    return(
        <>
            <Container maxWidth='sm' className={classes.containerStyle}>
                <Paper className={classes.paperStyle}>
                    <FormControl color='primary'> 
                        <Typography variant='h6'>
                            ZippyTube
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
                            label= {<span>I accept the <Link>Terms of Service </Link></span>}
                        />

                        {checkErr ? <span className={classes.checkErrorMessage}>
                                        Please fill in the checkbox 
                                    </span> : ''
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

export default withRouter(SignUp)