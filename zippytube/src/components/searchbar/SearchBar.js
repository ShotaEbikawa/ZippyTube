import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import {inputDiv} from '../media.js'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
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
        width: '30vw',
        borderRadius: '0.2rem'
    },
    inputButton: {
        marginLeft: '0.25rem',
    }
}))

const SearchBar = ({dispatch,history}) => {
    const classes = useStyles();
    const [values, setValues] = React.useState('');

    const handleClick = () => {
        console.log('connected to the handleClick()')
        console.log(values);
        dispatch(fetchResults(values));
        history.push(`/results/${values}`)
    }
    return (
        <>
            
            <InputBase 
                placeholder=' Search for videos' 
                className={classes.inputStyle}
                value = {values}
                onChange = {e => {setValues(e.target.value)}}
            />
            <Button 
                variant='contained' 
                color='primary' 
                onClick={handleClick}
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