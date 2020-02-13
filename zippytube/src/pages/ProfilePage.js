import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const ProfilePage = () => {
    const [content,setContent] = React.useState('');
    React.useEffect(()=> {
        // retrieve the user info
        // validate whether the user == usre
        // set content to the user ver. if it matches
        // set content to the visitor ver. otherwise
        

    })

    return (
        <>
            <p>Hello World</p>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    dispatch: props.dispatch,
    history: props.history,
    username: props.match.params.username,
});
export default withRouter(connect(mapStateToProps)(ProfilePage));



