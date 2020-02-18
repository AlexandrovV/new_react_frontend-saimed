import React, { Fragment } from 'react'
import { CardMedia, Grid, Button, Typography } from '@material-ui/core'
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import backgroundImage from '../../img/7.JPG'
import backgroundImage2 from '../../img/2.JPG'
import backgroundImage3 from '../../img/3.JPG'
import DatePickSection from './DatePickSection'
import '../../backimg.css'
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { deepPurple } from '@material-ui/core/colors';
import { cyan } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => createStyles({
    root: {
        flexGrow: 1,
      },
      header: {
        alignItems: 'center',
        height: "5vw",
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
      },
      button: {
        color:"white",
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        fontWeight: '700',
        fontSize: '18px',
        padding: '20px 40px',
        border: "1px solid white",
        "&:hover": {
          backgroundColor: "white",
          color: deepPurple[300]
        },
    },
      img: {
        height: "80vh",
        display: 'block',
        width: '100%',
      },
    introText: {
        height:"100vh",
        textAlign:"center",
        flexGrow:"1",
    },
    textback1:{
      color: "white",
      backgroundColor:cyan[500],
      opacity:0.9
    },
    textback:{
      backgroundColor:deepPurple[300],
      color: "white",
      opacity:0.9
    },
    introLeadIn: {
        fontSize: '4vw',
        [theme.breakpoints.down('xs')]: {
            fontSize:"10vw",
            lineHeight: '40px',
        },
        fontStyle: 'italic',
        paddingBottom:theme.spacing(4),
        paddingTop:theme.spacing(2),
        lineHeight: '3vw',
        fontFamily: "'Droid Serif', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
       
    },
    NoneDate:{
      display:"none",
    },
    xsWidth:{
      [theme.breakpoints.down('xs')]: {
          width:"200vw",
      },
    },
    introHeading: {
        fontSize: '6vw',
        [theme.breakpoints.down('xs')]: {
            fontSize:"15vw",
        },
        fontWeight: '700',
        paddingBottom:theme.spacing(4),
        lineHeight: '75px',
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",    },
}))

const HeadingSection = props => {
    const classes = useStyles()

    const { openLoginModal } = props

    const tutorialSteps = [
      {
        label:'Кабинет детского невропатолога',
        heading:'SAIMED',
        class:'bg',
        imgPath:backgroundImage,
        button:
        <Button  className={classes.button} onClick={openLoginModal}>
          Записаться онлайн
        </Button>
        ,
        textClass:classes.textback,
        just:"center",
      },
    ];
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;
  
    const handleNext = () => {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
  
    const handleStepChange = step => {
      setActiveStep(step);
    };
    
    return (
          <div className={classes.root}>
          <CardMedia className={tutorialSteps[activeStep].class} src={tutorialSteps[activeStep].imgPath} alt={tutorialSteps[activeStep].label} >
            <Grid container className={classes.introText} justify={tutorialSteps[activeStep].just} alignItems="center" >
                 <Grid className={tutorialSteps[activeStep].textClass} item xs={6}>
                 <Typography className={classes.introHeading}>
                 {tutorialSteps[activeStep].heading}
                 </Typography>
                 <Typography className={classes.introLeadIn}>
                  {tutorialSteps[activeStep].label}
                 </Typography>
                  {tutorialSteps[activeStep].button}
                 </Grid>
             </Grid>
          </CardMedia>
       </div>
      /* <Grid container xs={12}>
       <Grid item xs={6}>
      <Paper className={classes.header}>
        <Typography>{tutorialSteps[activeStep].label}</Typography>
      </Paper>
      </Grid>
      </Grid> */
      /* <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      /> */
    )
}

export default HeadingSection