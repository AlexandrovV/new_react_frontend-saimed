import React, { Fragment, useState } from 'react'
import clsx from 'clsx';
import {Button} from  '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
  import classNames from 'classnames';
  import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DraftsIcon from '@material-ui/icons/Drafts';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import AlarmIcon from '@material-ui/icons/Alarm';
import Popover from '@material-ui/core/Popover';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
  import Fab from '@material-ui/core/Fab';
  import DeleteIcon from '@material-ui/icons/Delete';
  import EditIcon from '@material-ui/icons/Edit';
  import Paper from '@material-ui/core/Paper';
  import FilterListIcon from '@material-ui/icons/FilterList';
  import DescriptionIcon from '@material-ui/icons/Description';
  import AddIcon from '@material-ui/icons/Add';
  import { green, blue, red, yellow } from '@material-ui/core/colors';
  import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
  },

  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  IconSize:{
    width:"3vh",
    height:"5vh",
  },
  IconEditSize:{
    width:"3vh",
    height:"5vh",
    [theme.breakpoints.down('sm')]:{
      width:"50%",
    }
  },
  IconAddSize:{
    width:"3vw",
    height:"4vw",
    [theme.breakpoints.up('lg')]:{
      fontSize:"5vw",
    },
    [theme.breakpoints.down('xs')]:{
      width:"18vw",
      height:"10vw"
    }
  },
  fabDelete:{
    backgroundColor:red[900],
    width:'100%',
    height:"5vh",
    fontSize:"1.5vw",
    color:"white",
    '&:hover':{
      backgroundColor:"white",
      color:red[500]
    },
    [theme.breakpoints.down('xs')]: {
      display:'none',
    }
  },
  fabDelIcon:{
    backgroundColor:red[900],
    color:"white",
    display:'none',
    '&:hover':{
      backgroundColor:"white",
      color:red[500]
    },
    [theme.breakpoints.down('xs')]: {
      display:'inline',
      fontSize:'1.2vw'
    },
  },
  fabAdd:{
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    fontSize:"1.5vw",
    backgroundColor:blue[500],
    color:"white",
    '&:hover':{
      backgroundColor:"white",
      color:blue[500]
    },
    [theme.breakpoints.down('xs')]: {
      right: theme.spacing(0),
      width:'100%',
      fontSize:"4vw",
    },
    [theme.breakpoints.up('lg')]:{
      height:"5vh",
      width:"30%"
    }

  },
  fabEdit:{
    backgroundColor:"#3897ba",
    color:"white",
    height:"5vh",
    fontSize:"1.5vw",
    width:'100%',
    '&:hover':{
      backgroundColor:"white",
      color:"#3897ba"
    },
    [theme.breakpoints.down('xs')]: {
      display:'none',
    }
  },
  fabEdIcon:{
    backgroundColor:"#3897ba",
    display:'none',
    color:'white',
    '&:hover':{
      backgroundColor:"white",
      color:"#3897ba"
    },
    [theme.breakpoints.down('xs')]: {
      display:'inline',
      fontSize:'1.2vw'
    },
  },
  fabDescription:{
    backgroundColor:"#1c8045",
    color:"white",
    height:"5vh",
    fontSize:"1.5vw",
    width:'100%',
    '&:hover':{
      backgroundColor:"white",
      color:"#1c8045"
    },
    [theme.breakpoints.down('xs')]: {
      display:'none',
    }
  },
  fabDescIcon:{
    display:'none',
    backgroundColor:"#1c8045",
    color:"white",
    '&:hover':{
      backgroundColor:"white",
      color:"#1c8045"
    },
    [theme.breakpoints.down('xs')]: {
      display:'inline',
      fontSize:'1vw'
    },
  },
popoverWidth:{
  [theme.breakpoints.up('lg')]:{
    fontSize:"1vw"
  },
   [theme.breakpoints.down('xs')]:{
    fontSize:"3vw"
  }
},
appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  alarmOn:{
    color:green[500],
    fontSize:"10vw",
  },
   alarm:{
    color:yellow[700],
    fontSize:"10vw",
   },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },

  content: {
    flexGrow: 1,
    [theme.breakpoints.down('xl')]:{
      paddingTop:"5vw",
      paddingBottom:"5vw",
    },
    [theme.breakpoints.down('lg')]: {
      paddingTop:"5vw",
      paddingBottom:"5vw",
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop:"10vw",
      paddingBottom:"10vw",
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop:"18vw",
      paddingBottom:"18vw",
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
scrollSpy: {
    display: 'flex'
},
title: {
    transition: '0.3s',
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';",
    fontSize: '1.75em',
    fontWeight: '700',
    display: 'inline-block',
    paddingTop: '.3125rem',
    paddingBottom: '.3125rem',
    marginRight: '1rem',
    lineHeight: '42px',
    whiteSpace: 'nowrap',
    flexGrow: '1',
    color: 'white !important',
    [theme.breakpoints.up('xs')]: {
      fontSize:"5vw",
    }
},
titleShrinkSize: {
    transition: '0.3s',
    fontSize: '1.25em',
},
paper: {
  textAlign: 'center',
  fontSize:'1.5vw',
  color: theme.palette.text.primary,
  display:"flex-wrap",
},
typo:{
  fontSize:'5vw',
  color: theme.palette.text.primary,
},
IconDecription:{
  fontSize:"10vh",
  [theme.breakpoints.up('xs')]: {
  fontSize:"5vw",
  }
},
navButton: {
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';",
    color: 'white',
    fontSize: '90%',
    letterSpacing: '1px',
    padding: '1.1em 1em',
    '&:hover': {
        color: "#fed136",
    }
},
}));


