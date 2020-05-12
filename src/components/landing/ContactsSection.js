import React from 'react'
import { Container, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn, faTwitter, faDribbble } from "@fortawesome/free-brands-svg-icons"

const useStyles = makeStyles(theme => createStyles({
    section: {
        backgroundColor: '#9403fc',
        color: 'white',
        padding:"100px 0",
        textAlign: 'center',
        [theme.breakpoints.down('md')]:{
            paddingTop:"50px",
            width:"200vw",
        },
    },
    sectionHeading: {
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
        fontSize: '1.5rem',
        fontWeight: 700,
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        [theme.breakpoints.up('sm')]:{
            fontSize: '4.5vw',
        },
        [theme.breakpoints.up('lg')]:{
            fontSize: '2.5vw',
        },
    },
    addressInfo: {
        fontSize: '1.25rem',
        fontWeight: '300',
        lineHeight: '1.75',
        fontFamily: "'Roboto Slab', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        [theme.breakpoints.up('sm')]:{
            fontSize: '4.5vw',
        },
        [theme.breakpoints.up('lg')]:{
            fontSize: '2.5vw',
        },
    },
    phoneNumber: {
        fontFamily: "'Roboto Slab', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        marginBottom: '1rem',
        [theme.breakpoints.up('sm')]:{
            fontSize: '4.5vw',
        },
        [theme.breakpoints.up('lg')]:{
            fontSize: '2.5vw',
        },
    },
    socialHeading: {
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: '1.25rem',
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        marginBottom: '1.5rem',
        [theme.breakpoints.up('sm')]:{
            fontSize: '4.5vw',
        },
        [theme.breakpoints.up('lg')]:{
            fontSize: '2.5vw',
        },
    },
    socialButton: {
        border: '1px solid white',
        borderRadius: '50%',
        display: 'inline-flex',
        fontSize:"3vw",
        width: '5vw',
        height: '5vw',
        fontWeight: '700',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        margin: '4px',
        '&:hover': {
            color: 'black',
            backgroundColor: 'white',
        },
        [theme.breakpoints.down('xs')]:{
            fontSize:"8vw",
            width: '3.25rem',
            height: '3.25rem',
        },
        [theme.breakpoints.between('sm','md')]:{
            fontSize:"5vw",
            width: '10vw',
            height: '10vw',
        },
    },

    mapcharac:{
        width:"40vw",
        height:"52vh",
        [theme.breakpoints.down('lg')]:{
            width:"50vw",
            height:"100%",
        },
        [theme.breakpoints.down('md')]:{
            width:"90vw",
            height:"52vh",
        },
        [theme.breakpoints.down('sm')]:{
            width:"90vw",
            height:"52vh",
        },
        [theme.breakpoints.down('xs')]:{
            width:"110vw",
            height:"52vh",
        },
        
    }
}))

const ContactsSection = props => {
    const classes = useStyles()
    return (
        <div id="contact" className={classes.section}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={5} sm={5} lg={4} xl={6}>
                        <Typography variant="h4" className={classes.sectionHeading}>Контакты</Typography>
                        <Typography className={classes.addressInfo}>г. Алматы, <br/> ул. Т.Сауранбаева 7\1, каб. 305</Typography>
                        <Typography className={classes.phoneNumber}>+7 (775) 306-66-07</Typography>
                        <Typography variant="h5" className={classes.socialHeading}>МЫ В СОЦИАЛЬНЫХ СЕТЯХ</Typography>
                        <a className={classes.socialButton}>
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a className={classes.socialButton}>
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a className={classes.socialButton}>
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                        <a className={classes.socialButton}>
                            <FontAwesomeIcon icon={faDribbble} />
                        </a>
                    </Grid>
                    <Grid item xs={5} sm={5} lg={8} xl={6}>
                        <iframe className={classes.mapcharac} src="https://yandex.com/map-widget/v1/?um=constructor%3Aa6f0704bd1aa8360cf09eccdc0ed997dc2abea06c58d15b21150edeff586d17d&amp;source=constructor" width="503" height="499" frameborder="0"  frameBorder="0" style={{border:'0'}} allowFullScreen=""></iframe>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default ContactsSection