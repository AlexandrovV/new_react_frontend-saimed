import React from "react";
import { Grid, Typography, Button, Card } from "@material-ui/core";
import { makeStyles,useTheme } from "@material-ui/styles";
import dateFormat from 'dateformat'
import PatientService from "../../service/PatientService";
import { green, blue, red, yellow } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IsNewUserModal from "../landing/IsNewUserModal";
import RegisterModal from '../landing/RegisterModal'


const useStyles = makeStyles(theme => ({
    appointmentContainer: {
        paddingTop: '15px',
        paddingBottom:'15px',
        marginBottom: '10px'
    },
    fabDelete:{
        backgroundColor:red[900],
        width:'100%',
        height:"5vh",
        fontSize:"1.2vw",
        color:"white",
        '&:hover':{
          backgroundColor:"white",
          color:red[500]
        },
        [theme.breakpoints.down('xs')]: {
          display:'none',
        }
      },
      IconEditSize:{
        width:"3vh",
        height:"5vh",
      },
      IconSize:{
        width:"3vh",
        height:"5vh",
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
          fontSize:'1.4vw'
        },
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
}))

const FutureAppointmentItem = props => {
    const classes = useStyles()
    const theme = useTheme();
    const { date, startTime, endTime, appointmentId, onCancel } = props
    const [IsNewUserModalOpen, setIsNewUserModalOpen] = React.useState(false)
    const [registerModalOpen, setRegisterModalOpen] = React.useState(false)
    const matches = useMediaQuery('(min-height:800px) and (min-width:480px)');
    const matcheSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const openRegisterModal = () => setRegisterModalOpen(true)
    const closeRegisterModal = () => setRegisterModalOpen(false)
    const cancelAppointment = async () => {
        try {
            await PatientService.cancelAppointment(appointmentId)
            onCancel()
        } catch (err) {
            console.error(err)
        }
    }
   
    const openModal=()=>{
        setIsNewUserModalOpen(true);
    }
    const CloseModal=()=>{
        setIsNewUserModalOpen(false);
    }
    return (
    <Card  className={classes.appointmentContainer}>
    <Grid container spacing={3} 
            justify="center"
            alignItems="center"> 
                <Grid item xs={6}>
                    <Typography variant="h6">
                       {dateFormat(date, 'dddd dd mmmm')}, {dateFormat(startTime, 'HH:MM')} - {dateFormat(endTime, 'HH:MM')} 
                    </Typography>
                </Grid>
        <Grid item xs={6}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={4}>
          <Fab variant="extended" onClick={openModal} className={classes.fabEdit}>
            <EditIcon  className={classes.IconSize}/>
            Добавить
          </Fab>
          <Fab className={classes.fabEdIcon}>
            <EditIcon />
            Добавить
          </Fab>
          </Grid>
          <Grid item xs={4} >
          <Fab variant="extended" className={classes.fabDelete} onClick={cancelAppointment}>
            <DeleteIcon className={classes.IconEditSize}/>
            Отменить
            </Fab>
            <Fab className={classes.fabDelIcon} onClick={cancelAppointment}>
            <DeleteIcon />
            Отменить
          </Fab>
          </Grid>
        </Grid>
        </Grid>
            </Grid>
            <IsNewUserModal open={IsNewUserModalOpen} onClose={CloseModal} openRegisterModal={openRegisterModal}/>
            <RegisterModal open={registerModalOpen} onClose={closeRegisterModal}/>
        </Card>
    )
}


export default FutureAppointmentItem;
