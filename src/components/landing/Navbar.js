import clsx from 'clsx';
import React, { useState, useEffect } from 'react'
import { AppBar, Button, Typography, Toolbar, Container, List, ListItem } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle'
import Scrollspy from 'react-scrollspy';
import classNames from 'classnames';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  
    toolbar: {
        transition: '0.3s',
        paddingTop: '16px',
        paddingBottom: '16px'
    },
    toolbarShrink: {
        transition: '0.3s',
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    scrollSpy: {
        display: 'inline'
    },
    title: {
        transition: '0.3s',
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';",
        fontSize: '1.75em',
        fontWeight: '700',
        paddingTop: '.3125rem',
        paddingBottom: '.3125rem',
        marginRight: '1rem',
        lineHeight: '42px',
        whiteSpace: 'nowrap',
        flexGrow: '0.98',
        color: 'white !important'
    },
    titleShrinkSize: {
        transition: '0.3s',
        fontSize: '1.25em',
        flexGrow:'0.98'
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
    userIcon: {
        marginLeft: '10px'
    },
  root: {
    display: 'flex',
  },
  appbar:{
    [theme.breakpoints.down('sm')]:{
    display:"none",
    },
    backgroundColor:"#26C6DA"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
        backgroundColor:"#26C6DA"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor:"#26C6DA"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'inline',
    alignItems: 'center',
    fontSize:'1.5vw',
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Navbar = props =>{
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [scrolledDown, setScrolledDown] = useState(false)
  const { openLoginModal } = props

  useEffect(() => {
    window.addEventListener('scroll', () => {
        const isTop = window.scrollY < 100
        if (isTop) {
            setScrolledDown(false)
        } else {
            setScrolledDown(true)
        }
    })
})
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography className={classNames(classes.title, scrolledDown ? classes.titleShrinkSize : '')}>
            SAIMED
          </Typography>
          <Button className={classes.navButton} onClick={openLoginModal}>
            <FontAwesomeIcon icon={faUserCircle} size="2x" className={classes.userIcon}/>
          </Button>
          </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
             <ChevronLeftIcon />
            Медицинский кабинет SAIMED
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem button >
              <ListItemIcon>
                  <InboxIcon /> 
              </ListItemIcon>
              <ListItemText >
              <Button onClick={handleDrawerClose} href="#services">Услуги</Button>
              </ListItemText>
        </ListItem>
        <ListItem button>
              <ListItemIcon>
                  <MailIcon />
              </ListItemIcon>
              <ListItemText >
                <Button onClick={handleDrawerClose} href="#appointments">Онлайн запись</Button>
              </ListItemText>
        </ListItem>
        <ListItem button>
              <ListItemIcon>
                  <MailIcon />
              </ListItemIcon>
              <ListItemText >
                <Button onClick={handleDrawerClose} href="#team">Специалисты</Button>
              </ListItemText>
        </ListItem>
         <ListItem button>
              <ListItemIcon>
                  <MailIcon />
              </ListItemIcon>
              <ListItemText >
                <Button onClick={handleDrawerClose} href="#contact">Контакты</Button>
              </ListItemText>
        </ListItem>
        </List>       
      </Drawer>
      
      <AppBar position="fixed" className={classes.appbar}>
      <Toolbar className={scrolledDown ? classes.toolbarShrink : classes.toolbar}>
      <Typography className={classNames(classes.title, scrolledDown ? classes.titleShrinkSize : '')}>
        SAIMED
     </Typography>
    <Scrollspy items={ ['page-top', 'services', 'appointments', 'team', 'contact'] } currentClassName="is-current" className={classes.scrollSpy} componentTag="div" >
        <Button className={classes.navButton} href="#services">Услуги</Button>
        <Button className={classes.navButton} href="#appointments">Онлайн запись</Button>
        <Button className={classes.navButton} href="#team">Специалисты</Button>
        <Button className={classes.navButton} href="#contact">Контакты</Button>
        <Button className={classes.navButton} onClick={openLoginModal}>Вход <FontAwesomeIcon icon={faUserCircle} size="2x" className={classes.userIcon}/></Button>
    </Scrollspy>
  </Toolbar>
        </AppBar>
    </div>

  );
}
export default Navbar
