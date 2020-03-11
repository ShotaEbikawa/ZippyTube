import React from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import InputBase from '@material-ui/core/InputBase';
import {fetchResults} from '../../redux/action/mediaAction';
import {withRouter} from 'react-router-dom'
import {fade, makeStyles, withTheme} from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    inputStyle: {
        borderStyle: 'solid',
        backgroundColor: 'white',
        color: 'black',
        borderWidth: '0.05rem',
        padding: '0.1rem',
        borderColor: 'gray',
        width: '42vw',
        borderRadius: '0.2rem'
    },
    inputButton: {
        marginLeft: '0.25rem',
    }
}))

const SearchBar = ({dispatch,history}) => {
    const classes = useStyles();
    const [values, setValues] = React.useState('');

    // onClick handler that prevents the form 
    // from submitting its data if the query is empty
    const handleClick = (e) => {
        if (values != '') {
            dispatch(fetchResults(values));
            history.push(`/results/${values}`)
            return true;
        }
        e.preventDefault();
    }


    // handleKeyPress validates whether a user entered the 'Enter' key
    // If the 'Enter' key was pressed, the handleClick function will activate
    const handleKeyPress = (e) => {
        if (e.key === 'Enter')
            handleClick(e);
    }

    return (
        <>
                <InputBase 
                    placeholder=' Search for videos' 
                    className={classes.inputStyle}
                    onKeyDown={handleKeyPress}
                    value = {values}
                    onChange = {e => {setValues(e.target.value)}}
                />
                <Button
                    type="submit"
                    variant='contained' 
                    color="primary"
                    onClick={e => handleClick(e)}
                    className={classes.inputButton}
                >
                    Submit
                </Button>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    media: state.media,
    dispatch: props.dispatch,
    history: props.history
});
export default withRouter(connect(mapStateToProps)(SearchBar))