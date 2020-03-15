import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import CommentList from '../CommentList';
import { withRouter } from 'react-router-dom';
import { createComment, fetchComments } from '../../redux/action/commentAction';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    // the comment input field
    commentStyle: {
        width: '100%',
    },
    /* parent element that holds the
    submit button and the canel button */
    buttonStyle: {
        marginTop:'0.2rem',
    },
    // the submit button
    submitStyle: {
        marginLeft:'0.2rem',
    },
    // parent element that holds the CommentList component
    commentListStyle: {
        marginTop: '1rem',
    }
}))

const CommentForm = ({dispatch,username, videoId,history, setFlag}) => {
    const [desc, setDesc] = React.useState('');
    const [isOpen,setIsOpen] = React.useState(false);
    const [commentObj, setCommentObj] = React.useState('');
    const [comments,setComments] = React.useState('');
    const classes = useStyles(); 

    /* onClick handler that sends the given object to
    the commentAction.js */
    const handleSubmit = () => {
/*         const obj = {
            desc: desc,
            username:username,
            videoId: videoId,
            commentObj: commentObj,
            comments: comments,
            history:history,
            setIsOpen: setIsOpen,
            setComments: setComments,
            setCommentObj: setCommentObj,
        };
        dispatch(createComment(obj,CommentList));
        setDesc(''); */
        const obj = {
            desc: desc,
            videoId: videoId,
            commentObj: commentObj,
            comments: comments,
            setIsOpen: setIsOpen,
            setComments: setComments,
            setCommentObj: setCommentObj,
        }
        createComment(obj);
        setDesc('');
    }

    React.useEffect(() => {
        // fetch media's comments
        setIsOpen(false);
        fetchComments(videoId,setComments,setIsOpen);
    },[]);

    return(
        <>
            <div>
                <TextField 
                    className={classes.commentStyle}
                    label="Add a public comment..." 
                    onChange={e => setDesc(e.target.value)}
                    multiline={true}
                    value={desc}
                    onClick={()=>setIsOpen(true)}
                />
                {isOpen ?
                    <div className={classes.buttonStyle}>
                        <Button onClick={()=>setIsOpen(false)}>
                            CANCEL
                        </Button>
                        <Button 
                            onClick={handleSubmit} 
                            className={classes.submitStyle} 
                            variant='contained'
                            color='primary' 
                            disabled={desc == ''}>
                            COMMENT
                        </Button>
                    </div>
                :''}
                <br/>
                <div className={classes.commentListStyle}>
                    {comments}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    dispatch: props.dispatch,
    username: state.user.username,
    videoId: props.videoId,
    setFlag: props.setFlag,
    history: props.history,
});

export default withRouter(connect(mapStateToProps)(CommentForm));