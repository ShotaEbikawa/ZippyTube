import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CommentList from '../CommentList';
import { withRouter } from 'react-router-dom';
import {videoSize, relatedSize, contentContainer} from '../media';
import { createComment } from '../../redux/action/commentAction';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    commentStyle: contentContainer,
    buttonStyle: {
        marginTop:'0.2rem',
    },
    submitStyle: {
        marginLeft:'0.2rem',
    },
    commentListStyle: {
        marginTop: '1rem',
    }
}))

const CommentForm = ({dispatch,username, videoId,history, setFlag,comment}) => {
    const [desc, setDesc] = React.useState('');
    const [isOpen,setIsOpen] = React.useState(false);
    const [commentObj, setCommentObj] = React.useState('');
    const [comments,setComments] = React.useState('');
    const classes = useStyles(); 

    const handleSubmit = () => {
        //setComments(comments.concat([<p>{desc}</p>]))
        const obj = {
            desc: desc,
            username:username,
            videoId: videoId,
            setIsOpen: setIsOpen,
            commentObj: commentObj,
            comments: comments,
            setComments: setComments,
            setCommentObj: setCommentObj,
            history:history
        }
        dispatch(createComment(obj,CommentList))
        setDesc('');
    }
    React.useEffect(() => {
        const commentsObj = comment? Object.values(comment).reverse() : ''
        const comments = comment ? Object.values(comment).reverse().map((result,i) => <CommentList comment={result}/>) : ''
        console.log(commentsObj, comments);
        setComments(comments);
        setCommentObj(commentsObj);
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
    comment: state.media.video.data ? state.media.video.data[0].comment[0] : '',
    videoId: props.videoId,
    setFlag: props.setFlag,
    history: props.history,
})
export default withRouter(connect(mapStateToProps)(CommentForm))