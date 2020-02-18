import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { Container, Grid, Typography, CardMedia } from '@material-ui/core';
import doctorImage from '../../img/doctor.jpg'

const useStyles = makeStyles(theme => createStyles({
    section: {
        background: "rgb(254,255,255)",
        background: "linear-gradient(180deg, rgba(254,255,255,1) 0%, rgba(220,226,226,1) 37%, rgba(220,226,226,1) 59%, rgba(255,255,255,1) 100%)",
        padding: '100px 0',
        textAlign: 'center',
        [theme.breakpoints.down('md')]:{
            paddingTop:"50px",
            width:"200vw",
        },
    },
    textCenter: {
        textAlign: 'center'
    },
    doctorImage: {
        width: '225px',
        height: '225px',
        border: '7px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
         margin: 'auto',
        [theme.breakpoints.up('sm')]:{
            width: '525px',
            height: '525px',
        },
           [theme.breakpoints.up('lg')]:{
            width: '325px',
            height: '325px',
        }
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
    doctorIntro: {
        marginTop: '45px',
        marginBottom: '5px',
        fontSize: '1.5rem',
        fontWeight: '700',
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        [theme.breakpoints.between('sm','md')]:{
            marginBottom:"1vw"
        },
        [theme.breakpoints.up('sm')]:{
         fontSize:"5.2vw"
        },
        [theme.breakpoints.up('lg')]:{
            fontSize:"1.2vw"
        }
    },
    doctorInfo: {
        fontFamily: "'Roboto Slab', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        [theme.breakpoints.between('sm','md')]:{
            marginBottom:"1vw"
        },
        [theme.breakpoints.up('sm')]:{
         fontSize:"5.2vw"
        },
        [theme.breakpoints.up('lg')]:{
            fontSize:"1.2vw"
        }
    }
}))

const TeamSection = props => {
    const classes = useStyles()

    return (
        <div id="team" className={classes.section}>
            <Container>
                <Grid container spacing={6} justify="center" className={classes.textCenter}>
                    <Grid item xs={12}>
                        <Typography variant="h2" className={classes.sectionHeading}>НАШИ СПЕЦИАЛИСТЫ</Typography>
                        <Typography variant="h3" className={classes.sectionSubheading}>Lorem ipsum dolor sit amet consectetur.</Typography>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardMedia image={doctorImage} className={classes.doctorImage}/>
                        <Typography variant="h4" className={classes.doctorIntro}>Исмаилова Салтанат</Typography>
                        <Typography className={classes.doctorInfo}>Детский невропатолог</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.doctorInfo}>Наши специалисты обладают опытом работы более 10 лет.</Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default TeamSection