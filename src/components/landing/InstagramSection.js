import React from 'react'
import { useEffect } from "react";
import { makeStyles, createStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import { Container, Typography, Grid } from '@material-ui/core'
import InstagramApiService from '../../service/InstagramApiService'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import '../../backimg.css'

import StarBorderIcon from '@material-ui/icons/StarBorder';
const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     flexWrap: 'nowrap',
//     transform: 'translateZ(0)',
//   },
//   sectionHeading: {
//     textAlign: 'center',
//         textTransform: 'uppercase',
//         fontSize: '40px',
//         fontWeight: '700',
//         marginTop: '0',
//         marginBottom: '15px',
//         fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
//         [theme.breakpoints.up('sm')]:{
//             fontSize: '4.5vw',
//         },
//         [theme.breakpoints.up('lg')]:{
//             fontSize: '2.5vw',
//         },
//     },
textCenter: {
    textAlign: 'center'
},
  title: {
    color: 'white',
    fontSize:"5vh"
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
  },
  sectionHeading: {
            textTransform: 'uppercase',
            fontSize: '40px',
            fontWeight: '700',
            marginTop: '0',
            marginBottom: '15px',
            fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            [theme.breakpoints.up('sm')]:{
                fontSize: '4.5vw',
            },
            [theme.breakpoints.up('lg')]:{
                fontSize: '2.5vw',
            },
        },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));
const InstagramSection = props => {
    const classes = useStyles()
    const[tileData,settileData] = React.useState([])
    const fetchData = async () => {
        try {
            const posts = await InstagramApiService.GetPosts()
            settileData(posts)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        window.addEventListener("load", () => {
            fetchData()
        });
      });
    return (
    // <div className={classes.root}>
    // <Typography variant="h2" className={classes.sectionHeading}>НАШ БЛОГ</Typography>
    //   <GridList className={classes.gridList} cellHeight={450} cols={2.5}>
    //     {
    //     tileData.map(tile => (
    //       <GridListTile key={tile.img_url}>
    //         <img src={tile.img_url}  alt={tile.caption} />
    //          <GridListTileBar
    //           title={tile.caption}
    //           classes={{
    //             root: classes.titleBar,
    //             title: classes.title,
    //           }}
    //           actionIcon={
    //             <IconButton aria-label={`star ${tile.caption}`}>
    //               <StarBorderIcon className={classes.title} />
    //             </IconButton>
    //           }
    //         />
    //       </GridListTile>
    //         ))}
    //   </GridList>
    // </div>
<div className={classes.root}>
<Grid container spacing={6} justify="center" className={classes.textCenter}>
      <Grid item xs={12}>
        <Typography variant="h2" className={classes.sectionHeading}>ПОДПИСЫВАЙТЕСЬ НА НАШ БЛОГ</Typography>
      </Grid>
      <Grid item xs={12}>
      <GridList cellHeight={400} cols={3} className={classes.gridList}>
        {tileData.map(tile => (
          <GridListTile key={tile.img_url}>
            <img src={tile.img_url} alt={tile.caption} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span> {tile.caption}</span>}
              classes={{
                root: classes.titleBar,
                title: classes.title,
               }}
              actionIcon={
                <IconButton aria-label={`info about ${tile.caption}`} className={classes.icon}>
                  <InfoIcon />
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