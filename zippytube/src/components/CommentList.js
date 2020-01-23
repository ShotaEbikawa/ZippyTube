import React from 'react';
import { connect } from 'react-redux';
import {videoSize, relatedSize, contentContainer} from './media'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    commentStyle:contentContainer,
}))

const CommentList = ({comment}) => {
    const classes = useStyles();
    const comments = comment ? Object.values(comment).map((result,i) =><p>{result.desc}</p>) : ''
    return(
        <> 
                <div className={classes.commentStyle}>
                    {comments}
                </div>
        </>)
}

const mapStateToProps = (state,props) => ({
    comment: props.comment
})

export default withRouter(connect()(CommentList));