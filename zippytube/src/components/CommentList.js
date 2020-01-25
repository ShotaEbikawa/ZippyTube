import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {videoSize, relatedSize, contentContainer} from './media'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    commentStyle:contentContainer,
    nameStyle: {
        fontSize:'1.1rem',
    },
    descStyle: {
        marginBottom:'1rem',
        fontWeight: '348'
    }
}))

const CommentList = ({comment}) => {
    const classes = useStyles();
    return(
        <>    
            <div className={classes.commentStyle}>
                    <Typography variant='p' className={classes.nameStyle}>
                        {comment.username}
                    </Typography><br/>
                    <Typography variant='p' className={classes.descStyle}>
                        {comment.desc}
                    </Typography>
            </div>     
            <br/> 
        </>)
}

const mapStateToProps = (state,props) => ({
    comment: props.comment
})

export default withRouter(connect(mapStateToProps)(CommentList));