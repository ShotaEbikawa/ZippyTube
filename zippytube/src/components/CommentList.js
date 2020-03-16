import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    // parent element that holds an individual comment
    commentContainer: {
        width: '100%'
    },
    // the username of the user who made the comment
    commentUser: {
        fontSize:'1.1rem',
    },
    // the comment's description
    commentDesc: {
        marginBottom:'1rem',
        fontWeight: '348'
    },
    // link of the user's username
    linkStyle: {
        color: '#283cb5',
        textDecoration: 'none',
        fontFamily: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,
        Fira Sans,Droid Sans,Helvetica Neue,sans-serif`,
    }
}));

const CommentList = ({comment}) => {
    const classes = useStyles();
    return(
        <>    
            <div className={classes.commentContainer}>
                    <Typography variant='p' className={classes.commentUser}>
                    <a className={classes.linkStyle} href={'/user-profile/' + comment.username}>
                        {comment.username}
                    </a>
                    </Typography><br/>
                    <Typography variant='p' className={classes.commentDesc}>
                        {comment.desc}
                    </Typography>
            </div>     
            <br/> 
        </>)
}

const mapStateToProps = (state,props) => ({
    comment: props.comment
});

export default withRouter(connect(mapStateToProps)(CommentList));