const LandingMedic = props => {  
    
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery('(min-height:800px) and (min-width:480px)');
    const [open, setOpen] = React.useState(false);
    const [scrolledDown, setScrolledDown] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [useranchEl,setuseranchEl] = React.useState(null);
    const [SizeBut,SetSizeBut] = React.useState("medium")
    const handleUserClick=event=>{
      setuseranchEl(event.currentTarget);
    }
    const handleUserClose=()=>{
      setuseranchEl(null);
    }
    const openFilter = Boolean(anchorEl);
    const id = openFilter ? 'simple-popover' : undefined;
    const openUser = Boolean(useranchEl);
    const user_id = openUser ? 'simple-popover' : undefined;
    
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 100
            if (isTop) {
                setScrolledDown(false)
            } else {
                setScrolledDown(true)
            }
        });
        window.addEventListener('load',()=>{
          if(!matches)
          {
             SetSizeBut("small");
          }
          else{
            SetSizeBut("medium");
          }
        })
    })
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            
            <Typography className={classNames(classes.title, scrolledDown ? classes.titleShrinkSize : '')}>
              SAIMED
            </Typography>
            
            <IconButton edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleUserClick}
              color="inherit">
              <AccountCircleIcon className={classes.IconDecription}/>
            </IconButton>
          </Toolbar>
      <Popover
        id={user_id}
        open={openUser}
        anchorEl={useranchEl}
        onClose={handleUserClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={classes.PopWidth}
      >
        <Grid item xs={12}>
          <List>
            <ListItem>
            <Button href="#appointments" className={classes.popoverWidth}>Редактировать</Button>
            </ListItem>
            <ListItem>
            <Button href="#appointments" className={classes.popoverWidth}>Выйти</Button>
            </ListItem>
          </List>
        </Grid>
      </Popover>
        </AppBar>
  
    <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}>
        <Typography className={classes.typo}>Ближайшие посещения</Typography>
        <List>
          <Paper>
          <ListItem>
          <ListItemIcon>
            <AlarmIcon className={classes.alarm}/>
          </ListItemIcon>
          <ListItemText >
            <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={4}>
          <div className={classes.paper}>
           <h2>Рахимбеков Лугатипы Разпинуевич</h2>
          </div>
        </Grid>
        <Grid item xs={7}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={4} sm={3} md={3}>
            <Link style={{textDecoration:"none"}} to={"/MedPage"}>
            <Fab variant="extended" className={classes.fabEdit}>
              <EditIcon className={classes.IconEditSize}/>
              Принять
            </Fab>
             <Fab size={SizeBut} className={classes.fabEdIcon}>
              <EditIcon  />
              Принять
            </Fab>
            </Link>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Fab variant="extended" className={classes.fabDelete}>
              <DeleteIcon className={classes.IconSize}/>
              Отменить
            </Fab>
            <Fab size={SizeBut} className={classes.fabDelIcon}>
              <DeleteIcon />
              Отменить
            </Fab>
          </Grid>
          <Grid item xs={4} sm={5} md={5}>
          <Fab variant="extended" className={classes.fabDescription}>
              <DescriptionIcon className={classes.IconSize}/>
              Отложить
            </Fab>
            <Fab size={SizeBut} className={classes.fabDescIcon}>
              <DescriptionIcon />Отложить
            </Fab>
          </Grid>
        </Grid>
        </Grid>
            </Grid>
           
          </ListItemText>
        </ListItem>
        </Paper>
        </List>
          <Typography className={classes.typo}>Прошлые посещения</Typography>
          <List>
          <Paper>
          <ListItem>
          <ListItemIcon>
            <AlarmOnIcon className={classes.alarmOn}/>
          </ListItemIcon>
          <ListItemText >
            <Grid container container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={5}>
          <div className={classes.paper}>
           <h2>Рахимбеков Лугатип Разпинуевич</h2>
          </div>
        </Grid>
        <Grid item xs={7}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={4} sm={4} md={4}>
            <Fab variant="extended" className={classes.fabEdit}>
              <EditIcon className={classes.IconSize}/>
              Изменить
            </Fab>
             <Fab size={SizeBut} className={classes.fabEdIcon}>
              <EditIcon  />
              Изменить
            </Fab>
          </Grid>
          <Grid item xs={4} sm={3} md={3}>
            <Fab variant="extended" className={classes.fabDelete}>
              <DeleteIcon className={classes.IconEditSize}/>
              Удалить
            </Fab>
            <Fab size={SizeBut} className={classes.fabDelIcon}>
              <DeleteIcon  />
              Удалить
            </Fab>
          </Grid>
        </Grid>
        </Grid>
            </Grid>
           
          </ListItemText>
        </ListItem>
        </Paper>
        </List>
        <Fab variant="extended" className={classes.fabAdd} >
            <AddIcon  className={classes.IconAddSize}/>
            Добавить запись
        </Fab>
        </main>
      </div>
    );
  }
  
  LandingMedic.propTypes = {
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
  };
  

export default LandingMedic