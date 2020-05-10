import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/styles'
import {useTheme} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DirectionsIcon from '@material-ui/icons/Directions';
import {Grid, Typography} from '@material-ui/core'
import InstagramApiService from '../../service/InstagramApiService'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import '../../backimg.css'

const useStyles = makeStyles(theme => ({
    textCenter: {
        textAlign: 'center'
    },
    title: {
        color: 'white',
        fontSize: "5vh"
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,

    },
    gridList: {
        transform: 'translateZ(0)',
    },
    sectionHeading: {
        textTransform: 'uppercase',
        fontSize: '40px',
        fontWeight: '700',
        marginTop: '0',
        color: "#26C6DA",
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        [theme.breakpoints.up('sm')]: {
            fontSize: '4.5vw',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '2.5vw',
        },
    },
    icon: {
        color: 'white',
    },
    caption_text: {
        fontSize: "2vh",
        color: 'white',
        textDecoration: 'none',
        [theme.breakpoints.down('sm')]: {
            fontSize: '3vh',
        },
    },
}));
const InstagramSection = props => {
    const classes = useStyles()
    const theme = useTheme();
    const [tileData, settileData] = React.useState([]);
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [colNumbers, setColNumbers] = React.useState(3);
    const timer = React.useRef();
    const [loading, setLoading] = React.useState(true);
    const fetchData = async () => {
        try {
            const posts = await InstagramApiService.getPosts()
            settileData(posts)
            setLoading(false)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        window.addEventListener("load", () => {
            if (matches)
                setColNumbers(2);
        });
        fetchData();
    }, []);
    return (
        <div className={classes.root}>
            <Grid container spacing={6} justify="center" className={classes.textCenter}>
                <Grid item xs={12}>
                    <Typography variant="h2" className={classes.sectionHeading}>
                        ПОДПИСЫВАЙТЕСЬ НА НАШ БЛОГ
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {loading && <CircularProgress size={68} className={classes.fabProgress}/>}
                    <GridList cellHeight={400} cols={colNumbers} className={classes.gridList}>
                        {tileData.map(tile => (
                            <GridListTile key={tile.media_url}>
                                <img src={tile.media_url} alt={tile.caption}/>
                                <GridListTileBar
                                    subtitle={<span><Link href={tile.permalink}
                                                          className={classes.caption_text}>{tile.caption}</Link></span>}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                    actionIcon={
                                        <IconButton className={classes.icon}>
                                            <DirectionsIcon/>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>
            </Grid>
        </div>
    )
}

export default InstagramSection