import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import { Container, Typography, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
    section: {
        color:"white",
        padding: '100px 0',
        textAlign: 'center',
        [theme.breakpoints.down('md')]:{
            paddingTop:"100px",
            width:"200vw",
        }, 
        opacity:0.9
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
    sectionSubheading: {
        fontSize: '16px',
        fontWeight: '400',
        fontStyle: 'italic',
        marginBottom: '65px',
        textTransform: 'none',
        fontFamily: "'Droid Serif', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        [theme.breakpoints.between('sm','md')]:{
            marginBottom:"1vw"
        },
        [theme.breakpoints.up('sm')]:{
         fontSize:"4.2vw"
        },
        [theme.breakpoints.up('lg')]:{
            fontSize:"1.2vw"
           }
    },
    button: {
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        fontWeight: '700',
        fontSize: '18px',
        padding: '20px 40px',
        [theme.breakpoints.up('sm')]:{
            fontSize:"4.2vw"
           },
           [theme.breakpoints.up('lg')]:{
               fontSize:"1.2vw"
           },
           background:" rgb(12,212,224)",
           background: "linear-gradient(304deg, rgba(12,212,224,1) 0%, rgba(22,138,203,1) 39%)",
    }
}))

const OnlineAppointmentsSection = props => {
    const classes = useStyles()

    return (
        <Container id="appointments" className={classes.section}>
            <Grid container alignItems="center" justify="center">
                <Grid item xs={12}>
            <Typography variant="h2" className={classes.sectionHeading}>
                Онлайн запись
            </Typography>
            <Typography variant="h3" className={classes.sectionSubheading}>
                Вы можете записаться на приём онлайн прямо сейчас.
            </Typography> 
            <Button className={classes.button} variant="contained" color="primary">
                Записаться онлайн
            </Button>
            </Grid>
            </Grid>
        </Container>
    )
}

export default OnlineAppointmentsSection