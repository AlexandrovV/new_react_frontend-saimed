import React, { useState } from 'react'
import clsx from 'clsx';
import { AppBar, Typography, Toolbar, Popover, Grid, List, ListItem, Button, IconButton, Container } from '@material-ui/core'
import { AccountCircle } from "@material-ui/icons";
import { makeStyles } from '@material-ui/styles';
import { useHistory, Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {getUser} from "../../helpers/getUser";
import {hasRole} from "../../helpers/hasRole";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons/faUserCircle";


const useStyles = makeStyles(theme => ({
    title: {
        transition: "0.3s",
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';",
        fontSize: "2em",
        fontWeight: "700",
        display: "inline-block",
        paddingTop: ".3125rem",
        paddingBottom: ".3125rem",
        marginRight: "1rem",
        lineHeight: "42px",
        whiteSpace: "nowrap",
        color: "white !important",
        [theme.breakpoints.down("md")]: {
            fontSize: "5vw"
        }
    },
    flexGrow: {
        flexGrow: '1'
    },
    navButton: {
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';",
        color: 'white',
        fontSize: '90%',
        letterSpacing: '1px',
        padding: '1.1em 1em',
        '&:hover': {
            color: "#fed136",

        },
    },
    navLink: {
        textDecoration: 'none',
    },
    userIcon: {
        marginLeft: '5px'
    }
}))

const ResetPasswordAppBar = props => {
    const classes = useStyles()
    const history = useHistory()

    const logout = () => {
        localStorage.removeItem('token')
        history.push('/')
    }

    const { openLoginModal } = props

    const email = getUser()?.email

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Container>
                    <Toolbar>
                        <Typography className={classes.title}>
                            SAIMED
                        </Typography>
                        <div className={classes.flexGrow}></div>
                        {email}
                        { !hasRole("ROLE_USER") ?
                            <Button className={classes.navButton} onClick={openLoginModal}>Вход в кабинет <FontAwesomeIcon icon={faUserCircle} size="2x" className={classes.userIcon}/></Button>
                            : <Button className={classes.navButton} href="/cabinet">Кабинет <FontAwesomeIcon icon={faUserCircle} size="2x" className={classes.userIcon}/></Button>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default ResetPasswordAppBar