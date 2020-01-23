import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {videoSize, relatedSize, contentContainer} from '../media';
import { createComment } from '../../redux/action/commentAction';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    commentStyle: contentContainer,
    submitStyle: {
        marginLeft: '0.5rem',
        color: 'white',
        backgroundColor: 'lightgray'
    },
    buttonStyle: {
        marginTop:'0.2rem',
    }
}))

const CommentForm = ({dispatch,username, videoId}) => {
    const [flag,setFlag] = React.useState(false);
    const [desc, setDesc] = React.useState('');
    const classes = useStyles();
    const handleSubmit = () => {
        dispatch(createComment(desc,username,videoId,setFlag))
        setDesc('');
        setFlag(false);
    }

    React.useEffect(() => {
        console.log('...');
    },[flag]);

    return(
        <>
            <div>
                <TextField 
                    className={classes.commentStyle}
                    label="Add a public comment..." 
                    onChange={e => setDesc(e.target.value)}
                    multiline={true}
                    value={desc}
                    onClick={()=>setFlag(true)}
                />
                {flag ? <div className={classes.buttonStyle}>
                            <Button onClick={()=>setFlag(false)}>CANCEL</Button>
                            <Button onClick={handleSubmit} className={classes.submitStyle}>
                                COMMENT
                            </Button>
                        </div> : 
                ''}
            </div>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    dispatch: props.dispatch,
    username: state.user.username,
    videoId: props.videoId,
})
export default withRouter(connect(mapStateToProps)(CommentForm))