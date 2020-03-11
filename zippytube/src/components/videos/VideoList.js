import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, withTheme } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    contentContainer: {
        height: '30%',
    },
    contentStyle: {
        height: '30%',
    },
    headerStyle: {
        padding: '2rem',
    },
    cardStyle: {
        height: '100%',
        cursor: 'pointer',
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
        height:'70%',
    },
    mediaListStyle: {
        padding:'0.7rem',
    },
    paperStyle: {
        backgroundColor:'#f9f9f9',
        padding: '2rem',
    },
    titleStyle: {
        fontWeight:'530',
    }
  }));

const VideoList = ({history, medias, username, width}) => {
    const classes = useStyles();
    React.useEffect(() => {
    }, [width])

    function handleClick(id) {
        //setFlag(false);
        history.push(`/video/${id}`);
    }

    const getColVal = () => {
            if (isWidthDown('xs',width))
                return 1;
            else if (isWidthDown('sm',width))
                return 3;
            else if (isWidthDown('md',width))
                return 4;
            else
                return 4;
    }
    const mediaList = (medias && medias.length > 0) 
    ? (
        medias.map(result =>
            <GridListTile className={classes.contentContainer}>
                <Card className={classes.cardStyle}>
                    <CardMedia
                        key={result._id}
                        className={classes.imgContainer}
                        image={result.thumbnail}
                        onClick={() => handleClick(result._id)}
                    />
                    <CardContent className={classes.contentStyle}>
                        <Typography variant='p' className={classes.titleStyle}>
                            {result.title.length > 30 ? result.title.substring(0,30) + '...' : result.title}
                        </Typography>
                    </CardContent>
                </Card>
            </GridListTile>
        )) 
    : ('')
    return(
        <>
            <GridList cols={getColVal()} spacing={10} className={classes.mediaListStyle}>
                {(medias && mediaList != '') 
                    ? (mediaList)
                    : (
                        <Typography variant='h6'>
                            {username} has not posted any video
                        </Typography>
                      )
                }
            </GridList>     
        </>
    )
}

const mapStateToProps = (state,props) => ({
    medias: props.medias,
    width: props.width,
    history: props.history,
    username: props.username,
});

export default withWidth()(withRouter(connect(mapStateToProps)(VideoList)));