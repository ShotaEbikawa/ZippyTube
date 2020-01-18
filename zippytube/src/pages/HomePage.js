import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllVideos } from '../redux/action/mediaAction'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import HomeBanner from '../components/banner/HomeBanner'
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    cardStyle: {
        flexShrink: 0,
        minHeight:'50rem',
        borderRadius:'0',
        '@media only screen and (max-width: 1200px)': {
            fontSize:'0.8em'
        },
        '@media only screen and (max-width: 960px)': {
            fontSize:'0.7em',
            overflow:'none',
        },
    },
    imgContainer: {
        width:'100%',
        height:'120px',
    }
}))

const HomePage = ({media,dispatch,history}) => {
    const classes = useStyles();
    const [flag,setFlag] = React.useState(false);

    function handleClick(id) {
        setFlag(false);
        history.push(`/video/${id}`)
    }
    React.useEffect(() => {
        dispatch(fetchAllVideos(setFlag))
        console.log(media)
    },[])

    const medias = media && media.length > 0 && flag ? 
                    media.map(result =>
                        <GridListTile>
                            <Card className={classes.cardStyle}>
                                <CardMedia
                                    key={result._id}
                                    className={classes.imgContainer}
                                    image={result.thumbnail}
                                    onClick={() => handleClick(result._id)}
                                />
                                <CardContent>
                                    <Typography variant='p'>
                                        {result.title.length > 30 ? result.title.substring(0,30) + '...' : result.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </GridListTile>
                    ) : ''
    return(
        <>
        <Container>
            <HomeBanner/>
            <br/><br/>
            <Typography variant="h5">
                Recommended
            </Typography>
            <GridList cols={4} spacing={10}>
                {medias}
            </GridList>
        </Container>
        </>
    )
}

const mapStateToProps = (state,props) => ({
    media: state.media.results.data,
    dispatch: props.dispatch,
    history: props.history,
})

export default withRouter(connect(mapStateToProps)(HomePage))